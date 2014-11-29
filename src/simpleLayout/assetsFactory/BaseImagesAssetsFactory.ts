module SimpleLayout.assetsFactory {

    export interface IAssetData {
        imageUrl : string;
        image    : HTMLImageElement;
    }


    export interface IImageAssetData {
        assetId     : string;
        imageUrl    : string;
    }

    export class BaseImagesAssetsFactory implements IAssetsFactory {
        private m_assetsMap     : Object;

        public constructor (imagesAssetData:IImageAssetData[]) {
            this.m_assetsMap = {};
            for (var i:number=0; i<imagesAssetData.length; i++) {
                var imageAssetData : IImageAssetData = imagesAssetData[i];
                this.registerAsset(imageAssetData.assetId, imageAssetData.imageUrl);
            }
        }

        public hasAssetsToLoad():boolean {
            return this.getAssetsIds().length>0;
        }

        public getAssetsIds():string[] {
            return Object.keys(this.m_assetsMap);
        }

        public registerAsset(assetId:string, imageUrl:string) {
            if (this.m_assetsMap.hasOwnProperty(assetId)==true)
                throw new Error('Asset ' + assetId + ' already exist');

            this.m_assetsMap[assetId] = {imageUrl:imageUrl, image:null};
        }

        public getAssetData(assetId:string):IAssetData {
            return this.m_assetsMap[assetId];
        }

        public hasAsset(assetId:string):Boolean {
            return this.getAssetsIds().indexOf(assetId) > -1;
        }

        public loadAssets(doneCallback:() => void, errorCallback:(errorMessage:string) => void, progressCallback:(percentDone:number) => void):void {
            this.disposeAssets();

            var assetsIds         : string[] = this.getAssetsIds();
            var totalAssetsToLoad : number = 0;
            var assetsLoaded      : number = 0;

            try {
                for (var i:number=0; i<assetsIds.length; i++) {
                    var assetId     : string = assetsIds[i];
                    var assetData   : any = this.getAssetData(assetId);
                    var image       : HTMLImageElement = document.createElement('img');

                    image.src = assetData.imageUrl;

                    assetData.image = image;
                    totalAssetsToLoad++;
                    image.addEventListener('load', () => {
                        assetsLoaded++;
                        progressCallback(assetsLoaded/totalAssetsToLoad);

                        if (totalAssetsToLoad===assetsLoaded) {
                            doneCallback();
                        }
                    });
                }

                if (doneCallback && totalAssetsToLoad===assetsLoaded){
                    doneCallback();}
            }
            catch (error) {
                errorCallback(error.message);
            }
        }

        public disposeAssets():void {
            for (var assetId in this.m_assetsMap) {
                var assetData : IAssetData = this.m_assetsMap[assetId];
                var image : HTMLImageElement = assetData.image;
                if (image) {
                    image.src = '';
                }
                assetData.image = null;
            }
        }

        public createDisplayObjectContainer():SimpleLayout.displayObject.IDisplayObjectContainer {
            throw new Error('Must override the "createDisplayObjectContainer" function');
        }

        public createDisplayObject(assetId:string):SimpleLayout.displayObject.IDisplayObject {
            throw new Error('Must override the "createDisplayObject" function');
        }
    }
}
