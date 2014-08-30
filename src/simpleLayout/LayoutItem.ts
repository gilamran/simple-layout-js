/// <reference path="reference.ts"/>

module SimpleLayout {
    export class LayoutItem {
        public layoutItemType           : string;

        public parent                   : LayoutContainer;
        public displayObject            : displayObject.IDisplayObject;
        public requestedWidthPercent    : number;
        public requestedHeightPercent   : number;
        public horizontalAlign          : string;
        public verticalAlign            : string;
        public fittedIntoWidth          : number;
        public fittedIntoHeight         : number;
        public keepAspectRatio          : boolean;
        public assetId                  : string;

        private m_name                  : string;

        constructor(dispObj?:displayObject.IDisplayObject) {
            this.layoutItemType = 'LayoutItem';
            this.fittedIntoWidth = 0.0;
            this.fittedIntoHeight = 0.0;
            this.horizontalAlign = enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE;
            this.verticalAlign = enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE;
            this.keepAspectRatio = true;
            this.requestedWidthPercent = 0.0;
            this.requestedHeightPercent = 0.0;
            this.parent = null;
            this.displayObject = dispObj;
            this.assetId = "";

            this.m_name = null;
        }

        get name():string {
            return this.m_name;
        }

        set name(value:string) {
            this.m_name = value;
            if (this.displayObject)
                this.displayObject.name = this.m_name;
        }

        public toJson():any {
            return {
                layoutItemType         : this.layoutItemType,
                requestedWidthPercent  : this.requestedWidthPercent,
                requestedHeightPercent : this.requestedHeightPercent,
                horizontalAlign        : this.horizontalAlign,
                verticalAlign          : this.verticalAlign,
                fittedIntoWidth        : this.fittedIntoWidth,
                fittedIntoHeight       : this.fittedIntoHeight,
                keepAspectRatio        : this.keepAspectRatio,
                assetId                : this.assetId,
                name                   : this.name
            }            
        }

        public fromJson(json:any):void {
            this.layoutItemType         = json.layoutItemType;
            this.requestedWidthPercent  = json.requestedWidthPercent;
            this.requestedHeightPercent = json.requestedHeightPercent;
            this.horizontalAlign        = json.horizontalAlign;
            this.verticalAlign          = json.verticalAlign;
            this.fittedIntoWidth        = json.fittedIntoWidth;
            this.fittedIntoHeight       = json.fittedIntoHeight;
            this.keepAspectRatio        = json.keepAspectRatio;
            this.assetId                = json.assetId;
            this.name                   = json.name;
        }

        public setDisplayObject(value:displayObject.IDisplayObject):void {
            if (value!=this.displayObject) {
                // remove the previous
                if (this.displayObject && this.parent && this.parent.displayObjectContainer)
                    this.parent.displayObjectContainer.removeChild(this.displayObject);

                // take the new value
                this.displayObject = value;

                // and let the parent get the new display object
                if (this.displayObject && this.parent && this.parent.displayObjectContainer)
                    this.parent.displayObjectContainer.addChild(this.displayObject);
            }
        }

        private fitToSize(dispObj:displayObject.IDisplayObject, w:number = 0.0, h:number = 0.0):void {
            dispObj.resetScaling();
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

        public executeLayout():void {
            if (this.displayObject) {
                if (this.keepAspectRatio) {
                    this.fitToSize(this.displayObject, this.fittedIntoWidth, this.fittedIntoHeight);
                }
                else {
                    this.displayObject.width = this.fittedIntoWidth;
                    this.displayObject.height = this.fittedIntoHeight;
                }
            }
        }

        public fitInto(w:number, h:number):void {
            if (this.displayObject == null)
                return;

            this.fittedIntoWidth = Math.max(1, Math.abs(w));
            this.fittedIntoHeight = Math.max(1, Math.abs(h));

            this.executeLayout();
        }

        public dispose():void {
            this.parent = null;
            if (this.displayObject) {
                this.displayObject.dispose();
                this.displayObject = null;
            }
        }
    }
}