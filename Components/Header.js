import shouldUpdate from 'recompose/shouldUpdate';
import withHandlers from 'recompose/withHandlers';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import { decamelize, camelize } from 'humps';
import cx from 'classnames';

import Icon from 'components/Icon';

import styles from '../styles.css';
import { getHeaderCellStyles } from '../helpers';

const BlankCell = <td className={cx(styles.headerCell, styles.fit)}></td>;

const getSortingIcon = sort => {
  if (!sort) return null;
  return <Icon value={sort} />;
};

const Cell = flow(
  shouldUpdate((prev, next) => prev.sorting !== next.sorting),
  withHandlers({
    onClick: ({ sorting, sortable, option, setSort }) =>
      sortable && setSort(decamelize(option), sorting === 'desc' ? 'asc' : 'desc') || noop
  })
)(({
  theme, title, sorting, onClick, ...rest
}) =>
  !title
  && BlankCell
  || (
    <th className={getHeaderCellStyles(rest, theme, sorting)} onClick={onClick}>
      <span>{title}</span>
      {getSortingIcon(sorting)}
    </th>
  )
);

export default flow(
  shouldUpdate((prev, next) =>
    prev.options.option !== next.options.option ||
    prev.options.direction !== next.options.direction
  )
)(({
  theme, columns, options, ...rest
}) => (
  <thead className={theme.header}>
    <tr>
    {
      columns.map(({ key, ...item }) =>
        <Cell
          key={key}
          option={key}
          sorting={(options.option && camelize(options.option)) === key && options.direction}
          theme={theme}
          {...item}
          {...rest} />
      )
    }
    </tr>
  </thead>
));
