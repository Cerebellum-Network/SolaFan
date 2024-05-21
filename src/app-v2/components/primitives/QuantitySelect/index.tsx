import {makeStyles, MenuItem, Select} from '@material-ui/core';
import {ChangeEvent, memo, useCallback} from 'react';

const useStyles = makeStyles((theme) => ({
  quantitySelect: {
    width: '100%',
    '&.MuiOutlinedInput-root': {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: `12px`,
      backgroundColor: theme.palette.grey[200],
    },
    '& .MuiSelect-root': {
      padding: '10px 14px',
    },
  },
}));

type Props = {
  quantityOptions: string[];
  quantity: number;
  setQuantity: (value: string) => void;
  disabledQuantiy?: boolean;
};

export const QuantitySelect = memo(({quantityOptions, quantity, setQuantity, disabledQuantiy}: Props) => {
  const styles = useStyles();

  const handleQuantityChange = useCallback(
    (event: ChangeEvent<{value: unknown}>) => setQuantity(event.target.value as string),
    [setQuantity],
  );

  return (
    <Select
      className={styles.quantitySelect}
      variant="outlined"
      value={quantity}
      onChange={handleQuantityChange}
      disabled={disabledQuantiy}
    >
      {quantityOptions.map((value) => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
});
