import { HyperFunc, VNode } from '@revolist/revogrid';
import { SelectConfig } from './type';
import {
  createSelectSourceContext,
  resolveSelectLabel,
  resolveSelectSource,
} from './source';

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
  schema: SelectConfig,
  additionalData: any,
) => {
  const { model, prop, column } = schema;
  let val = model[prop];
  const source = resolveSelectSource(
    column,
    createSelectSourceContext(schema, additionalData),
  );
  val = resolveSelectLabel(val, source, column);
  return [
    h('div', { class: { 'cell-value-wrapper': true } }, [val]),
    h(
      'span',
      {
        class: { 'arrow-down': true },
        onClick: (e: MouseEvent) => {
          e.target?.dispatchEvent(
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
