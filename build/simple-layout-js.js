var SimpleLayout;
(function (SimpleLayout) {
    var LayoutItem = (function () {
        function LayoutItem(dispObj) {
            this.layoutItemType = 'LayoutItem';
            this.fittedIntoWidth = 0.0;
            this.fittedIntoHeight = 0.0;
            this.horizontalAlign = SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE;
            this.verticalAlign = SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE;
            this.keepAspectRatio = true;
            this.requestedWidthPercent = 0.0;
            this.requestedHeightPercent = 0.0;
            this.parent = null;
            this.displayObject = dispObj;
            this.assetId = "";
            this.m_name = null;
        }
        Object.defineProperty(LayoutItem.prototype, "name", {
            get: function () {
                return this.m_name;
            },
            set: function (value) {
                this.m_name = value;
                if (this.displayObject)
                    this.displayObject.name = this.m_name;
            },
            enumerable: true,
            configurable: true
        });
        LayoutItem.prototype.toJson = function () {
            return {
                layoutItemType: this.layoutItemType,
                requestedWidthPercent: this.requestedWidthPercent,
                requestedHeightPercent: this.requestedHeightPercent,
                horizontalAlign: this.horizontalAlign,
                verticalAlign: this.verticalAlign,
                fittedIntoWidth: this.fittedIntoWidth,
                fittedIntoHeight: this.fittedIntoHeight,
                keepAspectRatio: this.keepAspectRatio,
                assetId: this.assetId,
                name: this.name
            };
        };
        LayoutItem.prototype.fromJson = function (json) {
            this.layoutItemType = json.layoutItemType;
            this.requestedWidthPercent = json.requestedWidthPercent;
            this.requestedHeightPercent = json.requestedHeightPercent;
            this.horizontalAlign = json.horizontalAlign;
            this.verticalAlign = json.verticalAlign;
            this.fittedIntoWidth = json.fittedIntoWidth;
            this.fittedIntoHeight = json.fittedIntoHeight;
            this.keepAspectRatio = json.keepAspectRatio;
            this.assetId = json.assetId;
            this.name = json.name;
        };
        LayoutItem.prototype.setDisplayObject = function (value) {
            if (value != this.displayObject) {
                if (this.displayObject && this.parent && this.parent.displayObjectContainer)
                    this.parent.displayObjectContainer.removeChild(this.displayObject);
                this.displayObject = value;
                if (this.displayObject && this.parent && this.parent.displayObjectContainer)
                    this.parent.displayObjectContainer.addChild(this.displayObject);
            }
        };
        LayoutItem.prototype.fitToSize = function (dispObj, w, h) {
            if (w === void 0) { w = 0.0; }
            if (h === void 0) { h = 0.0; }
            dispObj.resetScaling();
            var imageRatio = dispObj.width / dispObj.height;
            var containerRatio = w / h;
            if (containerRatio > imageRatio) {
                dispObj.height = h;
                dispObj.width = imageRatio * dispObj.height;
            }
            else {
                dispObj.width = w;
                dispObj.height = dispObj.width / imageRatio;
            }
        };
        LayoutItem.prototype.executeLayout = function () {
            if (this.displayObject) {
                if (this.keepAspectRatio) {
                    this.fitToSize(this.displayObject, this.fittedIntoWidth, this.fittedIntoHeight);
                }
                else {
                    this.displayObject.width = this.fittedIntoWidth;
                    this.displayObject.height = this.fittedIntoHeight;
                }
            }
        };
        LayoutItem.prototype.fitInto = function (w, h) {
            if (this.displayObject == null)
                return;
            this.fittedIntoWidth = Math.max(1, Math.abs(w));
            this.fittedIntoHeight = Math.max(1, Math.abs(h));
            this.executeLayout();
        };
        LayoutItem.prototype.dispose = function () {
            this.parent = null;
            if (this.displayObject) {
                this.displayObject.dispose();
                this.displayObject = null;
            }
        };
        return LayoutItem;
    })();
    SimpleLayout.LayoutItem = LayoutItem;
})(SimpleLayout || (SimpleLayout = {}));
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
        function LayoutContainer() {
            _super.call(this);
            this.m_layoutItems = [];
            this.layoutItemType = 'LayoutContainer';
        }
        LayoutContainer.prototype.toJson = function () {
            var result = _super.prototype.toJson.call(this);
            var layoutItems = [];
            for (var i = 0; i < this.m_layoutItems.length; i++) {
                layoutItems.push(this.m_layoutItems[i].toJson());
            }
            result.layoutItems = layoutItems;
            if (this.layout)
                result.layout = this.layout.toJson();
            return result;
        };
        LayoutContainer.prototype.fromJson = function (json) {
            _super.prototype.fromJson.call(this, json);
            var layoutItems = json.layoutItems;
            for (var i = 0; i < layoutItems.length; i++) {
                var layoutItem = SimpleLayout.LayoutView.itemFromJson(layoutItems[i]);
                layoutItem.parent = this;
                this.layoutItems.push(layoutItem);
            }
            if (json.hasOwnProperty('layout')) {
                var layoutJson = json.layout;
                var layout;
                switch (layoutJson['layoutType']) {
                    case 'basic':
                        layout = new SimpleLayout.layout.BasicLayout();
                        break;
                    case 'horizontal':
                        layout = new SimpleLayout.layout.HorizontalLayout();
                        break;
                    case 'vertical':
                        layout = new SimpleLayout.layout.VerticalLayout();
                        break;
                    default:
                        throw 'Bad Json, unknown layoutType';
                }
                layout.fromJson(layoutJson);
                this.layout = layout;
            }
        };
        Object.defineProperty(LayoutContainer.prototype, "layoutItems", {
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
        LayoutContainer.prototype.executeLayout = function () {
            if (this.layout) {
                var layoutVisualizer = this.layout.getLayoutVisualizer();
                if (layoutVisualizer) {
                    layoutVisualizer.clear();
                    if (this.displayObject)
                        layoutVisualizer.setDebugItem(this, 0, 0, this.fittedIntoWidth, this.fittedIntoHeight);
                }
                this.layout.fitChildrenInto(this, this.fittedIntoWidth, this.fittedIntoHeight);
                this.displayObject.width = this.fittedIntoWidth;
                this.displayObject.height = this.fittedIntoHeight;
                if (layoutVisualizer) {
                    if (this.displayObject)
                        layoutVisualizer.setPosition(this.displayObject.globalPos);
                    layoutVisualizer.setDebugFitAreaSize(this.fittedIntoWidth, this.fittedIntoHeight);
                    layoutVisualizer.update();
                }
            }
            else {
                _super.prototype.executeLayout.call(this);
            }
        };
        LayoutContainer.prototype.getLayoutItemAt = function (index) {
            return this.m_layoutItems[index];
        };
        LayoutContainer.prototype.addLayoutItem = function (layoutItem, index) {
            if (index === void 0) { index = -1; }
            if (layoutItem == null)
                throw "Can not add a null layoutItem";
            if (this.m_layoutItems.indexOf(layoutItem) != -1) {
                return null;
            }
            else {
                if (index > -1)
                    this.m_layoutItems.splice(index, 0, layoutItem);
                else
                    this.m_layoutItems.push(layoutItem);
                layoutItem.parent = this;
                if (layoutItem.displayObject)
                    this.displayObjectContainer.addChild(layoutItem.displayObject);
                return layoutItem;
            }
        };
        LayoutContainer.prototype.removeLayoutItem = function (layoutItem) {
            if (layoutItem == null)
                return null;
            var pos = this.m_layoutItems.indexOf(layoutItem);
            if (pos == -1) {
                return null;
            }
            else {
                layoutItem.parent = null;
                if (layoutItem.displayObject)
                    this.displayObjectContainer.removeChild(layoutItem.displayObject);
                return this.m_layoutItems.splice(pos, 1)[0];
            }
        };
        LayoutContainer.prototype.removeAllLayoutItems = function () {
            while (this.m_layoutItems.length > 0)
                this.removeLayoutItem(this.m_layoutItems[0]);
        };
        Object.defineProperty(LayoutContainer.prototype, "countLayoutItems", {
            get: function () {
                return this.m_layoutItems.length;
            },
            enumerable: true,
            configurable: true
        });
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
    var LayoutView = (function (_super) {
        __extends(LayoutView, _super);
        function LayoutView() {
            _super.call(this);
            this.layoutItemType = 'LayoutView';
        }
        LayoutView.itemFromJson = function (json) {
            var result;
            switch (json.layoutItemType) {
                case 'LayoutView':
                    result = new LayoutView();
                    break;
                case 'LayoutContainer':
                    result = new SimpleLayout.LayoutContainer();
                    break;
                case 'LayoutItem':
                    result = new SimpleLayout.LayoutItem();
                    break;
                default:
                    throw 'Bad JSON, unknown layoutItemType';
            }
            result.fromJson(json);
            return result;
        };
        LayoutView.prototype.createAssets = function (assetsFactory) {
            this.clearNodeAssets(this);
            this.createNodeAssets(this, assetsFactory);
        };
        LayoutView.prototype.createNodeAssets = function (node, assetsFactory) {
            var containerWrapper = assetsFactory.createDisplayObjectContainer();
            node.setDisplayObject(containerWrapper);
            for (var i = 0; i < node.countLayoutItems; i++) {
                var layoutItem = node.getLayoutItemAt(i);
                if (layoutItem.layoutItemType == 'LayoutContainer') {
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
        LayoutView.prototype.clearAssets = function () {
            this.clearNodeAssets(this);
        };
        LayoutView.prototype.clearNodeAssets = function (node) {
            for (var i = 0; i < node.countLayoutItems; i++) {
                var layoutItem = node.getLayoutItemAt(i);
                layoutItem.setDisplayObject(null);
                if (layoutItem.layoutItemType == 'LayoutView' || layoutItem.layoutItemType == 'LayoutContainer') {
                    this.clearNodeAssets(layoutItem);
                }
            }
            node.setDisplayObject(null);
        };
        LayoutView.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return LayoutView;
    })(SimpleLayout.LayoutContainer);
    SimpleLayout.LayoutView = LayoutView;
})(SimpleLayout || (SimpleLayout = {}));
var SimpleLayout;
(function (SimpleLayout) {
    (function (enums) {
        var HorizontalAlignEnum = (function () {
            function HorizontalAlignEnum() {
            }
            HorizontalAlignEnum.H_ALIGN_TYPE_NONE = "none";
            HorizontalAlignEnum.H_ALIGN_TYPE_CENTER = "center";
            HorizontalAlignEnum.H_ALIGN_TYPE_LEFT = "left";
            HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT = "right";
            return HorizontalAlignEnum;
        })();
        enums.HorizontalAlignEnum = HorizontalAlignEnum;
    })(SimpleLayout.enums || (SimpleLayout.enums = {}));
    var enums = SimpleLayout.enums;
})(SimpleLayout || (SimpleLayout = {}));
var SimpleLayout;
(function (SimpleLayout) {
    (function (enums) {
        var VerticalAlignEnum = (function () {
            function VerticalAlignEnum() {
            }
            VerticalAlignEnum.V_ALIGN_TYPE_NONE = "none";
            VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE = "middle";
            VerticalAlignEnum.V_ALIGN_TYPE_TOP = "top";
            VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM = "bottom";
            return VerticalAlignEnum;
        })();
        enums.VerticalAlignEnum = VerticalAlignEnum;
    })(SimpleLayout.enums || (SimpleLayout.enums = {}));
    var enums = SimpleLayout.enums;
})(SimpleLayout || (SimpleLayout = {}));
var SimpleLayout;
(function (SimpleLayout) {
    (function (layout) {
        var BasicLayout = (function () {
            function BasicLayout() {
                this.horizontalAlign = SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER;
                this.verticalAlign = SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE;
                this.paddingTop = 0;
                this.paddingBottom = 0;
                this.paddingLeft = 0;
                this.paddingRight = 0;
                this.gap = 0;
                this.snapToPixels = false;
                this.lastError = "";
            }
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
            BasicLayout.prototype.getLayoutType = function () {
                return 'basic';
            };
            BasicLayout.prototype.setLayoutVisualizer = function (value) {
                if (this.layoutVisualizer !== value) {
                    if (value && value.attachedTo) {
                        value.attachedTo.setLayoutVisualizer(null);
                    }
                    this.layoutVisualizer = value;
                    if (this.layoutVisualizer) {
                        this.layoutVisualizer.attachedTo = this;
                    }
                }
            };
            BasicLayout.prototype.getLayoutVisualizer = function () {
                return this.layoutVisualizer;
            };
            BasicLayout.prototype.fitChildrenInto = function (targetContainer, w, h) {
                if (targetContainer == null || targetContainer.countLayoutItems == 0)
                    return;
                var HspaceForItems;
                var VspaceForItems;
                var targetWidth;
                var targetHeight;
                var displayObject;
                var layoutItem;
                var paddingTopVal = h * this.paddingTop;
                var paddingBottomVal = h * this.paddingBottom;
                var paddingLeftVal = w * this.paddingLeft;
                var paddingRightVal = w * this.paddingRight;
                if (this.layoutVisualizer)
                    this.layoutVisualizer.setDebugPadding(w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
                HspaceForItems = w - (paddingLeftVal + paddingRightVal);
                VspaceForItems = h - (paddingTopVal + paddingBottomVal);
                if (HspaceForItems <= 0.0) {
                    this.lastError = "Too much left/right padding was requested from the basic layout";
                    return;
                }
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
                    if (this.snapToPixels == true) {
                        targetWidth = Math.round(targetWidth);
                        targetHeight = Math.round(targetHeight);
                    }
                    layoutItem.fitInto(targetWidth, targetHeight);
                    displayObject = layoutItem.displayObject;
                    if (displayObject) {
                        var hAlignment;
                        if (layoutItem.horizontalAlign != SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                            hAlignment = layoutItem.horizontalAlign;
                        else
                            hAlignment = this.horizontalAlign;
                        switch (hAlignment) {
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER:
                                {
                                    displayObject.x = paddingLeftVal + ((HspaceForItems - displayObject.width) / 2);
                                    break;
                                }
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT:
                                {
                                    displayObject.x = paddingLeftVal;
                                    break;
                                }
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT:
                                {
                                    displayObject.x = paddingLeftVal + (HspaceForItems - displayObject.width);
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
                                    displayObject.y = paddingTopVal;
                                    break;
                                }
                            case SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE:
                                {
                                    displayObject.y = paddingTopVal + ((VspaceForItems - displayObject.height) / 2);
                                    break;
                                }
                            case SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM:
                                {
                                    displayObject.y = paddingTopVal + (VspaceForItems - displayObject.height);
                                    break;
                                }
                        }
                        if (this.snapToPixels == true)
                            displayObject.x = Math.round(displayObject.x);
                        if (this.snapToPixels == true)
                            displayObject.y = Math.round(displayObject.y);
                    }
                    if (this.layoutVisualizer)
                        this.layoutVisualizer.setDebugItem(layoutItem, paddingLeftVal, paddingTopVal, HspaceForItems, VspaceForItems);
                }
                this.lastError = "";
            };
            BasicLayout.prototype.dispose = function () {
                this.setLayoutVisualizer(null);
            };
            return BasicLayout;
        })();
        layout.BasicLayout = BasicLayout;
    })(SimpleLayout.layout || (SimpleLayout.layout = {}));
    var layout = SimpleLayout.layout;
})(SimpleLayout || (SimpleLayout = {}));
var SimpleLayout;
(function (SimpleLayout) {
    (function (layout) {
        var HorizontalLayout = (function (_super) {
            __extends(HorizontalLayout, _super);
            function HorizontalLayout() {
                _super.call(this);
            }
            HorizontalLayout.prototype.getLayoutType = function () {
                return 'horizontal';
            };
            HorizontalLayout.prototype.fitChildrenInto = function (targetContainer, w, h) {
                if (targetContainer == null || targetContainer.countLayoutItems == 0)
                    return;
                var paddingTopVal = h * this.paddingTop;
                var paddingBottomVal = h * this.paddingBottom;
                var paddingLeftVal = w * this.paddingLeft;
                var paddingRightVal = w * this.paddingRight;
                var gapVal = w * this.gap;
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
                var displayObject;
                var i;
                if (this.layoutVisualizer)
                    this.layoutVisualizer.setDebugPadding(w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
                totalItemsGap = gapVal * (targetContainer.countLayoutItems - 1);
                totalVPadding = paddingTopVal + paddingBottomVal;
                totalHPadding = paddingLeftVal + paddingRightVal;
                totalGaps = totalItemsGap + totalHPadding;
                spaceForItems = w - totalGaps;
                targetHeight = h - totalVPadding;
                targetGap = gapVal;
                if (spaceForItems <= 0.0) {
                    this.lastError = "Too much gap and left/right padding was requested from the horizontal layout";
                    return;
                }
                if (targetHeight <= 0.0) {
                    this.lastError = "Too much top/bottom padding was requested from the horizontal layout";
                    return;
                }
                var unRequestedWidthPercent = 1.0;
                var countRequestedItems = 0;
                for (i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    if (layoutItem.requestedWidthPercent > 0) {
                        countRequestedItems++;
                        unRequestedWidthPercent = unRequestedWidthPercent - layoutItem.requestedWidthPercent;
                    }
                }
                unRequestedWidthPercent = Math.round(unRequestedWidthPercent * 100) / 100;
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
                    if (this.snapToPixels == true)
                        targetWidth = Math.round(targetWidth);
                    layoutItem.fitInto(targetWidth, targetHeight);
                    displayObject = layoutItem.displayObject;
                    if (displayObject) {
                        var hAlignment;
                        if (layoutItem.horizontalAlign != SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                            hAlignment = layoutItem.horizontalAlign;
                        else
                            hAlignment = this.horizontalAlign;
                        switch (hAlignment) {
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER:
                                {
                                    displayObject.x = currentX + ((targetWidth - displayObject.width) / 2);
                                    break;
                                }
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT:
                                {
                                    displayObject.x = currentX;
                                    break;
                                }
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT:
                                {
                                    displayObject.x = currentX + (targetWidth - displayObject.width);
                                    break;
                                }
                        }
                        var vAlignment;
                        if (layoutItem.verticalAlign != SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE)
                            vAlignment = layoutItem.verticalAlign;
                        else
                            vAlignment = this.verticalAlign;
                        switch (vAlignment) {
                            case SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE:
                                {
                                    displayObject.y = paddingTopVal + ((targetHeight - displayObject.height) / 2);
                                    break;
                                }
                            case SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_TOP:
                                {
                                    displayObject.y = paddingTopVal;
                                    break;
                                }
                            case SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM:
                                {
                                    displayObject.y = paddingTopVal + (targetHeight - displayObject.height);
                                    break;
                                }
                        }
                        if (this.snapToPixels == true)
                            displayObject.x = Math.round(displayObject.x);
                        if (this.snapToPixels == true)
                            displayObject.y = Math.round(displayObject.y);
                    }
                    if (this.layoutVisualizer)
                        this.layoutVisualizer.setDebugItem(layoutItem, currentX, paddingTopVal, targetWidth, targetHeight);
                    currentX = currentX + targetWidth;
                    if (this.layoutVisualizer && i < targetContainer.countLayoutItems - 1)
                        this.layoutVisualizer.setDebugGap(currentX, paddingTopVal, targetGap, h - totalVPadding);
                    currentX = currentX + targetGap;
                }
                this.lastError = "";
            };
            return HorizontalLayout;
        })(layout.BasicLayout);
        layout.HorizontalLayout = HorizontalLayout;
    })(SimpleLayout.layout || (SimpleLayout.layout = {}));
    var layout = SimpleLayout.layout;
})(SimpleLayout || (SimpleLayout = {}));
var SimpleLayout;
(function (SimpleLayout) {
    (function (layout) {
        var VerticalLayout = (function (_super) {
            __extends(VerticalLayout, _super);
            function VerticalLayout() {
                _super.call(this);
            }
            VerticalLayout.prototype.getLayoutType = function () {
                return 'vertical';
            };
            VerticalLayout.prototype.fitChildrenInto = function (targetContainer, w, h) {
                if (targetContainer == null || targetContainer.countLayoutItems == 0)
                    return;
                var paddingTopVal = h * this.paddingTop;
                var paddingBottomVal = h * this.paddingBottom;
                var paddingLeftVal = w * this.paddingLeft;
                var paddingRightVal = w * this.paddingRight;
                var gapVal = h * this.gap;
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
                var displayObject;
                var i;
                if (this.layoutVisualizer)
                    this.layoutVisualizer.setDebugPadding(w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
                totalItemsGap = gapVal * (targetContainer.countLayoutItems - 1);
                totalVPadding = paddingTopVal + paddingBottomVal;
                totalHPadding = paddingLeftVal + paddingRightVal;
                totalGaps = totalItemsGap + totalVPadding;
                spaceForItems = h - totalGaps;
                targetWidth = w - totalHPadding;
                targetGap = gapVal;
                if (spaceForItems <= 0.0) {
                    this.lastError = "Too much gap and top/bottom padding was requested from the vertical layout";
                    return;
                }
                if (targetWidth <= 0.0) {
                    this.lastError = "Too much left/right padding was requested from the vertical layout";
                    return;
                }
                var unRequestedHeightPercent = 1.0;
                var countRequestedItems = 0;
                for (i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    if (layoutItem.requestedHeightPercent > 0) {
                        countRequestedItems++;
                        unRequestedHeightPercent = unRequestedHeightPercent - layoutItem.requestedHeightPercent;
                    }
                }
                unRequestedHeightPercent = Math.round(unRequestedHeightPercent * 100) / 100;
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
                    if (this.snapToPixels == true)
                        targetHeight = Math.round(targetHeight);
                    layoutItem.fitInto(targetWidth, targetHeight);
                    displayObject = layoutItem.displayObject;
                    if (displayObject) {
                        var hAlignment;
                        if (layoutItem.horizontalAlign != SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                            hAlignment = layoutItem.horizontalAlign;
                        else
                            hAlignment = this.horizontalAlign;
                        switch (hAlignment) {
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER:
                                {
                                    displayObject.x = paddingLeftVal + ((targetWidth - displayObject.width) / 2);
                                    break;
                                }
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT:
                                {
                                    displayObject.x = paddingLeftVal;
                                    break;
                                }
                            case SimpleLayout.enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT:
                                {
                                    displayObject.x = paddingLeftVal + (targetWidth - displayObject.width);
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
                                    displayObject.y = currentY;
                                    break;
                                }
                            case SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE:
                                {
                                    displayObject.y = currentY + ((targetHeight - displayObject.height) / 2);
                                    break;
                                }
                            case SimpleLayout.enums.VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM:
                                {
                                    displayObject.y = currentY + (targetHeight - displayObject.height);
                                    break;
                                }
                        }
                        if (this.snapToPixels == true)
                            displayObject.x = Math.round(displayObject.x);
                        if (this.snapToPixels == true)
                            displayObject.y = Math.round(displayObject.y);
                    }
                    if (this.layoutVisualizer)
                        this.layoutVisualizer.setDebugItem(layoutItem, paddingLeftVal, currentY, targetWidth, targetHeight);
                    currentY = currentY + targetHeight;
                    if (this.layoutVisualizer && i < targetContainer.countLayoutItems - 1)
                        this.layoutVisualizer.setDebugGap(paddingLeftVal, currentY, w - totalHPadding, targetGap);
                    currentY = currentY + targetGap;
                }
                this.lastError = "";
            };
            return VerticalLayout;
        })(layout.BasicLayout);
        layout.VerticalLayout = VerticalLayout;
    })(SimpleLayout.layout || (SimpleLayout.layout = {}));
    var layout = SimpleLayout.layout;
})(SimpleLayout || (SimpleLayout = {}));
//# sourceMappingURL=simple-layout-js.js.map