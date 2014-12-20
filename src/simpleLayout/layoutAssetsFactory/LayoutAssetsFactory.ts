/// <reference path="../reference.ts"/>

module SimpleLayout {
    export class LayoutAssetsFactory {

        /**
         * @class SimpleLayout.LayoutAssetsFactory
         * @classdesc TThe LayoutAssetsFactory class is a utility class for creating and clearing all the
         * layout tree displayObjects and displayObjectContainers.
         */
        constructor() {

        }

         /**
         * Using the given assetsFactory to create all the displayObjects and displayObjectContainers of the UI.
         *
         * @method SimpleLayout.LayoutAssetsFactory#createAssets
         * @static
         * @param rootNode {LayoutContainer} the root node to start from.
         * @param assetsFactory {IAssetsFactory} an object that implements the IAssetsFactory interface.
         */
        public static createAssets(rootNode:LayoutContainer, assetsFactory:IAssetsFactory):void {
            this.clearAssets(rootNode);
            this.createNodeAssets(rootNode, assetsFactory);
        }

        private static createNodeAssets(node:LayoutContainer, assetsFactory:IAssetsFactory):void {
            var containerWrapper = assetsFactory.createDisplayObjectContainer();
            containerWrapper.name = node.name;
            node.setDisplayObject(containerWrapper);

            for (var i:number = 0; i < node.countLayoutItems; i++) {
                var layoutItem:LayoutItem = node.getLayoutItemAt(i);

                if (layoutItem.getLayoutItemType() === 'LayoutContainer') {
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

        /**
         * Removed all the assets from the layout [calling setDisplayObject(null)] on all the layout items.
         *
         * @method SimpleLayout.LayoutAssetsFactory#clearAssets
         * @static
         * @param rootNode {LayoutContainer} The root node to start from.
         */
        public static clearAssets(rootNode:LayoutContainer):void {
            for (var i:number = 0; i < rootNode.countLayoutItems; i++) {
                var layoutItem:LayoutItem = rootNode.getLayoutItemAt(i);
                layoutItem.setDisplayObject(null);

                if (layoutItem.getLayoutItemType() === 'LayoutContainer') {
                    this.clearAssets(<LayoutContainer>layoutItem);
                }
            }
            rootNode.setDisplayObject(null);
        }
    }
}