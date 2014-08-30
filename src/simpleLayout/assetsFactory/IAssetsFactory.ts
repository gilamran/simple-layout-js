interface IAssetsFactory {
    createDisplayObject(assetId:string):SimpleLayout.displayObject.IDisplayObject;
    createDisplayObjectContainer():SimpleLayout.displayObject.IDisplayObjectContainer;
}