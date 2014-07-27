/// <reference path="reference.ts"/>

module SimpleLayout.PixiJSImpl {
    export class PixiJSContainerWrapper extends PixiJSDisplayObjectWrapper implements displayObject.IDisplayObjectContainer {
        private m_givenWidth:number;
        private m_givenHeight:number;

        constructor(pixiJSContainer:PIXI.DisplayObjectContainer) {
            this.m_givenWidth = 0;
            this.m_givenHeight = 0;
            if (pixiJSContainer == null)
                throw "pixiJSContainer is null";

            super(pixiJSContainer);
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

        get displayObjectContainer():PIXI.DisplayObjectContainer {
            return <PIXI.DisplayObjectContainer>this.concreteDisplayObject;
        }

        public addChild(child:displayObject.IDisplayObject):void {
            this.displayObjectContainer.addChild(<PIXI.DisplayObject>child.concreteDisplayObject);
        }

        public removeChild(child:displayObject.IDisplayObject):void {
            this.displayObjectContainer.removeChild(<PIXI.DisplayObject>child.concreteDisplayObject);
        }
    }
}