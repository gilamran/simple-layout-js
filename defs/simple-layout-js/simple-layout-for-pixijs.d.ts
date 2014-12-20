/// <reference path="../pixi/pixi.d.ts" />
declare module SimpleLayout.PixiJSImpl {
    class PixiJSDisplayObjectWrapper implements displayObject.IDisplayObject {
        private m_wrappedDispObj;
        private m_name;
        constructor(pixiJSDisplayObject: PIXI.DisplayObject);
        getPivotPoint(): displayObject.IPoint;
        getGlobalPos(): displayObject.IPoint;
        getConcreteDisplayObject(): Object;
        width: number;
        height: number;
        scaleX: number;
        scaleY: number;
        visible: boolean;
        resetScaling(): void;
        x: number;
        y: number;
        rotation: number;
        name: string;
        dispose(): void;
    }
}
declare module SimpleLayout.PixiJSImpl {
    class AtlasAssetsFactory_PixiJS implements IAssetsFactory {
        private data;
        private m_loader;
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
declare module SimpleLayout.PixiJSImpl {
    class ImagesAssetsFactory_PixiJS extends assetsFactory.BaseImagesAssetsFactory implements IAssetsFactory {
        constructor(imagesAssetData: assetsFactory.IImageAssetData[]);
        createDisplayObjectContainer(): displayObject.IDisplayObjectContainer;
        createDisplayObject(assetId: string): displayObject.IDisplayObject;
        private createPixiDisplayObject(assetId);
    }
}
declare module SimpleLayout.PixiJSImpl {
    class PixiJSContainerWrapper extends PixiJSDisplayObjectWrapper implements displayObject.IDisplayObjectContainer {
        private m_givenWidth;
        private m_givenHeight;
        constructor(pixiJSContainer: PIXI.DisplayObjectContainer);
        width: number;
        height: number;
        displayObjectContainer: PIXI.DisplayObjectContainer;
        addChild(child: displayObject.IDisplayObject): void;
        removeChild(child: displayObject.IDisplayObject): void;
        removeAllChildren(): void;
    }
}
declare module SimpleLayout.PixiJSImpl {
    class PixiJSLayoutVisualizer extends PIXI.Graphics implements visualizer.ILayoutVisualizer {
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
        update(): void;
        dispose(): void;
    }
}
