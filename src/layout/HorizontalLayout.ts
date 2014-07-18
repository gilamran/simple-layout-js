/// <reference path="../reference.ts"/>

module layoutFramework.layout {
    export class HorizontalLayout extends BasicLayout {

        constructor() {
            super();
        }

        public fitChildrenInto(targetContainer:containers.LayoutContainer, w:number, h:number):void {
            if (targetContainer == null || targetContainer.numChildItems == 0)
                return;

            var paddingTopVal       : number = this.calcPercentField(this.paddingTop, h);
            var paddingBottomVal    : number = this.calcPercentField(this.paddingBottom, h);
            var paddingLeftVal      : number = this.calcPercentField(this.paddingLeft, w);
            var paddingRightVal     : number = this.calcPercentField(this.paddingRight, w);
            var gapVal              : number = this.calcPercentField(this.gap, w);

            var totalItemsGap       : number;
            var totalVPadding       : number;
            var totalHPadding       : number;
            var totalGaps           : number;
            var spaceForItems       : number;
            var targetWidth         : number;
            var targetHeight        : number;
            var targetGap           : number;
            var currentX            : number;
            var layoutItem          : items.LayoutItem;
            var displayObject       : displayObject.IDisplayObject;
            var i                   : number;

            if (this.layoutVisualizer) {
                this.layoutVisualizer.clear();
                this.layoutVisualizer.setDebugPadding(w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
            }

            totalItemsGap = gapVal * (targetContainer.numChildItems - 1);
            totalVPadding = paddingTopVal + paddingBottomVal;
            totalHPadding = paddingLeftVal + paddingRightVal;
            totalGaps = totalItemsGap + totalHPadding;
            spaceForItems = w - totalGaps;

            targetHeight = h - totalVPadding;
            targetGap = gapVal;

            // find out how much space left for each item (The ones that didn't request for specific height)
            var unRequestedWidthPercent:number = 1.0;
            var countRequestedItems:number = 0;
            for (i = 0; i < targetContainer.numChildItems; i++) {
                layoutItem = targetContainer.getItemAt(i);
                if (layoutItem.requestedWidthPercent > 0) {
                    countRequestedItems++;
                    unRequestedWidthPercent = unRequestedWidthPercent - layoutItem.requestedWidthPercent;
                }
            }

            // round it up
            unRequestedWidthPercent = Math.round(unRequestedWidthPercent * 100) / 100;

            // not good at all!
            if (unRequestedWidthPercent < 0.0)
                throw "Too much space was requested from the horizontal layout";

            var widthPercentForUnrequested:number = 0.0;
            if (countRequestedItems < targetContainer.numChildItems) {
                widthPercentForUnrequested = unRequestedWidthPercent / (targetContainer.numChildItems - countRequestedItems);
            }

            currentX = paddingLeftVal;
            for (i = 0; i < targetContainer.numChildItems; i++) {
                layoutItem = targetContainer.getItemAt(i);
                displayObject = layoutItem.displayObject;
                if (layoutItem.requestedWidthPercent > 0.0)
                    targetWidth = spaceForItems * layoutItem.requestedWidthPercent;
                else
                    targetWidth = spaceForItems * widthPercentForUnrequested;

                // snap to pixels?
                if (this.snapToPixels == true)
                    targetWidth = Math.round(targetWidth);

                layoutItem.fitInto(targetWidth, targetHeight);

                // alignment
                var hAlignment:string;
                if (layoutItem.horizontalAlign != enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                    hAlignment = layoutItem.horizontalAlign;
                else
                    hAlignment = this.horizontalAlign;

                switch (hAlignment) {
                    case enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER:
                    {
                        displayObject.x = currentX + ((targetWidth - displayObject.width) / 2);
                        break;
                    }

                    case enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT:
                    {
                        displayObject.x = currentX;
                        break;
                    }

                    case enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT:
                    {
                        displayObject.x = currentX + (targetWidth - displayObject.width);
                        break;
                    }
                }

                var vAlignment:string;
                if (layoutItem.verticalAlign != enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE)
                    vAlignment = layoutItem.verticalAlign;
                else
                    vAlignment = this.verticalAlign;

                switch (vAlignment) {
                    case enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE:
                    {
                        displayObject.y = paddingTopVal + ((targetHeight - displayObject.height) / 2);
                        break;
                    }

                    case enums.VerticalAlignEnum.V_ALIGN_TYPE_TOP:
                    {
                        displayObject.y = paddingTopVal;
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

                if (this.layoutVisualizer)
                    this.layoutVisualizer.setDebugItem(currentX, paddingTopVal, targetWidth, targetHeight);

                // move on
                currentX = currentX + targetWidth;

                if (this.layoutVisualizer && i<targetContainer.numChildItems-1)
                    this.layoutVisualizer.setDebugGap(currentX, paddingTopVal, targetGap, h-totalVPadding);

                currentX = currentX + targetGap;
            }

            if (this.layoutVisualizer)
                this.layoutVisualizer.update();
        }
    }
}
