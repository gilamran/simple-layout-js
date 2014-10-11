/// <reference path="reference.ts"/>

module SimpleLayout {
    export interface ILayoutContainerData extends ILayoutItemData {
        layout          : layout.ILayout;
        layoutItems     : LayoutItem[];
    }

    export class LayoutContainer extends LayoutItem {

        public layout          : layout.ILayout;
        private m_layoutItems  : LayoutItem[];

        /**
         * @class SimpleLayout.LayoutContainer
         * @augments SimpleLayout.LayoutItem
         * @classdesc The LayoutContainer class is the a holder of LayoutItems. its displayObject property actually
         * holds a displayObjectContainer. It doesn't have a regular displayObject (A graphical entity).
         */
        constructor() {
            super();
            this.fillArea = true;
            this.m_layoutItems = [];
        }

        /**
         * This is an override to LayoutItem.getLayoutItemType, and this function returns the string "LayoutContainer"
         *
         * @method SimpleLayout.LayoutContainer#getLayoutItemType
         * @returns {string} "LayoutContainer"
         */
        public getLayoutItemType():string {
            return 'LayoutContainer';
        }


        /**
         * This is an override to LayoutItem.toJson
         *
         * @method SimpleLayout.LayoutContainer#toJson
         * @returns {Object} A Json object that fully describe this LayoutContainer
         */
        public toJson():ILayoutContainerData {
            var result : ILayoutContainerData = <ILayoutContainerData>super.toJson();
            var layoutItems = [];
            for (var i:number=0; i<this.m_layoutItems.length; i++) {
                layoutItems.push(this.m_layoutItems[i].toJson());
            }

            result.layoutItems = layoutItems;

            if (this.layout)
                result.layout = this.layout.toJson();

            return result;
        }


        /**
         * A factory function to create a LayoutContainer or LayoutItem according the to the <b>layoutItemType</b> in
         * the given json object.
         * This function is being used internally when calling the LayoutContainer.fromJson function.
         *
         * @method SimpleLayout.LayoutContainer#itemFromJson
         * @static
         * @returns {Object} a LayoutItem or a LayoutContainer Depends on the <b>layoutItemType</b> in the given json
         * object.
         */
        public static itemFromJson(json:any):LayoutItem {
            var result : LayoutItem;

            switch (json.layoutItemType) {
                case 'LayoutItem' :
                    result = new LayoutItem();
                    break;

                case 'LayoutContainer' :
                    result = new LayoutContainer();
                    break;

                default :
                    throw 'Bad JSON, unknown layoutItemType:' + json.layoutItemType;
            }

            result.fromJson(json);
            return result;
        }

        /**
         * This is an override to LayoutItem.fromJson
         *
         * @method SimpleLayout.LayoutContainer#fromJson
         * @param json {Object} object that fully describe this LayoutContainer and its children.
         */
        public fromJson(json:ILayoutContainerData):void {
            super.fromJson(json);

            // layout items
            var layoutItems = json.layoutItems;
            for (var i:number=0; i<layoutItems.length; i++) {
                var layoutItem : LayoutItem = LayoutContainer.itemFromJson(layoutItems[i]);
                layoutItem.parent = this;
                this.layoutItems.push(layoutItem);
            }

            if (json.hasOwnProperty('layout')) {
                var layoutJson = json.layout;
                var layout;
                switch (layoutJson['layoutType']) {
                    case 'BasicLayout'        : layout = new SimpleLayout.layout.BasicLayout(); break;
                    case 'HorizontalLayout'   : layout = new SimpleLayout.layout.HorizontalLayout(); break;
                    case 'VerticalLayout'     : layout = new SimpleLayout.layout.VerticalLayout(); break;
                    default                   : throw 'Bad Json, unknown layoutType ' + layoutJson['layoutType'];
                }

                layout.fromJson(layoutJson);
                this.layout = layout;
            }
        }

        /**
         * An array of all the child LayoutItems of this LayoutContainer.
         *
         * @member SimpleLayout.LayoutContainer#layoutItems
         * @readonly
         * @type LayoutItem[]
         */
        get layoutItems():LayoutItem[] {
            return this.m_layoutItems;
        }

        get displayObjectContainer():displayObject.IDisplayObjectContainer {
            return <displayObject.IDisplayObjectContainer>this.displayObject;
        }

        public executeLayout(width:number, height:number):void {
            if (this.layout) {
                var layoutVisualizer : visualizer.ILayoutVisualizer = this.layout.getLayoutVisualizer();
                if (layoutVisualizer) {
                    layoutVisualizer.clear();
                    if (this.displayObject)
                        layoutVisualizer.setDebugItem(this, 0, 0, width, height);
                }

                this.layout.fitChildrenInto(this, width, height);
                if (this.displayObject) {
                    this.displayObject.width = width;
                    this.displayObject.height = height;
                }

                if (layoutVisualizer) {
                    if (this.displayObject)
                        layoutVisualizer.setPosition(this.displayObject.getGlobalPos());
                    layoutVisualizer.setDebugFitAreaSize(width, height);
                    layoutVisualizer.update();
                }
            }
        }

        /**
         * @protected
         * @override
         */
        public getAssetSize():ISize {
            // a LayoutContainer never has a graphical size, like a LayoutItem, so override it and return null
            return null;
        }

        /**
         * A shortcut to <b>container.layoutItems[index]</b>
         *
         * @method SimpleLayout.LayoutContainer#getLayoutItemAt
         * @param index {Number}
         * @returns {LayoutItem} The LayoutItem as the given index.
         */
        public getLayoutItemAt(index:number):LayoutItem {
            return this.m_layoutItems[index];
        }

        /**
         * Removes all the assets from the stage and re-adds them again. This is useful if you moved a LayoutItem in the
         * z-order, and want the Layout to rearrange the layout items.
         *
         * @method SimpleLayout.LayoutContainer#rearrangeLayoutItems
         */
        public rearrangeLayoutItems():void {
            if (!this.displayObjectContainer)
                return;

            this.removeAllDisplayObjects();

            // re add all the children by the items order
            for (var i:number=0; i<this.m_layoutItems.length; i++) {
                var layoutItem : LayoutItem = this.m_layoutItems[i];

                layoutItem.parent = this;
                if (layoutItem.displayObject)
                    this.displayObjectContainer.addChild(layoutItem.displayObject);

                if (layoutItem.getLayoutItemType() === 'LayoutContainer')
                    (<LayoutContainer>layoutItem).rearrangeLayoutItems();
            }
        }

        /**
         * Adds a given LayoutItem as a child to this LayoutContainer.
         *
         * @method SimpleLayout.LayoutContainer#addLayoutItem
         * @param layoutItem {LayoutItem} The new LayoutItem.
         * @param index {number} the position to add the given LayoutItem (Default is to add it last)
         * @returns {LayoutItem} the added LayoutItem.
         */
        public addLayoutItem(layoutItem:LayoutItem, index:number=-1):LayoutItem {
            if (layoutItem == null)
                throw "Can not add a null layoutItem";

            if (this.m_layoutItems.indexOf(layoutItem) != -1) {
                return null; // already a child
            }
            else {
                if (index>-1)
                    this.m_layoutItems.splice(index, 0, layoutItem);
                else
                    this.m_layoutItems.push(layoutItem);
                layoutItem.parent = this;

                // displayObject is optional , and can be set later
                if (layoutItem.displayObject)
                    this.displayObjectContainer.addChild(layoutItem.displayObject);

                return layoutItem;
            }
        }

        /**
         * Removes the given LayoutItem from this LayoutContainer's children.
         *
         * @method SimpleLayout.LayoutContainer#removeLayoutItem
         * @param layoutItem {LayoutItem} the LayoutItem to be removed
         * @returns {LayoutItem} The removed LayoutItem
         */
        public removeLayoutItem(layoutItem:LayoutItem):LayoutItem {
            if (layoutItem == null)
                return null;

            var pos:number = this.m_layoutItems.indexOf(layoutItem);
            if (pos == -1) {
                return null; // not a child
            }
            else {
                layoutItem.parent = null;

                // displayObject is optional
                if (layoutItem.displayObject)
                    this.displayObjectContainer.removeChild(layoutItem.displayObject);

                return this.m_layoutItems.splice(pos, 1)[0];
            }
        }

        /**
         * Removes the LayoutContainer's children.
         *
         * @method SimpleLayout.LayoutContainer#removeAllLayoutItems
         */
        public removeAllLayoutItems():void {
            while (this.m_layoutItems.length > 0)
                this.removeLayoutItem(this.m_layoutItems[0]);
        }

        /**
         * The number of LayoutItems this LayoutContainer has.
         *
         * @member SimpleLayout.LayoutContainer#countLayoutItems
         * @readonly
         */
        public get countLayoutItems():number {
            return this.m_layoutItems.filter((layoutItem:LayoutItem) => {return layoutItem.visible;}).length;
        }

        private removeAllDisplayObjects():void {
            this.displayObjectContainer.removeAllChildren();
            for (var i:number=0; i<this.m_layoutItems.length; i++) {
                var layoutItem : LayoutItem = this.m_layoutItems[i];

                if (layoutItem.getLayoutItemType() === 'LayoutContainer')
                    (<LayoutContainer>layoutItem).removeAllDisplayObjects();
            }
        }

        public dispose():void {
            super.dispose();

            if (this.layout) {
                this.layout.dispose();
                this.layout = null;
            }

            this.layout = null;
            if (this.m_layoutItems) {
                while (this.m_layoutItems.length>0) {
                    var item = this.m_layoutItems.pop();
                    item.dispose();
                }
                this.m_layoutItems = [];
            }
        }
    }
}