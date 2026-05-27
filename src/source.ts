import { ColumnDataSchemaModel } from '@revolist/revogrid';
import { SelectConfig, SelectOption, SelectSourceContext } from './type';

export function createSelectSourceContext(
  schema: ColumnDataSchemaModel,
  additionalData?: any,
): SelectSourceContext {
  return {
    ...schema,
    additionalData,
  };
}

export function resolveSelectSource(
  column: SelectConfig['column'] | undefined,
  context: SelectSourceContext,
): SelectOption[] {
  const source = column?.source;
  if (!source) {
    return [];
  }
  return typeof source === 'function' ? source(context) : source;
}

export function getSelectOptionValue(
  option: SelectOption,
  column: SelectConfig['column'],
) {
  return column.valueKey && typeof option === 'object'
    ? option[column.valueKey]
    : option;
}

export function getSelectOptionLabel(
  option: SelectOption,
  column: SelectConfig['column'],
) {
  return column.labelKey && typeof option === 'object'
    ? option[column.labelKey]
    : option;
}

export function findSelectOption(
  source: SelectOption[],
  value: any,
  column: SelectConfig['column'],
) {
  return source.find(option => getSelectOptionValue(option, column) == value);
}

export function resolveSelectLabel(
  value: any,
  source: SelectOption[],
  column: SelectConfig['column'],
) {
  const option = findSelectOption(source, value, column);
  if (option) {
    return getSelectOptionLabel(option, column);
  }
  if (!source.length && column.labelKey) {
    return column.sourceLookup?.[value]?.[column.labelKey] ?? value;
  }
  return value;
}
