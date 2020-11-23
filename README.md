# `revogrid-column-select`
Custom column type for [RevoGrid](https://github.com/revolist/revogrid) component based on [revo-dropdown](https://github.com/revolist/revodropdown) library.

<img src="./public/assets/sample.png" alt="Autocomplete dropdown" width="100%" />


## Installation
`npm i @revolist/revogrid-column-select`

## How to use

- Import Select Column type;
- Specify table data;
- Per column specify column type;
- Register your column type;
```js

// do Select class import
import SelectType from "@revolist/revogrid-column-select";

const columns = [{
    prop: 'name',
    labelKey: 'label',
    valueKey: 'value',
    source: [
        { label: 'According', value: 'a' },
        { label: 'Over', value: 'b' },
        { label: 'Source', value: 's' }
    ],
    columnType: 'select' // column type specified as 'select'
}];
const rows = [{ name: 'New item' }, { name: 'New item 2' }];

// register column type
const columnTypes = { 'select': new SelectColumnType() };

// apply data to grid per your framework approach
<revo-grid source={rows} columns={columns} columnTypes={columnTypes}/>
```
