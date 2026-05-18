import './editor-style.css';
import keyBy from 'lodash/keyBy';
import { SelectColumnRenderer } from './renderer';
import { SelectConfig } from './type';
import { SelectColumnEditor } from './editor';
import { defineCustomElement as defineRevoDropdown } from '@revolist/revo-dropdown/standalone/revo-dropdown.js';

let dropdownDefined = false;

function defineDropdownElements() {
  if (dropdownDefined || typeof customElements === 'undefined') {
    return;
  }
  console.warn('Defining revo-dropdown element for select column editor. If you are using a framework, consider importing the dropdown component from @revolist/revo-dropdown to avoid this warning and reduce bundle size.');
  defineRevoDropdown();
  dropdownDefined = true;
}

export default class SelectColumnType {
  constructor() {
    defineDropdownElements();
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
