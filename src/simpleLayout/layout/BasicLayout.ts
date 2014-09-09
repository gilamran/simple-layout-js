/// <reference path="../reference.ts"/>

module SimpleLayout.layout {
    export class BasicLayout implements ILayout{

        public paddingTop       : number;
        public paddingBottom    : number;
        public paddingLeft      : number;
        public paddingRight     : number;

        public gap              : number;
        public snapToPixels     : boolean;
        public horizontalAlign  : string;
        public verticalAlign    : string;

        public lastError        : string;

        public layoutVisualizer:visualizer.ILayoutVisualizer;

        constructor() {
            this.horizontalAlign = enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER;
            this.verticalAlign = enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE;
            this.paddingTop = 0;
            this.paddingBottom = 0;
            this.paddingLeft = 0;
            this.paddingRight = 0;
            this.gap = 0;

            this.snapToPixels = false;
            this.lastError = "";
        }

        public toJson():any {
            return {
                layoutType      : this.getLayoutType(),
                paddingTop      : this.paddingTop,
                paddingBottom   : this.paddingBottom,
                paddingLeft     : this.paddingLeft,
                paddingRight    : this.paddingRight,
                gap             : this.gap,
                snapToPixels    : this.snapToPixels,
                horizontalAlign : this.horizontalAlign,
                verticalAlign   : this.verticalAlign
            }
        }

        public fromJson(json:any):void {
            this.paddingTop      = json.paddingTop;
            this.paddingBottom   = json.paddingBottom;
            this.paddingLeft     = json.paddingLeft;
            this.paddingRight    = json.paddingRight;
            this.gap             = json.gap;
            this.snapToPixels    = json.snapToPixels;
            this.horizontalAlign = json.horizontalAlign;
            this.verticalAlign   = json.verticalAlign;
        }

        public getLayoutType():string {
            return 'basic';
        }

        public setLayoutVisualizer(value:visualizer.ILayoutVisualizer):void {
            if (this.layoutVisualizer !== value) {
                // un attach the previous layout, if it's not null
                if (value && value.attachedTo) {
                    value.attachedTo.setLayoutVisualizer(null);
                }

                this.layoutVisualizer = value;

                // attach the new layout, if it's not null
                if (this.layoutVisualizer) {
                    this.layoutVisualizer.attachedTo = this;
                }
            }
        }

        public getLayoutVisualizer():visualizer.ILayoutVisualizer {
            return this.layoutVisualizer;
        }

        public fitChildrenInto(targetContainer:LayoutContainer, w:number, h:number):void {
            if (targetContainer == null || targetContainer.countLayoutItems == 0)
                return;

            var HspaceForItems:number;
            var VspaceForItems:number;
            var targetWidth:number;
            var targetHeight:number;
            var displayObject:displayObject.IDisplayObject;
            var layoutItem:LayoutItem;

            var paddingTopVal       : number = h * this.paddingTop;
            var paddingBottomVal    : number = h * this.paddingBottom;
            var paddingLeftVal      : number = w * this.paddingLeft;
            var paddingRightVal     : number = w * this.paddingRight;

            if (this.layoutVisualizer)
                this.layoutVisualizer.setDebugPadding(w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);

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
                displayObject = layoutItem.displayObject;

                if (displayObject) {
                    // alignment
                    var hAlignment:string;
                    if (layoutItem.horizontalAlign != enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                        hAlignment = layoutItem.horizontalAlign;
                    else
                        hAlignment = this.horizontalAlign;

                    switch (hAlignment) {
                        case enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER:
                        {
                            displayObject.x = paddingLeftVal + ((HspaceForItems - displayObject.width) / 2);
                            break;
                        }

                        case enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT:
                        {
                            displayObject.x = paddingLeftVal;
                            break;
                        }

                        case enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT:
                        {
                            displayObject.x = paddingLeftVal + (HspaceForItems - displayObject.width);
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
                            displayObject.y = paddingTopVal;
                            break;
                        }

                        case enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE:
                        {
                            displayObject.y = paddingTopVal + ((VspaceForItems - displayObject.height) / 2);
                            break;
                        }

                        case enums.VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM:
                        {
                            displayObject.y = paddingTopVal + (VspaceForItems - displayObject.height);
                            break;
                        }
                    }

                    // snap to pixels?
                    if (this.snapToPixels == true)
                        displayObject.x = Math.round(displayObject.x);

                    if (this.snapToPixels == true)
                        displayObject.y = Math.round(displayObject.y);
                }

                if (this.layoutVisualizer)
                    this.layoutVisualizer.setDebugItem(layoutItem, paddingLeftVal, paddingTopVal, HspaceForItems, VspaceForItems);
            }

            this.lastError = "";
        }

        public dispose():void {
            this.setLayoutVisualizer(null);
        }

    }
}
