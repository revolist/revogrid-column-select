import { RevoGrid } from '@revolist/revogrid/dist/types/interfaces';
export interface SelectConfig extends RevoGrid.ColumnRegular {
    source?: (string|{[label: string]: any})[];
    sourceLookup?: Record<string, any>;
    labelKey?: string;
    valueKey?: string;
}
