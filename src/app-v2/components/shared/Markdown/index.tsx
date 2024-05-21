/* eslint-disable jsx-a11y/heading-has-content */
import {Box, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {FC, ReactElement} from 'react';
import ReactMarkdown from 'react-markdown';

import colors from '../../../../styles/colors';
import {ReactComponent as Success} from '../../../assets/svg/success.svg';

interface MarkdownProps {
  mainColor?: 'grey' | 'cyan';
  children: string;
  collapsed?: boolean;
  isShort?: boolean;
}

type MarkdownStyles = Pick<MarkdownProps, 'mainColor'>;

const useStyles = makeStyles<Theme, MarkdownStyles>((theme) => ({
  collapsed: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '& > div:last-child': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  },
  paragraph: {
    margin: '.3rem 0',
    [theme.breakpoints.up('sm')]: {
      fontSize: '16px !important',
      lineHeight: '24px',
    },
  },
  header: {
    marginTop: 0,
    paddingTop: 0,
  },
  bulletList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: '0',
    margin: '.2rem 0',
    listStyleType: 'none',
    '& p': {
      margin: '.2rem 0',
    },
  },
  bullet: {
    width: '100%',
    margin: '.2rem 0',
    display: 'flex',
    flexDirection: 'row',
  },
  bulletExpanded: {
    '& > div:last-child': {
      whiteSpace: 'pre-line',
      overflow: 'hidden',
    },
  },
  bulletIcon: {
    width: '.8rem',
    height: '.8rem',
    overflow: 'visible',

    '& path': {
      fill: ({mainColor}: MarkdownStyles) => (mainColor === 'cyan' ? theme.palette.primary.main : colors.lightGrey),
    },
  },
  blockquote: {
    margin: '.2rem 0',
    padding: '16px 0 16px 20px',
    borderLeft: ({mainColor}) => `2px solid ${mainColor === 'cyan' ? theme.palette.primary.main : colors.lightGrey}`,
    '& p': {
      margin: '0',
    },
    '&$collapsed': {
      padding: '0 0 0 16px',
    },
  },
  shortDescription: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}));

export const Markdown: FC<MarkdownProps> = ({
  collapsed = false,
  children,
  mainColor = 'cyan',
  isShort = false,
}): ReactElement => {
  const classes = useStyles({mainColor});

  return (
    <ReactMarkdown
      components={{
        h2: ({node, ...props}) => (
          <h2
            className={clsx(classes.header, collapsed && classes.collapsed, isShort && classes.shortDescription)}
            {...props}
          />
        ),
        h3: ({node, ...props}) => (
          <h3
            className={clsx(classes.header, collapsed && classes.collapsed, isShort && classes.shortDescription)}
            {...props}
          />
        ),
        p: ({node, ...props}) => (
          <p
            className={clsx(classes.paragraph, collapsed && classes.collapsed, isShort && classes.shortDescription)}
            {...props}
          />
        ),
        blockquote: ({node, ...props}) => (
          <blockquote
            className={clsx(classes.blockquote, collapsed && classes.collapsed, isShort && classes.shortDescription)}
            {...props}
          />
        ),
        ul: ({node, ...props}) => (
          <ul className={clsx(classes.bulletList, isShort && classes.shortDescription)} {...props} />
        ),
        li: ({node, children, ...props}) => (
          <li className={clsx(classes.bullet, collapsed && classes.collapsed)} {...props}>
            <Box width="12px" mr=".3rem">
              <Success className={classes.bulletIcon} />
            </Box>
            <Box className={clsx('', collapsed && classes.collapsed)}>{children}</Box>
          </li>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
