import { Children } from 'react';
import flow from 'lodash/flowRight';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import themeable from 'lib/themeable';
import cx from 'classnames';
import compact from 'lodash/compact';
import styles from '../styles.css';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export default flow(
  themeable(styles),
  withHandlers({
    setSort: ({ action }) => (option, direction) => action({ option, direction })
  }),
  withPropsOnChange(
    ['children'],
    ({ children }) => ({
      columns: Children.map(compact(children), ({ props, key }) => ({ ...props, key }))
    })
  )
)(({
  theme, options, setSort, data, columns, loading, action, totalText
}) => (
  <div className={cx(theme.wrap, loading && theme.loading)}>
    <table className={theme.table}>
      <Header
        columns={columns}
        options={options}
        setSort={setSort}
        theme={theme} />
      <Body data={data} columns={columns} theme={theme} />
    </table>
    <Footer theme={theme} options={options} action={action} totalText={totalText} />
  </div>
));
