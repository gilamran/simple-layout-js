/// <reference path="../reference.ts"/>

/**
 * Provides a set of Layout classes to be used in by a LayoutContainer
 * @namespace SimpleLayout.layout
 */
module SimpleLayout.layout {
    export class BasicLayout implements ILayout {

        /**
         * Area in the top of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
         * acceptable.
         * @default 0
         * @member SimpleLayout.layout.BasicLayout#paddingTop
         */
        public paddingTop:number = 0;

        /**
         * Area in the bottom of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
         * acceptable.
         * @default 0
         * @member SimpleLayout.layout.BasicLayout#paddingBottom
         */
        public paddingBottom:number = 0;

        /**
         * Area in the left of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
         * acceptable.
         * @default 0
         * @member SimpleLayout.layout.BasicLayout#paddingLeft
         */
        public paddingLeft:number = 0;

        /**
         * The gap property is not functional in the BasicLayout, be it is used by the Horizontal and Vertical layouts.
         * @default 0
         * @member SimpleLayout.layout.BasicLayout#gap
         */
        public gap:number = 0;

        /**
         * Area in the right of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
         * acceptable.
         * @default 0
         * @member SimpleLayout.layout.BasicLayout#paddingRight
         */
        public paddingRight:number = 0;

        /**
         * When snapToPixels is true, all the layout items will be positioned and sized in full pixel values.
         * @default false
         * @member SimpleLayout.layout.BasicLayout#paddingRight
         */
        public snapToPixels:boolean = false;

        /**
         * The layout items that have a shorter width than the space that was given to them will be aligned horizontally
         * according to this property.
         * @default enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER
         * @member SimpleLayout.layout.BasicLayout#horizontalAlign
         */
        public horizontalAlign:string = enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER;

        /**
         * The layout items that have a shorter height than the space that was given to them will be aligned vertically
         * according to this property.
         * @default enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE
         * @member SimpleLayout.layout.BasicLayout#verticalAlign
         */
        public verticalAlign:string = enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE;

        /**
         * Sometimes while building your layout, you might give the layout bad values that it cannot use to calculate
         * the layout, this property will have the latest error text.
         *
         * For example: If you give the layoutitems more than 100% of the possible width.
         * @default empty string
         * @member SimpleLayout.layout.BasicLayout#lastError
         */
        public lastError:string = '';

        /**
         * The LayoutVisualizer is an helper for debugging and building your layout, it is used mostly by the editor.
         *
         * @default null
         * @member SimpleLayout.layout.BasicLayout#layoutVisualizer
         * @type visualizer.ILayoutVisualizer
         */
        public layoutVisualizer:visualizer.ILayoutVisualizer = null;


        /**
         * @class SimpleLayout.layout.BasicLayout
         * @classdesc The BasicLayout is the most basic layout type. Use this layout to grant the LayoutItems all the
         * space they can take. The LayoutItems will be on top of each other. A good example for using the BasicLayout
         * is to have a background and a container that take all the possible space.
         * Also note that this is the default layout for any LayoutContainer.
         */
        constructor() {
        }

        /**
         * Serialize the Layout into its properties, the result json can be use to construct a new Layout by
         * calling fromJson function.
         *
         * @method SimpleLayout.layout.BasicLayout#toJson
         * @returns {Object} A Json object that fully describe this Layout
         */
        public toJson():any {
            return {
                layoutType: this.getLayoutType(),
                paddingTop: this.paddingTop,
                paddingBottom: this.paddingBottom,
                paddingLeft: this.paddingLeft,
                paddingRight: this.paddingRight,
                gap: this.gap,
                snapToPixels: this.snapToPixels,
                horizontalAlign: this.horizontalAlign,
                verticalAlign: this.verticalAlign
            }
        }

        /**
         * Copy all the properties from the given json into this Layout.
         *
         * @method SimpleLayout.layout.BasicLayout#fromJson
         * @param json {Object} object that fully describe this Layout
         */
        public fromJson(json:any):void {
            this.paddingTop = json.paddingTop;
            this.paddingBottom = json.paddingBottom;
            this.paddingLeft = json.paddingLeft;
            this.paddingRight = json.paddingRight;
            this.gap = json.gap;
            this.snapToPixels = json.snapToPixels;
            this.horizontalAlign = json.horizontalAlign;
            this.verticalAlign = json.verticalAlign;
        }

        /**
         * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
         * Layout type class name, in this case it will return the string "BasicLayout".
         *
         * @method SimpleLayout.layout.BasicLayout#getLayoutType
         * @returns {String} "BasicLayout"
         */
        public getLayoutType():string {
            return 'BasicLayout';
        }

        public alignLayoutItem(layoutItem:LayoutItem, startX:number, startY:number, givenWidth:number, givenHeight:number):void {
            if (layoutItem.visible) {
                var displayObject:displayObject.IDisplayObject;
                displayObject = layoutItem.displayObject;

                if (displayObject) {
                    // add Pivot
                    var pivotPoint : displayObject.IPoint = displayObject.getPivotPoint();
                    if (pivotPoint) {
                        startX = startX + (pivotPoint.x * displayObject.scaleX);
                        startY = startY + (pivotPoint.y * displayObject.scaleY);
                    }

                    // alignment
                    var hAlignment:string;
                    if (layoutItem.horizontalAlign != enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                        hAlignment = layoutItem.horizontalAlign;
                    else
                        hAlignment = this.horizontalAlign;

                    switch (hAlignment) {
                        case enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER:
                        {
                            displayObject.x = startX + ((givenWidth - displayObject.width) / 2);
                            break;
                        }

                        case enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT:
                        {
                            displayObject.x = startX;
                            break;
                        }

                        case enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT:
                        {
                            displayObject.x = startX + (givenWidth - displayObject.width);
                            break;
                        }
                    }

                    var vAlignment:string;
                    if (layoutItem.verticalAlign != enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE)
                        vAlignment = layoutItem.verticalAlign;
                    else
                        vAlignment = this.verticalAlign;

                    switch (vAlignment) {
                        case enums.VerticalAlignEnum.V_ALIGN_TYPE_TOP:
                        {
                            displayObject.y = startY;
                            break;
                        }

                        case enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE:
                        {
                            displayObject.y = startY + ((givenHeight - displayObject.height) / 2);
                            break;
                        }

                        case enums.VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM:
                        {
                            displayObject.y = startY + (givenHeight - displayObject.height);
                            break;
                        }
                    }

                    // snap to pixels?
                    if (this.snapToPixels == true)
                        displayObject.x = Math.round(displayObject.x);

                    if (this.snapToPixels == true)
                        displayObject.y = Math.round(displayObject.y);
                }
            }
        }

        /**
         * This function will position/resize all the given LayoutContainer's children (LayoutItems/LayoutContainers),
         * and give each the space that it can occupy.
         * Each child then will have its own width and height that it can fill, if the child is a LayoutContainer with
         * a layout of its own, the space that was given to it will get sent to the internal layout to possition/resize
         * the inner children and so on, recursively.
         *
         * @method SimpleLayout.layout.BasicLayout#fitChildrenInto
         * @param targetContainer
         * @param w {number} the Width (In pixels) that was given to this layout
         * @param h {number} the Height (In pixels) that was given to this layout
         */
        public fitChildrenInto(targetContainer:LayoutContainer, w:number, h:number):void {
            if (targetContainer == null)
                return;

            var HspaceForItems:number;
            var VspaceForItems:number;
            var targetWidth:number;
            var targetHeight:number;

            var layoutItem:LayoutItem;

            var paddingTopVal:number = h * this.paddingTop;
            var paddingBottomVal:number = h * this.paddingBottom;
            var paddingLeftVal:number = w * this.paddingLeft;
            var paddingRightVal:number = w * this.paddingRight;

            if (this.layoutVisualizer) {
                this.layoutVisualizer.setDebugLayoutContainer(targetContainer, w, h);
                this.layoutVisualizer.setDebugPadding(targetContainer, w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
            }

            HspaceForItems = w - (paddingLeftVal + paddingRightVal);
            VspaceForItems = h - (paddingTopVal + paddingBottomVal);

            // not space for items left
            if (HspaceForItems <= 0.0) {
                this.lastError = "Too much left/right padding was requested from the basic layout";
                return;
            }

            // not space for items left
            if (VspaceForItems <= 0.0) {
                this.lastError = "Too much top/bottom padding was requested from the basic layout";
                return;
            }

            for (var i:number = 0; i < targetContainer.countLayoutItems; i++) {
                layoutItem = targetContainer.getLayoutItemAt(i);

                if (layoutItem.requestedWidthPercent > 0.0)
                    targetWidth = HspaceForItems * layoutItem.requestedWidthPercent;
                else
                    targetWidth = HspaceForItems;

                if (layoutItem.requestedHeightPercent > 0.0)
                    targetHeight = VspaceForItems * layoutItem.requestedHeightPercent;
                else
                    targetHeight = VspaceForItems;

                // snap to pixels?
                if (this.snapToPixels == true) {
                    targetWidth = Math.round(targetWidth);
                    targetHeight = Math.round(targetHeight);
                }

                layoutItem.fitInto(targetWidth, targetHeight);
                this.alignLayoutItem(layoutItem, paddingLeftVal, paddingTopVal, HspaceForItems, VspaceForItems);

                if (this.layoutVisualizer)
                    this.layoutVisualizer.setDebugLayoutItem(targetContainer, layoutItem, paddingLeftVal, paddingTopVal, HspaceForItems, VspaceForItems);
            }

            this.lastError = "";
        }

        /**
         * Disposing (Setting to null) all the objects that it holds, like the layout visualizer.
         *
         * @method SimpleLayout.layout.BasicLayout#dispose
         */
        public dispose():void {
            this.layoutVisualizer = null;
        }

    }
}
