/// <reference path="../../reference.ts"/>

module layoutFramework.displayObject {
    export class PixiJSDisplayObjectWrapper implements IDisplayObject {

        private m_wrappedDispObj    : PIXI.DisplayObject;
        private m_name              : string;

        constructor(pixiJSDisplayObject:PIXI.DisplayObject) {
            if (pixiJSDisplayObject == null)
                throw "pixiJSDisplayObject is null";

            this.m_wrappedDispObj = pixiJSDisplayObject;
        }

        public get globalPos():IPoint {
            var point       : PIXI.Point;
            var currentObj  : PIXI.DisplayObject = this.m_wrappedDispObj;
            point = new PIXI.Point(0, 0);
            while (currentObj) {
                point.x += currentObj.position.x;
                point.y += currentObj.position.y;
                currentObj = currentObj.parent;
            }
            return {x:point.x, y:point.y};
        }

        public set globalPos(value:IPoint) {
            // do nothing
        }

        public get allowResize():boolean {
            return true;
        }

        public get concreteDisplayObject():Object {
            return this.m_wrappedDispObj;
        }

        public get width():number {
            return (<any>this.m_wrappedDispObj).width;
        }

        public set width(value:number) {
            (<any>this.m_wrappedDispObj).width = value;
        }

        public get height():number {
            return (<any>this.m_wrappedDispObj).height;
        }

        public set height(value:number) {
            (<any>this.m_wrappedDispObj).height = value;
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
            this.m_name = value;
        }

        public get name():string {
            return this.m_name;
        }
    }
}