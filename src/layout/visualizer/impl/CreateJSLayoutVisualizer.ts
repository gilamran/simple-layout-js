/// <reference path="../../../reference.ts"/>

module layoutFramework.layout.visualizer {
    export class CreateJSLayoutVisualizer extends createjs.Shape implements ILayoutVisualizer {

        public attachedTo   : ILayout;

        constructor() {
            super();
            this.attachedTo = null;
        }

        public setDebugPadding(w:number, h:number, topPadding:number, bottomPadding:number, leftPadding:number, rightPadding:number):void {
            this.graphics.beginFill("#ffff00");
            this.graphics.drawRect(0, 0, w, topPadding);
            this.graphics.drawRect(0, topPadding, leftPadding, h-topPadding-bottomPadding);
            this.graphics.drawRect(w-rightPadding, topPadding, rightPadding, h-topPadding-bottomPadding);
            this.graphics.drawRect(0, h-bottomPadding, w, bottomPadding);
            this.graphics.endFill();
        }

        public setDebugGap(x:number, y:number, width:number, height:number):void {
            this.graphics.beginFill("#bbbb00");
            this.graphics.drawRect(x, y, width, height);
            this.graphics.endFill();
        }

        public setDebugItem(x:number, y:number, width:number, height:number):void {
            return;
            this.graphics.beginFill("#8ab3bf");
            this.graphics.drawRect(x, y, width, height);
            this.graphics.endFill();
        }

        public setAlpha(alpha:number):void {
            this.alpha = alpha;
        }

        public clear():void {
            this.graphics.clear();
        }

        public update():void {
        }
    }
}
