/// <reference path="reference.ts"/>
/**
 * The global namespace for all the Simple Layout framework classes.
 * @namespace SimpleLayout
 */
var SimpleLayout;
(function (SimpleLayout) {
    var LayoutItem = (function () {
        /**
         * Description of the constructor.
         * @class SimpleLayout.LayoutItem
         * @classdesc The LayoutItem class is the most basic building block for defining your UI layout
         * @param [displayObject] {Object} An object that implements the <b>IDisplayObject</b> interface.
         */
        function LayoutItem(displayObject) {
            this.m_visible = true;
            this.parent = null;
            this.displayObject = displayObject;
            this.fittedIntoWidth = 0.0;
            this.fittedIntoHeight = 0.0;
            this.horizontalAlign = SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE;
            this.verticalAlign = SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE;
            this.fillArea = false;
            this.requestedWidthPercent = 0.0;
            this.requestedHeightPercent = 0.0;
            this.name = "";
            this.assetId = "";
        }
        /**
         * Because a layout is built using a tree of LayoutContainers and LayoutItems, we have to know the type
         * of the nodes in the tree while building the layout. This is an easy way to get the type of the LayoutItem.
         * This function returns the string "LayoutItem"
         *
         * @method SimpleLayout.LayoutItem#getLayoutItemType
         * @returns {string} "LayoutItem"
         */
        LayoutItem.prototype.getLayoutItemType = function () {
            return 'LayoutItem';
        };
        /**
         * Sets this LayoutItem's display object that it represents in the layout.
         * A Layout item can exist without a display object and it will take the space that it own, but nothing
         * will be displayed.
         *
         * @method SimpleLayout.LayoutItem#setDisplayObject
         * @param displayObject {Object} An object that implements the <b>IDisplayObject</b> interface.
         */
        LayoutItem.prototype.setDisplayObject = function (displayObject) {
            if (displayObject != this.displayObject) {
                // remove the previous
                if (this.displayObject && this.parent && this.parent.displayObjectContainer)
                    this.parent.displayObjectContainer.removeChild(this.displayObject);
                // take the new displayObject
                this.displayObject = displayObject;
                // and let the parent get the new display object
                if (this.displayObject && this.parent && this.parent.displayObjectContainer) {
                    this.parent.displayObjectContainer.addChild(this.displayObject);
                    this.displayObject.visible = this.visible;
                }
            }
        };
        Object.defineProperty(LayoutItem.prototype, "visible", {
            get: function () {
                return this.m_visible;
            },
            set: function (value) {
                this.m_visible = value;
                if (this.displayObject)
                    this.displayObject.visible = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * In a LayoutItem this function will fit the LayoutItem's <b>displayObject</b> into its given width and height.
         * This function is called by the LayoutContainer on all its children LayoutItems (And containers)
         *
         * @method SimpleLayout.LayoutItem#executeLayout
         * @protected
         */
        LayoutItem.prototype.executeLayout = function (width, height) {
            if (this.displayObject) {
                this.displayObject.width = width;
                this.displayObject.height = height;
            }
        };
        /**
         * This function will be called by a <b>Layout</b> object.
         *
         * @method SimpleLayout.LayoutItem#fitInto
         * @param width {Number} A specific width that this LayoutItem takes
         * @param height {Number} A specific height that this LayoutItem takes
         */
        LayoutItem.prototype.fitInto = function (width, height) {
            // as default we'll take the area that was given to us (Fit into the full given area)
            var itemWidth = width;
            var itemHeight = height;
            // If we're asked not to fill the all area?
            if (this.fillArea === false) {
                // Do we have an item size?
                // For LayoutItems with graphical assets it will return the asset size
                // and for LayoutContainer a requested custom size (If provided)
                var itemSize = this.getAssetSize();
                if (itemSize !== null) {
                    itemWidth = itemSize.width;
                    itemHeight = itemSize.height;
                }
                itemSize = this.fitToSize(width, height, itemWidth, itemHeight);
                itemWidth = itemSize.width;
                itemHeight = itemSize.height;
            }
            // make sure that we don't allow values less than 1.
            itemWidth = Math.max(1, itemWidth);
            itemHeight = Math.max(1, itemHeight);
            this.executeLayout(itemWidth, itemHeight);
        };
        /**
         * @protected
         */
        LayoutItem.prototype.getAssetSize = function () {
            if (this.displayObject) {
                this.displayObject.resetScaling();
                return {
                    width: this.displayObject.width,
                    height: this.displayObject.height
                };
            }
            else {
                return null;
            }
        };
        /**
         * Serialize the LayoutItem into its properties, the result json can be use to construct a new LayoutItem by
         * calling fromJson function.
         *
         * @method SimpleLayout.LayoutItem#toJson
         * @returns {Object} A Json object that fully describe this LayoutItem
         */
        LayoutItem.prototype.toJson = function () {
            return {
                layoutItemType: this.getLayoutItemType(),
                requestedWidthPercent: this.requestedWidthPercent,
                requestedHeightPercent: this.requestedHeightPercent,
                horizontalAlign: this.horizontalAlign,
                verticalAlign: this.verticalAlign,
                visible: this.visible,
                fittedIntoWidth: this.fittedIntoWidth,
                fittedIntoHeight: this.fittedIntoHeight,
                fillArea: this.fillArea,
                name: this.name,
                assetId: this.assetId
            };
        };
        /**
         * Copy all the properties from the given json into this LayoutItem.
         *
         * @method SimpleLayout.LayoutItem#fromJson
         * @param json {Object} object that fully describe this LayoutItem
         */
        LayoutItem.prototype.fromJson = function (json) {
            this.requestedWidthPercent = json.requestedWidthPercent;
            this.requestedHeightPercent = json.requestedHeightPercent;
            this.horizontalAlign = json.horizontalAlign;
            this.verticalAlign = json.verticalAlign;
            this.visible = json.visible;
            this.fittedIntoWidth = json.fittedIntoWidth;
            this.fittedIntoHeight = json.fittedIntoHeight;
            this.fillArea = json.fillArea;
            this.name = json.name;
            this.assetId = json.assetId;
        };
        /**
         * Disposing (Setting to null) all the objects that it holds, like <b>parent</b>. If a <b>displayObject</b> was
         * assigned to this LayoutItem, its <b>dispose</b> function will also get called.
         *
         * @method SimpleLayout.LayoutItem#dispose
         */
        LayoutItem.prototype.dispose = function () {
            this.parent = null;
            if (this.displayObject) {
                this.displayObject.dispose();
                this.displayObject = null;
            }
        };
        LayoutItem.prototype.fitToSize = function (givenWidth, givenHeight, itemWidth, itemHeight) {
            var itemRatio = itemWidth / itemHeight;
            var containerRatio = givenWidth / givenHeight;
            if (containerRatio > itemRatio) {
                return {
                    height: givenHeight,
                    width: itemRatio * givenHeight
                };
            }
            else {
                return {
                    width: givenWidth,
                    height: givenWidth / itemRatio
                };
            }
        };
        return LayoutItem;
    })();
    SimpleLayout.LayoutItem = LayoutItem;
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="reference.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SimpleLayout;
(function (SimpleLayout) {
    var LayoutContainer = (function (_super) {
        __extends(LayoutContainer, _super);
        /**
         * @class SimpleLayout.LayoutContainer
         * @augments SimpleLayout.LayoutItem
         * @classdesc The LayoutContainer class is the a holder of LayoutItems. its displayObject property actually
         * holds a displayObjectContainer. It doesn't have a regular displayObject (A graphical entity).
         */
        function LayoutContainer() {
            _super.call(this);
            this.fillArea = true;
            this.m_layoutItems = [];
            this.customWidth = 0;
            this.customHeight = 0;
        }
        /**
         * This is an override to LayoutItem.getLayoutItemType, and this function returns the string "LayoutContainer"
         *
         * @method SimpleLayout.LayoutContainer#getLayoutItemType
         * @returns {string} "LayoutContainer"
         */
        LayoutContainer.prototype.getLayoutItemType = function () {
            return 'LayoutContainer';
        };
        /**
         * This is an override to LayoutItem.toJson
         *
         * @method SimpleLayout.LayoutContainer#toJson
         * @returns {Object} A Json object that fully describe this LayoutContainer
         */
        LayoutContainer.prototype.toJson = function () {
            var result = _super.prototype.toJson.call(this);
            var layoutItems = [];
            for (var i = 0; i < this.m_layoutItems.length; i++) {
                layoutItems.push(this.m_layoutItems[i].toJson());
            }
            result.layoutItems = layoutItems;
            if (this.layout)
                result.layout = this.layout.toJson();
            result.customWidth = this.customWidth;
            result.customHeight = this.customHeight;
            return result;
        };
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
        LayoutContainer.itemFromJson = function (json) {
            var result;
            switch (json.layoutItemType) {
                case 'LayoutItem':
                    result = new SimpleLayout.LayoutItem();
                    break;
                case 'LayoutContainer':
                    result = new LayoutContainer();
                    break;
                default:
                    throw 'Bad JSON, unknown layoutItemType:' + json.layoutItemType;
            }
            result.fromJson(json);
            return result;
        };
        /**
         * This is an override to LayoutItem.fromJson
         *
         * @method SimpleLayout.LayoutContainer#fromJson
         * @param json {Object} object that fully describe this LayoutContainer and its children.
         */
        LayoutContainer.prototype.fromJson = function (json) {
            _super.prototype.fromJson.call(this, json);
            // layout items
            var layoutItems = json.layoutItems;
            for (var i = 0; i < layoutItems.length; i++) {
                var layoutItem = LayoutContainer.itemFromJson(layoutItems[i]);
                layoutItem.parent = this;
                this.layoutItems.push(layoutItem);
            }
            if (json.hasOwnProperty('layout')) {
                var layoutJson = json.layout;
                var layout;
                switch (layoutJson['layoutType']) {
                    case 'BasicLayout':
                        layout = new SimpleLayout.layout.BasicLayout();
                        break;
                    case 'HorizontalLayout':
                        layout = new SimpleLayout.layout.HorizontalLayout();
                        break;
                    case 'VerticalLayout':
                        layout = new SimpleLayout.layout.VerticalLayout();
                        break;
                    default:
                        throw 'Bad Json, unknown layoutType ' + layoutJson['layoutType'];
                }
                layout.fromJson(layoutJson);
                this.layout = layout;
            }
            if (json.hasOwnProperty('customWidth')) {
                this.customWidth = json.customWidth;
            }
            if (json.hasOwnProperty('customHeight')) {
                this.customHeight = json.customHeight;
            }
        };
        Object.defineProperty(LayoutContainer.prototype, "layoutItems", {
            /**
             * An array of all the child LayoutItems of this LayoutContainer.
             *
             * @member SimpleLayout.LayoutContainer#layoutItems
             * @readonly
             * @type LayoutItem[]
             */
            get: function () {
                return this.m_layoutItems;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LayoutContainer.prototype, "displayObjectContainer", {
            get: function () {
                return this.displayObject;
            },
            enumerable: true,
            configurable: true
        });
        LayoutContainer.prototype.executeLayout = function (width, height) {
            if (this.layout) {
                this.layout.fitChildrenInto(this, width, height);
                if (this.displayObject) {
                    this.displayObject.width = width;
                    this.displayObject.height = height;
                }
            }
        };
        /**
         * @protected
         * @override
         */
        LayoutContainer.prototype.getAssetSize = function () {
            // were we asked for a custom size?
            if (this.customWidth > 0 && this.customHeight > 0) {
                return {
                    width: this.customWidth,
                    height: this.customHeight
                };
            }
            else {
                // If we don't have a custom size, return null and it will fill the area
                return null;
            }
        };
        /**
         * A shortcut to <b>container.layoutItems[index]</b>
         *
         * @method SimpleLayout.LayoutContainer#getLayoutItemAt
         * @param index {Number}
         * @returns {LayoutItem} The LayoutItem as the given index.
         */
        LayoutContainer.prototype.getLayoutItemAt = function (index) {
            return this.m_layoutItems[index];
        };
        /**
         * Removes all the assets from the stage and re-adds them again. This is useful if you moved a LayoutItem in the
         * z-order, and want the Layout to rearrange the layout items.
         *
         * @method SimpleLayout.LayoutContainer#rearrangeLayoutItems
         */
        LayoutContainer.prototype.rearrangeLayoutItems = function () {
            if (!this.displayObjectContainer)
                return;
            this.removeAllDisplayObjects();
            for (var i = 0; i < this.m_layoutItems.length; i++) {
                var layoutItem = this.m_layoutItems[i];
                layoutItem.parent = this;
                if (layoutItem.displayObject)
                    this.displayObjectContainer.addChild(layoutItem.displayObject);
                if (layoutItem.getLayoutItemType() === 'LayoutContainer')
                    layoutItem.rearrangeLayoutItems();
            }
        };
        /**
         * Adds a given LayoutItem as a child to this LayoutContainer.
         *
         * @method SimpleLayout.LayoutContainer#addLayoutItem
         * @param layoutItem {LayoutItem} The new LayoutItem.
         * @param [index] {number} the position to add the given LayoutItem (Default is to add it last)
         * @returns {LayoutItem} the added LayoutItem.
         */
        LayoutContainer.prototype.addLayoutItem = function (layoutItem, index) {
            if (index === void 0) { index = -1; }
            if (layoutItem == null)
                throw "Can not add a null layoutItem";
            if (this.m_layoutItems.indexOf(layoutItem) != -1) {
                return null; // already a child
            }
            else {
                if (index > -1)
                    this.m_layoutItems.splice(index, 0, layoutItem);
                else
                    this.m_layoutItems.push(layoutItem);
                layoutItem.parent = this;
                // displayObject is optional , and can be set later
                if (layoutItem.displayObject)
                    this.displayObjectContainer.addChild(layoutItem.displayObject);
                return layoutItem;
            }
        };
        /**
         * Creates new LayoutItem and add as it as a child to this LayoutContainer.
         *
         * @method SimpleLayout.LayoutContainer#addNewLayoutItem
         * @param assetId {string} The new LayoutItem's assetId.
         * @param [name] {string} The new LayoutItem's name
         * @returns {LayoutItem} the new LayoutItem.
         */
        LayoutContainer.prototype.addNewLayoutItem = function (assetId, name) {
            var layoutItem = new SimpleLayout.LayoutItem();
            layoutItem.assetId = assetId;
            if (name) {
                layoutItem.name = name;
            }
            return this.addLayoutItem(layoutItem);
        };
        /**
         * Removes the given LayoutItem from this LayoutContainer's children.
         *
         * @method SimpleLayout.LayoutContainer#removeLayoutItem
         * @param layoutItem {LayoutItem} the LayoutItem to be removed
         * @returns {LayoutItem} The removed LayoutItem
         */
        LayoutContainer.prototype.removeLayoutItem = function (layoutItem) {
            if (layoutItem == null)
                return null;
            var pos = this.m_layoutItems.indexOf(layoutItem);
            if (pos == -1) {
                return null; // not a child
            }
            else {
                layoutItem.parent = null;
                // displayObject is optional
                if (layoutItem.displayObject)
                    this.displayObjectContainer.removeChild(layoutItem.displayObject);
                return this.m_layoutItems.splice(pos, 1)[0];
            }
        };
        /**
         * Removes the LayoutContainer's children.
         *
         * @method SimpleLayout.LayoutContainer#removeAllLayoutItems
         */
        LayoutContainer.prototype.removeAllLayoutItems = function () {
            while (this.m_layoutItems.length > 0)
                this.removeLayoutItem(this.m_layoutItems[0]);
        };
        Object.defineProperty(LayoutContainer.prototype, "countLayoutItems", {
            /**
             * The number of LayoutItems this LayoutContainer has.
             *
             * @member SimpleLayout.LayoutContainer#countLayoutItems
             * @readonly
             */
            get: function () {
                return this.m_layoutItems.length;
            },
            enumerable: true,
            configurable: true
        });
        LayoutContainer.prototype.removeAllDisplayObjects = function () {
            this.displayObjectContainer.removeAllChildren();
            for (var i = 0; i < this.m_layoutItems.length; i++) {
                var layoutItem = this.m_layoutItems[i];
                if (layoutItem.getLayoutItemType() === 'LayoutContainer')
                    layoutItem.removeAllDisplayObjects();
            }
        };
        LayoutContainer.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            if (this.layout) {
                this.layout.dispose();
                this.layout = null;
            }
            this.layout = null;
            if (this.m_layoutItems) {
                while (this.m_layoutItems.length > 0) {
                    var item = this.m_layoutItems.pop();
                    item.dispose();
                }
                this.m_layoutItems = [];
            }
        };
        return LayoutContainer;
    })(SimpleLayout.LayoutItem);
    SimpleLayout.LayoutContainer = LayoutContainer;
})(SimpleLayout || (SimpleLayout = {}));
var SimpleLayout;
(function (SimpleLayout) {
    var assetsFactory;
    (function (assetsFactory) {
        var AssetsFactoriesWrapper = (function () {
            function AssetsFactoriesWrapper(assetsFactoriesData) {
                if (!assetsFactoriesData) {
                    throw new Error('Could not initializer AssetsFactoriesWrapper, Bad param');
                }
                this.m_assetsFactories = [];
                this.createFactory(assetsFactoriesData.atlasAssetsFactoryData);
                this.createFactory(assetsFactoriesData.imagesAssetsFactoryData);
                this.createFactory(assetsFactoriesData.externalAssetsFactoryData);
            }
            AssetsFactoriesWrapper.prototype.createFactory = function (factoryData) {
                if (factoryData) {
                    var factoryClass = this.getClassFromGlobalScope(factoryData.className);
                    var factoryObj = new factoryClass(factoryData.data);
                    if (factoryObj.hasAssetsToLoad()) {
                        this.m_assetsFactories.push(factoryObj);
                    }
                    return factoryObj;
                }
                else {
                    return null;
                }
            };
            AssetsFactoriesWrapper.prototype.hasAssetsToLoad = function () {
                return (this.m_assetsFactories.length > 0);
            };
            AssetsFactoriesWrapper.prototype.getClassFromGlobalScope = function (className) {
                var parts = className.split('.');
                var innerObj = window;
                for (var i = 0, l = parts.length; i < l; i++) {
                    var part = parts[i];
                    if (innerObj !== null && typeof innerObj === "object" && part in innerObj) {
                        innerObj = innerObj[part];
                    }
                    else {
                        throw new Error('Could not initializer AssetsFactoriesWrapper, class "' + className + '" could not be found.');
                    }
                }
                return innerObj;
            };
            AssetsFactoriesWrapper.prototype.loadAssets = function (doneCallback, errorCallback, progressCallback) {
                var totalToLoad = this.m_assetsFactories.length;
                var loaded = 0;
                var doneCalled = false;
                var terminated = false;
                try {
                    for (var i = 0; i < this.m_assetsFactories.length; i++) {
                        var managedAssetsFactory = this.m_assetsFactories[i];
                        managedAssetsFactory.loadAssets(function () {
                            loaded++;
                            if (doneCalled === false && loaded === totalToLoad && doneCallback) {
                                doneCallback();
                                doneCalled = true;
                            }
                        }, function (errorMessage) {
                            if (terminated === false) {
                                errorCallback(errorMessage);
                            }
                        }, function (percentDone) {
                            if (terminated === false) {
                                progressCallback(percentDone);
                            }
                        });
                    }
                    // in case that we don't have anything to load, or everything was loaded
                    if (doneCalled === false && loaded === totalToLoad && doneCallback) {
                        doneCallback();
                    }
                }
                catch (error) {
                    errorCallback(error.message);
                }
            };
            AssetsFactoriesWrapper.prototype.getAssetsIds = function () {
                var result = [];
                for (var i = 0; i < this.m_assetsFactories.length; i++) {
                    var managedAssetsFactory = this.m_assetsFactories[i];
                    result = result.concat(managedAssetsFactory.getAssetsIds());
                }
                return result;
            };
            AssetsFactoriesWrapper.prototype.disposeAssets = function () {
                while (this.m_assetsFactories.length > 0) {
                    var managedAssetsFactory = this.m_assetsFactories.pop();
                    managedAssetsFactory.disposeAssets();
                }
            };
            AssetsFactoriesWrapper.prototype.hasAsset = function (assetId) {
                return this.getAssetsIds().indexOf(assetId) > -1;
            };
            AssetsFactoriesWrapper.prototype.createDisplayObject = function (assetId) {
                for (var i = 0; i < this.m_assetsFactories.length; i++) {
                    var managedAssetsFactory = this.m_assetsFactories[i];
                    if (managedAssetsFactory.hasAsset(assetId))
                        return managedAssetsFactory.createDisplayObject(assetId);
                }
                return null;
            };
            AssetsFactoriesWrapper.prototype.createDisplayObjectContainer = function () {
                if (this.m_assetsFactories.length > 0) {
                    return this.m_assetsFactories[0].createDisplayObjectContainer();
                }
                else {
                    return null;
                }
            };
            return AssetsFactoriesWrapper;
        })();
        assetsFactory.AssetsFactoriesWrapper = AssetsFactoriesWrapper;
    })(assetsFactory = SimpleLayout.assetsFactory || (SimpleLayout.assetsFactory = {}));
})(SimpleLayout || (SimpleLayout = {}));
var SimpleLayout;
(function (SimpleLayout) {
    var assetsFactory;
    (function (assetsFactory) {
        var BaseImagesAssetsFactory = (function () {
            function BaseImagesAssetsFactory(imagesAssetData) {
                this.m_assetsMap = {};
                for (var i = 0; i < imagesAssetData.length; i++) {
                    var imageAssetData = imagesAssetData[i];
                    this.registerAsset(imageAssetData.assetId, imageAssetData.imageUrl);
                }
            }
            BaseImagesAssetsFactory.prototype.hasAssetsToLoad = function () {
                return this.getAssetsIds().length > 0;
            };
            BaseImagesAssetsFactory.prototype.getAssetsIds = function () {
                return Object.keys(this.m_assetsMap);
            };
            BaseImagesAssetsFactory.prototype.registerAsset = function (assetId, imageUrl) {
                if (this.m_assetsMap.hasOwnProperty(assetId) == true)
                    throw new Error('Asset ' + assetId + ' already exist');
                this.m_assetsMap[assetId] = { imageUrl: imageUrl, image: null };
            };
            BaseImagesAssetsFactory.prototype.getAssetData = function (assetId) {
                return this.m_assetsMap[assetId];
            };
            BaseImagesAssetsFactory.prototype.hasAsset = function (assetId) {
                return this.getAssetsIds().indexOf(assetId) > -1;
            };
            BaseImagesAssetsFactory.prototype.loadAssets = function (doneCallback, errorCallback, progressCallback) {
                this.disposeAssets();
                var assetsIds = this.getAssetsIds();
                var totalAssetsToLoad = 0;
                var assetsLoaded = 0;
                try {
                    for (var i = 0; i < assetsIds.length; i++) {
                        var assetId = assetsIds[i];
                        var assetData = this.getAssetData(assetId);
                        var image = document.createElement('img');
                        image.src = assetData.imageUrl;
                        assetData.image = image;
                        totalAssetsToLoad++;
                        image.addEventListener('load', function () {
                            assetsLoaded++;
                            progressCallback(assetsLoaded / totalAssetsToLoad);
                            if (totalAssetsToLoad === assetsLoaded) {
                                doneCallback();
                            }
                        });
                    }
                    if (doneCallback && totalAssetsToLoad === assetsLoaded) {
                        doneCallback();
                    }
                }
                catch (error) {
                    errorCallback(error.message);
                }
            };
            BaseImagesAssetsFactory.prototype.disposeAssets = function () {
                for (var assetId in this.m_assetsMap) {
                    var assetData = this.m_assetsMap[assetId];
                    var image = assetData.image;
                    if (image) {
                        image.src = '';
                    }
                    assetData.image = null;
                }
            };
            BaseImagesAssetsFactory.prototype.createDisplayObjectContainer = function () {
                throw new Error('Must override the "createDisplayObjectContainer" function');
            };
            BaseImagesAssetsFactory.prototype.createDisplayObject = function (assetId) {
                throw new Error('Must override the "createDisplayObject" function');
            };
            return BaseImagesAssetsFactory;
        })();
        assetsFactory.BaseImagesAssetsFactory = BaseImagesAssetsFactory;
    })(assetsFactory = SimpleLayout.assetsFactory || (SimpleLayout.assetsFactory = {}));
})(SimpleLayout || (SimpleLayout = {}));
var SimpleLayout;
(function (SimpleLayout) {
    var assetsFactory;
    (function (assetsFactory) {
        var ExternalAssetsFactory = (function () {
            function ExternalAssetsFactory(scriptsUrls) {
                this.scriptsUrls = scriptsUrls;
            }
            ExternalAssetsFactory.prototype.hasAssetsToLoad = function () {
                return this.scriptsUrls.length > 0;
            };
            ExternalAssetsFactory.prototype.getAssetsIds = function () {
                if (this.m_editorAssetFactory === null) {
                    throw new Error('Unable to call getAssetsIds (Maybe the scripts did not load properly?)');
                }
                return this.m_editorAssetFactory.getAssetsIds();
            };
            ExternalAssetsFactory.prototype.loadAssets = function (doneCallback, errorCallback, progressCallback) {
                var _this = this;
                try {
                    this.disposeAssets();
                    this.m_scriptsLoader = new SimpleLayout.utils.ScriptsLoader();
                    this.m_scriptsLoader.addScriptsToLoad(this.scriptsUrls);
                    this.m_scriptsLoader.load(function () {
                        try {
                            _this.m_editorAssetFactory = GlobalAssetsFactory;
                        }
                        catch (e) {
                            throw new Error('The script was loaded but was unable to find a global object named GlobalAssetsFactory.');
                        }
                        _this.m_editorAssetFactory.loadAssets(function () {
                            doneCallback();
                        }, function (errorDesc) {
                            errorCallback(errorDesc);
                        }, function (progress) {
                            progressCallback(progress);
                        });
                    }, function (errorDesc) {
                        errorCallback(errorDesc);
                    });
                }
                catch (error) {
                    errorCallback(error.message);
                }
            };
            ExternalAssetsFactory.prototype.disposeAssets = function () {
                if (this.m_scriptsLoader) {
                    this.m_scriptsLoader.reset();
                    this.m_scriptsLoader = null;
                }
            };
            ExternalAssetsFactory.prototype.hasAsset = function (assetId) {
                return this.getAssetsIds().indexOf(assetId) > -1;
            };
            ExternalAssetsFactory.prototype.createDisplayObjectContainer = function () {
                if (this.m_editorAssetFactory === null) {
                    throw new Error('Unable to call createDisplayObjectContainer (Maybe the scripts did not load properly?)');
                }
                return this.m_editorAssetFactory.createDisplayObjectContainer();
            };
            ExternalAssetsFactory.prototype.createDisplayObject = function (assetId) {
                if (this.m_editorAssetFactory === null) {
                    throw new Error('Unable to call createDisplayObject (Maybe the scripts did not load properly?)');
                }
                return this.m_editorAssetFactory.createDisplayObject(assetId);
            };
            return ExternalAssetsFactory;
        })();
        assetsFactory.ExternalAssetsFactory = ExternalAssetsFactory;
    })(assetsFactory = SimpleLayout.assetsFactory || (SimpleLayout.assetsFactory = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="../reference.ts"/>
/// <reference path="../reference.ts"/>
/// <reference path="../reference.ts"/>
/**
 * Holds all the enumerations that the Simple Layout uses.
 * @namespace SimpleLayout.enums
 */
var SimpleLayout;
(function (SimpleLayout) {
    var enums;
    (function (enums) {
        /**
         * The HorizontalAlignEnum is an enum of all the possible horizontal alignments.
         * @readonly
         * @memberof SimpleLayout.enums
         * @enum {string}
         */
        enums.HorizontalAlignEnum = {
            /**
             * This is the default value of the LayoutItem's horizontalAlign property, which means that it'll take the
             * horizontal alignment from the layout. Use the other values in this enum to override the layout's alignment
             * @type {string}
             * @default
             */
            H_ALIGN_TYPE_NONE: "none",
            /**
             * Use the H_ALIGN_TYPE_CENTER to center the LayoutItems horizontally in the space that was given to them.
             * @type {string}
             */
            H_ALIGN_TYPE_CENTER: "center",
            /**
             * Use the H_ALIGN_TYPE_LEFT to align left the LayoutItems horizontally in the space that was given to them.
             * @type {string}
             */
            H_ALIGN_TYPE_LEFT: "left",
            /**
             * Use the H_ALIGN_TYPE_RIGHT to align right the LayoutItems horizontally in the space that was given to them.
             * @type {string}
             */
            H_ALIGN_TYPE_RIGHT: "right"
        };
    })(enums = SimpleLayout.enums || (SimpleLayout.enums = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="../reference.ts"/>
var SimpleLayout;
(function (SimpleLayout) {
    var enums;
    (function (enums) {
        /**
         * The VerticalAlignEnum is an enum of all the possible vertical alignments.
         * @readonly
         * @memberof SimpleLayout.enums
         * @enum {string}
         */
        enums.VerticalAlignEnum = {
            /**
             * This is the default value of the LayoutItem's verticalAlign property, which means that it'll take the
             * vertical alignment from the layout. Use the other values in this enum to override the layout's alignment
             * @type {string}
             * @default
             */
            V_ALIGN_TYPE_NONE: "none",
            /**
             * Use the V_ALIGN_TYPE_MIDDLE to center the LayoutItems vertically in the space that was given to them.
             * @type {string}
             */
            V_ALIGN_TYPE_MIDDLE: "middle",
            /**
             * Use the V_ALIGN_TYPE_TOP to align the LayoutItems to the top of the vertical in the space that was
             * given to them.
             * @type {string}
             */
            V_ALIGN_TYPE_TOP: "top",
            /**
             * Use the V_ALIGN_TYPE_BOTTOM to align the LayoutItems to the bottom of the vertical in the space that was
             * given to them.
             * @type {string}
             */
            V_ALIGN_TYPE_BOTTOM: "bottom"
        };
    })(enums = SimpleLayout.enums || (SimpleLayout.enums = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="../reference.ts"/>
/**
 * Provides a set of Layout classes to be used in by a LayoutContainer
 * @namespace SimpleLayout.layout
 */
var SimpleLayout;
(function (SimpleLayout) {
    var layout;
    (function (layout) {
        var BasicLayout = (function () {
            /**
             * @class SimpleLayout.layout.BasicLayout
             * @classdesc The BasicLayout is the most basic layout type. Use this layout to grant the LayoutItems all the
             * space they can take. The LayoutItems will be on top of each other. A good example for using the BasicLayout
             * is to have a background and a container that take all the possible space.
             * Also note that this is the default layout for any LayoutContainer.
             */
            function BasicLayout() {
                /**
                 * Area in the top of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
                 * acceptable.
                 * @default 0
                 * @member SimpleLayout.layout.BasicLayout#paddingTop
                 */
                this.paddingTop = 0;
                /**
                 * Area in the bottom of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
                 * acceptable.
                 * @default 0
                 * @member SimpleLayout.layout.BasicLayout#paddingBottom
                 */
                this.paddingBottom = 0;
                /**
                 * Area in the left of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
                 * acceptable.
                 * @default 0
                 * @member SimpleLayout.layout.BasicLayout#paddingLeft
                 */
                this.paddingLeft = 0;
                /**
                 * The gap property is not functional in the BasicLayout, be it is used by the Horizontal and Vertical layouts.
                 * @default 0
                 * @member SimpleLayout.layout.BasicLayout#gap
                 */
                this.gap = 0;
                /**
                 * Area in the right of the Layout that will stay empty, the values are in percentage, so values of 0 to 1 are
                 * acceptable.
                 * @default 0
                 * @member SimpleLayout.layout.BasicLayout#paddingRight
                 */
                this.paddingRight = 0;
                /**
                 * When snapToPixels is true, all the layout items will be positioned and sized in full pixel values.
                 * @default false
                 * @member SimpleLayout.layout.BasicLayout#paddingRight
                 */
                this.snapToPixels = false;
                /**
                 * The layout items that have a shorter width than the space that was given to them will be aligned horizontally
                 * according to this property.
                 * @default enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER
                 * @member SimpleLayout.layout.BasicLayout#horizontalAlign
                 */
                this.horizontalAlign = SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER;
                /**
                 * The layout items that have a shorter height than the space that was given to them will be aligned vertically
                 * according to this property.
                 * @default enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE
                 * @member SimpleLayout.layout.BasicLayout#verticalAlign
                 */
                this.verticalAlign = SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE;
                /**
                 * Sometimes while building your layout, you might give the layout bad values that it cannot use to calculate
                 * the layout, this property will have the latest error text.
                 *
                 * For example: If you give the layoutitems more than 100% of the possible width.
                 * @default empty string
                 * @member SimpleLayout.layout.BasicLayout#lastError
                 */
                this.lastError = '';
                /**
                 * The LayoutVisualizer is an helper for debugging and building your layout, it is used mostly by the editor.
                 *
                 * @default null
                 * @member SimpleLayout.layout.BasicLayout#layoutVisualizer
                 * @type visualizer.ILayoutVisualizer
                 */
                this.layoutVisualizer = null;
            }
            /**
             * Serialize the Layout into its properties, the result json can be use to construct a new Layout by
             * calling fromJson function.
             *
             * @method SimpleLayout.layout.BasicLayout#toJson
             * @returns {Object} A Json object that fully describe this Layout
             */
            BasicLayout.prototype.toJson = function () {
                return {
                    layoutType: this.getLayoutType(),
                    paddingTop: this.paddingTop,
                    paddingBottom: this.paddingBottom,
                    paddingLeft: this.paddingLeft,
                    paddingRight: this.paddingRight,
                    gap: this.gap,
                    snapToPixels: this.snapToPixels,
                    horizontalAlign: this.horizontalAlign,
                    verticalAlign: this.verticalAlign
                };
            };
            /**
             * Copy all the properties from the given json into this Layout.
             *
             * @method SimpleLayout.layout.BasicLayout#fromJson
             * @param json {Object} object that fully describe this Layout
             */
            BasicLayout.prototype.fromJson = function (json) {
                this.paddingTop = json.paddingTop;
                this.paddingBottom = json.paddingBottom;
                this.paddingLeft = json.paddingLeft;
                this.paddingRight = json.paddingRight;
                this.gap = json.gap;
                this.snapToPixels = json.snapToPixels;
                this.horizontalAlign = json.horizontalAlign;
                this.verticalAlign = json.verticalAlign;
            };
            /**
             * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
             * Layout type class name, in this case it will return the string "BasicLayout".
             *
             * @method SimpleLayout.layout.BasicLayout#getLayoutType
             * @returns {String} "BasicLayout"
             */
            BasicLayout.prototype.getLayoutType = function () {
                return 'BasicLayout';
            };
            BasicLayout.prototype.alignLayoutItem = function (layoutItem, startX, startY, givenWidth, givenHeight) {
                if (layoutItem.visible) {
                    var displayObject;
                    displayObject = layoutItem.displayObject;
                    if (displayObject) {
                        // add Pivot
                        var pivotPoint = displayObject.getPivotPoint();
                        if (pivotPoint) {
                            startX = startX + (pivotPoint.x * displayObject.scaleX);
                            startY = startY + (pivotPoint.y * displayObject.scaleY);
                        }
                        // alignment
                        var hAlignment;
                        if (layoutItem.horizontalAlign != SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                            hAlignment = layoutItem.horizontalAlign;
                        else
                            hAlignment = this.horizontalAlign;
                        switch (hAlignment) {
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER:
                                {
                                    displayObject.x = startX + ((givenWidth - displayObject.width) / 2);
                                    break;
                                }
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT:
                                {
                                    displayObject.x = startX;
                                    break;
                                }
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT:
                                {
                                    displayObject.x = startX + (givenWidth - displayObject.width);
                                    break;
                                }
                        }
                        var vAlignment;
                        if (layoutItem.verticalAlign != SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE)
                            vAlignment = layoutItem.verticalAlign;
                        else
                            vAlignment = this.verticalAlign;
                        switch (vAlignment) {
                            case SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_TOP:
                                {
                                    displayObject.y = startY;
                                    break;
                                }
                            case SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE:
                                {
                                    displayObject.y = startY + ((givenHeight - displayObject.height) / 2);
                                    break;
                                }
                            case SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM:
                                {
                                    displayObject.y = startY + (givenHeight - displayObject.height);
                                    break;
                                }
                        }
                        // snap to pixels?
                        if (this.snapToPixels == true)
                            displayObject.x = Math.round(displayObject.x);
                        if (this.snapToPixels == true)
                            displayObject.y = Math.round(displayObject.y);
                    }
                }
            };
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
            BasicLayout.prototype.fitChildrenInto = function (targetContainer, w, h) {
                if (targetContainer == null)
                    return;
                var HspaceForItems;
                var VspaceForItems;
                var targetWidth;
                var targetHeight;
                var layoutItem;
                var paddingTopVal = h * this.paddingTop;
                var paddingBottomVal = h * this.paddingBottom;
                var paddingLeftVal = w * this.paddingLeft;
                var paddingRightVal = w * this.paddingRight;
                if (this.layoutVisualizer) {
                    this.layoutVisualizer.setDebugLayoutContainer(targetContainer, w, h);
                    this.layoutVisualizer.setDebugPadding(targetContainer, w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
                }
                HspaceForItems = w - (paddingLeftVal + paddingRightVal);
                VspaceForItems = h - (paddingTopVal + paddingBottomVal);
                // not space for items left
                if (HspaceForItems <= 0.0) {
                    this.lastError = "Too much left/right padding was requested from the basic layout";
                    return;
                }
                // not space for items left
                if (VspaceForItems <= 0.0) {
                    this.lastError = "Too much top/bottom padding was requested from the basic layout";
                    return;
                }
                for (var i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    if (layoutItem.requestedWidthPercent > 0.0)
                        targetWidth = HspaceForItems * layoutItem.requestedWidthPercent;
                    else
                        targetWidth = HspaceForItems;
                    if (layoutItem.requestedHeightPercent > 0.0)
                        targetHeight = VspaceForItems * layoutItem.requestedHeightPercent;
                    else
                        targetHeight = VspaceForItems;
                    // snap to pixels?
                    if (this.snapToPixels == true) {
                        targetWidth = Math.round(targetWidth);
                        targetHeight = Math.round(targetHeight);
                    }
                    layoutItem.fitInto(targetWidth, targetHeight);
                    this.alignLayoutItem(layoutItem, paddingLeftVal, paddingTopVal, HspaceForItems, VspaceForItems);
                    if (this.layoutVisualizer)
                        this.layoutVisualizer.setDebugLayoutItem(targetContainer, layoutItem, paddingLeftVal, paddingTopVal, HspaceForItems, VspaceForItems);
                }
                this.lastError = "";
            };
            /**
             * Disposing (Setting to null) all the objects that it holds, like the layout visualizer.
             *
             * @method SimpleLayout.layout.BasicLayout#dispose
             */
            BasicLayout.prototype.dispose = function () {
                this.layoutVisualizer = null;
            };
            return BasicLayout;
        })();
        layout.BasicLayout = BasicLayout;
    })(layout = SimpleLayout.layout || (SimpleLayout.layout = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="../reference.ts"/>
var SimpleLayout;
(function (SimpleLayout) {
    var layout;
    (function (layout) {
        var GridLayout = (function (_super) {
            __extends(GridLayout, _super);
            /**
             * @class SimpleLayout.layout.GridLayout
             * @augments SimpleLayout.layout.BasicLayout
             * @classdesc The GridLayout will divide the given space horizontally and vertically to all his LayoutItems equally,
             * any specific width or height from the item will be ignored. All the LayoutItems will then get moved
             * to the top/middle/bottom or left/center/right of their space according to the LayoutItem's vertical/horizontal align.
             */
            function GridLayout() {
                _super.call(this);
                /**
                 * The number of columns this grid will have.
                 * @default 1
                 * @member SimpleLayout.layout.GridLayout#columns
                 */
                this.columns = 1;
                /**
                 * The number of rows this grid will have.
                 * @default 1
                 * @member SimpleLayout.layout.GridLayout#rows
                 */
                this.rows = 1;
                /**
                 * The horizontal gap property is the gap that will be used when laying out items in the grid columns.
                 * @default 0
                 * @member SimpleLayout.layout.GridLayout#horizontalGap
                 */
                this.horizontalGap = 0;
                /**
                 * The vertical gap property is the gap that will be used when laying out items in the grid rows.
                 * @default 0
                 * @member SimpleLayout.layout.GridLayout#verticalGap
                 */
                this.verticalGap = 0;
            }
            /**
             * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
             * Layout type class name, in this case it will return the string "GridLayout".
             *
             * @method SimpleLayout.layout.GridLayout#getLayoutType
             * @returns {String} "GridLayout"
             */
            GridLayout.prototype.getLayoutType = function () {
                return 'GridLayout';
            };
            GridLayout.prototype.fitChildrenInto = function (targetContainer, w, h) {
                if (targetContainer == null)
                    return;
                var paddingTopVal = h * this.paddingTop;
                var paddingBottomVal = h * this.paddingBottom;
                var paddingLeftVal = w * this.paddingLeft;
                var paddingRightVal = w * this.paddingRight;
                var gapHVal = w * this.horizontalGap;
                var gapVVal = h * this.verticalGap;
                if (this.layoutVisualizer) {
                    this.layoutVisualizer.setDebugLayoutContainer(targetContainer, w, h);
                    this.layoutVisualizer.setDebugPadding(targetContainer, w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
                }
                if (targetContainer.countLayoutItems <= 0)
                    return;
                // Minimum 1 column and one row!
                var targetColumns = Math.max(1, this.columns);
                var targetRows = Math.max(1, this.rows);
                // make sure that we have enough cells
                if ((targetColumns * targetRows) < targetContainer.countLayoutItems) {
                    targetRows = Math.ceil(targetContainer.countLayoutItems / targetColumns);
                }
                var totalHGaps;
                var totalHPadding;
                var unusedHSpace;
                var spaceForHItems;
                var targetHGap;
                var currentX;
                var totalVGaps;
                var totalVPadding;
                var unusedVSpace;
                var spaceForVItems;
                var targetVGap;
                var currentY;
                var targetWidth;
                var targetHeight;
                var layoutItem;
                var i;
                totalHGaps = gapHVal * (targetColumns - 1);
                totalHPadding = paddingLeftVal + paddingRightVal;
                unusedHSpace = totalHGaps + totalHPadding;
                spaceForHItems = (w - unusedHSpace) / targetColumns;
                targetHGap = gapHVal;
                // not space for items left
                if (spaceForHItems <= 0) {
                    this.lastError = "Too much gap and left/right padding was requested from the grid layout";
                    return;
                }
                totalVGaps = gapVVal * (targetRows - 1);
                totalVPadding = paddingTopVal + paddingBottomVal;
                unusedVSpace = totalVGaps + totalVPadding;
                spaceForVItems = (h - unusedVSpace) / targetRows;
                targetVGap = gapVVal;
                // too much padding
                if (spaceForVItems <= 0) {
                    this.lastError = "Too much top/bottom padding was requested from the grid layout";
                    return;
                }
                targetWidth = spaceForHItems;
                targetHeight = spaceForVItems;
                // snap to pixels?
                if (this.snapToPixels == true) {
                    targetWidth = Math.round(targetWidth);
                    targetHeight = Math.round(targetHeight);
                }
                var row = 0;
                var column = 0;
                for (i = 0; i < targetContainer.countLayoutItems; i++) {
                    row = Math.floor(i / targetColumns);
                    column = i - (row * targetColumns);
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    layoutItem.fitInto(targetWidth, targetHeight);
                    currentX = paddingLeftVal + (targetWidth * column) + (targetHGap * column);
                    currentY = paddingTopVal + (targetHeight * row) + (targetVGap * row);
                    this.alignLayoutItem(layoutItem, currentX, currentY, targetWidth, targetHeight);
                    if (this.layoutVisualizer) {
                        this.layoutVisualizer.setDebugLayoutItem(targetContainer, layoutItem, currentX, currentY, targetWidth, targetHeight);
                        if (column < targetColumns - 1)
                            this.layoutVisualizer.setDebugGap(targetContainer, currentX + targetWidth, currentY, targetHGap, targetHeight);
                        if (column === 0 && row < targetRows - 1)
                            this.layoutVisualizer.setDebugGap(targetContainer, currentX, currentY + targetHeight, (w - totalHPadding), targetVGap);
                    }
                }
                this.lastError = "";
            };
            return GridLayout;
        })(layout.BasicLayout);
        layout.GridLayout = GridLayout;
    })(layout = SimpleLayout.layout || (SimpleLayout.layout = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="../reference.ts"/>
var SimpleLayout;
(function (SimpleLayout) {
    var layout;
    (function (layout) {
        var HorizontalLayout = (function (_super) {
            __extends(HorizontalLayout, _super);
            /**
             * @class SimpleLayout.layout.HorizontalLayout
             * @augments SimpleLayout.layout.BasicLayout
             * @classdesc The HorizontalLayout will divide the given space horizontally to all his LayoutItems equally, unless there
             * are children who ask for a specific width. All the LayoutItems will then get moved to the top/middle/bottom of
             * their space according to the LayoutItem's vertical align.
             */
            function HorizontalLayout() {
                _super.call(this);
            }
            /**
             * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
             * Layout type class name, in this case it will return the string "HorizontalLayout".
             *
             * @method SimpleLayout.layout.HorizontalLayout#getLayoutType
             * @returns {String} "HorizontalLayout"
             */
            HorizontalLayout.prototype.getLayoutType = function () {
                return 'HorizontalLayout';
            };
            HorizontalLayout.prototype.fitChildrenInto = function (targetContainer, w, h) {
                if (targetContainer == null)
                    return;
                var paddingTopVal = h * this.paddingTop;
                var paddingBottomVal = h * this.paddingBottom;
                var paddingLeftVal = w * this.paddingLeft;
                var paddingRightVal = w * this.paddingRight;
                var gapVal = w * this.gap;
                if (this.layoutVisualizer) {
                    this.layoutVisualizer.setDebugLayoutContainer(targetContainer, w, h);
                    this.layoutVisualizer.setDebugPadding(targetContainer, w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
                }
                if (targetContainer.countLayoutItems <= 0)
                    return;
                var totalItemsGap;
                var totalVPadding;
                var totalHPadding;
                var totalGaps;
                var spaceForItems;
                var targetWidth;
                var targetHeight;
                var targetGap;
                var currentX;
                var layoutItem;
                var i;
                totalItemsGap = gapVal * (targetContainer.countLayoutItems - 1);
                totalVPadding = paddingTopVal + paddingBottomVal;
                totalHPadding = paddingLeftVal + paddingRightVal;
                totalGaps = totalItemsGap + totalHPadding;
                spaceForItems = w - totalGaps;
                targetHeight = h - totalVPadding;
                targetGap = gapVal;
                // not space for items left
                if (spaceForItems <= 0.0) {
                    this.lastError = "Too much gap and left/right padding was requested from the horizontal layout";
                    return;
                }
                // too much padding
                if (targetHeight <= 0.0) {
                    this.lastError = "Too much top/bottom padding was requested from the horizontal layout";
                    return;
                }
                // find out how much space left for each item (The ones that didn't request for specific height)
                var unRequestedWidthPercent = 1.0;
                var countRequestedItems = 0;
                for (i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    if (layoutItem.requestedWidthPercent > 0) {
                        countRequestedItems++;
                        unRequestedWidthPercent = unRequestedWidthPercent - layoutItem.requestedWidthPercent;
                    }
                }
                // round it up
                unRequestedWidthPercent = Math.round(unRequestedWidthPercent * 100) / 100;
                // not good at all!
                if (unRequestedWidthPercent < 0.0) {
                    this.lastError = "Too much space was requested from the horizontal layout";
                    return;
                }
                var widthPercentForUnrequested = 0.0;
                if (countRequestedItems < targetContainer.countLayoutItems) {
                    widthPercentForUnrequested = unRequestedWidthPercent / (targetContainer.countLayoutItems - countRequestedItems);
                }
                currentX = paddingLeftVal;
                for (i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    if (layoutItem.requestedWidthPercent > 0.0)
                        targetWidth = spaceForItems * layoutItem.requestedWidthPercent;
                    else
                        targetWidth = spaceForItems * widthPercentForUnrequested;
                    // snap to pixels?
                    if (this.snapToPixels == true)
                        targetWidth = Math.round(targetWidth);
                    layoutItem.fitInto(targetWidth, targetHeight);
                    this.alignLayoutItem(layoutItem, currentX, paddingTopVal, targetWidth, targetHeight);
                    if (this.layoutVisualizer)
                        this.layoutVisualizer.setDebugLayoutItem(targetContainer, layoutItem, currentX, paddingTopVal, targetWidth, targetHeight);
                    // move on
                    currentX = currentX + targetWidth;
                    if (this.layoutVisualizer && i < targetContainer.countLayoutItems - 1)
                        this.layoutVisualizer.setDebugGap(targetContainer, currentX, paddingTopVal, targetGap, h - totalVPadding);
                    currentX = currentX + targetGap;
                }
                this.lastError = "";
            };
            return HorizontalLayout;
        })(layout.BasicLayout);
        layout.HorizontalLayout = HorizontalLayout;
    })(layout = SimpleLayout.layout || (SimpleLayout.layout = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="../reference.ts"/>
/// <reference path="../reference.ts"/>
var SimpleLayout;
(function (SimpleLayout) {
    var layout;
    (function (layout) {
        var VerticalLayout = (function (_super) {
            __extends(VerticalLayout, _super);
            /**
             * @class SimpleLayout.layout.VerticalLayout
             * @augments SimpleLayout.layout.BasicLayout
             * @classdesc The VerticalLayout will divide the given space vertically to all his LayoutItems equally, unless there
             * are children who ask for a specific height. All the LayoutItems will then get moved to the left/center/right of
             * their space according to the LayoutItem's horizontal align.
             */
            function VerticalLayout() {
                _super.call(this);
            }
            /**
             * There are several Layouts, and they all inherit from the BasicLayout. This is a simple way to get the
             * Layout type class name, in this case it will return the string "VerticalLayout".
             *
             * @method SimpleLayout.layout.VerticalLayout#getLayoutType
             * @returns {String} "VerticalLayout"
             */
            VerticalLayout.prototype.getLayoutType = function () {
                return 'VerticalLayout';
            };
            VerticalLayout.prototype.fitChildrenInto = function (targetContainer, w, h) {
                if (targetContainer == null || targetContainer.countLayoutItems == 0)
                    return;
                var paddingTopVal = h * this.paddingTop;
                var paddingBottomVal = h * this.paddingBottom;
                var paddingLeftVal = w * this.paddingLeft;
                var paddingRightVal = w * this.paddingRight;
                var gapVal = h * this.gap;
                if (this.layoutVisualizer) {
                    this.layoutVisualizer.setDebugLayoutContainer(targetContainer, w, h);
                    this.layoutVisualizer.setDebugPadding(targetContainer, w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
                }
                if (targetContainer.countLayoutItems <= 0)
                    return;
                var totalItemsGap;
                var totalVPadding;
                var totalHPadding;
                var totalGaps;
                var spaceForItems;
                var targetWidth;
                var targetHeight;
                var targetGap;
                var currentY;
                var layoutItem;
                var i;
                totalItemsGap = gapVal * (targetContainer.countLayoutItems - 1);
                totalVPadding = paddingTopVal + paddingBottomVal;
                totalHPadding = paddingLeftVal + paddingRightVal;
                totalGaps = totalItemsGap + totalVPadding;
                spaceForItems = h - totalGaps;
                targetWidth = w - totalHPadding;
                targetGap = gapVal;
                // not space for items left
                if (spaceForItems <= 0.0) {
                    this.lastError = "Too much gap and top/bottom padding was requested from the vertical layout";
                    return;
                }
                // too much padding
                if (targetWidth <= 0.0) {
                    this.lastError = "Too much left/right padding was requested from the vertical layout";
                    return;
                }
                // find out how much space left for each item (The ones that didn't request for specific height)
                var unRequestedHeightPercent = 1.0;
                var countRequestedItems = 0;
                for (i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    if (layoutItem.requestedHeightPercent > 0) {
                        countRequestedItems++;
                        unRequestedHeightPercent = unRequestedHeightPercent - layoutItem.requestedHeightPercent;
                    }
                }
                // round it up
                unRequestedHeightPercent = Math.round(unRequestedHeightPercent * 100) / 100;
                // not good at all!
                if (unRequestedHeightPercent < 0.0) {
                    this.lastError = "Too much space was requested from the vertical layout";
                    return;
                }
                var heightPercentForUnrequested = 0.0;
                if (countRequestedItems < targetContainer.countLayoutItems) {
                    heightPercentForUnrequested = unRequestedHeightPercent / (targetContainer.countLayoutItems - countRequestedItems);
                }
                currentY = paddingTopVal;
                for (i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    if (layoutItem.requestedHeightPercent > 0.0)
                        targetHeight = spaceForItems * layoutItem.requestedHeightPercent;
                    else
                        targetHeight = spaceForItems * heightPercentForUnrequested;
                    // snap to pixels?
                    if (this.snapToPixels == true)
                        targetHeight = Math.round(targetHeight);
                    layoutItem.fitInto(targetWidth, targetHeight);
                    this.alignLayoutItem(layoutItem, paddingLeftVal, currentY, targetWidth, targetHeight);
                    if (this.layoutVisualizer)
                        this.layoutVisualizer.setDebugLayoutItem(targetContainer, layoutItem, paddingLeftVal, currentY, targetWidth, targetHeight);
                    // move on
                    currentY = currentY + targetHeight;
                    if (this.layoutVisualizer && i < targetContainer.countLayoutItems - 1)
                        this.layoutVisualizer.setDebugGap(targetContainer, paddingLeftVal, currentY, w - totalHPadding, targetGap);
                    currentY = currentY + targetGap;
                }
                this.lastError = "";
            };
            return VerticalLayout;
        })(layout.BasicLayout);
        layout.VerticalLayout = VerticalLayout;
    })(layout = SimpleLayout.layout || (SimpleLayout.layout = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="../reference.ts"/>
var SimpleLayout;
(function (SimpleLayout) {
    var LayoutAssetsFactory = (function () {
        /**
         * @class SimpleLayout.LayoutAssetsFactory
         * @classdesc TThe LayoutAssetsFactory class is a utility class for creating and clearing all the
         * layout tree displayObjects and displayObjectContainers.
         */
        function LayoutAssetsFactory() {
        }
        /**
        * Using the given assetsFactory to create all the displayObjects and displayObjectContainers of the UI.
        *
        * @method SimpleLayout.LayoutAssetsFactory#createAssets
        * @static
        * @param rootNode {LayoutContainer} the root node to start from.
        * @param assetsFactory {IAssetsFactory} an object that implements the IAssetsFactory interface.
        */
        LayoutAssetsFactory.createAssets = function (rootNode, assetsFactory) {
            this.clearAssets(rootNode);
            this.createNodeAssets(rootNode, assetsFactory);
        };
        LayoutAssetsFactory.createNodeAssets = function (node, assetsFactory) {
            var containerWrapper = assetsFactory.createDisplayObjectContainer();
            node.setDisplayObject(containerWrapper);
            for (var i = 0; i < node.countLayoutItems; i++) {
                var layoutItem = node.getLayoutItemAt(i);
                if (layoutItem.getLayoutItemType() === 'LayoutContainer') {
                    this.createNodeAssets(layoutItem, assetsFactory);
                }
                else {
                    if (layoutItem.assetId) {
                        var displayObjectWrapper = assetsFactory.createDisplayObject(layoutItem.assetId);
                        layoutItem.setDisplayObject(displayObjectWrapper);
                    }
                }
            }
        };
        /**
         * Removed all the assets from the layout [calling setDisplayObject(null)] on all the layout items.
         *
         * @method SimpleLayout.LayoutAssetsFactory#clearAssets
         * @static
         * @param rootNode {LayoutContainer} The root node to start from.
         */
        LayoutAssetsFactory.clearAssets = function (rootNode) {
            for (var i = 0; i < rootNode.countLayoutItems; i++) {
                var layoutItem = rootNode.getLayoutItemAt(i);
                layoutItem.setDisplayObject(null);
                if (layoutItem.getLayoutItemType() === 'LayoutContainer') {
                    this.clearAssets(layoutItem);
                }
            }
            rootNode.setDisplayObject(null);
        };
        return LayoutAssetsFactory;
    })();
    SimpleLayout.LayoutAssetsFactory = LayoutAssetsFactory;
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path='../reference.ts'/>
var SimpleLayout;
(function (SimpleLayout) {
    var utils;
    (function (utils) {
        var ScriptsLoader = (function () {
            function ScriptsLoader() {
                this.m_scriptsUrls = [];
                this.m_loadedScripts = [];
            }
            ScriptsLoader.prototype.addScriptsToLoad = function (scriptsUrls) {
                for (var i = 0; i < scriptsUrls.length; i++) {
                    this.addScriptToLoad(scriptsUrls[i]);
                }
            };
            ScriptsLoader.prototype.addScriptToLoad = function (scriptUrl) {
                if (this.m_scriptsUrls.indexOf(scriptUrl) == -1) {
                    this.m_scriptsUrls.push(scriptUrl);
                }
            };
            ScriptsLoader.prototype.load = function (loadedCallback, errorCallback) {
                var _this = this;
                if (this.m_scriptsUrls.length == 0) {
                    loadedCallback();
                }
                else {
                    var countOfLoaded = 0;
                    for (var i = 0; i < this.m_scriptsUrls.length; i++) {
                        var scriptElement = document.createElement("script");
                        scriptElement.type = "text/javascript";
                        scriptElement.src = this.m_scriptsUrls[i];
                        scriptElement.onload = function (event) {
                            _this.m_loadedScripts.push(event.target);
                            countOfLoaded++;
                            if (countOfLoaded == _this.m_loadedScripts.length)
                                loadedCallback();
                        };
                        scriptElement.onerror = function (event) {
                            errorCallback("The script " + event.target.src + " is not accessible.");
                        };
                        document.getElementsByTagName("head")[0].appendChild(scriptElement);
                    }
                }
            };
            ScriptsLoader.prototype.reset = function () {
                this.m_scriptsUrls = [];
                for (var i = 0; i < this.m_loadedScripts.length; i++) {
                    var scriptElement = this.m_loadedScripts[i];
                    scriptElement.parentElement.removeChild(scriptElement);
                }
                this.m_loadedScripts = [];
            };
            ScriptsLoader.prototype.dispose = function () {
                this.reset();
            };
            return ScriptsLoader;
        })();
        utils.ScriptsLoader = ScriptsLoader;
    })(utils = SimpleLayout.utils || (SimpleLayout.utils = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="../reference.ts"/>
/// <reference path="LayoutItem.ts" />
/// <reference path="LayoutContainer.ts" />
//# sourceMappingURL=simple-layout-js.js.map