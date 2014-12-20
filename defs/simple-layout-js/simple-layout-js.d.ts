/**
 * The global namespace for all the Simple Layout framework classes.
 * @namespace SimpleLayout
 */
declare module SimpleLayout {
    interface ISize {
        width: number;
        height: number;
    }
    interface ILayoutItemData {
        layoutItemType: string;
        requestedWidthPercent: number;
        requestedHeightPercent: number;
        horizontalAlign: string;
        verticalAlign: string;
        visible: boolean;
        fittedIntoWidth: number;
        fittedIntoHeight: number;
        fillArea: boolean;
        name: string;
        assetId: string;
        minRatio: number;
        maxRatio: number;
    }
    class LayoutItem {
        private m_visible;
        parent: LayoutContainer;
        displayObject: displayObject.IDisplayObject;
        minRatio: number;
        maxRatio: number;
        requestedWidthPercent: number;
        requestedHeightPercent: number;
        horizontalAlign: string;
        verticalAlign: string;
        fittedIntoWidth: number;
        fittedIntoHeight: number;
        fillArea: boolean;
        name: string;
        assetId: string;
        /**
         * Description of the constructor.
         * @class SimpleLayout.LayoutItem
         * @classdesc The LayoutItem class is the most basic building block for defining your UI layout
         * @param [displayObject] {Object} An object that implements the <b>IDisplayObject</b> interface.
         */
        constructor(displayObject?: displayObject.IDisplayObject);
        /**
         * Because a layout is built using a tree of LayoutContainers and LayoutItems, we have to know the type
         * of the nodes in the tree while building the layout. This is an easy way to get the type of the LayoutItem.
         * This function returns the string "LayoutItem"
         *
         * @method SimpleLayout.LayoutItem#getLayoutItemType
         * @returns {string} "LayoutItem"
         */
        getLayoutItemType(): string;
        /**
         * Sets this LayoutItem's display object that it represents in the layout.
         * A Layout item can exist without a display object and it will take the space that it own, but nothing
         * will be displayed.
         *
         * @method SimpleLayout.LayoutItem#setDisplayObject
         * @param displayObject {Object} An object that implements the <b>IDisplayObject</b> interface.
         */
        setDisplayObject(displayObject: displayObject.IDisplayObject): void;
        visible: boolean;
        /**
         * In a LayoutItem this function will fit the LayoutItem's <b>displayObject</b> into its given width and height.
         * This function is called by the LayoutContainer on all its children LayoutItems (And containers)
         *
         * @method SimpleLayout.LayoutItem#executeLayout
         * @protected
         */
        executeLayout(width: number, height: number): void;
        /**
         * This function will be called by a <b>Layout</b> object.
         *
         * @method SimpleLayout.LayoutItem#fitInto
         * @param givenWidth {Number} A specific width that this LayoutItem can take
         * @param givenHeight {Number} A specific height that this LayoutItem can take
         */
        fitInto(givenWidth: number, givenHeight: number): void;
        private enforceRatio(givenWidth, givenHeight);
        /**
         * @protected
         */
        resetScale(): void;
        /**
         * @protected
         */
        getAssetSize(): ISize;
        /**
         * Serialize the LayoutItem into its properties, the result json can be use to construct a new LayoutItem by
         * calling fromJson function.
         *
         * @method SimpleLayout.LayoutItem#toJson
         * @returns {Object} A Json object that fully describe this LayoutItem
         */
        toJson(): ILayoutItemData;
        /**
         * Copy all the properties from the given json into this LayoutItem.
         *
         * @method SimpleLayout.LayoutItem#fromJson
         * @param json {Object} object that fully describe this LayoutItem
         */
        fromJson(json: ILayoutItemData): void;
        /**
         * Disposing (Setting to null) all the objects that it holds, like <b>parent</b>. If a <b>displayObject</b> was
         * assigned to this LayoutItem, its <b>dispose</b> function will also get called.
         *
         * @method SimpleLayout.LayoutItem#dispose
         */
        dispose(): void;
        private bestFitWithoutStreching(givenWidth, givenHeight, itemWidth, itemHeight);
    }
}
declare module SimpleLayout {
    interface ILayoutContainerData extends ILayoutItemData {
        layout: layout.ILayout;
        layoutItems: LayoutItem[];
        customWidth: number;
        customHeight: number;
    }
    class LayoutContainer extends LayoutItem {
        layout: layout.ILayout;
        private m_layoutItems;
        /**
         * @class SimpleLayout.LayoutContainer
         * @augments SimpleLayout.LayoutItem
         * @classdesc The LayoutContainer class is the a holder of LayoutItems. its displayObject property actually
         * holds a displayObjectContainer. It doesn't have a regular displayObject (A graphical entity).
         */
        constructor();
        /**
         * This is an override to LayoutItem.getLayoutItemType, and this function returns the string "LayoutContainer"
         *
         * @method SimpleLayout.LayoutContainer#getLayoutItemType
         * @returns {string} "LayoutContainer"
         */
        getLayoutItemType(): string;
        /**
         * This is an override to LayoutItem.toJson
         *
         * @method SimpleLayout.LayoutContainer#toJson
         * @returns {Object} A Json object that fully describe this LayoutContainer
         */
        toJson(): ILayoutContainerData;
        /**
         * A factory function to create a LayoutContainer or LayoutItem according the to the <b>layoutItemType</b> in
         * the given json object.
         * This function is being used internally when calling the LayoutContainer.fromJson function.
         *
         * @method SimpleLayout.LayoutContainer#itemFromJson
         * @static
         * @returns {Object} a LayoutItem or a LayoutContainer Depends on the <b>layoutItemType</b> in the given json
         * object.
         */
        static itemFromJson(json: any): LayoutItem;
        /**
         * This is an override to LayoutItem.fromJson
         *
         * @method SimpleLayout.LayoutContainer#fromJson
         * @param json {Object} object that fully describe this LayoutContainer and its children.
         */
        fromJson(json: ILayoutContainerData): void;
        /**
         * An array of all the child LayoutItems of this LayoutContainer.
         *
         * @member SimpleLayout.LayoutContainer#layoutItems
         * @readonly
         * @type LayoutItem[]
         */
        layoutItems: LayoutItem[];
        displayObjectContainer: displayObject.IDisplayObjectContainer;
        executeLayout(width: number, height: number): void;
        /**
         * A shortcut to <b>container.layoutItems[index]</b>
         *
         * @method SimpleLayout.LayoutContainer#getLayoutItemAt
         * @param index {Number}
         * @returns {LayoutItem} The LayoutItem as the given index.
         */
        getLayoutItemAt(index: number): LayoutItem;
        /**
         * @protected
         */
        getAssetSize(): ISize;
        /**
         * Removes all the assets from the stage and re-adds them again. This is useful if you moved a LayoutItem in the
         * z-order, and want the Layout to rearrange the layout items.
         *
         * @method SimpleLayout.LayoutContainer#rearrangeLayoutItems
         */
        rearrangeLayoutItems(): void;
        /**
         * Adds a given LayoutItem as a child to this LayoutContainer.
         *
         * @method SimpleLayout.LayoutContainer#addLayoutItem
         * @param layoutItem {LayoutItem} The new LayoutItem.
         * @param [index] {number} the position to add the given LayoutItem (Default is to add it last)
         * @returns {LayoutItem} the added LayoutItem.
         */
        addLayoutItem(layoutItem: LayoutItem, index?: number): LayoutItem;
        /**
         * Creates new LayoutItem and add as it as a child to this LayoutContainer.
         *
         * @method SimpleLayout.LayoutContainer#addNewLayoutItem
         * @param assetId {string} The new LayoutItem's assetId.
         * @param [name] {string} The new LayoutItem's name
         * @returns {LayoutItem} the new LayoutItem.
         */
        addNewLayoutItem(assetId: string, name?: string): LayoutItem;
        /**
         * Removes the given LayoutItem from this LayoutContainer's children.
         *
         * @method SimpleLayout.LayoutContainer#removeLayoutItem
         * @param layoutItem {LayoutItem} the LayoutItem to be removed
         * @returns {LayoutItem} The removed LayoutItem
         */
        removeLayoutItem(layoutItem: LayoutItem): LayoutItem;
        /**
         * Removes the LayoutContainer's children.
         *
         * @method SimpleLayout.LayoutContainer#removeAllLayoutItems
         */
        removeAllLayoutItems(): void;
        /**
         * The number of LayoutItems this LayoutContainer has.
         *
         * @member SimpleLayout.LayoutContainer#countLayoutItems
         * @readonly
         */
        countLayoutItems: number;
        private removeAllDisplayObjects();
        dispose(): void;
    }
}
declare module SimpleLayout.assetsFactory {
    interface IAssetsFactoryData {
        className: string;
        data?: any;
    }
    interface IAssetsFactoriesData {
        atlasAssetsFactoryData?: IAssetsFactoryData;
        imagesAssetsFactoryData?: IAssetsFactoryData;
        externalAssetsFactoryData?: IAssetsFactoryData;
    }
    class AssetsFactoriesWrapper implements IAssetsFactory {
        private m_assetsFactories;
        constructor(assetsFactoriesData: IAssetsFactoriesData);
        private createFactory(factoryData);
        hasAssetsToLoad(): boolean;
        private getClassFromGlobalScope(className);
        loadAssets(doneCallback: () => void, errorCallback: (errorMessage: string) => void, progressCallback: (percentDone: number) => void): void;
        getAssetsIds(): string[];
        disposeAssets(): void;
        hasAsset(assetId: string): Boolean;
        createDisplayObject(assetId: string): displayObject.IDisplayObject;
        createDisplayObjectContainer(): displayObject.IDisplayObjectContainer;
    }
}
declare module SimpleLayout.assetsFactory {
    interface IAssetData {
        imageUrl: string;
        image: HTMLImageElement;
    }
    interface IImageAssetData {
        assetId: string;
        imageUrl: string;
    }
    class BaseImagesAssetsFactory implements IAssetsFactory {
        private m_assetsMap;
        constructor(imagesAssetData: IImageAssetData[]);
        hasAssetsToLoad(): boolean;
        getAssetsIds(): string[];
        registerAsset(assetId: string, imageUrl: string): void;
        getAssetData(assetId: string): IAssetData;
        hasAsset(assetId: string): Boolean;
        loadAssets(doneCallback: () => void, errorCallback: (errorMessage: string) => void, progressCallback: (percentDone: number) => void): void;
        disposeAssets(): void;
        createDisplayObjectContainer(): displayObject.IDisplayObjectContainer;
        createDisplayObject(assetId: string): displayObject.IDisplayObject;
    }
}
declare var GlobalAssetsFactory: any;
declare module SimpleLayout.assetsFactory {
    class ExternalAssetsFactory implements IAssetsFactory {
        private scriptsUrls;
        private m_editorAssetFactory;
        private m_scriptsLoader;
        constructor(scriptsUrls: string[]);
        hasAssetsToLoad(): boolean;
        getAssetsIds(): string[];
        loadAssets(doneCallback: () => void, errorCallback: (errorMessage: string) => void, progressCallback: (percentDone: number) => void): void;
        disposeAssets(): void;
        hasAsset(assetId: string): Boolean;
        createDisplayObjectContainer(): displayObject.IDisplayObjectContainer;
        createDisplayObject(assetId: string): displayObject.IDisplayObject;
    }
}
interface IAssetsFactory {
    hasAssetsToLoad(): boolean;
    loadAssets(doneCallback: () => void, errorCallback: (errorMessage: string) => void, progressCallback: (percentDone: number) => void): void;
    getAssetsIds(): string[];
    hasAsset(assetId: string): Boolean;
    createDisplayObject(assetId: string): SimpleLayout.displayObject.IDisplayObject;
    createDisplayObjectContainer(): SimpleLayout.displayObject.IDisplayObjectContainer;
    disposeAssets(): void;
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
        scaleX: number;
        scaleY: number;
        rotation: number;
        name: string;
        visible: boolean;
        getConcreteDisplayObject(): Object;
        getGlobalPos(): IPoint;
        getPivotPoint(): IPoint;
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
/**
 * Holds all the enumerations that the Simple Layout uses.
 * @namespace SimpleLayout.enums
 */
declare module SimpleLayout.enums {
    /**
     * The HorizontalAlignEnum is an enum of all the possible horizontal alignments.
     * @readonly
     * @memberof SimpleLayout.enums
     * @enum {string}
     */
    var HorizontalAlignEnum: {
        H_ALIGN_TYPE_NONE: string;
        H_ALIGN_TYPE_CENTER: string;
        H_ALIGN_TYPE_LEFT: string;
        H_ALIGN_TYPE_RIGHT: string;
    };
}
declare module SimpleLayout.enums {
    /**
     * The VerticalAlignEnum is an enum of all the possible vertical alignments.
     * @readonly
     * @memberof SimpleLayout.enums
     * @enum {string}
     */
    var VerticalAlignEnum: {
        V_ALIGN_TYPE_NONE: string;
        V_ALIGN_TYPE_MIDDLE: string;
        V_ALIGN_TYPE_TOP: string;
        V_ALIGN_TYPE_BOTTOM: string;
    };
}
/**
 * Provides a set of Layout classes to be used in by a LayoutContainer
 * @namespace SimpleLayout.layout
 */
declare module SimpleLayout.layout {
    class BasicLayout implements ILayout {
        /**
         * Area in the top of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
         * acceptable.
         * @default 0
         * @member SimpleLayout.layout.BasicLayout#paddingTop
         */
        paddingTop: number;
        /**
         * Area in the bottom of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
         * acceptable.
         * @default 0
         * @member SimpleLayout.layout.BasicLayout#paddingBottom
         */
        paddingBottom: number;
        /**
         * Area in the left of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
         * acceptable.
         * @default 0
         * @member SimpleLayout.layout.BasicLayout#paddingLeft
         */
        paddingLeft: number;
        /**
         * The gap property is not functional in the BasicLayout, be it is used by the Horizontal and Vertical layouts.
         * @default 0
         * @member SimpleLayout.layout.BasicLayout#gap
         */
        gap: number;
        /**
         * Area in the right of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
         * acceptable.
         * @default 0
         * @member SimpleLayout.layout.BasicLayout#paddingRight
         */
        paddingRight: number;
        /**
         * When snapToPixels is true, all the layout items will be positioned and sized in full pixel values.
         * @default false
         * @member SimpleLayout.layout.BasicLayout#paddingRight
         */
        snapToPixels: boolean;
        /**
         * The layout items that have a shorter width than the space that was given to them will be aligned horizontally
         * according to this property.
         * @default enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER
         * @member SimpleLayout.layout.BasicLayout#horizontalAlign
         */
        horizontalAlign: string;
        /**
         * The layout items that have a shorter height than the space that was given to them will be aligned vertically
         * according to this property.
         * @default enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE
         * @member SimpleLayout.layout.BasicLayout#verticalAlign
         */
        verticalAlign: string;
        /**
         * Sometimes while building your layout, you might give the layout bad values that it cannot use to calculate
         * the layout, this property will have the latest error text.
         *
         * For example: If you give the layoutitems more than 100% of the possible width.
         * @default empty string
         * @member SimpleLayout.layout.BasicLayout#lastError
         */
        lastError: string;
        /**
         * The LayoutVisualizer is an helper for debugging and building your layout, it is used mostly by the editor.
         *
         * @default null
         * @member SimpleLayout.layout.BasicLayout#layoutVisualizer
         * @type visualizer.ILayoutVisualizer
         */
        layoutVisualizer: visualizer.ILayoutVisualizer;
        /**
         * @class SimpleLayout.layout.BasicLayout
         * @classdesc The BasicLayout is the most basic layout type. Use this layout to grant the LayoutItems all the
         * space they can take. The LayoutItems will be on top of each other. A good example for using the BasicLayout
         * is to have a background and a container that take all the possible space.
         * Also note that this is the default layout for any LayoutContainer.
         */
        constructor();
        /**
         * Serialize the Layout into its properties, the result json can be use to construct a new Layout by
         * calling fromJson function.
         *
         * @method SimpleLayout.layout.BasicLayout#toJson
         * @returns {Object} A Json object that fully describe this Layout
         */
        toJson(): any;
        /**
         * Copy all the properties from the given json into this Layout.
         *
         * @method SimpleLayout.layout.BasicLayout#fromJson
         * @param json {Object} object that fully describe this Layout
         */
        fromJson(json: any): void;
        /**
         * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
         * Layout type class name, in this case it will return the string "BasicLayout".
         *
         * @method SimpleLayout.layout.BasicLayout#getLayoutType
         * @returns {String} "BasicLayout"
         */
        getLayoutType(): string;
        alignLayoutItem(layoutItem: LayoutItem, startX: number, startY: number, givenWidth: number, givenHeight: number): void;
        /**
         * This function will position/resize all the given LayoutContainer's children (LayoutItems/LayoutContainers),
         * and give each the space that it can occupy.
         * Each child then will have its own width and height that it can fill, if the child is a LayoutContainer with
         * a layout of its own, the space that was given to it will get sent to the internal layout to possition/resize
         * the inner children and so on, recursively.
         *
         * @method SimpleLayout.layout.BasicLayout#fitChildrenInto
         * @param targetContainer
         * @param w {number} the Width (In pixels) that was given to this layout
         * @param h {number} the Height (In pixels) that was given to this layout
         */
        fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
        /**
         * Disposing (Setting to null) all the objects that it holds, like the layout visualizer.
         *
         * @method SimpleLayout.layout.BasicLayout#dispose
         */
        dispose(): void;
    }
}
declare module SimpleLayout.layout {
    class GridLayout extends BasicLayout implements IGridLayout {
        /**
         * The number of columns this grid will have.
         * @default 1
         * @member SimpleLayout.layout.GridLayout#columns
         */
        columns: number;
        /**
         * The number of rows this grid will have.
         * @default 1
         * @member SimpleLayout.layout.GridLayout#rows
         */
        rows: number;
        /**
         * The horizontal gap property is the gap that will be used when laying out items in the grid columns.
         * @default 0
         * @member SimpleLayout.layout.GridLayout#horizontalGap
         */
        horizontalGap: number;
        /**
         * The vertical gap property is the gap that will be used when laying out items in the grid rows.
         * @default 0
         * @member SimpleLayout.layout.GridLayout#verticalGap
         */
        verticalGap: number;
        /**
         * @class SimpleLayout.layout.GridLayout
         * @augments SimpleLayout.layout.BasicLayout
         * @classdesc The GridLayout will divide the given space horizontally and vertically to all his LayoutItems equally,
         * any specific width or height from the item will be ignored. All the LayoutItems will then get moved
         * to the top/middle/bottom or left/center/right of their space according to the LayoutItem's vertical/horizontal align.
         */
        constructor();
        /**
         * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
         * Layout type class name, in this case it will return the string "GridLayout".
         *
         * @method SimpleLayout.layout.GridLayout#getLayoutType
         * @returns {String} "GridLayout"
         */
        getLayoutType(): string;
        /**
         * Serialize the Layout into its properties, the result json can be use to construct a new Layout by
         * calling fromJson function.
         *
         * @method SimpleLayout.layout.GridLayout#toJson
         * @returns {Object} A Json object that fully describe this Layout
         */
        toJson(): any;
        /**
         * Copy all the properties from the given json into this Layout.
         *
         * @method SimpleLayout.layout.GridLayout#fromJson
         * @param json {Object} object that fully describe this Layout
         */
        fromJson(json: any): void;
        fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
    }
}
declare module SimpleLayout.layout {
    class HorizontalLayout extends BasicLayout {
        /**
         * @class SimpleLayout.layout.HorizontalLayout
         * @augments SimpleLayout.layout.BasicLayout
         * @classdesc The HorizontalLayout will divide the given space horizontally to all his LayoutItems equally, unless there
         * are children who ask for a specific width. All the LayoutItems will then get moved to the top/middle/bottom of
         * their space according to the LayoutItem's vertical align.
         */
        constructor();
        /**
         * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
         * Layout type class name, in this case it will return the string "HorizontalLayout".
         *
         * @method SimpleLayout.layout.HorizontalLayout#getLayoutType
         * @returns {String} "HorizontalLayout"
         */
        getLayoutType(): string;
        fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
    }
}
declare module SimpleLayout.layout {
    interface IGridLayout extends ILayout {
        columns: number;
        rows: number;
        horizontalGap: number;
        verticalGap: number;
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
        layoutVisualizer: visualizer.ILayoutVisualizer;
        fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
        getLayoutType(): string;
        toJson(): any;
        dispose(): void;
    }
}
declare module SimpleLayout.layout {
    class VerticalLayout extends BasicLayout {
        /**
         * @class SimpleLayout.layout.VerticalLayout
         * @augments SimpleLayout.layout.BasicLayout
         * @classdesc The VerticalLayout will divide the given space vertically to all his LayoutItems equally, unless there
         * are children who ask for a specific height. All the LayoutItems will then get moved to the left/center/right of
         * their space according to the LayoutItem's horizontal align.
         */
        constructor();
        /**
         * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
         * Layout type class name, in this case it will return the string "VerticalLayout".
         *
         * @method SimpleLayout.layout.VerticalLayout#getLayoutType
         * @returns {String} "VerticalLayout"
         */
        getLayoutType(): string;
        fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
    }
}
declare module SimpleLayout {
    class LayoutAssetsFactory {
        /**
         * @class SimpleLayout.LayoutAssetsFactory
         * @classdesc TThe LayoutAssetsFactory class is a utility class for creating and clearing all the
         * layout tree displayObjects and displayObjectContainers.
         */
        constructor();
        /**
        * Using the given assetsFactory to create all the displayObjects and displayObjectContainers of the UI.
        *
        * @method SimpleLayout.LayoutAssetsFactory#createAssets
        * @static
        * @param rootNode {LayoutContainer} the root node to start from.
        * @param assetsFactory {IAssetsFactory} an object that implements the IAssetsFactory interface.
        */
        static createAssets(rootNode: LayoutContainer, assetsFactory: IAssetsFactory): void;
        private static createNodeAssets(node, assetsFactory);
        /**
         * Removed all the assets from the layout [calling setDisplayObject(null)] on all the layout items.
         *
         * @method SimpleLayout.LayoutAssetsFactory#clearAssets
         * @static
         * @param rootNode {LayoutContainer} The root node to start from.
         */
        static clearAssets(rootNode: LayoutContainer): void;
    }
}
declare module SimpleLayout.utils {
    class ScriptsLoader {
        private m_scriptsUrls;
        private m_loadedScripts;
        constructor();
        addScriptsToLoad(scriptsUrls: string[]): void;
        addScriptToLoad(scriptUrl: string): void;
        private addCacheKill(url);
        load(loadedCallback: () => void, errorCallback: (errorDesc: string) => void): void;
        reset(): void;
        dispose(): void;
    }
}
declare module SimpleLayout.visualizer {
    interface ILayoutVisualizer {
        isActive: Boolean;
        filterByLayoutItem: LayoutItem;
        filterByLayoutContainer: LayoutContainer;
        setDebugLayoutItem(layoutContainer: LayoutContainer, layoutItem: LayoutItem, x: number, y: number, width: number, height: number): void;
        setDebugLayoutContainer(layoutContainer: LayoutContainer, w: number, h: number): void;
        setDebugPadding(layoutContainer: LayoutContainer, w: number, h: number, topPadding: number, bottomPadding: number, leftPadding: number, rightPadding: number): void;
        setDebugGap(layoutContainer: LayoutContainer, x: number, y: number, width: number, height: number): void;
        setAlpha(alpha: number): void;
        setPosition(point: displayObject.IPoint): void;
        update(): void;
        clear(): void;
        dispose(): void;
    }
}
