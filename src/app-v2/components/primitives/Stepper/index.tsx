import {Box, MobileStepper} from '@material-ui/core';
import {Button, makeStyles} from '@material-ui/core';
import {ArrowRight} from '@material-ui/icons';
import {memo, ReactElement, useState} from 'react';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
    padding: '6px',
    display: 'flex',
    borderRadius: '16px',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[200],
    '& h6': {
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '24px',
      padding: '16px',
    },
    '& button': {
      fontSize: '16px',
      fontStyle: 'normal',
      textTransform: 'none',
    },
  },
  stepper: {
    marginTop: 'auto',
    backgroundColor: theme.palette.grey[200],
    borderRadius: '16px',
  },
  dot: {
    marginRight: '12px',
  },
  dotActive: {
    backgroundColor: theme.palette.text.primary,
  },
  nextButton: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
  },
}));

type Props = {
  stepsPages: ReactElement[];
};

export const Stepper = memo(({stepsPages}: Props) => {
  const {t} = useTranslation();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep < stepsPages.length - 1 ? prevActiveStep + 1 : 0));
  };

  return (
    <Box className={classes.root}>
      {stepsPages[activeStep]}
      <MobileStepper
        className={classes.stepper}
        variant="dots"
        steps={stepsPages.length}
        position="static"
        activeStep={activeStep}
        classes={{
          dot: classes.dot,
          dotActive: classes.dotActive,
        }}
        nextButton={
          <Button className={classes.nextButton} onClick={handleNext}>
            {t('Next')}
            <ArrowRight />
          </Button>
        }
        backButton={<></>}
      />
    </Box>
  );
});
