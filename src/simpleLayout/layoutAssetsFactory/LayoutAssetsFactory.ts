/// <reference path="../reference.ts"/>

module SimpleLayout {
    /**
     * The {{#crossLink "LayoutAssetsFactory"}}{{/crossLink}} class is a utility class for creating and clearing all the
     * layout tree displayObjects and displayObjectContainers.
     *
     * @class LayoutAssetsFactory
     **/
    export class LayoutAssetsFactory {

         /**
         * Using the given assetsFactory to create all the displayObjects and displayObjectContainers of the UI.
         *
         * @method createAssets
         * @static
         * @param rootNode {LayoutContainer}
         * @param assetsFactory {IAssetsFactory}
         */
        public static createAssets(rootNode:LayoutContainer, assetsFactory:IAssetsFactory):void {
            this.clearAssets(rootNode);
            this.createNodeAssets(rootNode, assetsFactory);
        }

        private static createNodeAssets(node:LayoutContainer, assetsFactory:IAssetsFactory):void {
            var containerWrapper = assetsFactory.createDisplayObjectContainer();
            node.setDisplayObject(containerWrapper);

            for (var i:number = 0; i < node.countLayoutItems; i++) {
                var layoutItem:LayoutItem = node.getLayoutItemAt(i);

                if (layoutItem.layoutItemType === 'LayoutContainer') {
                    this.createNodeAssets(<LayoutContainer>layoutItem, assetsFactory);
                }
                else {
                    if (layoutItem.assetId) {
                        var displayObjectWrapper = assetsFactory.createDisplayObject(layoutItem.assetId);
                        layoutItem.setDisplayObject(displayObjectWrapper);
                    }
                }
            }
        }

        public static clearAssets(rootNode:LayoutContainer):void {
            for (var i:number = 0; i < rootNode.countLayoutItems; i++) {
                var layoutItem:LayoutItem = rootNode.getLayoutItemAt(i);
                layoutItem.setDisplayObject(null);

                if (layoutItem.layoutItemType === 'LayoutContainer') {
                    this.clearAssets(<LayoutContainer>layoutItem);
                }
            }
            rootNode.setDisplayObject(null);
        }
    }
}