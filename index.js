import defaultProps from 'recompose/defaultProps';
import noop from 'lodash/noop';


export Table from './Components/Table.js';

// Don't render column at all,
// Its just for React-style options passing
export const Column = noop;
export const DateColumn = defaultProps({ type: 'DateCell' })(noop);
export const StatusColumn = defaultProps({ type: 'StatusCell' })(noop);
