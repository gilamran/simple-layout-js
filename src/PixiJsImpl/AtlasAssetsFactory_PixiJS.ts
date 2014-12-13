module SimpleLayout.PixiJSImpl {

    export class AtlasAssetsFactory_PixiJS implements IAssetsFactory {
        private m_loader : PIXI.JsonLoader;

        public constructor (private data:any) {
        }

        public hasAssetsToLoad():boolean {
            return (this.data!=null && this.data.atlasJson!=null);
        }

        public getAssetsIds():string[] {
            if (this.m_loader) {
                return Object.keys((<any>this.m_loader).json.frames);
            }
            else {
                return [];
            }
        }

        public loadAssets(doneCallback:() => void, errorCallback:(errorMessage:string) => void, progressCallback:(percentDone:number) => void):void {
            this.disposeAssets();
            try {
                if (this.data.atlasImageUrl)
                    this.data.atlasJson.meta.image = this.data.atlasImageUrl;
                this.m_loader = new PIXI.JsonLoader('');  // fake loader
                (<any>this.m_loader).ajaxRequest = {responseText: JSON.stringify(this.data.atlasJson)};
                this.m_loader.addEventListener('loaded', doneCallback);
                this.m_loader.addEventListener('error', () => {errorCallback("Unable to load atlas")});
                (<any>this.m_loader).onJSONLoaded();
            }
            catch (error) {
                errorCallback(error.message);
            }
        }

        public disposeAssets():void {
            if (this.m_loader) {
                if ((<any>this.m_loader).texture) {
                    var texture : PIXI.Texture;
                    // destroy the frames
                    var frames = this.getAssetsIds();
                    for (var i:number=0; i<frames.length; i++) {
                        var frame = frames[i];
                        texture = PIXI.TextureCache[frame];
                        texture.destroy(true);
                        delete PIXI.TextureCache[frame];
                    }

                    // destroy the atlas image
                    texture = (<any>this.m_loader).texture;
                    texture.destroy(true);
                }
                this.m_loader = null;
            }
        }

        public hasAsset(assetId:string):Boolean {
            return this.getAssetsIds().indexOf(assetId) > -1;
        }

        public createDisplayObjectContainer():SimpleLayout.displayObject.IDisplayObjectContainer {
            var container              : PIXI.DisplayObjectContainer;
            var displayObjectContainer : SimpleLayout.displayObject.IDisplayObjectContainer;

            container = new PIXI.DisplayObjectContainer();
            displayObjectContainer = new SimpleLayout.PixiJSImpl.PixiJSContainerWrapper( container );

            return displayObjectContainer;
        }

        public createDisplayObject(assetId:string):SimpleLayout.displayObject.IDisplayObject {
            if (!this.m_loader)
                return null;

            var displayObject           : PIXI.DisplayObject;
            var displayObjectWrapper    : SimpleLayout.displayObject.IDisplayObject;

            displayObject = PIXI.Sprite.fromFrame(assetId);
            displayObjectWrapper = new SimpleLayout.PixiJSImpl.PixiJSDisplayObjectWrapper(displayObject);

            return displayObjectWrapper;
        }

    }
}
