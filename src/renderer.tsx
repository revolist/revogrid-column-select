import { SelectConfig } from "./type";
const style = {
    width: '0',
    height: '0',
    borderStyle: 'solid',
    borderWidth: '5px 4px 0 4px',
    borderColor: 'transparent',
    borderTopColor: 'initial',
    display: 'inline-block',
    verticalAlign: 'middle',
    opacity: '.4'
  };
export const SelectColumnRenderer = (h: any, {model, prop, column}: any): any[] => {
    let col = column as SelectConfig;
    let val = model[prop];
    if (col.labelKey && col.sourceLookup && col.sourceLookup[val]) {
        val = col.sourceLookup[val][col.labelKey];
    }
    return [
        <div class='cell-value-wrapper'>{val}</div>,
        <span class={{ 'arrow-down': true }}
            onClick = {(e: MouseEvent) => {
                const ev = new MouseEvent('dblclick', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                e.target.dispatchEvent(ev);
            }}>
            <span {...{ style }}/>
        </span>
    ];
};
