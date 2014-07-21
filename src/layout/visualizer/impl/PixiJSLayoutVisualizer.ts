/// <reference path="../../../reference.ts"/>

module layoutFramework.layout.visualizer {
    export class PixiJSLayoutVisualizer extends PIXI.Graphics implements ILayoutVisualizer {

        public attachedTo   : ILayout;

        constructor() {
            super();
            this.attachedTo = null;
        }

        public setDebugPadding(w:number, h:number, topPadding:number, bottomPadding:number, leftPadding:number, rightPadding:number):void {
            this.beginFill(0xffff00);
            this.drawRect(0, 0, w, topPadding);
            this.drawRect(0, topPadding, leftPadding, h-topPadding-bottomPadding);
            this.drawRect(w-rightPadding, topPadding, rightPadding, h-topPadding-bottomPadding);
            this.drawRect(0, h-bottomPadding, w, bottomPadding);
            this.endFill();
        }

        public setDebugGap(x:number, y:number, width:number, height:number):void {
            this.beginFill(0xbbbb00);
            this.drawRect(x, y, width, height);
            this.endFill();
        }

        public setDebugItem(x:number, y:number, width:number, height:number):void {
            return;
            this.beginFill(0x8ab3bf);
            this.drawRect(x, y, width, height);
            this.endFill();
        }

        public setAlpha(alpha:number):void {
            this.alpha = alpha;
        }

        public update():void {
        }
    }
}
