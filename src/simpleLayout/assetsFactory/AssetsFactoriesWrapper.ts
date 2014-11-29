module SimpleLayout.assetsFactory {

    export interface IAssetsFactoryData {
        className   : string;
        data        : any;
    }

    export interface IAssetsFactoriesData {
        atlasAssetsFactoryData?     : IAssetsFactoryData;
        imagesAssetsFactoryData?    : IAssetsFactoryData;
        externalAssetsFactoryData?  : IAssetsFactoryData;
    }

    export class AssetsFactoriesWrapper implements IAssetsFactory {

        private m_assetsFactories        : IAssetsFactory[];

        public constructor (assetsFactoriesData:IAssetsFactoriesData) {
            if (!assetsFactoriesData) {
                throw new Error('Could not initializer AssetsFactoriesWrapper, Bad param');
            }

            this.m_assetsFactories = [];
            this.createFactory(assetsFactoriesData.atlasAssetsFactoryData);
            this.createFactory(assetsFactoriesData.imagesAssetsFactoryData);
            this.createFactory(assetsFactoriesData.externalAssetsFactoryData);
        }

        private createFactory(factoryData : IAssetsFactoryData):any {
            if (factoryData) {
                var factoryClass = this.getClassFromGlobalScope(factoryData.className);
                var factoryObj = new factoryClass(factoryData.data);
                if (factoryObj.hasAssetsToLoad()) {
                    this.m_assetsFactories.push(factoryObj);
                }
                return factoryObj;
            }
            else {
                return null;
            }
        }

        public hasAssetsToLoad():boolean {
            return (this.m_assetsFactories.length>0);
        }

        private getClassFromGlobalScope(className:string):any {
            var parts = className.split('.');
            var innerObj = window;
            for (var i = 0, l = parts.length; i < l; i++) {
                var part = parts[i];
                if (innerObj !== null && typeof innerObj === "object" && part in innerObj) {
                    innerObj = innerObj[part];
                }
                else {
                    throw new Error('Could not initializer AssetsFactoriesWrapper, class "' + className + '" could not be found.');
                }
            }
            return innerObj;
        }

        public loadAssets(doneCallback: () => void, errorCallback: (errorMessage: string) => void, progressCallback: (percentDone: number) => void): void {
            var totalToLoad : number = this.m_assetsFactories.length;
            var loaded      : number = 0;
            var doneCalled  : boolean = false;
            var terminated  : boolean = false;

            try {
                for (var i=0; i<this.m_assetsFactories.length; i++) {
                    var managedAssetsFactory = this.m_assetsFactories[i];
                    managedAssetsFactory.loadAssets(
                        () => {
                            loaded++;
                            if (doneCalled===false && loaded===totalToLoad && doneCallback) {
                                doneCallback();
                                doneCalled = true;
                            }
                        },
                        (errorMessage: string) => {
                            if (terminated === false) {
                                errorCallback(errorMessage);
                            }
                        },
                        (percentDone: number) => {
                            if (terminated === false) {
                                progressCallback(percentDone);
                            }
                        }
                    )
                }

                // in case that we don't have anything to load, or everything was loaded
                if (doneCalled===false && loaded===totalToLoad && doneCallback) {
                    doneCallback();
                }
            }
            catch (error) {
                errorCallback(error.message);
            }
        }

        public getAssetsIds(): string[] {
            var result = [];
            for (var i=0; i<this.m_assetsFactories.length; i++) {
                var managedAssetsFactory = this.m_assetsFactories[i];
                result = result.concat(managedAssetsFactory.getAssetsIds());
            }

            return result;
        }

        public disposeAssets(): void {
            while (this.m_assetsFactories.length>0) {
                var managedAssetsFactory = this.m_assetsFactories.pop();
                managedAssetsFactory.disposeAssets();
            }
        }

        public hasAsset(assetId:string):Boolean {
            return this.getAssetsIds().indexOf(assetId) > -1;
        }

        public createDisplayObject(assetId: string): SimpleLayout.displayObject.IDisplayObject {
            for (var i=0; i<this.m_assetsFactories.length; i++) {
                var managedAssetsFactory = this.m_assetsFactories[i];
                if (managedAssetsFactory.hasAsset(assetId))
                    return managedAssetsFactory.createDisplayObject(assetId);
            }

            return null;
        }

        public createDisplayObjectContainer(): SimpleLayout.displayObject.IDisplayObjectContainer {
            if (this.m_assetsFactories.length > 0) {
                return this.m_assetsFactories[0].createDisplayObjectContainer();
            }
            else {
                return null;
            }
        }

    }

}
