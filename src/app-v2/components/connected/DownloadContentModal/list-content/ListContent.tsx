import {useNftMetadata} from '@cere/media-sdk-react';
import {styled} from '@linaria/react';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import {ContentItem} from './ContentItem';

export interface ListContentProps {
  collectionAddress: string;
  nftId: number;
}

export const ListContent = ({collectionAddress, nftId}: ListContentProps) => {
  const {metadata, isLoading} = useNftMetadata(collectionAddress, nftId);

  if (isLoading) {
    return (
      <Box style={{padding: '0', height: '300px'}} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }
  if (!metadata) {
    return <ErrorText>No Content Found</ErrorText>;
  }

  const {assets} = metadata;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Preview</TableCell>
            <TableCell>Preview</TableCell>
            <TableCell>Encrypted Asset</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {assets.map((item, index) => (
            <ContentItem
              key={item.asset}
              collectionAddress={collectionAddress}
              nftId={nftId}
              asset={item}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ErrorText = styled.h3`
  color: red;
`;
