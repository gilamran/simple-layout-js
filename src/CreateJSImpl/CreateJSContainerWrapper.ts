/// <reference path="reference.ts"/>

module SimpleLayout.CreateJSImpl {
    export class CreateJSContainerWrapper extends CreateJSDisplayObjectWrapper implements displayObject.IDisplayObjectContainer {
        private m_givenWidth:number;
        private m_givenHeight:number;

        constructor(createjsContainer:createjs.Container) {
            this.m_givenWidth = 0;
            this.m_givenHeight = 0;
            if (createjsContainer == null)
                throw "createjsContainer is null";

            super(createjsContainer);
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

        get displayObjectContainer():createjs.Container {
            return <createjs.Container>this.getConcreteDisplayObject();
        }

        public addChild(child:displayObject.IDisplayObject):void {
            this.displayObjectContainer.addChild(<createjs.DisplayObject>child.getConcreteDisplayObject());
        }

        public removeChild(child:displayObject.IDisplayObject):void {
            this.displayObjectContainer.removeChild(<createjs.DisplayObject>child.getConcreteDisplayObject());
        }

        public removeAllChildren():void {
            this.displayObjectContainer.removeAllChildren();
        }
    }
}