import {Edition} from '@revolist/revogrid/dist/types/interfaces';
import { SelectConfig } from "./type";

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
    componentDidRender(): void {
        if (this.element) {
            this.element.value = this.editCell?.val;
        }
    }
    render(h: any) {
        return <revo-dropdown 
            source={this.column?.source}
            dataId={this.column?.valueKey}
            dataLabel={this.column?.labelKey}
            autocomplete={true}
            autoFocus={true}
            max-height="300"
            onChangeValue={({detail: {val: {value}}}: CustomEvent<{val: {label: string, value: any}}>) => {
            this.saveCallback(value);
        }}/>;
    }
}
