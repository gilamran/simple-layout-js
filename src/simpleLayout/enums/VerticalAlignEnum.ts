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
         * The {{#crossLink "VerticalAlignEnum"}}{{/crossLink}} is an enum of all the possible vertical alignments.
         *
         * @class VerticalAlignEnum
         * @constructor
         **/
        export class VerticalAlignEnum {
            public static V_ALIGN_TYPE_NONE			: string = "none";
            public static V_ALIGN_TYPE_MIDDLE		: string = "middle";
            public static V_ALIGN_TYPE_TOP			: string = "top";
            public static V_ALIGN_TYPE_BOTTOM		: string = "bottom";
        }
    }
}