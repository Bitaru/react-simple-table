import { PropTypes } from 'react';
import { Button, IconButton } from 'react-toolbox/lib/button';
import flow from 'lodash/flowRight';
import range from 'lodash/range';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import setPropTypes from 'recompose/setPropTypes';
import branch from 'recompose/branch';
import pure from 'recompose/pure';
import themeable from 'lib/themeable';

const { func, number } = PropTypes;

import styles from './styles.css';

const getRange = (page, total) => {
  const min = page - 3;
  const max = page + 5;
  return range(min < 1 ? 1 : min, max > total ? total + 1 : max);
};

const Item = flow(
  pure,
  branch(
    props => props.flat,
    withProps({ Component: IconButton }),
    withProps(props => ({ Component: Button, className: props.theme.button })),
  ),
  withHandlers({
    onClick: props => () => props.changePage(props.page)
  })
)(({ Component, ...rest }) => <Component mini {...rest} />);

export const Pagination = flow(
  themeable(styles),

  setPropTypes({
    total: number,
    current: number,
    action: func
  }),

  withProps(props => ({
    showFirst: props.current !== 1,
    showLast: props.current !== props.total,
    showPrev: props.current > 2,
    showNext: props.total - 2 > props.current,
    visiblePages: getRange(props.current, props.total)
  })),

  withHandlers({
    changePage: ({ action }) => page => action({ page })
  })
)(({
  showFirst,
  showLast,
  showPrev,
  showNext,
  visiblePages,
  current,
  total,
  ...rest
}) => (
  <div className={rest.theme.pagination}>
    {showFirst && <Item flat icon='first_page' page={1} {...rest} />}
    {showPrev && <Item flat icon='chevron_left' page={current - 1} {...rest} />}
    {
      visiblePages.map(page =>
        <Item
          key={page}
          page={page}
          label={String(page)}
          raised={current === page}
          {...rest} />
      )
    }
    {showNext && <Item flat icon='chevron_right' page={current + 1} {...rest} />}
    {showLast && <Item flat icon='last_page' page={total} {...rest} />}
  </div>
));
