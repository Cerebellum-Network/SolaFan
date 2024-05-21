import {styled} from '@linaria/react';
import {Link} from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  button > * {
    pointer-events: none;
  }
`;

export const StyledALink = styled('a')`
  text-decoration: none;
  color: inherit;
  button > * {
    pointer-events: none;
  }
`;
