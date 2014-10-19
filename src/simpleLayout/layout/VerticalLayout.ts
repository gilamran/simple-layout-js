/// <reference path="../reference.ts"/>
module SimpleLayout.layout {
    export class VerticalLayout extends BasicLayout {

        /**
         * @class SimpleLayout.layout.VerticalLayout
         * @augments SimpleLayout.layout.BasicLayout
         * @classdesc The VerticalLayout will divide the given space vertically to all his LayoutItems equally, unless there
         * are children who ask for a specific height. All the LayoutItems will then get moved to the left/center/right of
         * their space according to the LayoutItem's horizontal align.
         */
        constructor() {
            super();
        }

        /**
         * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
         * Layout type class name, in this case it will return the string "VerticalLayout".
         *
         * @method SimpleLayout.layout.VerticalLayout#getLayoutType
         * @returns {String} "VerticalLayout"
         */
        public getLayoutType():string {
            return 'VerticalLayout';
        }

        public fitChildrenInto(targetContainer:LayoutContainer, w:number, h:number):void {
            if (targetContainer == null || targetContainer.countLayoutItems == 0)
                return;

            var paddingTopVal:number = h * this.paddingTop;
            var paddingBottomVal:number = h * this.paddingBottom;
            var paddingLeftVal:number = w * this.paddingLeft;
            var paddingRightVal:number = w * this.paddingRight;
            var gapVal:number = h * this.gap;

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
            var currentY:number;
            var layoutItem:LayoutItem;
            var i:number;

            totalItemsGap = gapVal * (targetContainer.countLayoutItems - 1);
            totalVPadding = paddingTopVal + paddingBottomVal;
            totalHPadding = paddingLeftVal + paddingRightVal;
            totalGaps = totalItemsGap + totalVPadding;
            spaceForItems = h - totalGaps;
            targetWidth = w - totalHPadding;
            targetGap = gapVal;

            // not space for items left
            if (spaceForItems <= 0.0) {
                this.lastError = "Too much gap and top/bottom padding was requested from the vertical layout";
                return;
            }

            // too much padding
            if (targetWidth <= 0.0) {
                this.lastError = "Too much left/right padding was requested from the vertical layout";
                return;
            }

            // find out how much space left for each item (The ones that didn't request for specific height)
            var unRequestedHeightPercent:number = 1.0;
            var countRequestedItems:number = 0;
            for (i = 0; i < targetContainer.countLayoutItems; i++) {
                layoutItem = targetContainer.getLayoutItemAt(i);
                if (layoutItem.requestedHeightPercent > 0) {
                    countRequestedItems++;
                    unRequestedHeightPercent = unRequestedHeightPercent - layoutItem.requestedHeightPercent;
                }
            }

            // round it up
            unRequestedHeightPercent = Math.round(unRequestedHeightPercent * 100) / 100;

            // not good at all!
            if (unRequestedHeightPercent < 0.0) {
                this.lastError = "Too much space was requested from the vertical layout";
                return;
            }

            var heightPercentForUnrequested:number = 0.0;
            if (countRequestedItems < targetContainer.countLayoutItems) {
                heightPercentForUnrequested = unRequestedHeightPercent / (targetContainer.countLayoutItems - countRequestedItems);
            }

            currentY = paddingTopVal;
            for (i = 0; i < targetContainer.countLayoutItems; i++) {
                layoutItem = targetContainer.getLayoutItemAt(i);

                if (layoutItem.requestedHeightPercent > 0.0)
                    targetHeight = spaceForItems * layoutItem.requestedHeightPercent;
                else
                    targetHeight = spaceForItems * heightPercentForUnrequested;

                // snap to pixels?
                if (this.snapToPixels == true)
                    targetHeight = Math.round(targetHeight);

                layoutItem.fitInto(targetWidth, targetHeight);
                this.alignLayoutItem(layoutItem, paddingLeftVal, currentY, targetWidth, targetHeight);

                if (this.layoutVisualizer)
                    this.layoutVisualizer.setDebugLayoutItem(targetContainer, layoutItem, paddingLeftVal, currentY, targetWidth, targetHeight);

                // move on
                currentY = currentY + targetHeight;

                if (this.layoutVisualizer && i < targetContainer.countLayoutItems - 1)
                    this.layoutVisualizer.setDebugGap(targetContainer, paddingLeftVal, currentY, w - totalHPadding, targetGap);

                currentY = currentY + targetGap;
            }

            this.lastError = "";
        }
    }
}
