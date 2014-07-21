/// <reference path="../reference.ts"/>

module layoutFramework.containers {
    export class LayoutContainer extends items.LayoutItem {

        public layout          : layout.ILayout;
        private m_layoutItems  : items.LayoutItem[];

        constructor(dispObjCont:displayObject.IDisplayObjectContainer) {
            this.m_layoutItems = [];
            super(dispObjCont);
        }

        get layoutItems():items.LayoutItem[] {
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
            }
            else {
                super.executeLayout();
            }
        }

        public getLayoutItemAt(index:number):items.LayoutItem {
            return this.m_layoutItems[index];
        }

        public addLayoutItem(layoutItem:items.LayoutItem):items.LayoutItem {
            if (layoutItem == null)
                throw "Can not add a null layoutItem";

            if (this.m_layoutItems.indexOf(layoutItem) != -1) {
                return null; // already a child
            }
            else {
                this.m_layoutItems.push(layoutItem);
                layoutItem.parent = this;
                this.displayObjectContainer.addChild(layoutItem.displayObject);
                return layoutItem;
            }
        }

        public removeLayoutItem(layoutItem:items.LayoutItem):items.LayoutItem {
            if (layoutItem == null)
                return null;

            var pos:number = this.m_layoutItems.indexOf(layoutItem);
            if (pos == -1) {
                return null; // not a child
            }
            else {
                layoutItem.parent = null;
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