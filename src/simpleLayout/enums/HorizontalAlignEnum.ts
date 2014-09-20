/// <reference path="../reference.ts"/>

module SimpleLayout {

    /**
     * Holds all the enumerations that the Simple Layout uses.
     *
     * @module SimpleLayout
     * @submodule enums
     */
    export module enums {
        /**
         * The {{#crossLink "HorizontalAlignEnum"}}{{/crossLink}} is an enum of all the possible horizontal alignments.
         *
         * @class HorizontalAlignEnum
         * @constructor
         **/
        export class HorizontalAlignEnum {
            public static H_ALIGN_TYPE_NONE		: string = "none";
            public static H_ALIGN_TYPE_CENTER	: string = "center";
            public static H_ALIGN_TYPE_LEFT		: string = "left";
            public static H_ALIGN_TYPE_RIGHT	: string = "right";
        }
    }
}