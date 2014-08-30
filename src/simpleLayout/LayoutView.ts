/// <reference path="reference.ts"/>

module SimpleLayout {
    export class LayoutView extends LayoutContainer {

        constructor() {
            super();
            this.layoutItemType = 'LayoutView';
        }

        public static itemFromJson(json:any):LayoutItem {
            var result : LayoutItem;

            switch (json.layoutItemType) {
                case 'LayoutView' :
                    result = new LayoutView();
                    break;

                case 'LayoutContainer' :
                    result = new LayoutContainer();
                    break;

                case 'LayoutItem' :
                    result = new LayoutItem();
                    break;

                default :
                    throw 'Bad JSON, unknown layoutItemType';
            }

            result.fromJson(json);
            return result;
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

                if (layoutItem.layoutItemType == 'LayoutContainer') {
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

                if (layoutItem.layoutItemType == 'LayoutView' || layoutItem.layoutItemType == 'LayoutContainer') {
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