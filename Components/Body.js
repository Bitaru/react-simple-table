import cx from 'classnames';
import pure from 'recompose/pure';
import * as Cells from '../Cells';
import { getCustomClass, renderCustomCell, getCellStyles } from '../helpers';

const Cell = pure(({
  theme, children, className, data: { type, ...data }
}) => {
  const ExtraCell = type && Cells[type];
  return (
    <td className={cx(theme.cell, className, getCellStyles(data, theme))}>
      {
        ExtraCell
        ? <ExtraCell theme={theme} data={children} />
        : <span>{children}</span>
      }
    </td>
  );
});


const Row = ({
  theme, data, columns
}) => (
  <tr className={theme.row}>
    {
      columns.map(({ key, children, cellClass, ...rest }) =>
        <Cell
          key={key}
          data={rest}
          className={getCustomClass(cellClass, data[key])}
          theme={theme}>
          {!children && data[key] || renderCustomCell(children, data)}
        </Cell>
      )
    }
  </tr>
);


export default ({ columns, data, ...rest }) => (
  <tbody>
    {data.map(row => <Row key={row.id} data={row} columns={columns} {...rest} />)}
  </tbody>
);
