import {Edition} from '@revolist/revogrid/dist/types/interfaces';
import { ChangeValue, SelectConfig } from './type';


export class SelectColumnEditor implements Edition.EditorBase {
    constructor(
        // column data
        private column: SelectConfig,
        // to save changes
        private saveCallback: (value: Edition.SaveData, preventFocus?: boolean) => void,
        // to close editor, if focusNext true, after close editor focus on next cell
        // private closeCallback: (focusNext?: boolean) => void
    ) {
    }

    element?: HTMLSelectElement|null;
    editCell?: Edition.EditCell;
    componentDidRender() {}
    render(h: any) {
        let val = '';
        let filter = '';
        if (this.editCell) {
            const model = this.editCell.model || {};
            val = model[this.editCell?.prop] != null ? model[this.editCell.prop] : '';
        }
        if (val != this.editCell?.val) {
            filter = this.editCell?.val;
        }
        return <revo-dropdown 
            source={this.column?.source}
            dataId={this.column?.valueKey}
            dataLabel={this.column?.labelKey}
            autocomplete={true}
            autoFocus={true}
            max-height='300'
            value={val}
            currentFilter={filter}
            onChanged={({ detail }: CustomEvent<ChangeValue>) => {
                // object field mapping has to be preserved
                const preventFocus = detail.originalEvent.code=='Tab'? true : false;
                if (typeof detail.val === 'object') {
                    this.saveCallback(detail.val.value, preventFocus);
                // mapping by array strings
                } else {
                    this.saveCallback(detail.val, preventFocus);
                }
            }}/>;
    }
}
