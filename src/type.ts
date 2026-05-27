import { ColumnDataSchemaModel, ColumnRegular } from '@revolist/revogrid';

export type SelectOption = string | { [label: string]: any };

export type SelectSourceContext = ColumnDataSchemaModel & {
  additionalData?: any;
};

export type SelectSource =
  | SelectOption[]
  | ((context: SelectSourceContext) => SelectOption[]);

export interface SelectConfig extends ColumnDataSchemaModel {
  column: ColumnRegular & {
    source?: SelectSource;
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
