/// <reference path="../reference.ts"/>

module SimpleLayout {

    /**
     * @module SimpleLayout
     * @submodule layout
     */
    export module layout {

        /**
         * The horizontal layout will divide the given space horizontally to all his LayoutItems equally, unless there
         * are children who ask for a specific width. All the LayoutItems will then get moved to the top/middle/bottom of
         * their space according to the LayoutItem's vertical align.
         *
         * @class HorizontalLayout
         */
        export class HorizontalLayout extends BasicLayout {

            constructor() {
                super();
            }

            public getLayoutType():string {
                return 'horizontal';
            }

            public fitChildrenInto(targetContainer:LayoutContainer, w:number, h:number):void {
                if (targetContainer == null || targetContainer.countLayoutItems == 0)
                    return;

                var paddingTopVal:number = h * this.paddingTop;
                var paddingBottomVal:number = h * this.paddingBottom;
                var paddingLeftVal:number = w * this.paddingLeft;
                var paddingRightVal:number = w * this.paddingRight;
                var gapVal:number = w * this.gap;

                var totalItemsGap:number;
                var totalVPadding:number;
                var totalHPadding:number;
                var totalGaps:number;
                var spaceForItems:number;
                var targetWidth:number;
                var targetHeight:number;
                var targetGap:number;
                var currentX:number;
                var layoutItem:LayoutItem;
                var displayObject:displayObject.IDisplayObject;
                var i:number;

                if (this.layoutVisualizer)
                    this.layoutVisualizer.setDebugPadding(w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);

                totalItemsGap = gapVal * (targetContainer.countLayoutItems - 1);
                totalVPadding = paddingTopVal + paddingBottomVal;
                totalHPadding = paddingLeftVal + paddingRightVal;
                totalGaps = totalItemsGap + totalHPadding;
                spaceForItems = w - totalGaps;
                targetHeight = h - totalVPadding;
                targetGap = gapVal;

                // not space for items left
                if (spaceForItems <= 0.0) {
                    this.lastError = "Too much gap and left/right padding was requested from the horizontal layout";
                    return;
                }

                // too much padding
                if (targetHeight <= 0.0) {
                    this.lastError = "Too much top/bottom padding was requested from the horizontal layout";
                    return;
                }

                // find out how much space left for each item (The ones that didn't request for specific height)
                var unRequestedWidthPercent:number = 1.0;
                var countRequestedItems:number = 0;
                for (i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    if (layoutItem.requestedWidthPercent > 0) {
                        countRequestedItems++;
                        unRequestedWidthPercent = unRequestedWidthPercent - layoutItem.requestedWidthPercent;
                    }
                }

                // round it up
                unRequestedWidthPercent = Math.round(unRequestedWidthPercent * 100) / 100;

                // not good at all!
                if (unRequestedWidthPercent < 0.0) {
                    this.lastError = "Too much space was requested from the horizontal layout";
                    return;
                }

                var widthPercentForUnrequested:number = 0.0;
                if (countRequestedItems < targetContainer.countLayoutItems) {
                    widthPercentForUnrequested = unRequestedWidthPercent / (targetContainer.countLayoutItems - countRequestedItems);
                }

                currentX = paddingLeftVal;
                for (i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    if (layoutItem.requestedWidthPercent > 0.0)
                        targetWidth = spaceForItems * layoutItem.requestedWidthPercent;
                    else
                        targetWidth = spaceForItems * widthPercentForUnrequested;

                    // snap to pixels?
                    if (this.snapToPixels == true)
                        targetWidth = Math.round(targetWidth);

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
                    }

                    if (this.layoutVisualizer)
                        this.layoutVisualizer.setDebugItem(layoutItem, currentX, paddingTopVal, targetWidth, targetHeight);

                    // move on
                    currentX = currentX + targetWidth;

                    if (this.layoutVisualizer && i < targetContainer.countLayoutItems - 1)
                        this.layoutVisualizer.setDebugGap(currentX, paddingTopVal, targetGap, h - totalVPadding);

                    currentX = currentX + targetGap;
                }

                this.lastError = "";
            }
        }
    }

}
