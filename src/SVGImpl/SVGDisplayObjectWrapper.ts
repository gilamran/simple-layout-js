/// <reference path="reference.ts"/>

module SimpleLayout.SVGImpl {
    export class SVGDisplayObjectWrapper implements displayObject.IDisplayObject {

        private m_wrappedDispObj    : SVGElement;
        private m_translateMat      : SVGTransform;
        private m_scaleMat          : SVGTransform;
        private m_rotationMat       : SVGTransform;
        private m_x                 : number;
        private m_y                 : number;
        private m_scaleX            : number;
        private m_scaleY            : number;
        private m_rotation          : number;

        constructor(svgElement:SVGElement) {
            if (svgElement == null)
                throw "svgElement is null";

            this.m_wrappedDispObj = svgElement;
            this.m_x = 0;
            this.m_y = 0;
            this.m_scaleX = 1;
            this.m_scaleY = 1;
            this.m_rotation = 0;
        }

        private get svgElement():SVGSVGElement {
            return this.m_wrappedDispObj.ownerSVGElement;
        }

        private initMat():void {
            if (this.svgElement) {
                if (!this.m_translateMat) {
                    this.m_translateMat = this.svgElement.createSVGTransform();
                    this.m_scaleMat = this.svgElement.createSVGTransform();
                    this.m_rotationMat = this.svgElement.createSVGTransform();

                    (<any>this.m_wrappedDispObj).transform.baseVal.appendItem(this.m_translateMat);
                    (<any>this.m_wrappedDispObj).transform.baseVal.appendItem(this.m_rotationMat);
                    (<any>this.m_wrappedDispObj).transform.baseVal.appendItem(this.m_scaleMat);
                }
            }
        }

        public getPivotPoint():displayObject.IPoint {
            var p = (<any>this.m_wrappedDispObj).getBBox();
            return {x:-p.x, y:-p.y};
        }

        public getGlobalPos():displayObject.IPoint {
            if (this.svgElement) {
                var p = this.svgElement.createSVGPoint();
                p = p.matrixTransform((<any>this.m_wrappedDispObj).getCTM());
                return {x:p.x, y:p.y};
            }
            else {
                return {x:0, y:0};
            }
        }

        public getConcreteDisplayObject():Object {
            return this.m_wrappedDispObj;
        }

        public get width():number {
            var rect : ClientRect = (<Element>this.m_wrappedDispObj).getBoundingClientRect();
            return rect.width;
        }

        public set width(value:number) {
            this.scaleX = value/this.width;
        }

        public get height():number {
            var rect : ClientRect = (<Element>this.m_wrappedDispObj).getBoundingClientRect();
            return rect.height;
        }

        public set height(value:number) {
            this.scaleY = value/this.height;
        }

        public resetScaling():void {
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.rotation = 0;
        }

        public get scaleX():number {
            return this.m_scaleX;
        }

        public set scaleX(value:number) {
            this.initMat();
            this.m_scaleX = value;
            if (this.m_scaleMat)
                this.m_scaleMat.setScale(this.m_scaleX, this.m_scaleY);
        }

        public get scaleY():number {
            return this.m_scaleY;
        }

        public set scaleY(value:number) {
            this.initMat();
            this.m_scaleY = value;
            if (this.m_scaleMat)
                this.m_scaleMat.setScale(this.m_scaleX, this.m_scaleY);
        }

        public set x(value:number) {
            this.initMat();
            this.m_x = value;
            if (this.m_translateMat)
                this.m_translateMat.setTranslate(this.m_x, this.m_y);
        }

        public get x():number {
            return this.m_x;
        }

        public set y(value:number) {
            this.initMat();
            this.m_y = value;
            if (this.m_translateMat)
                this.m_translateMat.setTranslate(this.m_x, this.m_y);
        }

        public get y():number {
            return this.m_y;
        }

        public set rotation(value:number) {
            this.initMat();
            this.m_rotation = value;
            if (this.m_rotationMat)
                this.m_rotationMat.setRotate(this.m_rotation, this.m_x, this.m_y);
        }

        public get rotation():number {
            return this.m_rotation;
        }

        public set visible(value:boolean) {
            if (value)
                this.m_wrappedDispObj.setAttributeNS(null, 'display', 'inline');
            else
                this.m_wrappedDispObj.setAttributeNS(null, 'display', 'none');
        }

        public get visible():boolean {
            var style = window.getComputedStyle(this.m_wrappedDispObj);
            return (style.display === 'none')
        }

        public set name(value:string) {
            this.m_wrappedDispObj.id = value;
        }

        public get name():string {
            return this.m_wrappedDispObj.id;
        }

        public dispose():void {
            this.m_wrappedDispObj = null;
        }
    }
}