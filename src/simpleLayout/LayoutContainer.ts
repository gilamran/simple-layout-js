/// <reference path="reference.ts"/>

module SimpleLayout {
    export class LayoutContainer extends LayoutItem {

        public layout          : layout.ILayout;
        private m_layoutItems  : LayoutItem[];

        constructor(dispObjCont:displayObject.IDisplayObjectContainer) {
            this.m_layoutItems = [];
            super(dispObjCont);
        }

        get layoutItems():LayoutItem[] {
            return this.m_layoutItems;
        }

        get displayObjectContainer():displayObject.IDisplayObjectContainer {
            return <displayObject.IDisplayObjectContainer>this.displayObject;
        }

        public executeLayout():void {
            if (this.layout) {
                this.layout.fitChildrenInto(this, this.fittedIntoWidth, this.fittedIntoHeight);
                this.displayObject.width = this.fittedIntoWidth;
                this.displayObject.height = this.fittedIntoHeight;
                var layoutVisualizer : visualizer.ILayoutVisualizer = this.layout.getLayoutVisualizer();
                if (layoutVisualizer)
                    layoutVisualizer.setDebugItem(this, 0, 0, this.fittedIntoWidth, this.fittedIntoHeight);
            }
            else {
                super.executeLayout();
            }
        }

        public getLayoutItemAt(index:number):LayoutItem {
            return this.m_layoutItems[index];
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
    }
}