/// <reference path="reference.ts"/>

module SimpleLayout.SVGImpl {
    export class SVGLayoutVisualizer implements visualizer.ILayoutVisualizer {

        private xmlns = "http://www.w3.org/2000/svg";
        private items                     : any[];
        private m_translateMat            : SVGTransform;
        public isActive                   : Boolean;
        public filterByLayoutItem         : LayoutItem;
        public filterByLayoutContainer    : LayoutContainer;

        constructor(private parentElement : SVGGElement) {
            this.isActive = true;
            this.filterByLayoutItem = null;
            this.filterByLayoutContainer = null;
            this.items = [];
        }

        private initMat():void {
            if (this.parentElement) {
                if (!this.m_translateMat) {
                    this.m_translateMat = this.parentElement.ownerSVGElement.createSVGTransform();
                    (<any>this.parentElement).transform.baseVal.appendItem(this.m_translateMat);
                }
            }
        }

        private createRect(x:number, y:number, width:number, height:number, color:string):void {
            var rect = <SVGRectElement>document.createElementNS(this.xmlns, "rect");
            rect.width.baseVal.value = width;
            rect.height.baseVal.value = height;
            rect.x.baseVal.value = x;
            rect.y.baseVal.value = y;
            rect.setAttributeNS(null, 'fill', color);

            this.parentElement.appendChild(rect);
            this.items.push( rect );
        }

        public setDebugLayoutItem(layoutContainer:LayoutContainer, layoutItem:LayoutItem, x:number, y:number, width:number, height:number):void {
            if (this.isActive && this.filterByLayoutContainer === layoutContainer && this.filterByLayoutItem === layoutItem) {
                this.createRect(x, y, width, height, "#8ab3bf");
            }
        }

        public setDebugLayoutContainer(layoutContainer:LayoutContainer, w:number, h:number):void {
            if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                w = Math.max(1, Math.abs(w));
                h = Math.max(1, Math.abs(h));
                this.createRect(0, 0, w, 1, "#000000");
                this.createRect(0, 0, 1, h, "#000000");
                this.createRect(0, h-1, w, 1, "#000000");
                this.createRect(w-1, 0, 1, h, "#000000");
            }
        }

        public setDebugPadding(layoutContainer:LayoutContainer, w:number, h:number, topPadding:number, bottomPadding:number, leftPadding:number, rightPadding:number):void {
            if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                this.createRect(0, 0, w, topPadding, "#ffff00");
                this.createRect(0, topPadding, leftPadding, h-topPadding-bottomPadding, "#ffff00");
                this.createRect(w-rightPadding, topPadding, rightPadding, h-topPadding-bottomPadding, "#ffff00");
                this.createRect(0, h-bottomPadding, w, bottomPadding, "#ffff00");
            }
        }

        public setDebugGap(layoutContainer:LayoutContainer, x:number, y:number, width:number, height:number):void {
            if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                this.createRect(x, y, width, height, "#bbbb00");
            }
        }

        public setPosition(point:displayObject.IPoint):void {
            this.initMat();
            if (this.m_translateMat)
                this.m_translateMat.setTranslate(point.x, point.y);
        }

        public setAlpha(alpha:number):void {
            this.parentElement.style.opacity = alpha.toString();
        }

        public clear():void {
            while (this.items.length>0) {
                var item = this.items.pop();
                this.parentElement.removeChild(item);
            }
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
