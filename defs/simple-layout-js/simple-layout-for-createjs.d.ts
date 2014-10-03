/// <reference path="../easeljs/easeljs.d.ts" />
declare module SimpleLayout.CreateJSImpl {
    class CreateJSDisplayObjectWrapper implements displayObject.IDisplayObject {
        private m_wrappedDispObj;
        constructor(createjsDisplayObject: createjs.DisplayObject);
        public allowResize : boolean;
        public getConcreteDisplayObject(): Object;
        public getPivotPoint(): displayObject.IPoint;
        public getGlobalPos(): displayObject.IPoint;
        public width : number;
        public height : number;
        public resetScaling(): void;
        public visible : boolean;
        public x : number;
        public y : number;
        public name : string;
        public dispose(): void;
    }
}
declare module SimpleLayout.CreateJSImpl {
    class CreateJSContainerWrapper extends CreateJSDisplayObjectWrapper implements displayObject.IDisplayObjectContainer {
        private m_givenWidth;
        private m_givenHeight;
        constructor(createjsContainer: createjs.Container);
        public width : number;
        public height : number;
        public displayObjectContainer : createjs.Container;
        public addChild(child: displayObject.IDisplayObject): void;
        public removeChild(child: displayObject.IDisplayObject): void;
        public removeAllChildren(): void;
    }
}
declare module SimpleLayout.CreateJSImpl {
    class CreateJSLayoutVisualizer extends createjs.Shape implements visualizer.ILayoutVisualizer {
        public attachedTo: layout.ILayout;
        public highlightedLayoutItem: LayoutItem;
        constructor();
        public setDebugFitAreaSize(w: number, h: number): void;
        public setDebugPadding(w: number, h: number, topPadding: number, bottomPadding: number, leftPadding: number, rightPadding: number): void;
        public setDebugGap(x: number, y: number, width: number, height: number): void;
        public setDebugItem(layoutItem: LayoutItem, x: number, y: number, width: number, height: number): void;
        public setAlpha(alpha: number): void;
        public setPosition(point: displayObject.IPoint): void;
        public clear(): void;
        public update(): void;
        public dispose(): void;
    }
}
