/// <reference path="reference.ts"/>

module SimpleLayout.PixiJSImpl {
    export class PixiJSLayoutVisualizer extends PIXI.Graphics implements visualizer.ILayoutVisualizer {

        private m_attachedToLayout      : layout.ILayout;
        public highlightedLayoutItem    : LayoutItem;

        constructor() {
            super();
            this.m_attachedToLayout = null;
        }

        public getAttachedToLayout(): layout.ILayout {
            return this.m_attachedToLayout;
        }

        public attachToLayout(layout:layout.ILayout):void {
            this.m_attachedToLayout = layout;
        }

        public unAttachLayout():void {
            if (this.m_attachedToLayout) {
                this.m_attachedToLayout.setLayoutVisualizer(null);
            }
            this.m_attachedToLayout = null;
        }

        public setDebugFitAreaSize(w:number, h:number):void {
            if (this.m_attachedToLayout) {
                w = Math.max(1, Math.abs(w));
                h = Math.max(1, Math.abs(h));
                this.beginFill(0x000000);
                this.drawRect(0, 0, w, 1);
                this.drawRect(0, 0, 1, h);
                this.drawRect(0, h-1, w, 1);
                this.drawRect(w-1, 0, 1, h);
                this.endFill();
            }
        }

        public setDebugPadding(w:number, h:number, topPadding:number, bottomPadding:number, leftPadding:number, rightPadding:number):void {
            if (this.m_attachedToLayout) {
                this.beginFill(0xffff00);
                this.drawRect(0, 0, w, topPadding);
                this.drawRect(0, topPadding, leftPadding, h-topPadding-bottomPadding);
                this.drawRect(w-rightPadding, topPadding, rightPadding, h-topPadding-bottomPadding);
                this.drawRect(0, h-bottomPadding, w, bottomPadding);
                this.endFill();
            }
        }

        public setDebugGap(x:number, y:number, width:number, height:number):void {
            if (this.m_attachedToLayout) {
                this.beginFill(0xbbbb00);
                this.drawRect(x, y, width, height);
                this.endFill();
            }
        }

        public setDebugItem(layoutItem:LayoutItem, x:number, y:number, width:number, height:number):void {
            if (this.highlightedLayoutItem==layoutItem) {
                this.beginFill(0xff0000);
                this.drawRect(x, y, width, height);
                this.endFill();
            }
        }

        public setPosition(point:displayObject.IPoint):void {
            if (this.m_attachedToLayout) {
                this.x = point.x;
                this.y = point.y;
            }
        }

        public setAlpha(alpha:number):void {
            this.alpha = alpha;
        }

        public update():void {
        }

        public dispose():void {
            this.clear();
            this.update();
            this.unAttachLayout();
            this.highlightedLayoutItem = null;
        }
    }
}
