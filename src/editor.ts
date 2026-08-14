import {
  type CellTemplateProp,
  type EditCell,
  type EditorBase,
  type HyperFunc,
  type VNode,
} from '@revolist/revogrid';
import {
  type ChangeValue,
  type SelectConfig,
  type SelectDropdownTemplate,
  type SelectOption,
} from './type';
import {
  createSelectSourceContext,
  getSelectOptionLabel,
  getSelectOptionValue,
  resolveSelectSource,
} from './source';

function isOptionModel(option: SelectOption): option is Record<string, any> {
  return !!option && typeof option === 'object' && !Array.isArray(option);
}

function hasTemplateContent(rendered: any) {
  return rendered !== undefined
    && rendered !== null
    && rendered !== false
    && rendered !== '';
}

export function createSelectDropdownTemplate(
  data: SelectConfig,
  additionalData?: any,
): SelectDropdownTemplate | undefined {
  const { column } = data;
  if (!column?.syncCellTemplate || column.template || !column.cellTemplate) {
    return column?.template;
  }
  const cellTemplate = column.cellTemplate;

  return (createElement, option) => {
    const value = getSelectOptionValue(option, column);
    const prop = data.prop ?? column.prop;
    const model = {
      ...data.model,
      ...(isOptionModel(option) ? option : {}),
      ...(prop === undefined ? {} : { [prop]: value }),
    };
    const rendered = cellTemplate(
      createElement,
      {
        ...data,
        model,
        prop,
        value,
      } as CellTemplateProp,
      additionalData,
    );

    return hasTemplateContent(rendered)
      ? rendered
      : getSelectOptionLabel(option, column);
  };
}

export class SelectColumnEditor implements EditorBase {
  private opened = false;

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
  componentDidRender() {
    if (!this.opened && this.element) {
      this.opened = true;
      this.element.doOpen?.();
    }
  }

  getValue() {
    return this.element?.value;
  }

  render(h: HyperFunc<VNode>, additionalData: any) {
    let val = '';
    if (this.editCell) {
      const model = this.editCell.model || {};
      val = model[this.editCell?.prop] ?? '';
    }
    const column = this.data?.column;
    const source = resolveSelectSource(
      column,
      createSelectSourceContext(this.editCell || this.data, additionalData),
    );
    const template = createSelectDropdownTemplate(
      (this.editCell || this.data) as SelectConfig,
      additionalData,
    );
    return h('revo-dropdown', {
      ...column,
      source,
      template,
      ref: (e: HTMLRevoDropdownElement | null) => (this.element = e),
      dataId: column?.valueKey,
      dataLabel: column?.labelKey,
      autocomplete: false,
      autoFocus: true,
      maxHeight: '300',
      value: val,
      onChanged: ({ detail }: CustomEvent<ChangeValue>) => {
        // object field mapping has to be preserved
        const preventFocus =
          detail.originalEvent?.code == 'Tab' ? true : false;
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
