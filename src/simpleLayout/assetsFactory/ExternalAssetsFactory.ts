declare var GlobalAssetsFactory;

module SimpleLayout.assetsFactory {

    export class ExternalAssetsFactory implements IAssetsFactory {

        private m_editorAssetFactory    : IAssetsFactory;
        private m_scriptsLoader         : utils.ScriptsLoader;

        public constructor (private scriptsUrls:string[]) {
        }

        public hasAssetsToLoad():boolean {
            return this.scriptsUrls.length>0;
        }

        public getAssetsIds():string[] {
            if (this.m_editorAssetFactory === null) {
                throw new Error('Unable to call getAssetsIds (Maybe the scripts did not load properly?)');
            }
            return this.m_editorAssetFactory.getAssetsIds();
        }

        public loadAssets(doneCallback:() => void, errorCallback:(errorMessage:string) => void, progressCallback:(percentDone:number) => void):void {
            try {
                this.disposeAssets();
                this.m_scriptsLoader = new utils.ScriptsLoader();
                this.m_scriptsLoader.addScriptsToLoad(this.scriptsUrls);
                this.m_scriptsLoader.load(() => {
                    try {
                        this.m_editorAssetFactory = GlobalAssetsFactory;
                    }
                    catch (e) {
                        throw new Error('The script was loaded but was unable to find a global object named GlobalAssetsFactory.');
                    }

                    this.m_editorAssetFactory.loadAssets(
                        () => {
                            doneCallback();
                        },
                        (errorDesc) => {
                            errorCallback(errorDesc);
                        },
                        (progress:number) => {
                            progressCallback(progress);
                        }
                    );
                },
                (errorDesc:string) => {
                    errorCallback(errorDesc);
                });
            }
            catch (error) {
                errorCallback(error.message);
            }
        }

        public disposeAssets():void {
            if (this.m_scriptsLoader) {
                this.m_scriptsLoader.reset();
                this.m_scriptsLoader = null;
            }
        }

        public hasAsset(assetId:string):Boolean {
            return this.getAssetsIds().indexOf(assetId) > -1;
        }

        public createDisplayObjectContainer():SimpleLayout.displayObject.IDisplayObjectContainer {
            if (this.m_editorAssetFactory === null) {
                throw new Error('Unable to call createDisplayObjectContainer (Maybe the scripts did not load properly?)');
            }
            return this.m_editorAssetFactory.createDisplayObjectContainer();
        }

        public createDisplayObject(assetId:string):SimpleLayout.displayObject.IDisplayObject {
            if (this.m_editorAssetFactory === null) {
                throw new Error('Unable to call createDisplayObject (Maybe the scripts did not load properly?)');
            }
            return this.m_editorAssetFactory.createDisplayObject(assetId);
        }

    }
}
