import { Children, cloneElement } from 'react';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import cx from 'classnames';

export const EVENTS = ['onChange', 'onClick'];

export const addRowDataToEvents = (childProps, rowData) =>
  EVENTS.reduce((acc, event) => {
    if (childProps[event]) {
      acc[event] = function(e) { return childProps[event](rowData, e) }
    }
    return acc;
  }, {});

export const getCustomClass = (className, rowData) =>
  className && isFunction(className) && className(rowData) || className;

export const renderCustomCell = (children, props) =>
  isFunction(children)
  && children(props)
  || Children.map(children, child =>
    cloneElement(child, { ...addRowDataToEvents(child.props, props) })
  );

export const getHeaderCellStyles = (props, theme) => cx({
  [theme.headerCell]: true,
  [theme.fit]: props.fit,
  [theme.full]: props.full,
  [theme.hidden]: props.hidden,
  [theme.bold]: props.bold,
  [theme.center]: props.center,
  [theme.sortable]: props.sortable
});

export const getCellStyles = (props, theme) => cx({
  [theme.badge]: props.badge,
  [theme.center]: props.center,
  [theme.wrapText]: props.wrap
});
