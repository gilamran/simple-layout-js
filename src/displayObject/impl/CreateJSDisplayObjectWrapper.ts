/// <reference path="../../reference.ts"/>

module layoutFramework.displayObject {
    export class CreateJSDisplayObjectWrapper implements IDisplayObject {
        private m_wrappedDispObj:createjs.DisplayObject;

        constructor(createjsDisplayObject:createjs.DisplayObject) {
            if (createjsDisplayObject == null)
                throw "createjsDisplayObject is null";

            this.m_wrappedDispObj = createjsDisplayObject;
        }

        public get allowResize():boolean {
            return true;
        }

        public get concreteDisplayObject():Object {
            return this.m_wrappedDispObj;
        }

        public get globalPos():IPoint {
            var point = this.m_wrappedDispObj.localToGlobal(0, 0);
            return {x:point.x, y:point.y};
        }

        public set globalPos(value:IPoint) {
            // do nothing
        }

        public get width():number {
            var bounds : createjs.Rectangle = this.m_wrappedDispObj.getBounds();
            return bounds.width*this.m_wrappedDispObj.scaleX;
        }

        public set width(value:number) {
            var bounds : createjs.Rectangle = this.m_wrappedDispObj.getBounds();
            this.m_wrappedDispObj.scaleX = value/bounds.width;
        }

        public get height():number {
            var bounds : createjs.Rectangle = this.m_wrappedDispObj.getBounds();
            return bounds.height*this.m_wrappedDispObj.scaleY;
        }

        public set height(value:number) {
            var bounds : createjs.Rectangle = this.m_wrappedDispObj.getBounds();
            this.m_wrappedDispObj.scaleY = value/bounds.height;
        }

        public set x(value:number) {
            this.m_wrappedDispObj.x = value;
        }

        public get x():number {
            return this.m_wrappedDispObj.x;
        }

        public set y(value:number) {
            this.m_wrappedDispObj.y = value;
        }

        public get y():number {
            return this.m_wrappedDispObj.y;
        }

        public set name(value:string) {
            this.m_wrappedDispObj.name = value;
        }

        public get name():string {
            return this.m_wrappedDispObj.name;
        }
    }
}