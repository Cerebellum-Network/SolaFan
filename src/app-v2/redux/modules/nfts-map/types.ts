export type GenericNft = {
  id: string;
};

export type State = Record<string, GenericNft>;

export type Payload = GenericNft[];
