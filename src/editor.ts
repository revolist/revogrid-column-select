import { type EditCell, type EditorBase, type HyperFunc, type VNode } from '@revolist/revogrid';
import { type ChangeValue, type SelectConfig } from './type';

export class SelectColumnEditor implements EditorBase {
  constructor(
    // column data
    private data: SelectConfig,
    // to save changes
    private saveCallback: (
      value: any,
      preventFocus?: boolean,
    ) => void,
    // to close editor, if focusNext true, after close editor focus on next cell
    // private closeCallback: (focusNext?: boolean) => void
  ) {}

  element?: HTMLRevoDropdownElement | null;
  editCell?: EditCell;
  componentDidRender() {}

  getValue() {
    return this.element?.value;
  }

  render(h: HyperFunc<VNode>, _additionalData: any) {
    let val = '';
    let filter = '';
    if (this.editCell) {
      const model = this.editCell.model || {};
      val = model[this.editCell?.prop] ?? '';
    }
    if (val != this.editCell?.val) {
      filter = this.editCell?.val;
    }
    const column = this.data?.column;
    return h('revo-dropdown', {
      ...column,
      ref: (e: HTMLRevoDropdownElement | null) => (this.element = e),
      dataId: column?.valueKey,
      dataLabel: column?.labelKey,
      autocomplete: true,
      autoFocus: true,
      maxHeight: '300',
      value: val,
      currentFilter: filter,
      onChanged: ({ detail }: CustomEvent<ChangeValue>) => {
        // object field mapping has to be preserved
        const preventFocus =
          detail.originalEvent.code == 'Tab' ? true : false;
        if (typeof detail.val === 'object') {
          this.saveCallback(detail.val.value, preventFocus);
          // mapping by array strings
        } else {
          this.saveCallback(detail.val, preventFocus);
        }
      }
    });
  }
}
