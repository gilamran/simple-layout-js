interface IAssetsFactory {
    hasAssetsToLoad():boolean;
    loadAssets(doneCallback:() => void, errorCallback:(errorMessage:string) => void, progressCallback:(percentDone:number) => void):void;
    getAssetsIds():string[];
    hasAsset(assetId:string):Boolean;
    createDisplayObject(assetId:string):SimpleLayout.displayObject.IDisplayObject;
    createDisplayObjectContainer():SimpleLayout.displayObject.IDisplayObjectContainer;
    disposeAssets():void;
}