declare module SimpleLayout {
    class LayoutItem {
        layoutItemType: string;
        parent: LayoutContainer;
        displayObject: displayObject.IDisplayObject;
        requestedWidthPercent: number;
        requestedHeightPercent: number;
        horizontalAlign: string;
        verticalAlign: string;
        fittedIntoWidth: number;
        fittedIntoHeight: number;
        keepAspectRatio: boolean;
        assetId: string;
        private m_name;
        constructor(dispObj?: displayObject.IDisplayObject);
        name: string;
        toJson(): any;
        fromJson(json: any): void;
        setDisplayObject(value: displayObject.IDisplayObject): void;
        private fitToSize(dispObj, w?, h?);
        executeLayout(): void;
        fitInto(w: number, h: number): void;
        dispose(): void;
    }
}
declare module SimpleLayout {
    class LayoutContainer extends LayoutItem {
        layout: layout.ILayout;
        private m_layoutItems;
        constructor();
        toJson(): any;
        fromJson(json: any): any;
        layoutItems: LayoutItem[];
        displayObjectContainer: displayObject.IDisplayObjectContainer;
        executeLayout(): void;
        getLayoutItemAt(index: number): LayoutItem;
        private removeAllDisplayObjects();
        rearrangeLayoutItems(): void;
        addLayoutItem(layoutItem: LayoutItem, index?: number): LayoutItem;
        removeLayoutItem(layoutItem: LayoutItem): LayoutItem;
        removeAllLayoutItems(): void;
        countLayoutItems: number;
        dispose(): void;
    }
}
declare module SimpleLayout {
    class LayoutView extends LayoutContainer {
        constructor();
        static itemFromJson(json: any): LayoutItem;
        createAssets(assetsFactory: IAssetsFactory): void;
        private createNodeAssets(node, assetsFactory);
        clearAssets(): void;
        private clearNodeAssets(node);
        dispose(): void;
    }
}
interface IAssetsFactory {
    createDisplayObject(assetId: string): SimpleLayout.displayObject.IDisplayObject;
    createDisplayObjectContainer(): SimpleLayout.displayObject.IDisplayObjectContainer;
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
        dispose(): void;
    }
}
declare module SimpleLayout.displayObject {
    interface IDisplayObjectContainer extends IDisplayObject {
        addChild(child: IDisplayObject): void;
        removeChild(child: IDisplayObject): void;
        removeAllChildren(): void;
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
        paddingTop: number;
        paddingBottom: number;
        paddingLeft: number;
        paddingRight: number;
        gap: number;
        snapToPixels: boolean;
        horizontalAlign: string;
        verticalAlign: string;
        lastError: string;
        layoutVisualizer: visualizer.ILayoutVisualizer;
        constructor();
        toJson(): any;
        fromJson(json: any): void;
        getLayoutType(): string;
        setLayoutVisualizer(value: visualizer.ILayoutVisualizer): void;
        getLayoutVisualizer(): visualizer.ILayoutVisualizer;
        fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
        dispose(): void;
    }
}
declare module SimpleLayout.layout {
    class HorizontalLayout extends BasicLayout {
        constructor();
        getLayoutType(): string;
        fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
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
        getLayoutType(): string;
        toJson(): any;
        dispose(): void;
    }
}
declare module SimpleLayout.layout {
    class VerticalLayout extends BasicLayout {
        constructor();
        getLayoutType(): string;
        fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
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
        dispose(): void;
    }
}
