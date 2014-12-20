/// <reference path="reference.ts"/>

module SimpleLayout.SVGImpl {
    export class SVGContainerWrapper extends SVGDisplayObjectWrapper implements displayObject.IDisplayObjectContainer {
        private m_givenWidth:number;
        private m_givenHeight:number;

        constructor(svgElement:SVGElement) {
            this.m_givenWidth = 0;
            this.m_givenHeight = 0;
            if (svgElement == null)
                throw "svgElement is null";

            super(svgElement);
        }

        public get width():number {
            return this.m_givenWidth;
        }

        public set width(value:number) {
            this.m_givenWidth = value;
        }

        public get height():number {
            return this.m_givenHeight;
        }

        public set height(value:number) {
            this.m_givenHeight = value;
        }

        public getPivotPoint():displayObject.IPoint {
            return {x:0, y:0};
        }

        get displayObjectContainer():Node {
            return <Node>this.getConcreteDisplayObject();
        }

        public addChild(child:displayObject.IDisplayObject):void {
            this.displayObjectContainer.appendChild(<Node>child.getConcreteDisplayObject());
        }

        public removeChild(child:displayObject.IDisplayObject):void {
            this.displayObjectContainer.removeChild(<Node>child.getConcreteDisplayObject());
        }

        public removeAllChildren():void {
            while (this.displayObjectContainer.childNodes.length>0)
                this.displayObjectContainer.removeChild(this.displayObjectContainer.childNodes[0]);
        }
    }
}