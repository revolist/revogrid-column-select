import { VNode } from "@stencil/core";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface IntrinsicElements {
      [elem: string]: any;
    }
    //interface ElementAttributesProperty { $props: {} }
  }
  interface Window {
    Revogrid: any;
  }
}
