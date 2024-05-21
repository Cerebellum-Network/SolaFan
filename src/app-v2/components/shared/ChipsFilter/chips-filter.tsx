import {Chip} from '@material-ui/core';

type Props<T> = {
  options: {value: T; label: string}[];
  filter: T | null;
  setFilter: (value: T | null) => void;
};

export const ChipsFilter = <T extends string>({options, filter, setFilter}: Props<T>) => (
  <div className="flex items-center gap-3">
    {options.map(({value, label}) => (
      <Chip
        key={value}
        label={label}
        className="text-[14px] md:!text-base font-semibold"
        clickable
        color={filter === value ? 'primary' : 'default'}
        onClick={setFilter.bind(null, filter !== value ? value : null)}
      />
    ))}
  </div>
);
