/// <reference path="../reference.ts"/>
module SimpleLayout.layout {
    export class GridLayout extends BasicLayout {

        /**
         * The number of columns this grid will have.
         * @default 1
         * @member SimpleLayout.layout.GridLayout#columns
         */
        public columns:number = 1;

        /**
         * The number of rows this grid will have.
         * @default 1
         * @member SimpleLayout.layout.GridLayout#rows
         */
        public rows:number = 1;

        /**
         * The horizontal gap property is the gap that will be used when laying out items in the grid columns.
         * @default 0
         * @member SimpleLayout.layout.GridLayout#horizontalGap
         */
        horizontalGap:number = 0;

        /**
         * The vertical gap property is the gap that will be used when laying out items in the grid rows.
         * @default 0
         * @member SimpleLayout.layout.GridLayout#verticalGap
         */
        verticalGap:number = 0;

        /**
         * @class SimpleLayout.layout.GridLayout
         * @augments SimpleLayout.layout.BasicLayout
         * @classdesc The GridLayout will divide the given space horizontally and vertically to all his LayoutItems equally,
         * any specific width or height from the item will be ignored. All the LayoutItems will then get moved
         * to the top/middle/bottom or left/center/right of their space according to the LayoutItem's vertical/horizontal align.
         */
        constructor() {
            super();
        }

        /**
         * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
         * Layout type class name, in this case it will return the string "GridLayout".
         *
         * @method SimpleLayout.layout.GridLayout#getLayoutType
         * @returns {String} "GridLayout"
         */
        public getLayoutType():string {
            return 'GridLayout';
        }

        public fitChildrenInto(targetContainer:LayoutContainer, w:number, h:number):void {
            if (targetContainer == null)
                return;

            var paddingTopVal:number = h * this.paddingTop;
            var paddingBottomVal:number = h * this.paddingBottom;
            var paddingLeftVal:number = w * this.paddingLeft;
            var paddingRightVal:number = w * this.paddingRight;
            var gapHVal:number = w * this.horizontalGap;
            var gapVVal:number = h * this.verticalGap;

            if (this.layoutVisualizer) {
                this.layoutVisualizer.setDebugLayoutContainer(targetContainer, w, h);
                this.layoutVisualizer.setDebugPadding(targetContainer, w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
            }

            if (targetContainer.countLayoutItems <= 0)
                return;

            // Minimum 1 column and one row!
            var targetColumns:number = Math.max(1, this.columns);
            var targetRows:number = Math.max(1, this.rows);

            // make sure that we have enough cells
            if ((targetColumns * targetRows) < targetContainer.countLayoutItems) {
                targetRows = Math.ceil(targetContainer.countLayoutItems / targetColumns);
            }

            var totalHGaps:number;
            var totalHPadding:number;
            var unusedHSpace:number;
            var spaceForHItems:number;
            var targetHGap:number;
            var currentX:number;

            var totalVGaps:number;
            var totalVPadding:number;
            var unusedVSpace:number;
            var spaceForVItems:number;
            var targetVGap:number;
            var currentY:number;

            var targetWidth:number;
            var targetHeight:number;
            var layoutItem:LayoutItem;
            var i:number;

            totalHGaps = gapHVal * (targetColumns - 1);
            totalHPadding = paddingLeftVal + paddingRightVal;
            unusedHSpace = totalHGaps + totalHPadding;
            spaceForHItems = (w - unusedHSpace) / targetColumns;
            targetHGap = gapHVal;

            // not space for items left
            if (spaceForHItems <= 0) {
                this.lastError = "Too much gap and left/right padding was requested from the grid layout";
                return;
            }

            totalVGaps = gapVVal * (targetRows - 1);
            totalVPadding = paddingTopVal + paddingBottomVal;
            unusedVSpace = totalVGaps + totalVPadding;
            spaceForVItems = (h - unusedVSpace) / targetRows;
            targetVGap = gapVVal;

            // too much padding
            if (spaceForVItems <= 0) {
                this.lastError = "Too much top/bottom padding was requested from the grid layout";
                return;
            }

            targetWidth = spaceForHItems;
            targetHeight = spaceForVItems;

            // snap to pixels?
            if (this.snapToPixels == true) {
                targetWidth = Math.round(targetWidth);
                targetHeight = Math.round(targetHeight);
            }

            var row:number = 0;
            var column:number = 0;
            for (i = 0; i < targetContainer.countLayoutItems; i++) {
                row = Math.floor(i / targetColumns);
                column = i - (row * targetColumns);
                layoutItem = targetContainer.getLayoutItemAt(i);
                layoutItem.fitInto(targetWidth, targetHeight);

                currentX = paddingLeftVal + (targetWidth * column) + (targetHGap * column);
                currentY = paddingTopVal + (targetHeight * row) + (targetVGap * row);

                this.alignLayoutItem(layoutItem, currentX, currentY, targetWidth, targetHeight);

                if (this.layoutVisualizer) {
                    this.layoutVisualizer.setDebugLayoutItem(targetContainer, layoutItem, currentX, currentY, targetWidth, targetHeight);

                    if (column < targetColumns - 1)
                        this.layoutVisualizer.setDebugGap(targetContainer, currentX+targetWidth, currentY, targetHGap, targetHeight);

                    if (column===0 && row<targetRows-1)
                        this.layoutVisualizer.setDebugGap(targetContainer, currentX, currentY+targetHeight, (w-totalHPadding), targetVGap);
                }


            }

            this.lastError = "";
        }
    }
}
