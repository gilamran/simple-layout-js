/// <reference path="reference.ts"/>

module SimpleLayout {
    export class LayoutView extends LayoutContainer {

        constructor(dispObjCont?:displayObject.IDisplayObjectContainer) {
            super(dispObjCont);
        }

        public toJson():any {
            var result = super.toJson();
            return result;
        }

        public static fromJson(json:any):LayoutView {
            var result : LayoutView = <LayoutView>LayoutContainer.fromJson(json);
            return result;
        }

        public static isNodeContainer(node):boolean {
            if (node)
                return node['constructor'] === SimpleLayout.LayoutContainer;
            else
                return null;
        }

        public static isNodeLayoutItem(node):boolean {
            if (node)
                return node['constructor'] === SimpleLayout.LayoutItem;
            else
                return null;
        }

        public createAssets(assetsFactory:IAssetsFactory):void {
            this.clearNodeAssets(this);
            this.createNodeAssets(this, assetsFactory);
        }

        private createNodeAssets(node:SimpleLayout.LayoutContainer, assetsFactory:IAssetsFactory):void {
            var containerWrapper = assetsFactory.createDisplayObjectContainer();
            node.setDisplayObject(containerWrapper);

            for (var i:number = 0; i < node.countLayoutItems; i++) {
                var layoutItem:SimpleLayout.LayoutItem = node.getLayoutItemAt(i);

                if (LayoutView.isNodeContainer(layoutItem)) {
                    this.createNodeAssets(<SimpleLayout.LayoutContainer>layoutItem, assetsFactory);
                }
                else {
                    if (layoutItem.assetId) {
                        var displayObjectWrapper = assetsFactory.createDisplayObject(layoutItem.assetId);
                        layoutItem.setDisplayObject(displayObjectWrapper);
                    }
                }
            }
        }

        public clearAssets():void {
            this.clearNodeAssets(this);
        }

        private clearNodeAssets(node:SimpleLayout.LayoutContainer):void {
            for (var i:number = 0; i < node.countLayoutItems; i++) {
                var layoutItem:SimpleLayout.LayoutItem = node.getLayoutItemAt(i);
                layoutItem.setDisplayObject(null);

                if (LayoutView.isNodeContainer(layoutItem)) {
                    this.clearNodeAssets(<SimpleLayout.LayoutContainer>layoutItem);
                }
            }
            node.setDisplayObject(null);
        }

        public dispose():void {
            super.dispose();
        }
    }
}