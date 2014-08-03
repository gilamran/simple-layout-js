/// <reference path="../pixi/pixi.d.ts" />
declare module SimpleLayout.PixiJSImpl {
    class PixiJSDisplayObjectWrapper implements displayObject.IDisplayObject {
        private m_wrappedDispObj;
        private m_name;
        constructor(pixiJSDisplayObject: PIXI.DisplayObject);
        public globalPos : displayObject.IPoint;
        public allowResize : boolean;
        public concreteDisplayObject : Object;
        public width : number;
        public height : number;
        public resetScaling(): void;
        public x : number;
        public y : number;
        public name : string;
        public dispose(): void;
    }
}
declare module SimpleLayout.PixiJSImpl {
    class PixiJSContainerWrapper extends PixiJSDisplayObjectWrapper implements displayObject.IDisplayObjectContainer {
        private m_givenWidth;
        private m_givenHeight;
        constructor(pixiJSContainer: PIXI.DisplayObjectContainer);
        public width : number;
        public height : number;
        public displayObjectContainer : PIXI.DisplayObjectContainer;
        public addChild(child: displayObject.IDisplayObject): void;
        public removeChild(child: displayObject.IDisplayObject): void;
    }
}
declare module SimpleLayout.PixiJSImpl {
    class PixiJSLayoutVisualizer extends PIXI.Graphics implements visualizer.ILayoutVisualizer {
        public attachedTo: layout.ILayout;
        public highlightedLayoutItem: LayoutItem;
        constructor();
        public setDebugFitAreaSize(w: number, h: number): void;
        public setDebugPadding(w: number, h: number, topPadding: number, bottomPadding: number, leftPadding: number, rightPadding: number): void;
        public setDebugGap(x: number, y: number, width: number, height: number): void;
        public setDebugItem(layoutItem: LayoutItem, x: number, y: number, width: number, height: number): void;
        public setAlpha(alpha: number): void;
        public setPosition(point: displayObject.IPoint): void;
        public update(): void;
        public dispose(): void;
    }
}
