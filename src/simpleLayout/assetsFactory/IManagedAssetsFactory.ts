interface IManagedAssetsFactory extends IAssetsFactory {
    loadAssets(doneCallback:() => void, errorCallback:(errorMessage:string) => void, progressCallback:(percentDone:number) => void):void;
    getAssetsIds():string[];
    disposeAssets():void;
}