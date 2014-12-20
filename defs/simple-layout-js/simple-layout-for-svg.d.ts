
declare module SimpleLayout.SVGImpl {
    class SVGDisplayObjectWrapper implements displayObject.IDisplayObject {
        private m_wrappedDispObj;
        private m_translateMat;
        private m_scaleMat;
        private m_rotationMat;
        private m_x;
        private m_y;
        private m_scaleX;
        private m_scaleY;
        private m_rotation;
        constructor(svgElement: SVGElement);
        private svgElement;
        private initMat();
        getPivotPoint(): displayObject.IPoint;
        getGlobalPos(): displayObject.IPoint;
        getConcreteDisplayObject(): Object;
        width: number;
        height: number;
        resetScaling(): void;
        scaleX: number;
        scaleY: number;
        x: number;
        y: number;
        rotation: number;
        visible: boolean;
        name: string;
        dispose(): void;
    }
}
declare module SimpleLayout.SVGImpl {
    class AssetsFactory_SVG implements IAssetsFactory {
        private xmlns;
        private m_assetIDs;
        constructor();
        hasAssetsToLoad(): boolean;
        loadAssets(doneCallback: () => void, errorCallback: (errorMessage: string) => void, progressCallback: (percentDone: number) => void): void;
        getAssetsIds(): string[];
        hasAsset(assetId: string): Boolean;
        createDisplayObjectContainer(): displayObject.IDisplayObjectContainer;
        createDisplayObject(assetId: string): displayObject.IDisplayObject;
        disposeAssets(): void;
    }
}
declare module SimpleLayout.SVGImpl {
    class SVGContainerWrapper extends SVGDisplayObjectWrapper implements displayObject.IDisplayObjectContainer {
        private m_givenWidth;
        private m_givenHeight;
        constructor(svgElement: SVGElement);
        width: number;
        height: number;
        getPivotPoint(): displayObject.IPoint;
        displayObjectContainer: Node;
        addChild(child: displayObject.IDisplayObject): void;
        removeChild(child: displayObject.IDisplayObject): void;
        removeAllChildren(): void;
    }
}
declare module SimpleLayout.SVGImpl {
    class SVGLayoutVisualizer implements visualizer.ILayoutVisualizer {
        private parentElement;
        private xmlns;
        private items;
        private m_translateMat;
        isActive: Boolean;
        filterByLayoutItem: LayoutItem;
        filterByLayoutContainer: LayoutContainer;
        constructor(parentElement: SVGGElement);
        private initMat();
        private createRect(x, y, width, height, color);
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
