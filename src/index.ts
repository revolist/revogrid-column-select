import keyBy from 'lodash/keyBy';
import { SelectColumnRenderer } from './renderer';
import { SelectConfig } from './type';
import { SelectColumnEditor } from './editor';

export const Revogrid = window.Revogrid || {};

export default class SelectColumnType {
    readonly editor = SelectColumnEditor;

    beforeSetup = (col: SelectConfig) => {
        if (!col.source) {
            return;
        }
        col.sourceLookup = keyBy(col.source, col.valueKey);
    };

    cellTemplate = SelectColumnRenderer;
}
Revogrid.SelectColumnType = SelectColumnType;
