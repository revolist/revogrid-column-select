import { ColumnDataSchemaModel, ColumnRegular } from '@revolist/revogrid';

export interface SelectConfig extends ColumnDataSchemaModel {
  column: ColumnRegular & {
    source?: (string | { [label: string]: any })[];
    sourceLookup?: Record<string, any>;
    labelKey?: string;
    valueKey?: string;
  };
}

type SelectOriginalEvent = Event & { code?: string };
type ObjectChange = {
  val: { label: string; value: any };
  originalEvent?: SelectOriginalEvent;
};
type ArrayChange = {
  val: string;
  originalEvent?: SelectOriginalEvent;
};
export type ChangeValue = ObjectChange | ArrayChange;
