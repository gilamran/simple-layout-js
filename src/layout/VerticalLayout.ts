/// <reference path="../reference.ts"/>

module layoutFramework.layout {
    export class VerticalLayout extends BasicLayout {

        constructor() {
            super();
        }

        public fitChildrenInto(targetContainer:containers.LayoutContainer, w:number, h:number):void {
            if (targetContainer==null || targetContainer.countLayoutItems==0)
                return;

            var paddingTopVal		: number = this.calcPercentField(this.paddingTop, h);
            var paddingBottomVal	: number = this.calcPercentField(this.paddingBottom, h);
            var paddingLeftVal		: number = this.calcPercentField(this.paddingLeft, w);
            var paddingRightVal		: number = this.calcPercentField(this.paddingRight, w);
            var gapVal				: number = this.calcPercentField(this.gap, h);

            var totalItemsGap		: number;
            var totalVPadding		: number;
            var totalHPadding		: number;
            var totalGaps			: number;
            var spaceForItems		: number;
            var targetWidth			: number;
            var targetHeight		: number;
            var targetGap			: number;
            var currentY			: number;
            var layoutItem			: items.LayoutItem;
            var displayObject		: displayObject.IDisplayObject;
            var i					: number;

            if (this.layoutVisualizer) {
                this.layoutVisualizer.clear();
                this.layoutVisualizer.setDebugPadding(w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
            }

            totalItemsGap = gapVal*(targetContainer.countLayoutItems-1);
            totalVPadding = paddingTopVal+paddingBottomVal;
            totalHPadding = paddingLeftVal+paddingRightVal;
            totalGaps = totalItemsGap + totalVPadding;
            spaceForItems = h-totalGaps;

            targetWidth = w-totalHPadding;
            targetGap = gapVal;

            // find out how much space left for each item (The ones that didn't request for specific height)
            var unRequestedHeightPercent : number = 1.0;
            var countRequestedItems		 : number = 0;
            for (i=0; i<targetContainer.countLayoutItems; i++)
            {
                layoutItem = targetContainer.getLayoutItemAt(i);
                if (layoutItem.requestedHeightPercent>0)
                {
                    countRequestedItems++;
                    unRequestedHeightPercent = unRequestedHeightPercent - layoutItem.requestedHeightPercent;
                }
            }

            // round it up
            unRequestedHeightPercent = Math.round(unRequestedHeightPercent*100)/100;

            // not good at all!
            if (unRequestedHeightPercent<0.0)
                throw "Too much space was requested from the vertical layout";

            var heightPercentForUnrequested : number = 0.0;
            if (countRequestedItems<targetContainer.countLayoutItems)
            {
                heightPercentForUnrequested = unRequestedHeightPercent/(targetContainer.countLayoutItems-countRequestedItems);
            }

            currentY = paddingTopVal;
            for (i=0; i<targetContainer.countLayoutItems; i++)
            {
                layoutItem = targetContainer.getLayoutItemAt(i);
                displayObject = layoutItem.displayObject;
                if (layoutItem.requestedHeightPercent>0.0)
                    targetHeight = spaceForItems*layoutItem.requestedHeightPercent;
                else
                    targetHeight = spaceForItems*heightPercentForUnrequested;

                // snap to pixels?
                if (this.snapToPixels==true)
                    targetHeight = Math.round(targetHeight);

                layoutItem.fitInto(targetWidth, targetHeight);

                // alignment
                var hAlignment : string;
                if (layoutItem.horizontalAlign!=enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                    hAlignment = layoutItem.horizontalAlign;
                else
                    hAlignment = this.horizontalAlign;

                switch(hAlignment)
                {
                    case enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER:
                    {
                        displayObject.x = paddingLeftVal + ((targetWidth-displayObject.width)/2);
                        break;
                    }

                    case enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT:
                    {
                        displayObject.x = paddingLeftVal;
                        break;
                    }

                    case enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT:
                    {
                        displayObject.x = paddingLeftVal + (targetWidth-displayObject.width);
                        break;
                    }
                }

                var vAlignment : string;
                if (layoutItem.verticalAlign!=enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE)
                    vAlignment = layoutItem.verticalAlign;
                else
                    vAlignment = this.verticalAlign;

                switch(vAlignment)
                {
                    case enums.VerticalAlignEnum.V_ALIGN_TYPE_TOP:
                    {
                        displayObject.y = currentY;
                        break;
                    }

                    case enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE:
                    {
                        displayObject.y = currentY + ((targetHeight-displayObject.height)/2);
                        break;
                    }

                    case enums.VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM:
                    {
                        displayObject.y = currentY + (targetHeight-displayObject.height);
                        break;
                    }
                }

                // snap to pixels?
                if (this.snapToPixels==true)
                    displayObject.x = Math.round(displayObject.x);

                if (this.snapToPixels==true)
                    displayObject.y = Math.round(displayObject.y);

                if (this.layoutVisualizer)
                    this.layoutVisualizer.setDebugItem(paddingLeftVal, currentY, targetWidth, targetHeight);

                // move on
                currentY = currentY + targetHeight;

                if (this.layoutVisualizer && i<targetContainer.countLayoutItems-1)
                    this.layoutVisualizer.setDebugGap(paddingLeftVal, currentY, w-totalHPadding, targetGap);

                currentY = currentY + targetGap;
            }

            if (this.layoutVisualizer) {
                this.layoutVisualizer.setPosition(targetContainer.displayObject.globalPos);
                this.layoutVisualizer.update();
            }
        }
    }
}
