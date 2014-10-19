interface IAssetsFactory {
    hasAsset(assetId:string):Boolean;
    createDisplayObject(assetId:string):SimpleLayout.displayObject.IDisplayObject;
    createDisplayObjectContainer():SimpleLayout.displayObject.IDisplayObjectContainer;
}