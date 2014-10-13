/// <reference path="reference.ts"/>

module SimpleLayout.CreateJSImpl {
    export class CreateJSLayoutVisualizer extends createjs.Shape implements visualizer.ILayoutVisualizer {

        public filterByLayoutItem:LayoutItem;
        public filterByLayoutContainer:LayoutContainer;

        constructor() {
            super();
        }

        public setDebugLayoutItem(layoutContainer:LayoutContainer, layoutItem:LayoutItem, x:number, y:number, width:number, height:number):void {
            if (this.filterByLayoutContainer === layoutContainer && this.filterByLayoutItem === layoutItem) {
                this.graphics.beginFill("#8ab3bf");
                this.graphics.drawRect(x, y, width, height);
                this.graphics.endFill();
            }
        }

        public setDebugLayoutContainer(layoutContainer:LayoutContainer, w:number, h:number):void {
            if (this.filterByLayoutContainer === layoutContainer) {
                w = Math.max(1, Math.abs(w));
                h = Math.max(1, Math.abs(h));
                this.graphics.beginFill("#000000");
                this.graphics.drawRect(0, 0, w, 1);
                this.graphics.drawRect(0, 0, 1, h);
                this.graphics.drawRect(0, h - 1, w, 1);
                this.graphics.drawRect(w - 1, 0, 1, h);
                this.graphics.endFill();
            }
        }

        public setDebugPadding(layoutContainer:LayoutContainer, w:number, h:number, topPadding:number, bottomPadding:number, leftPadding:number, rightPadding:number):void {
            if (this.filterByLayoutContainer === layoutContainer) {
                this.graphics.beginFill("#ffff00");
                this.graphics.drawRect(0, 0, w, topPadding);
                this.graphics.drawRect(0, topPadding, leftPadding, h - topPadding - bottomPadding);
                this.graphics.drawRect(w - rightPadding, topPadding, rightPadding, h - topPadding - bottomPadding);
                this.graphics.drawRect(0, h - bottomPadding, w, bottomPadding);
                this.graphics.endFill();
            }
        }

        public setDebugGap(layoutContainer:LayoutContainer, x:number, y:number, width:number, height:number):void {
            if (this.filterByLayoutContainer === layoutContainer) {
                this.graphics.beginFill("#bbbb00");
                this.graphics.drawRect(x, y, width, height);
                this.graphics.endFill();
            }
        }

        public setPosition(point:displayObject.IPoint):void {
            this.x = point.x;
            this.y = point.y;
        }

        public setAlpha(alpha:number):void {
            this.alpha = alpha;
        }

        public clear():void {
            this.graphics.clear();
        }

        public update():void {
        }

        public dispose():void {
            this.clear();
            this.update();
            this.filterByLayoutItem = null;
            this.filterByLayoutContainer = null;
        }
    }
}
