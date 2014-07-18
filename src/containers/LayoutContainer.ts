/// <reference path="../reference.ts"/>

module layoutFramework.containers {
    export class LayoutContainer extends items.LayoutItem {

        public layout       : layout.ILayout;
        private m_children  : items.LayoutItem[];

        constructor(dispObjCont:displayObject.IDisplayObjectContainer) {
            this.m_children = [];
            super(dispObjCont);
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

        public getItemAt(index:number):items.LayoutItem {
            return this.m_children[index];
        }

        public addLayoutItem(layoutItem:items.LayoutItem):items.LayoutItem {
            if (layoutItem == null)
                throw "Can not add a null layoutItem";

            if (this.m_children.indexOf(layoutItem) != -1) {
                return null; // already a child
            }
            else {
                this.m_children.push(layoutItem);
                layoutItem.parent = this;
                this.displayObjectContainer.addChild(layoutItem.displayObject);
                return layoutItem;
            }
        }

        public removeItem(layoutItem:items.LayoutItem):items.LayoutItem {
            if (layoutItem == null)
                return null;

            var pos:number = this.m_children.indexOf(layoutItem);
            if (pos == -1) {
                return null; // not a child
            }
            else {
                layoutItem.parent = null;
                this.displayObjectContainer.removeChild(layoutItem.displayObject);
                return this.m_children.splice(pos, 1)[0];
            }
        }

        public clearChildren():void {
            while (this.m_children.length > 0)
                this.removeItem(this.m_children[0]);
        }

        public get numChildItems():number {
            return this.m_children.length;
        }
    }
}