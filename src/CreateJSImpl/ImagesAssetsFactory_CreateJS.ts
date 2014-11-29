module SimpleLayout.CreateJSImpl {

    export class ImagesAssetsFactory_CreateJS extends assetsFactory.BaseImagesAssetsFactory implements IAssetsFactory {

        public constructor (imagesAssetData:assetsFactory.IImageAssetData[]) {
            super(imagesAssetData);
        }

        public createDisplayObjectContainer():SimpleLayout.displayObject.IDisplayObjectContainer {
            var container              : createjs.Container;
            var displayObjectContainer : SimpleLayout.displayObject.IDisplayObjectContainer;

            container = new createjs.Container();
            displayObjectContainer = new SimpleLayout.CreateJSImpl.CreateJSContainerWrapper( container );

            return displayObjectContainer;
        }

        public createDisplayObject(assetId:string):SimpleLayout.displayObject.IDisplayObject {
            var shape         : createjs.DisplayObject;
            var displayObject : SimpleLayout.displayObject.IDisplayObject;

            shape = this.createSprite(assetId);
            displayObject = new SimpleLayout.CreateJSImpl.CreateJSDisplayObjectWrapper(shape);

            return displayObject;
        }

        private createSprite(assetId:string):createjs.DisplayObject {
            var image : HTMLImageElement = this.getAssetData(assetId).image;
            var shape = new createjs.Bitmap(image);

            return shape;
        }
    }
}
