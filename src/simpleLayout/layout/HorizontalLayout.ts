/// <reference path="../reference.ts"/>
module SimpleLayout.layout {
    export class HorizontalLayout extends BasicLayout {

        /**
         * @class SimpleLayout.layout.HorizontalLayout
         * @augments SimpleLayout.layout.BasicLayout
         * @classdesc The HorizontalLayout will divide the given space horizontally to all his LayoutItems equally, unless there
         * are children who ask for a specific width. All the LayoutItems will then get moved to the top/middle/bottom of
         * their space according to the LayoutItem's vertical align.
         */
        constructor() {
            super();
        }

        /**
         * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
         * Layout type class name, in this case it will return the string "HorizontalLayout".
         *
         * @method SimpleLayout.layout.HorizontalLayout#getLayoutType
         * @returns {String} "HorizontalLayout"
         */
        public getLayoutType():string {
            return 'HorizontalLayout';
        }

        public fitChildrenInto(targetContainer:LayoutContainer, w:number, h:number):void {
            if (targetContainer == null)
                return;

            var paddingTopVal:number = h * this.paddingTop;
            var paddingBottomVal:number = h * this.paddingBottom;
            var paddingLeftVal:number = w * this.paddingLeft;
            var paddingRightVal:number = w * this.paddingRight;
            var gapVal:number = w * this.gap;

            if (this.layoutVisualizer) {
                this.layoutVisualizer.setDebugLayoutContainer(targetContainer, w, h);
                this.layoutVisualizer.setDebugPadding(targetContainer, w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
            }

            if (targetContainer.countLayoutItems <= 0)
                return;

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
            var i:number;

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
                this.alignLayoutItem(layoutItem, currentX, paddingTopVal, targetWidth, targetHeight);

                if (this.layoutVisualizer)
                    this.layoutVisualizer.setDebugLayoutItem(targetContainer, layoutItem, currentX, paddingTopVal, targetWidth, targetHeight);

                // move on
                currentX = currentX + targetWidth;

                if (this.layoutVisualizer && i < targetContainer.countLayoutItems - 1)
                    this.layoutVisualizer.setDebugGap(targetContainer, currentX, paddingTopVal, targetGap, h - totalVPadding);

                currentX = currentX + targetGap;
            }

            this.lastError = "";
        }
    }
}
