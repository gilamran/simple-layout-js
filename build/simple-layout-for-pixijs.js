/// <reference path="reference.ts"/>
var SimpleLayout;
(function (SimpleLayout) {
    var PixiJSImpl;
    (function (PixiJSImpl) {
        var PixiJSDisplayObjectWrapper = (function () {
            function PixiJSDisplayObjectWrapper(pixiJSDisplayObject) {
                if (pixiJSDisplayObject == null)
                    throw "pixiJSDisplayObject is null";
                this.m_wrappedDispObj = pixiJSDisplayObject;
            }
            PixiJSDisplayObjectWrapper.prototype.getPivotPoint = function () {
                return { x: 0, y: 0 };
            };
            PixiJSDisplayObjectWrapper.prototype.getGlobalPos = function () {
                var point;
                var currentObj = this.m_wrappedDispObj;
                point = new PIXI.Point(0, 0);
                while (currentObj) {
                    point.x += currentObj.position.x;
                    point.y += currentObj.position.y;
                    currentObj = currentObj.parent;
                }
                return { x: point.x, y: point.y };
            };
            Object.defineProperty(PixiJSDisplayObjectWrapper.prototype, "allowResize", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            PixiJSDisplayObjectWrapper.prototype.getConcreteDisplayObject = function () {
                return this.m_wrappedDispObj;
            };
            Object.defineProperty(PixiJSDisplayObjectWrapper.prototype, "width", {
                get: function () {
                    return this.m_wrappedDispObj.width;
                },
                set: function (value) {
                    this.m_wrappedDispObj.width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PixiJSDisplayObjectWrapper.prototype, "height", {
                get: function () {
                    return this.m_wrappedDispObj.height;
                },
                set: function (value) {
                    this.m_wrappedDispObj.height = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PixiJSDisplayObjectWrapper.prototype, "visible", {
                get: function () {
                    return this.m_wrappedDispObj.visible;
                },
                set: function (value) {
                    this.m_wrappedDispObj.visible = value;
                },
                enumerable: true,
                configurable: true
            });
            PixiJSDisplayObjectWrapper.prototype.resetScaling = function () {
                this.m_wrappedDispObj.scale = new PIXI.Point(1, 1);
            };
            Object.defineProperty(PixiJSDisplayObjectWrapper.prototype, "x", {
                get: function () {
                    return this.m_wrappedDispObj.x;
                },
                set: function (value) {
                    this.m_wrappedDispObj.x = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PixiJSDisplayObjectWrapper.prototype, "y", {
                get: function () {
                    return this.m_wrappedDispObj.y;
                },
                set: function (value) {
                    this.m_wrappedDispObj.y = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PixiJSDisplayObjectWrapper.prototype, "rotation", {
                get: function () {
                    return this.m_wrappedDispObj.rotation;
                },
                set: function (value) {
                    this.m_wrappedDispObj.rotation = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PixiJSDisplayObjectWrapper.prototype, "name", {
                get: function () {
                    return this.m_name;
                },
                set: function (value) {
                    this.m_name = value;
                },
                enumerable: true,
                configurable: true
            });
            PixiJSDisplayObjectWrapper.prototype.dispose = function () {
                this.m_wrappedDispObj = null;
            };
            return PixiJSDisplayObjectWrapper;
        })();
        PixiJSImpl.PixiJSDisplayObjectWrapper = PixiJSDisplayObjectWrapper;
    })(PixiJSImpl = SimpleLayout.PixiJSImpl || (SimpleLayout.PixiJSImpl = {}));
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
    var PixiJSImpl;
    (function (PixiJSImpl) {
        var PixiJSContainerWrapper = (function (_super) {
            __extends(PixiJSContainerWrapper, _super);
            function PixiJSContainerWrapper(pixiJSContainer) {
                this.m_givenWidth = 0;
                this.m_givenHeight = 0;
                if (pixiJSContainer == null)
                    throw "pixiJSContainer is null";
                _super.call(this, pixiJSContainer);
            }
            Object.defineProperty(PixiJSContainerWrapper.prototype, "width", {
                get: function () {
                    return this.m_givenWidth;
                },
                set: function (value) {
                    this.m_givenWidth = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PixiJSContainerWrapper.prototype, "height", {
                get: function () {
                    return this.m_givenHeight;
                },
                set: function (value) {
                    this.m_givenHeight = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PixiJSContainerWrapper.prototype, "displayObjectContainer", {
                get: function () {
                    return this.getConcreteDisplayObject();
                },
                enumerable: true,
                configurable: true
            });
            PixiJSContainerWrapper.prototype.addChild = function (child) {
                this.displayObjectContainer.addChild(child.getConcreteDisplayObject());
            };
            PixiJSContainerWrapper.prototype.removeChild = function (child) {
                this.displayObjectContainer.removeChild(child.getConcreteDisplayObject());
            };
            PixiJSContainerWrapper.prototype.removeAllChildren = function () {
                while (this.displayObjectContainer.children.length > 0)
                    this.displayObjectContainer.removeChild(this.displayObjectContainer.children[0]);
            };
            return PixiJSContainerWrapper;
        })(PixiJSImpl.PixiJSDisplayObjectWrapper);
        PixiJSImpl.PixiJSContainerWrapper = PixiJSContainerWrapper;
    })(PixiJSImpl = SimpleLayout.PixiJSImpl || (SimpleLayout.PixiJSImpl = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="reference.ts"/>
var SimpleLayout;
(function (SimpleLayout) {
    var PixiJSImpl;
    (function (PixiJSImpl) {
        var PixiJSLayoutVisualizer = (function (_super) {
            __extends(PixiJSLayoutVisualizer, _super);
            function PixiJSLayoutVisualizer() {
                _super.call(this);
                this.isActive = true;
                this.filterByLayoutItem = null;
                this.filterByLayoutContainer = null;
            }
            PixiJSLayoutVisualizer.prototype.setDebugLayoutItem = function (layoutContainer, layoutItem, x, y, width, height) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer && this.filterByLayoutItem === layoutItem) {
                    this.beginFill(0xff0000);
                    this.drawRect(x, y, width, height);
                    this.endFill();
                }
            };
            PixiJSLayoutVisualizer.prototype.setDebugLayoutContainer = function (layoutContainer, w, h) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                    w = Math.max(1, Math.abs(w));
                    h = Math.max(1, Math.abs(h));
                    this.beginFill(0x000000);
                    this.drawRect(0, 0, w, 1);
                    this.drawRect(0, 0, 1, h);
                    this.drawRect(0, h - 1, w, 1);
                    this.drawRect(w - 1, 0, 1, h);
                    this.endFill();
                }
            };
            PixiJSLayoutVisualizer.prototype.setDebugPadding = function (layoutContainer, w, h, topPadding, bottomPadding, leftPadding, rightPadding) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                    this.beginFill(0xffff00);
                    this.drawRect(0, 0, w, topPadding);
                    this.drawRect(0, topPadding, leftPadding, h - topPadding - bottomPadding);
                    this.drawRect(w - rightPadding, topPadding, rightPadding, h - topPadding - bottomPadding);
                    this.drawRect(0, h - bottomPadding, w, bottomPadding);
                    this.endFill();
                }
            };
            PixiJSLayoutVisualizer.prototype.setDebugGap = function (layoutContainer, x, y, width, height) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                    this.beginFill(0xbbbb00);
                    this.drawRect(x, y, width, height);
                    this.endFill();
                }
            };
            PixiJSLayoutVisualizer.prototype.setPosition = function (point) {
                this.x = point.x;
                this.y = point.y;
            };
            PixiJSLayoutVisualizer.prototype.setAlpha = function (alpha) {
                this.alpha = alpha;
            };
            PixiJSLayoutVisualizer.prototype.update = function () {
            };
            PixiJSLayoutVisualizer.prototype.dispose = function () {
                this.clear();
                this.update();
                this.filterByLayoutItem = null;
                this.filterByLayoutContainer = null;
            };
            return PixiJSLayoutVisualizer;
        })(PIXI.Graphics);
        PixiJSImpl.PixiJSLayoutVisualizer = PixiJSLayoutVisualizer;
    })(PixiJSImpl = SimpleLayout.PixiJSImpl || (SimpleLayout.PixiJSImpl = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="../../defs/tsd.d.ts" />
/// <reference path="PixiJSDisplayObjectWrapper.ts" />
//# sourceMappingURL=simple-layout-for-pixijs.js.map