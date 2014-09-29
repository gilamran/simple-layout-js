/// <reference path="../reference.ts"/>
/**
 * Holds all the enumerations that the Simple Layout uses.
 * @namespace SimpleLayout.enums
 */
module SimpleLayout.enums {
    /**
     * The HorizontalAlignEnum is an enum of all the possible horizontal alignments.
     * @readonly
     * @memberof SimpleLayout.enums
     * @enum {string}
     */
    export var HorizontalAlignEnum = {
        /**
         * This is the default value of the LayoutItem's horizontalAlign property, which means that it'll take the
         * horizontal alignment from the layout. Use the other values in this enum to override the layout's alignment
         * @type {string}
         * @default
         */
        H_ALIGN_TYPE_NONE: "none",

        /**
         * Use the H_ALIGN_TYPE_CENTER to center the LayoutItems horizontally in the space that was given to them.
         * @type {string}
         */
        H_ALIGN_TYPE_CENTER: "center",

        /**
         * Use the H_ALIGN_TYPE_LEFT to align left the LayoutItems horizontally in the space that was given to them.
         * @type {string}
         */
        H_ALIGN_TYPE_LEFT: "left",

        /**
         * Use the H_ALIGN_TYPE_RIGHT to align right the LayoutItems horizontally in the space that was given to them.
         * @type {string}
         */
        H_ALIGN_TYPE_RIGHT: "right"
    };
}
