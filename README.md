> **ATTENTION!!!**

> This is not complete library yet, because i'm lazy...
> But you can fork it and modify as you want. [*@bitaru*]

# React-Simple-Table
---
## Components:
#### Table
`import { Table } from 'components/Table'`

Table is a base component which is responsible for all of the logic.
##### `props`
`totalText: String`
> Display text like "Total offers"

`loading: Bool`
> If `true`, table will be muted, usefull while loading content

`options: Object`
> Option from Rails api, there is information about sorting, search and active filters

`action: Function`
> The action which will be evaluated on change pagination or filter. As parameter will be `{ option.key: options.value}`

`data: Collection`
> Collection of data which will be displayed in table

#### Column
`import { Column } from 'components/Table'`
##### `props`
`key: String!required`
> The key of element in data object

`title: String`
> Title willbe displayed in table header for this column

`cellClass: {String|Function}`
> If you pass function, it will receive value of current cell as property and merge it's result with other class names
```
cellClass={value => styles[`specification-${value}`]}
```

`sortable: Bool`
> Make this column sotrable

`fit: Bool`
> Column width will be fited

`full: Bool`
> Column will be full width

`center: Bool`
> Column content will be centered

`children: {ReactComponent|Function}`
> If you pass there Component, than it will be rendered with mutated events `onClick` and `onChange`, the first parameter in callback will contain data of current row
```
<Column><Icon onClick={this.editRow} /></Column>
```

> The function will be executed with row data as function paramter.
```
<Column>{({ type }) => <span>{type.replace('_', ' ')}</span>}</Column>
```

#### *MacroColumns*
We already have custome Columns, which will render cells as formated date and status mark. They have same Props as Column, just render enother component.

###### DateColumn
`import { DateColumn } from 'components/Table'`
> Will render Formated date string in table cell

###### StatusColumn
`import { StatusColumn } from 'components/Table'`
> Render a ball mark and make it green if value is `true`
