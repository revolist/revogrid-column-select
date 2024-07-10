import { ColumnDataSchemaModel, ColumnRegular } from '@revolist/revogrid';
export interface SelectConfig extends ColumnDataSchemaModel {
    column: ColumnRegular & {
        source?: (string|{[label: string]: any})[];
        sourceLookup?: Record<string, any>;
        labelKey?: string;
        valueKey?: string;
    };
}
type ObjectChange = {val: {label: string, value: any},originalEvent: {code:string}};
type ArrayChange = {val: string,originalEvent:{code:string}};
export type ChangeValue = ObjectChange|ArrayChange;
