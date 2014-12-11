/// <reference path="reference.ts"/>
/**
 * The global namespace for all the Simple Layout framework classes.
 * @namespace SimpleLayout
 */
module SimpleLayout {

    export interface ISize {
        width   : number;
        height  : number;
    }

    export interface ILayoutItemData {
        layoutItemType           : string;
        requestedWidthPercent    : number;
        requestedHeightPercent   : number;
        horizontalAlign          : string;
        verticalAlign            : string;
        visible                  : boolean;
        fittedIntoWidth          : number;
        fittedIntoHeight         : number;
        fillArea                 : boolean;
        name                     : string;
        assetId                  : string;
    }

    export class LayoutItem {
        private m_visible:boolean;

        public parent:LayoutContainer;
        public displayObject:displayObject.IDisplayObject;

        public requestedWidthPercent:number;
        public requestedHeightPercent:number;
        public horizontalAlign:string;
        public verticalAlign:string;
        public fittedIntoWidth:number;
        public fittedIntoHeight:number;
        public fillArea:boolean;
        public name:string;
        public assetId:string;

        /**
         * Description of the constructor.
         * @class SimpleLayout.LayoutItem
         * @classdesc The LayoutItem class is the most basic building block for defining your UI layout
         * @param [displayObject] {Object} An object that implements the <b>IDisplayObject</b> interface.
         */
        constructor(displayObject?:displayObject.IDisplayObject) {
            this.m_visible = true;

            this.parent = null;
            this.displayObject = displayObject;

            this.fittedIntoWidth = 0.0;
            this.fittedIntoHeight = 0.0;
            this.horizontalAlign = enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE;
            this.verticalAlign = enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE;
            this.fillArea = false;
            this.requestedWidthPercent = 0.0;
            this.requestedHeightPercent = 0.0;
            this.name = "";
            this.assetId = "";
        }

        /**
         * Because a layout is built using a tree of LayoutContainers and LayoutItems, we have to know the type
         * of the nodes in the tree while building the layout. This is an easy way to get the type of the LayoutItem.
         * This function returns the string "LayoutItem"
         *
         * @method SimpleLayout.LayoutItem#getLayoutItemType
         * @returns {string} "LayoutItem"
         */
        public getLayoutItemType():string {
            return 'LayoutItem';
        }

        /**
         * Sets this LayoutItem's display object that it represents in the layout.
         * A Layout item can exist without a display object and it will take the space that it own, but nothing
         * will be displayed.
         *
         * @method SimpleLayout.LayoutItem#setDisplayObject
         * @param displayObject {Object} An object that implements the <b>IDisplayObject</b> interface.
         */
        public setDisplayObject(displayObject:displayObject.IDisplayObject):void {
            if (displayObject != this.displayObject) {
                // remove the previous
                if (this.displayObject && this.parent && this.parent.displayObjectContainer)
                    this.parent.displayObjectContainer.removeChild(this.displayObject);

                // take the new displayObject
                this.displayObject = displayObject;

                // and let the parent get the new display object
                if (this.displayObject && this.parent && this.parent.displayObjectContainer) {
                    this.parent.displayObjectContainer.addChild(this.displayObject);
                    this.displayObject.visible = this.visible;
                }
            }
        }

        public set visible(value:boolean) {
            this.m_visible = value;
            if (this.displayObject)
                this.displayObject.visible = value;
        }

        public get visible():boolean {
            return this.m_visible;
        }

        /**
         * In a LayoutItem this function will fit the LayoutItem's <b>displayObject</b> into its given width and height.
         * This function is called by the LayoutContainer on all its children LayoutItems (And containers)
         *
         * @method SimpleLayout.LayoutItem#executeLayout
         * @protected
         */
        public executeLayout(width:number, height:number):void {
            if (this.displayObject) {
                this.displayObject.width = width;
                this.displayObject.height = height;
            }
        }

        /**
         * This function will be called by a <b>Layout</b> object.
         *
         * @method SimpleLayout.LayoutItem#fitInto
         * @param width {Number} A specific width that this LayoutItem takes
         * @param height {Number} A specific height that this LayoutItem takes
         */
        public fitInto(width:number, height:number):void {
            // as default we'll take the area that was given to us (Fit into the full given area)
            var itemWidth:number = width;
            var itemHeight:number = height;

            // If we're asked not to fill the all area?
            if (this.fillArea === false) {
                // Do we have an item size?
                // For LayoutItems with graphical assets it will return the asset size
                // and for LayoutContainer a requested custom size (If provided)
                var itemSize:ISize = this.getAssetSize();
                if (itemSize !== null) {
                    itemWidth = itemSize.width;
                    itemHeight = itemSize.height;
                }

                itemSize = this.fitToSize(width, height, itemWidth, itemHeight);
                itemWidth = itemSize.width;
                itemHeight = itemSize.height;
            }

            // make sure that we don't allow values less than 1.
            itemWidth = Math.max(1, itemWidth);
            itemHeight = Math.max(1, itemHeight);
            this.executeLayout(itemWidth, itemHeight);
        }


        /**
         * @protected
         */
        public getAssetSize():ISize {
            if (this.displayObject) {
                this.displayObject.resetScaling();
                return {
                    width: this.displayObject.width,
                    height: this.displayObject.height
                }
            }
            else {
                return null;
            }
        }

        /**
         * Serialize the LayoutItem into its properties, the result json can be use to construct a new LayoutItem by
         * calling fromJson function.
         *
         * @method SimpleLayout.LayoutItem#toJson
         * @returns {Object} A Json object that fully describe this LayoutItem
         */
        public toJson():ILayoutItemData {
            var result:any = { layoutItemType: this.getLayoutItemType() };

            // add only the properties that are not default
            if (this.requestedWidthPercent !== 0)
                result.requestedWidthPercent = this.requestedWidthPercent;

            if (this.requestedHeightPercent !== 0)
                result.requestedHeightPercent = this.requestedHeightPercent;

            if (this.fittedIntoWidth !== 0)
                result.fittedIntoWidth = this.fittedIntoWidth;

            if (this.fittedIntoHeight !== 0)
                result.fittedIntoHeight = this.fittedIntoHeight;

            if (this.horizontalAlign !== enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                result.horizontalAlign = this.fittedIntoHeight;

            if (this.verticalAlign !== enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE)
                result.verticalAlign = this.verticalAlign;

            if (this.fillArea !== false)
                result.fillArea = this.fillArea;

            if (this.name !== "")
                result.name = this.name;

            if (this.assetId !== "")
                result.assetId = this.assetId;

            return result;
        }

        /**
         * Copy all the properties from the given json into this LayoutItem.
         *
         * @method SimpleLayout.LayoutItem#fromJson
         * @param json {Object} object that fully describe this LayoutItem
         */
        public fromJson(json:ILayoutItemData):void {
            if (typeof json.requestedWidthPercent !== "undefined")
                this.requestedWidthPercent = json.requestedWidthPercent;

            if (typeof json.requestedHeightPercent !== "undefined")
                this.requestedHeightPercent = json.requestedHeightPercent;

            if (typeof json.horizontalAlign !== "undefined")
                this.horizontalAlign = json.horizontalAlign;

            if (typeof json.verticalAlign !== "undefined")
                this.verticalAlign = json.verticalAlign;

            if (typeof json.visible !== "undefined")
                this.visible = json.visible;

            if (typeof json.fittedIntoWidth !== "undefined")
                this.fittedIntoWidth = json.fittedIntoWidth;

            if (typeof json.fittedIntoHeight !== "undefined")
                this.fittedIntoHeight = json.fittedIntoHeight;

            if (typeof json.fillArea !== "undefined")
                this.fillArea = json.fillArea;

            if (typeof json.name !== "undefined")
                this.name = json.name;

            if (typeof json.assetId !== "undefined")
                this.assetId = json.assetId;
        }


        /**
         * Disposing (Setting to null) all the objects that it holds, like <b>parent</b>. If a <b>displayObject</b> was
         * assigned to this LayoutItem, its <b>dispose</b> function will also get called.
         *
         * @method SimpleLayout.LayoutItem#dispose
         */
        public dispose():void {
            this.parent = null;
            if (this.displayObject) {
                this.displayObject.dispose();
                this.displayObject = null;
            }
        }

        private fitToSize(givenWidth:number, givenHeight:number, itemWidth:number, itemHeight:number):ISize {
            var itemRatio:number = itemWidth / itemHeight;
            var containerRatio:number = givenWidth / givenHeight;

            if (containerRatio > itemRatio) {
                return {
                    height: givenHeight,
                    width: itemRatio * givenHeight
                };
            }
            else {
                return {
                    width: givenWidth,
                    height: givenWidth / itemRatio
                };
            }
        }
    }
}