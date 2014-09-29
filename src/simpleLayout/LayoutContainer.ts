/// <reference path="reference.ts"/>

module SimpleLayout {
    export class LayoutContainer extends LayoutItem {

        public layout          : layout.ILayout;
        private m_layoutItems  : LayoutItem[];

        constructor() {
            super();
            this.m_layoutItems = [];
            this.layoutItemType = 'LayoutContainer';
        }

        public toJson():any {
            var result = super.toJson();
            var layoutItems = [];
            for (var i:number=0; i<this.m_layoutItems.length; i++) {
                layoutItems.push(this.m_layoutItems[i].toJson());
            }

            result.layoutItems = layoutItems;

            if (this.layout)
                result.layout = this.layout.toJson();

            return result;
        }

        public fromJson(json:any):any {
            super.fromJson(json);

            // layout items
            var layoutItems = json.layoutItems;
            for (var i:number=0; i<layoutItems.length; i++) {
                var layoutItem : LayoutItem = LayoutView.itemFromJson(layoutItems[i]);
                layoutItem.parent = this;
                this.layoutItems.push(layoutItem);
            }

            if (json.hasOwnProperty('layout')) {
                var layoutJson = json.layout;
                var layout;
                switch (layoutJson['layoutType']) {
                    case 'basic'        : layout = new SimpleLayout.layout.BasicLayout(); break;
                    case 'horizontal'   : layout = new SimpleLayout.layout.HorizontalLayout(); break;
                    case 'vertical'     : layout = new SimpleLayout.layout.VerticalLayout(); break;
                    default             : throw 'Bad Json, unknown layoutType';
                }

                layout.fromJson(layoutJson);
                this.layout = layout;
            }
        }

        get layoutItems():LayoutItem[] {
            return this.m_layoutItems;
        }

        get displayObjectContainer():displayObject.IDisplayObjectContainer {
            return <displayObject.IDisplayObjectContainer>this.displayObject;
        }

        public executeLayout():void {
            if (this.layout) {
                var layoutVisualizer : visualizer.ILayoutVisualizer = this.layout.getLayoutVisualizer();
                if (layoutVisualizer) {
                    layoutVisualizer.clear();
                    if (this.displayObject)
                        layoutVisualizer.setDebugItem(this, 0, 0, this.fittedIntoWidth, this.fittedIntoHeight);
                }

                this.layout.fitChildrenInto(this, this.fittedIntoWidth, this.fittedIntoHeight);
                this.displayObject.width = this.fittedIntoWidth;
                this.displayObject.height = this.fittedIntoHeight;

                if (layoutVisualizer) {
                    if (this.displayObject)
                        layoutVisualizer.setPosition(this.displayObject.getGlobalPos());
                    layoutVisualizer.setDebugFitAreaSize(this.fittedIntoWidth, this.fittedIntoHeight);
                    layoutVisualizer.update();
                }
            }
            else {
                super.executeLayout();
            }
        }

        public getLayoutItemAt(index:number):LayoutItem {
            return this.m_layoutItems[index];
        }

        private removeAllDisplayObjects():void {
            this.displayObjectContainer.removeAllChildren();
            for (var i:number=0; i<this.m_layoutItems.length; i++) {
                var layoutItem : LayoutItem = this.m_layoutItems[i];

                if (layoutItem.layoutItemType == 'LayoutContainer')
                    (<LayoutContainer>layoutItem).removeAllDisplayObjects();
            }
        }

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

                if (layoutItem.layoutItemType == 'LayoutContainer')
                    (<LayoutContainer>layoutItem).rearrangeLayoutItems();
            }
        }

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

        public removeAllLayoutItems():void {
            while (this.m_layoutItems.length > 0)
                this.removeLayoutItem(this.m_layoutItems[0]);
        }

        public get countLayoutItems():number {
            return this.m_layoutItems.length;
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