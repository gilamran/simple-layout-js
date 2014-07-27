/// <reference path="../reference.ts"/>

module SimpleLayout.layout {
    export class BasicLayout implements ILayout{

        public paddingTop:number;
        public paddingBottom:number;
        public paddingLeft:number;
        public paddingRight:number;

        public gap:number;
        public snapToPixels:boolean;
        public horizontalAlign:string;
        public verticalAlign:string;

        public lastError:string;

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

            var targetWidth:number;
            var targetHeight:number;
            var displayObject:displayObject.IDisplayObject;
            var layoutItem:LayoutItem;

            var paddingTopVal       : number = h * this.paddingTop;
            var paddingBottomVal    : number = h * this.paddingBottom;
            var paddingLeftVal      : number = w * this.paddingLeft;
            var paddingRightVal     : number = w * this.paddingRight;

            targetWidth = w - (paddingLeftVal + paddingRightVal);
            targetHeight = h - (paddingTopVal + paddingBottomVal);

            // not space for items left
            if (targetWidth <= 0.0) {
                this.lastError = "Too much left/right padding was requested from the basic layout";
                return;
            }

            // not space for items left
            if (targetHeight <= 0.0) {
                this.lastError = "Too much top/bottom padding was requested from the basic layout";
                return;
            }

            // snap to pixels?
            if (this.snapToPixels == true) {
                targetWidth = Math.round(targetWidth);
                targetHeight = Math.round(targetHeight);
            }

            for (var i:number = 0; i < targetContainer.countLayoutItems; i++) {
                layoutItem = targetContainer.getLayoutItemAt(i);
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
                            displayObject.x = paddingLeftVal + ((targetWidth - displayObject.width) / 2);
                            break;
                        }

                        case enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT:
                        {
                            displayObject.x = paddingLeftVal;
                            break;
                        }

                        case enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT:
                        {
                            displayObject.x = paddingLeftVal + (targetWidth - displayObject.width);
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
                            displayObject.y = paddingTopVal + ((targetHeight - displayObject.height) / 2);
                            break;
                        }

                        case enums.VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM:
                        {
                            displayObject.y = paddingTopVal + (targetHeight - displayObject.height);
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

            this.lastError = "";
        }
    }
}
