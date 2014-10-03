/**
* The global namespace for all the Simple Layout framework classes.
* @namespace SimpleLayout
*/
declare module SimpleLayout {
    interface ILayoutItemData {
        layoutItemType: string;
        requestedWidthPercent: number;
        requestedHeightPercent: number;
        horizontalAlign: string;
        verticalAlign: string;
        visible: boolean;
        fittedIntoWidth: number;
        fittedIntoHeight: number;
        keepAspectRatio: boolean;
        name: string;
        assetId: string;
    }
    class LayoutItem {
        private m_visible;
        public parent: LayoutContainer;
        public displayObject: displayObject.IDisplayObject;
        public requestedWidthPercent: number;
        public requestedHeightPercent: number;
        public horizontalAlign: string;
        public verticalAlign: string;
        public fittedIntoWidth: number;
        public fittedIntoHeight: number;
        public keepAspectRatio: boolean;
        public name: string;
        public assetId: string;
        /**
        * Description of the constructor.
        * @class SimpleLayout.LayoutItem
        * @classdesc The LayoutItem class is the most basic building block for defining your UI layout
        * @param displayObject {Object} An object that implements the <b>IDisplayObject</b> interface.
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
        public getLayoutItemType(): string;
        public visible : boolean;
        /**
        * Sets this LayoutItem's display object that it represents in the layout.
        * A Layout item can exist without a display object and it will take the space that it own, but nothing
        * will be displayed.
        *
        * @method SimpleLayout.LayoutItem#setDisplayObject
        * @param displayObject {Object} An object that implements the <b>IDisplayObject</b> interface.
        */
        public setDisplayObject(displayObject: displayObject.IDisplayObject): void;
        /**
        * In a LayoutItem this function will fit the LayoutItem's <b>displayObject</b> into its given width and height.
        * This function is called by the LayoutContainer on all its children LayoutItems (And containers)
        *
        * @method SimpleLayout.LayoutItem#executeLayout
        */
        public executeLayout(): void;
        /**
        * Serialize the LayoutItem into its properties, the result json can be use to construct a new LayoutItem by
        * calling fromJson function.
        *
        * @method SimpleLayout.LayoutItem#toJson
        * @returns {Object} A Json object that fully describe this LayoutItem
        */
        public toJson(): ILayoutItemData;
        /**
        * Copy all the properties from the given json into this LayoutItem.
        *
        * @method SimpleLayout.LayoutItem#fromJson
        * @param json {Object} object that fully describe this LayoutItem
        */
        public fromJson(json: ILayoutItemData): void;
        /**
        * This function will be called by a <b>Layout</b> object.
        *
        * @method SimpleLayout.LayoutItem#fitInto
        * @param width {Number} A specific width that this LayoutItem takes
        * @param height {Number} A specific height that this LayoutItem takes
        */
        public fitInto(width: number, height: number): void;
        /**
        * Disposing (Setting to null) all the objects that it holds, like <b>parent</b>. If a <b>displayObject</b> was
        * assigned to this LayoutItem, its <b>dispose</b> function will also get called.
        *
        * @method SimpleLayout.LayoutItem#dispose
        */
        public dispose(): void;
        private fitToSize(dispObj, w?, h?);
    }
}
declare module SimpleLayout {
    interface ILayoutContainerData extends ILayoutItemData {
        layout: layout.ILayout;
        layoutItems: LayoutItem[];
    }
    class LayoutContainer extends LayoutItem {
        public layout: layout.ILayout;
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
        public getLayoutItemType(): string;
        /**
        * This is an override to LayoutItem.toJson
        *
        * @method SimpleLayout.LayoutContainer#toJson
        * @returns {Object} A Json object that fully describe this LayoutContainer
        */
        public toJson(): ILayoutContainerData;
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
        public fromJson(json: ILayoutContainerData): void;
        /**
        * An array of all the child LayoutItems of this LayoutContainer.
        *
        * @member SimpleLayout.LayoutContainer#layoutItems
        * @readonly
        * @type LayoutItem[]
        */
        public layoutItems : LayoutItem[];
        public displayObjectContainer : displayObject.IDisplayObjectContainer;
        public executeLayout(): void;
        /**
        * A shortcut to <b>container.layoutItems[index]</b>
        *
        * @method SimpleLayout.LayoutContainer#getLayoutItemAt
        * @param index {Number}
        * @returns {LayoutItem} The LayoutItem as the given index.
        */
        public getLayoutItemAt(index: number): LayoutItem;
        /**
        * Removes all the assets from the stage and re-adds them again. This is useful if you moved a LayoutItem in the
        * z-order, and want the Layout to rearrange the layout items.
        *
        * @method SimpleLayout.LayoutContainer#rearrangeLayoutItems
        */
        public rearrangeLayoutItems(): void;
        /**
        * Adds a given LayoutItem as a child to this LayoutContainer.
        *
        * @method SimpleLayout.LayoutContainer#addLayoutItem
        * @param layoutItem {LayoutItem} The new LayoutItem.
        * @param index {number} the position to add the given LayoutItem (Default is to add it last)
        * @returns {LayoutItem} the added LayoutItem.
        */
        public addLayoutItem(layoutItem: LayoutItem, index?: number): LayoutItem;
        /**
        * Removes the given LayoutItem from this LayoutContainer's children.
        *
        * @method SimpleLayout.LayoutContainer#removeLayoutItem
        * @param layoutItem {LayoutItem} the LayoutItem to be removed
        * @returns {LayoutItem} The removed LayoutItem
        */
        public removeLayoutItem(layoutItem: LayoutItem): LayoutItem;
        /**
        * Removes the LayoutContainer's children.
        *
        * @method SimpleLayout.LayoutContainer#removeAllLayoutItems
        */
        public removeAllLayoutItems(): void;
        /**
        * The number of LayoutItems this LayoutContainer has.
        *
        * @member SimpleLayout.LayoutContainer#countLayoutItems
        * @readonly
        */
        public countLayoutItems : number;
        private removeAllDisplayObjects();
        public dispose(): void;
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
        public paddingTop: number;
        /**
        * Area in the bottom of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
        * acceptable.
        * @default 0
        * @member SimpleLayout.layout.BasicLayout#paddingBottom
        */
        public paddingBottom: number;
        /**
        * Area in the left of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
        * acceptable.
        * @default 0
        * @member SimpleLayout.layout.BasicLayout#paddingLeft
        */
        public paddingLeft: number;
        /**
        * The gap property is not functional in the BasicLayout, be it is used by the Horizontal and Vertical layouts.
        * @default 0
        * @member SimpleLayout.layout.BasicLayout#gap
        */
        public gap: number;
        /**
        * Area in the right of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
        * acceptable.
        * @default 0
        * @member SimpleLayout.layout.BasicLayout#paddingRight
        */
        public paddingRight: number;
        /**
        * When snapToPixels is true, all the layout items will be positioned and sized in full pixel values.
        * @default false
        * @member SimpleLayout.layout.BasicLayout#paddingRight
        */
        public snapToPixels: boolean;
        /**
        * The layout items that have a shorter width than the space that was given to them will be aligned horizontally
        * according to this property.
        * @default enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER
        * @member SimpleLayout.layout.BasicLayout#horizontalAlign
        */
        public horizontalAlign: string;
        /**
        * The layout items that have a shorter height than the space that was given to them will be aligned vertically
        * according to this property.
        * @default enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE
        * @member SimpleLayout.layout.BasicLayout#verticalAlign
        */
        public verticalAlign: string;
        /**
        * Sometimes while building your layout, you might give the layout bad values that it cannot use to calculate
        * the layout, this property will have the latest error text.
        *
        * For example: If you give the layoutitems more than 100% of the possible width.
        * @default empty string
        * @member SimpleLayout.layout.BasicLayout#lastError
        */
        public lastError: string;
        /**
        * The LayoutVisualizer is an helper for debugging and building your layout, it is used mostly by the editor.
        *
        * @default null
        * @member SimpleLayout.layout.BasicLayout#layoutVisualizer
        * @type visualizer.ILayoutVisualizer
        */
        public layoutVisualizer: visualizer.ILayoutVisualizer;
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
        public toJson(): any;
        /**
        * Copy all the properties from the given json into this Layout.
        *
        * @method SimpleLayout.layout.BasicLayout#fromJson
        * @param json {Object} object that fully describe this Layout
        */
        public fromJson(json: any): void;
        /**
        * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
        * Layout type class name, in this case it will return the string "BasicLayout".
        *
        * @method SimpleLayout.layout.BasicLayout#getLayoutType
        * @returns {String} "BasicLayout"
        */
        public getLayoutType(): string;
        /**
        * Use this function to set the layout visualizer.
        * @method SimpleLayout.layout.BasicLayout#setLayoutVisualizer
        * @param value {visualizer.ILayoutVisualizer} an object that implements the ILayoutVisualizer interface.
        */
        public setLayoutVisualizer(value: visualizer.ILayoutVisualizer): void;
        /**
        * Use this function to get the layout visualizer.
        * @method SimpleLayout.layout.BasicLayout#getLayoutVisualizer
        * @returns {visualizer.ILayoutVisualizer}
        */
        public getLayoutVisualizer(): visualizer.ILayoutVisualizer;
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
        public fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
        /**
        * Disposing (Setting to null) all the objects that it holds, like the layout visualizer.
        *
        * @method SimpleLayout.layout.BasicLayout#dispose
        */
        public dispose(): void;
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
        public getLayoutType(): string;
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
        public getLayoutType(): string;
        public fitChildrenInto(targetContainer: LayoutContainer, w: number, h: number): void;
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
