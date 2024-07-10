import { HyperFunc, VNode } from '@revolist/revogrid';
import { SelectConfig } from './type';

const style = {
  width: '0',
  height: '0',
  borderStyle: 'solid',
  borderWidth: '5px 4px 0 4px',
  borderColor: 'transparent',
  borderTopColor: 'initial',
  display: 'inline-block',
  verticalAlign: 'middle',
  opacity: '.4',
};
export const SelectColumnRenderer = (
  h: HyperFunc<VNode>,
  { model, prop, column }: SelectConfig,
  _additionalData: any,
) => {
  let val = model[prop];
  if (column.labelKey && column.sourceLookup) {
    val = column.sourceLookup[val][column.labelKey];
  }
  return [
    h('div', { class: { 'cell-value-wrapper': true } }, [val]),
    h(
      'span',
      {
        class: { 'arrow-down': true },
        onClick: (e: MouseEvent) => {
          e.target.dispatchEvent(
            new MouseEvent('dblclick', {
              bubbles: true,
              cancelable: true,
              view: window,
            }),
          );
        },
      },
      [h('span', { style })],
    ),
  ];
};
