declare module SimpleLayout {
    class LayoutItem {
        public parent: LayoutContainer;
        public requestedWidthPercent: number;
        public requestedHeightPercent: number;
        public horizontalAlign: string;
        public verticalAlign: string;
        public fittedIntoWidth: number;
        public fittedIntoHeight: number;
        public displayObject: displayObject.IDisplayObject;
        public keepAspectRatio: boolean;
        private m_name;
        constructor(dispObj: displayObject.IDisplayObject);
        public name : string;
        public setDisplayObject(value: displayObject.IDisplayObject): void;
        private fitToSize(dispObj, w?, h?);
        public executeLayout(): void;
        public fitInto(w: number, h: number): void;
    }
}
declare module SimpleLayout {
    class LayoutContainer extends LayoutItem {
        public layout: layout.ILayout;
        private m_layoutItems;
        constructor(dispObjCont: displayObject.IDisplayObjectContainer);
        public layoutItems : LayoutItem[];
        public displayObjectContainer : displayObject.IDisplayObjectContainer;
        public executeLayout(): void;
        public getLayoutItemAt(index: number): LayoutItem;
        public addLayoutItem(layoutItem: LayoutItem, index?: number): LayoutItem;
        public removeLayoutItem(layoutItem: LayoutItem): LayoutItem;
        public removeAllLayoutItems(): void;
        public countLayoutItems : number;
    }
}
declare module SimpleLayout.displayObject {
    interface IPoint {
        x: number;
        y: number;
    }
    interface IDisplayObject {
        width: number;
        height: number;
        x: number;
        y: number;
        name: string;
        concreteDisplayObject: Object;
        globalPos: IPoint;
        resetScaling(): void;
    }
}
declare module SimpleLayout.displayObject {
    interface IDisplayObjectContainer extends IDisplayObject {
        addChild(child: IDisplayObject): void;
        removeChild(child: IDisplayObject): void;
    }
}
declare module SimpleLayout.enums {
    class HorizontalAlignEnum {
        static H_ALIGN_TYPE_NONE: string;
        static H_ALIGN_TYPE_CENTER: string;
        static H_ALIGN_TYPE_LEFT: string;
        static H_ALIGN_TYPE_RIGHT: string;
    }
}
declare module SimpleLayout.enums {
    class VerticalAlignEnum {
        static V_ALIGN_TYPE_NONE: string;
        static V_ALIGN_TYPE_MIDDLE: string;
        static V_ALIGN_TYPE_TOP: string;
        static V_ALIGN_TYPE_BOTTOM: string;
    }
}
declare module SimpleLayout.layout {
    class BasicLayout implements ILayout {
        public paddingTop: number;
        public paddingBottom: number;
        public paddingLeft: number;
        public paddingRight: number;
        public gap: number;
        public snapToPixels: boolean;
        public horizontalAlign: string;
        public verticalAlign: string;
        public lastError: string;
        public layoutVisualizer: visualizer.ILayoutVisualizer;
        constructor();
        public setLayoutVisualizer(value: visualizer.ILayoutVisualizer): void;
        public getLayoutVisualizer(): visualizer.ILayoutVisualizer;
        public fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
    }
}
declare module SimpleLayout.layout {
    class HorizontalLayout extends BasicLayout {
        constructor();
        public fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
    }
}
declare module SimpleLayout.layout {
    interface ILayout {
        horizontalAlign: string;
        verticalAlign: string;
        gap: number;
        paddingTop: number;
        paddingBottom: number;
        paddingLeft: number;
        paddingRight: number;
        snapToPixels: boolean;
        fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
        setLayoutVisualizer(value: visualizer.ILayoutVisualizer): void;
        getLayoutVisualizer(): visualizer.ILayoutVisualizer;
    }
}
declare module SimpleLayout.layout {
    class VerticalLayout extends BasicLayout {
        constructor();
        public fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
    }
}
declare module SimpleLayout.visualizer {
    interface ILayoutVisualizer {
        highlightedLayoutItem: LayoutItem;
        attachedTo: layout.ILayout;
        setDebugFitAreaSize(w: number, h: number): void;
        setDebugPadding(w: number, h: number, topPadding: number, bottomPadding: number, leftPadding: number, rightPadding: number): void;
        setDebugGap(x: number, y: number, width: number, height: number): void;
        setDebugItem(layoutItem: LayoutItem, x: number, y: number, width: number, height: number): void;
        setAlpha(alpha: number): void;
        setPosition(point: displayObject.IPoint): void;
        update(): void;
        clear(): void;
    }
}
