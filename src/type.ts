import {
  type ColumnDataSchemaModel,
  type ColumnRegular,
  type HyperFunc,
  type VNode,
} from '@revolist/revogrid';

export type SelectOption = string | { [label: string]: any };

export type SelectDropdownTemplate = (
  createElement: HyperFunc<VNode>,
  option: SelectOption,
) => any;

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
    /** Reuse the resolved cell template for options and the selected editor value. */
    syncCellTemplate?: boolean;
    /** Explicit dropdown option template. Takes precedence over synchronization. */
    template?: SelectDropdownTemplate;
    /** Explicit selected-value template. Takes precedence over synchronization. */
    selectedTemplate?: SelectDropdownTemplate;
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
