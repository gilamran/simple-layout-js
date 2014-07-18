/// <reference path="../easeljs/easeljs.d.ts" />
/// <reference path="../pixi/pixi.d.ts" />

declare module layoutFramework {
    module containers {
        class LayoutContainer extends items.LayoutItem {
            public layout: layout.ILayout;
            private m_children;
            constructor(dispObjCont: displayObject.IDisplayObjectContainer);
            public displayObjectContainer : displayObject.IDisplayObjectContainer;
            public executeLayout(): void;
            public getItemAt(index: number): items.LayoutItem;
            public addLayoutItem(layoutItem: items.LayoutItem): items.LayoutItem;
            public removeItem(layoutItem: items.LayoutItem): items.LayoutItem;
            public clearChildren(): void;
            public numChildItems : number;
        }
    }

    module displayObject {
        interface IDisplayObject {
            width: number;
            height: number;
            x: number;
            y: number;
            name: string;
            concreteDisplayObject: Object;
        }

        interface IDisplayObjectContainer extends IDisplayObject {
            addChild(child: IDisplayObject): void;
            removeChild(child: IDisplayObject): void;
        }

        class CreateJSContainerWrapper extends CreateJSDisplayObjectWrapper implements IDisplayObjectContainer {
            private m_givenWidth;
            private m_givenHeight;
            constructor(createjsContainer: createjs.Container);
            public width : number;
            public height : number;
            public displayObjectContainer : createjs.Container;
            public addChild(child: IDisplayObject): void;
            public removeChild(child: IDisplayObject): void;
        }

        class CreateJSDisplayObjectWrapper implements IDisplayObject {
            private m_wrappedDispObj;
            constructor(createjsDisplayObject: createjs.DisplayObject);
            public allowResize : boolean;
            public concreteDisplayObject : Object;
            public width : number;
            public height : number;
            public x : number;
            public y : number;
            public name : string;
        }

        class PixiJSContainerWrapper extends PixiJSDisplayObjectWrapper implements IDisplayObjectContainer {
            private m_givenWidth;
            private m_givenHeight;
            constructor(pixiJSContainer: PIXI.DisplayObjectContainer);
            public width : number;
            public height : number;
            public displayObjectContainer : PIXI.DisplayObjectContainer;
            public addChild(child: IDisplayObject): void;
            public removeChild(child: IDisplayObject): void;
        }

        class PixiJSDisplayObjectWrapper implements IDisplayObject {
            private m_wrappedDispObj;
            private m_name;
            constructor(pixiJSDisplayObject: PIXI.DisplayObject);
            public allowResize : boolean;
            public concreteDisplayObject : Object;
            public width : number;
            public height : number;
            public x : number;
            public y : number;
            public name : string;
        }
    }

    module enums {
        class HorizontalAlignEnum {
            static H_ALIGN_TYPE_NONE: string;
            static H_ALIGN_TYPE_CENTER: string;
            static H_ALIGN_TYPE_LEFT: string;
            static H_ALIGN_TYPE_RIGHT: string;
        }
        class VerticalAlignEnum {
            static V_ALIGN_TYPE_NONE: string;
            static V_ALIGN_TYPE_MIDDLE: string;
            static V_ALIGN_TYPE_TOP: string;
            static V_ALIGN_TYPE_BOTTOM: string;
        }
    }

    module items {
        class LayoutItem {
            public parent: containers.LayoutContainer;
            public requestedWidthPercent: number;
            public requestedHeightPercent: number;
            public horizontalAlign: string;
            public verticalAlign: string;
            public uniqueID: string;
            public fittedIntoWidth: number;
            public fittedIntoHeight: number;
            public displayObject: displayObject.IDisplayObject;
            public bestFit: boolean;
            private m_id;
            constructor(dispObj: displayObject.IDisplayObject);
            public id : string;
            private fitToSize(dispObj, w?, h?);
            public executeLayout(): void;
            public fitInto(w: number, h: number): void;
        }
    }

    module layout {
        interface ILayout {
            horizontalAlign: string;
            verticalAlign: string;
            gap: string;
            paddingTop: string;
            paddingBottom: string;
            paddingLeft: string;
            paddingRight: string;
            snapToPixels: boolean;
            fitChildrenInto(targetContainer: containers.LayoutContainer, w: number, h: number): void;
            layoutVisualizer: visualizer.ILayoutVisualizer;
        }

        class BasicLayout {
            public paddingTop: string;
            public paddingBottom: string;
            public paddingLeft: string;
            public paddingRight: string;
            public gap: string;
            public snapToPixels: boolean;
            public horizontalAlign: string;
            public verticalAlign: string;
            public layoutVisualizer: visualizer.ILayoutVisualizer;
            constructor();
            public calcPercentField(field: string, percentFrom: number): number;
            public fitChildrenInto(targetContainer: containers.LayoutContainer, w: number, h: number): void;
        }

        class HorizontalLayout extends BasicLayout {
            constructor();
            public fitChildrenInto(targetContainer: containers.LayoutContainer, w: number, h: number): void;
        }

        class VerticalLayout extends BasicLayout {
            constructor();
            public fitChildrenInto(targetContainer: containers.LayoutContainer, w: number, h: number): void;
        }

        module visualizer {
            interface ILayoutVisualizer {
                setDebugPadding(w: number, h: number, topPadding: number, bottomPadding: number, leftPadding: number, rightPadding: number): void;
                setDebugGap(x: number, y: number, width: number, height: number): void;
                setDebugItem(x: number, y: number, width: number, height: number): void;
                setAlpha(alpha: number): void;
                update(): void;
                clear(): void;
            }

            class CreateJSLayoutVisualizer extends createjs.Shape implements ILayoutVisualizer {
                constructor();
                public setDebugPadding(w: number, h: number, topPadding: number, bottomPadding: number, leftPadding: number, rightPadding: number): void;
                public setDebugGap(x: number, y: number, width: number, height: number): void;
                public setDebugItem(x: number, y: number, width: number, height: number): void;
                public setAlpha(alpha: number): void;
                public clear(): void;
                public update(): void;
            }

            class PixiJSLayoutVisualizer extends PIXI.Graphics implements ILayoutVisualizer {
                constructor();
                public setDebugPadding(w: number, h: number, topPadding: number, bottomPadding: number, leftPadding: number, rightPadding: number): void;
                public setDebugGap(x: number, y: number, width: number, height: number): void;
                public setDebugItem(x: number, y: number, width: number, height: number): void;
                public setAlpha(alpha: number): void;
                public update(): void;
            }
        }
    }
}

