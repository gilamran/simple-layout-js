module SimpleLayout.CreateJSImpl {

    export class AtlasAssetsFactory_CreateJS implements IAssetsFactory {
        private m_spriteSheet:createjs.SpriteSheet;

        public constructor (private data:any) {
        }

        public hasAssetsToLoad():boolean {
            return (this.data!=null && this.data.atlasJson!=null);
        }

        public getAssetsIds():string[] {
            if (this.m_spriteSheet)
                return this.m_spriteSheet.getAnimations();
            else
                return [];
        }

        public loadAssets(doneCallback:() => void, errorCallback:(errorMessage:string) => void, progressCallback:(percentDone:number) => void):void {
            this.disposeAssets();

            try {
                if (this.data.atlasImageUrl)
                    this.data.atlasJson.images = [this.data.atlasImageUrl];
                this.m_spriteSheet = new createjs.SpriteSheet(this.data.atlasJson);

                if (this.m_spriteSheet.complete) {
                    doneCallback();
                }
                else {
                    this.m_spriteSheet.addEventListener('complete', () => {
                        doneCallback();
                    });
                    this.m_spriteSheet.addEventListener('error', () => {
                        errorCallback('Unable to load the atlas');
                    });
                }
            }
            catch (error) {
                errorCallback(error.message);
            }
        }

        public disposeAssets():void {
            this.m_spriteSheet = null;
        }

        public hasAsset(assetId:string):Boolean {
            return this.getAssetsIds().indexOf(assetId) > -1;
        }

        public createDisplayObjectContainer():SimpleLayout.displayObject.IDisplayObjectContainer {
            var container              : createjs.Container;
            var displayObjectContainer : SimpleLayout.displayObject.IDisplayObjectContainer;

            container = new createjs.Container();
            displayObjectContainer = new SimpleLayout.CreateJSImpl.CreateJSContainerWrapper( container );

            return displayObjectContainer;
        }

        public createDisplayObject(assetId:string):SimpleLayout.displayObject.IDisplayObject {
            if (!this.m_spriteSheet)
                return null;

            var displayObject           : createjs.DisplayObject;
            var displayObjectWrapper    : SimpleLayout.displayObject.IDisplayObject;

            displayObject = new createjs.Sprite(this.m_spriteSheet, assetId);
            displayObjectWrapper = new SimpleLayout.CreateJSImpl.CreateJSDisplayObjectWrapper(displayObject);

            return displayObjectWrapper;
        }

    }
}
