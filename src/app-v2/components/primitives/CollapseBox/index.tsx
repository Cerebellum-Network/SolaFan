import {Accordion, AccordionDetails, AccordionSummary, makeStyles} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import clsx from 'clsx';
import {memo, ReactElement} from 'react';

const useStyles = makeStyles((theme) => ({
  accordion: {
    boxShadow: 'none',
    '&.Mui-expanded': {
      margin: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  accordionSummary: {
    minHeight: '48px',
    maxHeight: '48px',
    '&.Mui-expanded': {
      minHeight: '48px',
      maxHeight: '48px',
    },
  },
  accordionDetails: {
    flexDirection: 'column',
  },
}));

type Props = {
  summary: string | ReactElement;
  children: string | ReactElement;
  defaultExpanded?: boolean;
  disabled?: boolean;
  classes?: Partial<Record<'root' | 'summary' | 'details', string>>;
};

export const CollapseBox = memo(({summary, children, defaultExpanded, disabled, classes}: Props) => {
  const styles = useStyles();

  return (
    <Accordion defaultExpanded={defaultExpanded} className={clsx(styles.accordion, classes?.root)} disabled={disabled}>
      <AccordionSummary className={clsx(styles.accordionSummary, classes?.summary)} expandIcon={<ExpandMore />}>
        {summary}
      </AccordionSummary>
      <AccordionDetails className={clsx(styles.accordionDetails, classes?.details)}>{children}</AccordionDetails>
    </Accordion>
  );
});
