/// <reference path="../easeljs/easeljs.d.ts" />
declare module SimpleLayout.CreateJSImpl {
    class CreateJSDisplayObjectWrapper implements displayObject.IDisplayObject {
        private m_wrappedDispObj;
        constructor(createjsDisplayObject: createjs.DisplayObject);
        getConcreteDisplayObject(): Object;
        getPivotPoint(): displayObject.IPoint;
        getGlobalPos(): displayObject.IPoint;
        width: number;
        height: number;
        scaleX: number;
        scaleY: number;
        resetScaling(): void;
        visible: boolean;
        x: number;
        y: number;
        rotation: number;
        name: string;
        dispose(): void;
    }
}
declare module SimpleLayout.CreateJSImpl {
    class AtlasAssetsFactory_CreateJS implements IAssetsFactory {
        private data;
        private m_spriteSheet;
        constructor(data: any);
        hasAssetsToLoad(): boolean;
        getAssetsIds(): string[];
        loadAssets(doneCallback: () => void, errorCallback: (errorMessage: string) => void, progressCallback: (percentDone: number) => void): void;
        disposeAssets(): void;
        hasAsset(assetId: string): Boolean;
        createDisplayObjectContainer(): displayObject.IDisplayObjectContainer;
        createDisplayObject(assetId: string): displayObject.IDisplayObject;
    }
}
declare module SimpleLayout.CreateJSImpl {
    class CreateJSContainerWrapper extends CreateJSDisplayObjectWrapper implements displayObject.IDisplayObjectContainer {
        private m_givenWidth;
        private m_givenHeight;
        constructor(createjsContainer: createjs.Container);
        width: number;
        height: number;
        displayObjectContainer: createjs.Container;
        addChild(child: displayObject.IDisplayObject): void;
        removeChild(child: displayObject.IDisplayObject): void;
        removeAllChildren(): void;
    }
}
declare module SimpleLayout.CreateJSImpl {
    class CreateJSLayoutVisualizer extends createjs.Shape implements visualizer.ILayoutVisualizer {
        isActive: Boolean;
        filterByLayoutItem: LayoutItem;
        filterByLayoutContainer: LayoutContainer;
        constructor();
        setDebugLayoutItem(layoutContainer: LayoutContainer, layoutItem: LayoutItem, x: number, y: number, width: number, height: number): void;
        setDebugLayoutContainer(layoutContainer: LayoutContainer, w: number, h: number): void;
        setDebugPadding(layoutContainer: LayoutContainer, w: number, h: number, topPadding: number, bottomPadding: number, leftPadding: number, rightPadding: number): void;
        setDebugGap(layoutContainer: LayoutContainer, x: number, y: number, width: number, height: number): void;
        setPosition(point: displayObject.IPoint): void;
        setAlpha(alpha: number): void;
        clear(): void;
        update(): void;
        dispose(): void;
    }
}
declare module SimpleLayout.CreateJSImpl {
    class ImagesAssetsFactory_CreateJS extends assetsFactory.BaseImagesAssetsFactory implements IAssetsFactory {
        constructor(imagesAssetData: assetsFactory.IImageAssetData[]);
        createDisplayObjectContainer(): displayObject.IDisplayObjectContainer;
        createDisplayObject(assetId: string): displayObject.IDisplayObject;
        private createSprite(assetId);
    }
}
