import cx from 'classnames';

export default ({ data: active, theme }) => (
  <span className={cx(theme.status, active && theme.activeStatus)} />
);
