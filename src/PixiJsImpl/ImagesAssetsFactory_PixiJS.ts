module SimpleLayout.PixiJSImpl {

    export class ImagesAssetsFactory_PixiJS extends assetsFactory.BaseImagesAssetsFactory implements IAssetsFactory {

        public constructor (imagesAssetData:assetsFactory.IImageAssetData[]) {
            super(imagesAssetData);
        }

        public createDisplayObjectContainer():SimpleLayout.displayObject.IDisplayObjectContainer {
            var container              : PIXI.DisplayObjectContainer;
            var displayObjectContainer : SimpleLayout.displayObject.IDisplayObjectContainer;

            container = new PIXI.DisplayObjectContainer();
            displayObjectContainer = new SimpleLayout.PixiJSImpl.PixiJSContainerWrapper( container );

            return displayObjectContainer;
        }

        public createDisplayObject(assetId:string):SimpleLayout.displayObject.IDisplayObject {
            var shape         : PIXI.DisplayObject;
            var displayObject : SimpleLayout.displayObject.IDisplayObject;

            shape = this.createPixiDisplayObject(assetId);
            displayObject = new SimpleLayout.PixiJSImpl.PixiJSDisplayObjectWrapper(shape);

            return displayObject;
        }

        private createPixiDisplayObject(assetId:string):PIXI.DisplayObject {
            var image       : HTMLImageElement = this.getAssetData(assetId).image;
            var baseTexture : PIXI.BaseTexture = new PIXI.BaseTexture(image);
            var texture     : PIXI.Texture = new PIXI.Texture(baseTexture);
            var shape       : PIXI.Sprite = new PIXI.Sprite(texture);
            shape.anchor.x = 0;
            shape.anchor.y = 0;

            return shape;
        }
    }
}
