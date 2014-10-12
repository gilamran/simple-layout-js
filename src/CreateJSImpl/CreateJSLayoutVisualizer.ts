/// <reference path="reference.ts"/>

module SimpleLayout.CreateJSImpl {
    export class CreateJSLayoutVisualizer extends createjs.Shape implements visualizer.ILayoutVisualizer {

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
                this.graphics.beginFill("#000000");
                this.graphics.drawRect(0, 0, w, 1);
                this.graphics.drawRect(0, 0, 1, h);
                this.graphics.drawRect(0, h-1, w, 1);
                this.graphics.drawRect(w-1, 0, 1, h);
                this.graphics.endFill();
            }
        }

        public setDebugPadding(w:number, h:number, topPadding:number, bottomPadding:number, leftPadding:number, rightPadding:number):void {
            if (this.m_attachedToLayout) {
                this.graphics.beginFill("#ffff00");
                this.graphics.drawRect(0, 0, w, topPadding);
                this.graphics.drawRect(0, topPadding, leftPadding, h-topPadding-bottomPadding);
                this.graphics.drawRect(w-rightPadding, topPadding, rightPadding, h-topPadding-bottomPadding);
                this.graphics.drawRect(0, h-bottomPadding, w, bottomPadding);
                this.graphics.endFill();
            }
        }

        public setDebugGap(x:number, y:number, width:number, height:number):void {
            if (this.m_attachedToLayout) {
                this.graphics.beginFill("#bbbb00");
                this.graphics.drawRect(x, y, width, height);
                this.graphics.endFill();
            }
        }

        public setDebugItem(layoutItem:LayoutItem, x:number, y:number, width:number, height:number):void {
            if (this.highlightedLayoutItem==layoutItem) {
                this.graphics.beginFill("#8ab3bf");
                this.graphics.drawRect(x, y, width, height);
                this.graphics.endFill();
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

        public clear():void {
            this.graphics.clear();
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
