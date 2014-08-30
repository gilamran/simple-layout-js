/// <reference path='../pixi/pixi.d.ts' />
declare module SimpleLayout.PixiJSImpl {
    class PixiJSDisplayObjectWrapper implements displayObject.IDisplayObject {
        private m_wrappedDispObj;
        private m_name;
        constructor(pixiJSDisplayObject: PIXI.DisplayObject);
        globalPos: displayObject.IPoint;
        allowResize: boolean;
        concreteDisplayObject: Object;
        width: number;
        height: number;
        x: number;
        resetScaling(): void;
        y: number;
        name: string;
        dispose(): void;
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
    }
}
declare module SimpleLayout.PixiJSImpl {
    class PixiJSLayoutVisualizer extends PIXI.Graphics implements visualizer.ILayoutVisualizer {
        attachedTo: layout.ILayout;
        highlightedLayoutItem: LayoutItem;
        constructor();
        setDebugFitAreaSize(w: number, h: number): void;
        setDebugPadding(w: number, h: number, topPadding: number, bottomPadding: number, leftPadding: number, rightPadding: number): void;
        setDebugGap(x: number, y: number, width: number, height: number): void;
        setDebugItem(layoutItem: LayoutItem, x: number, y: number, width: number, height: number): void;
        setAlpha(alpha: number): void;
        setPosition(point: displayObject.IPoint): void;
        update(): void;
        dispose(): void;
    }
}
