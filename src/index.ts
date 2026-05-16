import './editor-style.css';
import keyBy from 'lodash/keyBy';
import { SelectColumnRenderer } from './renderer';
import { SelectConfig } from './type';
import { SelectColumnEditor } from './editor';
import { defineCustomElements } from '@revolist/revo-dropdown/loader';

export default class SelectColumnType {
  constructor() {
    defineCustomElements?.();
  }
  readonly editor = SelectColumnEditor;

  beforeSetup = (col: SelectConfig['column']) => {
    if (!col.source) {
      return;
    }
    col.sourceLookup = keyBy(col.source, col.valueKey);
  };

  cellTemplate = SelectColumnRenderer;
}
export const CreateSelectColumnType = SelectColumnType;
// Ensure it's available on window for UMD/IIFE builds
if (typeof window !== 'undefined') {
  (window as any).RevoColumnSelect = SelectColumnType;
}
