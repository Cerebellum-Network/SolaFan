import {createFreeportCollection} from '@cere/freeport-sc-sdk';
import {deconstructCdnUrl} from '@cere/media-sdk-react';
import axios, {AxiosInstance} from 'axios';
import {Signer} from 'ethers';
import {getAddress} from 'ethers/lib/utils';
import FileDownload from 'js-file-download';

import {FREEPORT_API_URL} from '../../config/common';
import {isRecord} from '../../shared/types/is-record';
import {AssetIdentifier, isNftMetadata} from '../../shared/types/metadata';
import {assertGuard} from '../../shared/types/type-guards';
import {AuthHeaderKeys, GetAuthMessageResponse, GetNftMetadataResponse} from './types';

/**
 * Interacts with the DDC Content Service Module in the Freeport DDC Proxy Service
 * to facilitate the creation of buckets, upload an retrieval of content to the DDC
 */
export class DdcContentService {
  /**
   * Auth token gets stored when the authentication function has been run against this singleton instance
   */
  private static authHeaders?: Record<AuthHeaderKeys, string>;

  static isAuthenticated(): boolean {
    return !!this.authHeaders;
  }

  static disconnect(): void {
    this.authHeaders = undefined;
  }

  /**
   * Authenticate with the DDC Content Service
   * @param signer The signer to use to sign the authentication message
   */
  static async authenticate(signer: Signer): Promise<void> {
    if (this.isAuthenticated()) return;

    const address = await signer.getAddress();
    const {data: message} = await this.authApi().get<GetAuthMessageResponse>(
      `/api/wallet-auth/auth-message?walletPublicKey=${address}`,
    );

    const signature = await signer.signMessage(message);

    this.authHeaders = {
      'x-message': message,
      'x-signature': signature,
      'x-public-key': getAddress(address),
    };
  }

  /**
   * Get the metadata and assigned content associated with a token that has been setup via the DDC Content Service
   * @param collectionAddress The address of the collection contract
   * @param nftId The id of the NFT
   * @param signer The id of the NFT
   */
  static async getNftMetadata({
    collectionAddress,
    nftId,
    signer,
  }: {
    collectionAddress: string;
    nftId: number;
    signer: Signer;
  }): Promise<GetNftMetadataResponse> {
    const collection = createFreeportCollection({contractAddress: collectionAddress, signer});
    const nftUri = await collection.uri(nftId);

    const metadata = await fetch(nftUri)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load NFT metadata');
        return response.json();
      })
      .then((response) => (isRecord(response) ? {assets: [], ...response} : response))
      .then((response) => assertGuard(response, isNftMetadata));

    const {assets} = metadata;

    const content = assets.map((asset, index) => ({...asset, index}));

    return {content};
  }

  /**
   * Retrieve the decrypted content from the DDC Content Service via the ddc-video-upload-service
   * @param collectionAddress The address of the collection contract
   * @param nftId The id of the NFT
   * @param asset The asset identifier to retrieve
   * @param signer The signer to use to authenticate with the API
   * @returns The decrypted content as a string
   */
  static async getContent({
    collectionAddress,
    nftId,
    asset,
    signer,
  }: {
    collectionAddress: string;
    nftId: number;
    asset: AssetIdentifier;
    signer: Signer;
  }): Promise<Blob> {
    await this.authenticate(signer);
    const {data} = await this.contentApi().get(`/api/content/${collectionAddress}/${nftId}/${asset}`, {
      responseType: 'blob',
    });

    return data;
  }

  /**
   * Download encrypted or public content from the DDC Content Service
   * @param collectionAddress The address of the collection contract
   * @param nftId The id of the NFT
   * @param asset The asset identifier to retrieve
   * @param signer The signer to authenticate with the API
   * @param name The name of nft asset
   */
  static async downloadContent({
    collectionAddress,
    nftId,
    asset,
    signer,
    name,
  }: {
    collectionAddress: string;
    nftId: number;
    asset: AssetIdentifier;
    signer: Signer;
    name: string;
  }): Promise<void> {
    if (!signer) {
      throw new Error('Signer is required to download encrypted content');
    }

    const data = await this.getContent({collectionAddress, nftId, asset, signer});
    const isPreview = asset.startsWith('preview');
    return FileDownload(data, this.formatFileName(name, isPreview), data.type);
  }

  /**
   * Retrieve the DEK for an encrypted asset
   * @param collectionAddress The address of the collection contract
   * @param nftId The id of the NFT
   * @param asset The asset identifier to retrieve
   * @param signer The signer to authenticate with the API
   */
  static async getContentDek({
    collectionAddress,
    nftId,
    asset,
  }: {
    collectionAddress: string;
    nftId: number;
    asset: AssetIdentifier;
  }): Promise<string> {
    const {data} = await this.contentApi().get(`/api/content/${collectionAddress}/${nftId}/${asset}/dek`);

    return data;
  }

  /**
   * Get the stream key for an encrypted server side video stream
   * @param collectionAddress The address of the collection to check
   * @param nftId The ID of the NFT to check
   * @param bucketId The ID of the bucket to check
   * @param cid The CID of the content to check
   * @returns The encrypted stream key for the given asset
   */
  static async getStreamKey({
    collectionAddress,
    nftId,
    bucketId,
    cid,
  }: {
    collectionAddress: string;
    nftId: number;
    bucketId: number;
    cid: string;
  }): Promise<string> {
    const {data} = await this.contentApi().get(
      `/api/video/streaming/${collectionAddress}/${nftId}/${bucketId}/${cid}/stream-key`,
    );

    return data;
  }

  static async getStreamUrl({
    cdnUrl,
    collectionAddress,
    nftId,
  }: {
    cdnUrl: string;
    collectionAddress: string;
    nftId: number;
  }) {
    const {bucketId, cid} = deconstructCdnUrl(cdnUrl);

    const streamKey = await this.getStreamKey({
      collectionAddress: collectionAddress!,
      nftId: Number(nftId),
      bucketId: parseInt(bucketId),
      cid,
    });

    const url = new URL(FREEPORT_API_URL());
    url.pathname = `/api/video/streaming/${streamKey}/${bucketId}/${cid}`;

    return url.href;
  }

  /**
   * Check if the caller has access to the content associated with this token
   * @returns True if the caller has access to the content, false otherwise
   */
  static async getHasAccess({
    collectionAddress,
    nftId,
    signer,
  }: {
    collectionAddress: string;
    nftId: number;
    signer: Signer;
  }): Promise<boolean> {
    await this.authenticate(signer);
    const {data} = await this.contentApi().get(
      `/api/content/${collectionAddress}/${nftId}/${await signer.getAddress()}/access`,
    );

    return data;
  }

  private static authApi(): AxiosInstance {
    return axios.create({
      baseURL: FREEPORT_API_URL(),
    });
  }

  private static contentApi(): AxiosInstance {
    return axios.create({
      baseURL: FREEPORT_API_URL(),
      headers: this.authHeaders,
    });
  }

  private static formatFileName(name: string, isPreview?: boolean): string {
    let fileName = name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '_');

    if (fileName.length > 100) {
      fileName = fileName.substring(0, 100);
    }

    return isPreview ? `${fileName}_preview` : fileName;
  }
}
