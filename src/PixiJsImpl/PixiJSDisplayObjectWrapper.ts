/// <reference path="reference.ts"/>

module SimpleLayout.PixiJSImpl {
    export class PixiJSDisplayObjectWrapper implements displayObject.IDisplayObject {

        private m_wrappedDispObj    : PIXI.DisplayObject;
        private m_name              : string;

        constructor(pixiJSDisplayObject:PIXI.DisplayObject) {
            if (pixiJSDisplayObject == null)
                throw "pixiJSDisplayObject is null";

            this.m_wrappedDispObj = pixiJSDisplayObject;
        }

        public getPivotPoint():displayObject.IPoint {
            if (this.m_wrappedDispObj && this.m_wrappedDispObj.pivot) {
                return {x:this.m_wrappedDispObj.pivot.x, y:this.m_wrappedDispObj.pivot.y};
            }
            else {
                return {x:0, y:0};
            }
        }

        public getGlobalPos():displayObject.IPoint {
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

        public getConcreteDisplayObject():Object {
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

        public get scaleX():number {
            return this.m_wrappedDispObj.scale.x;
        }

        public set scaleX(value:number) {
            this.m_wrappedDispObj.scale.x = value;
        }

        public get scaleY():number {
            return this.m_wrappedDispObj.scale.y;
        }

        public set scaleY(value:number) {
            this.m_wrappedDispObj.scale.y = value;
        }

        public set visible(value:boolean) {
            this.m_wrappedDispObj.visible = value;
        }

        public get visible():boolean {
            return this.m_wrappedDispObj.visible;
        }

        public resetScaling():void {
            this.m_wrappedDispObj.scale = new PIXI.Point(1, 1);
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

        public set rotation(value:number) {
            var radians = value * Math.PI / 180;
            this.m_wrappedDispObj.rotation = radians;
        }

        public get rotation():number {
            var degree = this.m_wrappedDispObj.rotation * 180 / Math.PI;
            return degree;
        }

        public set name(value:string) {
            this.m_name = value;
        }

        public get name():string {
            return this.m_name;
        }

        public dispose():void {
            this.m_wrappedDispObj = null;
        }
    }
}