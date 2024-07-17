### 🚨 Repository Notice 🚨

This repo is read-only and will be **deprecated** in v5+ in favor of monorepos. Post issues [here](https://github.com/revolist/revogrid). Happy coding! 🖥️💻

---

# Select Column type
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
import SelectTypePlugin from "@revolist/revogrid-column-select";

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
const columnTypes = { 'select': new SelectTypePlugin() };

// apply data to grid per your framework approach
<revo-grid source={rows} columns={columns} columnTypes={columnTypes}/>
```

## How to use with static Vanilla JS:

For static sites check this [Sample](https://codesandbox.io/s/revogrid-staticjs-column-jvztc?file=/index.html).
