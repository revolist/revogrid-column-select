import { h, VNode } from "@stencil/core";
import { RevoGrid } from "../../interfaces";
import { ArrowRenderer } from "./arrow";
import { SelectConfig } from "./type";

export const SelectColumnRenderer = (_h: RevoGrid.HyperFunc<VNode>, {model, prop, column}: RevoGrid.ColumnDataSchemaModel): (VNode|string)[] => {
    let col = column as SelectConfig;
    let val = model[prop];
    if (col.labelKey && col.sourceLookup) {
        val = col.sourceLookup[val][col.labelKey];
    }
    return [
        <div class='cell-value-wrapper'>{val}</div>,
        <ArrowRenderer class={{
            'arrow-down': true
        }} onClick = {e => {
            const ev = new MouseEvent('dblclick', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            e.target.dispatchEvent(ev);
        }}/>
    ];
};