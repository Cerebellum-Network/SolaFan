import {ReactComponent as ShareIcon} from '../../../../assets/svg/share.svg';
import {IconButton} from '../../../../components/primitives/IconButton';

type Props = {
  share: () => void;
};

export function ShareNftButton({share}: Props) {
  return (
    <IconButton onClick={share}>
      <ShareIcon />
    </IconButton>
  );
}
