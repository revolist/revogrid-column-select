import keyBy from 'lodash/keyBy';
import { SelectColumnRenderer } from './renderer';
import { SelectConfig } from './type';
import { SelectColumnEditor } from './editor';
import { defineCustomElements } from '@revolist/revo-dropdown/loader';


export default class SelectColumnType {
    constructor() {
        defineCustomElements?.();
    }
    readonly editor = SelectColumnEditor;

    beforeSetup = (col: SelectConfig['column']) => {
        if (!col.source) {
            return;
        }
        col.sourceLookup = keyBy(col.source, col.valueKey);
    };

    cellTemplate = SelectColumnRenderer;
}
export const CreateSelectColumnType = SelectColumnType;
