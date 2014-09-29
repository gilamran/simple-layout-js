/// <reference path="../reference.ts"/>
module SimpleLayout.enums {
    /**
     * The VerticalAlignEnum is an enum of all the possible vertical alignments.
     * @readonly
     * @memberof SimpleLayout.enums
     * @enum {string}
     */
    export var VerticalAlignEnum = {
        /**
         * This is the default value of the LayoutItem's verticalAlign property, which means that it'll take the
         * vertical alignment from the layout. Use the other values in this enum to override the layout's alignment
         * @type {string}
         * @default
         */
        V_ALIGN_TYPE_NONE: "none",

        /**
         * Use the V_ALIGN_TYPE_MIDDLE to center the LayoutItems vertically in the space that was given to them.
         * @type {string}
         */
        V_ALIGN_TYPE_MIDDLE: "middle",

        /**
         * Use the V_ALIGN_TYPE_TOP to align the LayoutItems to the top of the vertical in the space that was
         * given to them.
         * @type {string}
         */
        V_ALIGN_TYPE_TOP: "top",

        /**
         * Use the V_ALIGN_TYPE_BOTTOM to align the LayoutItems to the bottom of the vertical in the space that was
         * given to them.
         * @type {string}
         */
        V_ALIGN_TYPE_BOTTOM: "bottom"
    };
}