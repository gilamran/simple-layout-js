/// <reference path="../reference.ts"/>

/**
 * Holds all the enumerations that the Simple Layout uses.
 * @namespace SimpleLayout.enums
 */
module SimpleLayout.enums {
    /**
     * @class SimpleLayout.enums.HorizontalAlignEnum
     * @classdesc The HorizontalAlignEnum is an enum of all the possible horizontal alignments.
     */
    export class HorizontalAlignEnum {
        /**
         * The horizontal alignment was not set. This is the default value of the LayoutItem's horizontalAlign
         * property, which means that it'll take the horizontal alignment from the layout itself.
         * @member SimpleLayout.enums.HorizontalAlignEnum#H_ALIGN_TYPE_NONE
         * @type {string}
         */
        public static H_ALIGN_TYPE_NONE		: string = "none";
        public static H_ALIGN_TYPE_CENTER	: string = "center";
        public static H_ALIGN_TYPE_LEFT		: string = "left";
        public static H_ALIGN_TYPE_RIGHT	: string = "right";
    }
}