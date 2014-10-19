/// <reference path="reference.ts"/>

module SimpleLayout.CreateJSImpl {
    export class CreateJSDisplayObjectWrapper implements displayObject.IDisplayObject {
        private m_wrappedDispObj:createjs.DisplayObject;

        constructor(createjsDisplayObject:createjs.DisplayObject) {
            if (createjsDisplayObject == null)
                throw "createjsDisplayObject is null";

            this.m_wrappedDispObj = createjsDisplayObject;
        }

        public get allowResize():boolean {
            return true;
        }

        public getConcreteDisplayObject():Object {
            return this.m_wrappedDispObj;
        }

        public getPivotPoint():displayObject.IPoint {
            return {x:this.m_wrappedDispObj.regX, y:this.m_wrappedDispObj.regY};
        }

        public getGlobalPos():displayObject.IPoint {
            var point = this.m_wrappedDispObj.localToGlobal(0, 0);
            return {x:point.x, y:point.y};
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

        public get scaleX():number {
            return this.m_wrappedDispObj.scaleX;
        }

        public set scaleX(value:number) {
            this.m_wrappedDispObj.scaleX = value;
        }

        public get scaleY():number {
            return this.m_wrappedDispObj.scaleY;
        }

        public set scaleY(value:number) {
            this.m_wrappedDispObj.scaleY = value;
        }

        public resetScaling():void {
            this.m_wrappedDispObj.scaleX = 1;
            this.m_wrappedDispObj.scaleY = 1;
        }

        public set visible(value:boolean) {
            this.m_wrappedDispObj.visible = value;
        }

        public get visible():boolean {
            return this.m_wrappedDispObj.visible;
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
            this.m_wrappedDispObj.rotation = value;
        }

        public get rotation():number {
            return this.m_wrappedDispObj.rotation;
        }

        public set name(value:string) {
            this.m_wrappedDispObj.name = value;
        }

        public get name():string {
            return this.m_wrappedDispObj.name;
        }

        public dispose():void {
            this.m_wrappedDispObj = null;
        }
    }
}