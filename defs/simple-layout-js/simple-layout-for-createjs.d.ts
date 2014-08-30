/// <reference path='../easeljs/easeljs.d.ts' />
declare module SimpleLayout.CreateJSImpl {
    class CreateJSDisplayObjectWrapper implements displayObject.IDisplayObject {
        private m_wrappedDispObj;
        constructor(createjsDisplayObject: createjs.DisplayObject);
        allowResize: boolean;
        concreteDisplayObject: Object;
        globalPos: displayObject.IPoint;
        width: number;
        height: number;
        resetScaling(): void;
        x: number;
        y: number;
        name: string;
        dispose(): void;
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
    }
}
declare module SimpleLayout.CreateJSImpl {
    class CreateJSLayoutVisualizer extends createjs.Shape implements visualizer.ILayoutVisualizer {
        attachedTo: layout.ILayout;
        highlightedLayoutItem: LayoutItem;
        constructor();
        setDebugFitAreaSize(w: number, h: number): void;
        setDebugPadding(w: number, h: number, topPadding: number, bottomPadding: number, leftPadding: number, rightPadding: number): void;
        setDebugGap(x: number, y: number, width: number, height: number): void;
        setDebugItem(layoutItem: LayoutItem, x: number, y: number, width: number, height: number): void;
        setAlpha(alpha: number): void;
        setPosition(point: displayObject.IPoint): void;
        clear(): void;
        update(): void;
        dispose(): void;
    }
}
