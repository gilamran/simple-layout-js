/// <reference path="../reference.ts"/>

module layoutFramework.items {
    export class LayoutItem {
        public parent:containers.LayoutContainer;
        public requestedWidthPercent:number;
        public requestedHeightPercent:number;
        public horizontalAlign:string;
        public verticalAlign:string;
        public uniqueID:string;
        public fittedIntoWidth:number;
        public fittedIntoHeight:number;
        public displayObject:displayObject.IDisplayObject;
        public bestFit:boolean;

        private m_id:string;

        constructor(dispObj:displayObject.IDisplayObject) {
            this.fittedIntoWidth = 0.0;
            this.fittedIntoHeight = 0.0;
            this.horizontalAlign = enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE;
            this.verticalAlign = enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE;
            this.bestFit = true;
            this.requestedWidthPercent = 0.0;
            this.requestedHeightPercent = 0.0;
            this.parent = null;
            this.uniqueID = null;
            this.displayObject = dispObj;

            this.m_id = null;
        }

        get id():string {
            return this.m_id;
        }

        set id(value:string) {
            this.m_id = value;
            if (this.displayObject)
                this.displayObject.name = this.m_id;
        }

        private fitToSize(dispObj:displayObject.IDisplayObject, w:number = 0.0, h:number = 0.0):void {
            var imageRatio:number = dispObj.width / dispObj.height;
            var containerRatio:number = w / h;

            if (containerRatio > imageRatio) {
                dispObj.height = h;
                dispObj.width = imageRatio * dispObj.height;
            }
            else {
                dispObj.width = w;
                dispObj.height = dispObj.width / imageRatio;
            }
        }

        executeLayout():void {
            if (this.displayObject) {
                if (this.bestFit) {
                    this.fitToSize(this.displayObject, this.fittedIntoWidth, this.fittedIntoHeight);
                }
                else {
                    this.displayObject.width = this.fittedIntoWidth;
                    this.displayObject.height = this.fittedIntoHeight;
                }
            }
        }

        fitInto(w:number, h:number):void {
            if (this.displayObject == null)
                return;

            this.fittedIntoWidth = Math.max(1, Math.abs(w));
            this.fittedIntoHeight = Math.max(1, Math.abs(h));

            this.executeLayout();
        }
    }
}