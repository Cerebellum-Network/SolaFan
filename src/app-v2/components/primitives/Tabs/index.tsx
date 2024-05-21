import {Box, makeStyles, Tab, Tabs as MuiTabs} from '@material-ui/core';
import {ChangeEvent, memo, useCallback} from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '48px',
    borderRadius: '24px',
    backgroundColor: theme.palette.grey[200],
  },
  tabsRoot: {
    height: '48px',
    borderRadius: '24px',
  },
  tabsIndicator: {
    display: 'flex',
    justifyContent: 'center',
    height: '40px',
    bottom: '4px',
    borderRadius: '20px',
    backgroundColor: theme.palette.info.main,
    zIndex: 1,
  },
  tab: {
    zIndex: 2,
  },
  tabSelected: {
    color: theme.palette.common.white,
  },
}));

type Props = {
  tabs: {value: string; label: string}[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  disabled?: boolean;
};

export const Tabs = memo(({tabs, activeTab, setActiveTab, disabled}: Props) => {
  const styles = useStyles();

  const handleChangeTab = useCallback(
    (_: ChangeEvent<{}>, newValue: string) => {
      setActiveTab(newValue);
    },
    [setActiveTab],
  );

  return (
    <Box className={styles.root}>
      <MuiTabs
        variant="fullWidth"
        classes={{root: styles.tabsRoot, indicator: styles.tabsIndicator}}
        value={activeTab}
        onChange={handleChangeTab}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            disabled={disabled}
            value={tab.value}
            label={tab.label}
            classes={{root: styles.tab, selected: styles.tabSelected}}
          />
        ))}
      </MuiTabs>
    </Box>
  );
});
