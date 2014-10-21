/// <reference path="reference.ts"/>
var SimpleLayout;
(function (SimpleLayout) {
    (function (CreateJSImpl) {
        var CreateJSDisplayObjectWrapper = (function () {
            function CreateJSDisplayObjectWrapper(createjsDisplayObject) {
                if (createjsDisplayObject == null)
                    throw "createjsDisplayObject is null";

                this.m_wrappedDispObj = createjsDisplayObject;
            }
            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "allowResize", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            CreateJSDisplayObjectWrapper.prototype.getConcreteDisplayObject = function () {
                return this.m_wrappedDispObj;
            };

            CreateJSDisplayObjectWrapper.prototype.getPivotPoint = function () {
                return { x: this.m_wrappedDispObj.regX, y: this.m_wrappedDispObj.regY };
            };

            CreateJSDisplayObjectWrapper.prototype.getGlobalPos = function () {
                var point = this.m_wrappedDispObj.localToGlobal(0, 0);
                return { x: point.x, y: point.y };
            };

            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "width", {
                get: function () {
                    var bounds = this.m_wrappedDispObj.getBounds();
                    return bounds.width * this.m_wrappedDispObj.scaleX;
                },
                set: function (value) {
                    var bounds = this.m_wrappedDispObj.getBounds();
                    this.m_wrappedDispObj.scaleX = value / bounds.width;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "height", {
                get: function () {
                    var bounds = this.m_wrappedDispObj.getBounds();
                    return bounds.height * this.m_wrappedDispObj.scaleY;
                },
                set: function (value) {
                    var bounds = this.m_wrappedDispObj.getBounds();
                    this.m_wrappedDispObj.scaleY = value / bounds.height;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "scaleX", {
                get: function () {
                    return this.m_wrappedDispObj.scaleX;
                },
                set: function (value) {
                    this.m_wrappedDispObj.scaleX = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "scaleY", {
                get: function () {
                    return this.m_wrappedDispObj.scaleY;
                },
                set: function (value) {
                    this.m_wrappedDispObj.scaleY = value;
                },
                enumerable: true,
                configurable: true
            });


            CreateJSDisplayObjectWrapper.prototype.resetScaling = function () {
                this.m_wrappedDispObj.scaleX = 1;
                this.m_wrappedDispObj.scaleY = 1;
            };


            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "visible", {
                get: function () {
                    return this.m_wrappedDispObj.visible;
                },
                set: function (value) {
                    this.m_wrappedDispObj.visible = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "x", {
                get: function () {
                    return this.m_wrappedDispObj.x;
                },
                set: function (value) {
                    this.m_wrappedDispObj.x = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "y", {
                get: function () {
                    return this.m_wrappedDispObj.y;
                },
                set: function (value) {
                    this.m_wrappedDispObj.y = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "rotation", {
                get: function () {
                    return this.m_wrappedDispObj.rotation;
                },
                set: function (value) {
                    this.m_wrappedDispObj.rotation = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "name", {
                get: function () {
                    return this.m_wrappedDispObj.name;
                },
                set: function (value) {
                    this.m_wrappedDispObj.name = value;
                },
                enumerable: true,
                configurable: true
            });

            CreateJSDisplayObjectWrapper.prototype.dispose = function () {
                this.m_wrappedDispObj = null;
            };
            return CreateJSDisplayObjectWrapper;
        })();
        CreateJSImpl.CreateJSDisplayObjectWrapper = CreateJSDisplayObjectWrapper;
    })(SimpleLayout.CreateJSImpl || (SimpleLayout.CreateJSImpl = {}));
    var CreateJSImpl = SimpleLayout.CreateJSImpl;
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
    (function (CreateJSImpl) {
        var CreateJSContainerWrapper = (function (_super) {
            __extends(CreateJSContainerWrapper, _super);
            function CreateJSContainerWrapper(createjsContainer) {
                this.m_givenWidth = 0;
                this.m_givenHeight = 0;
                if (createjsContainer == null)
                    throw "createjsContainer is null";

                _super.call(this, createjsContainer);
            }
            Object.defineProperty(CreateJSContainerWrapper.prototype, "width", {
                get: function () {
                    return this.m_givenWidth;
                },
                set: function (value) {
                    this.m_givenWidth = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(CreateJSContainerWrapper.prototype, "height", {
                get: function () {
                    return this.m_givenHeight;
                },
                set: function (value) {
                    this.m_givenHeight = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(CreateJSContainerWrapper.prototype, "displayObjectContainer", {
                get: function () {
                    return this.getConcreteDisplayObject();
                },
                enumerable: true,
                configurable: true
            });

            CreateJSContainerWrapper.prototype.addChild = function (child) {
                this.displayObjectContainer.addChild(child.getConcreteDisplayObject());
            };

            CreateJSContainerWrapper.prototype.removeChild = function (child) {
                this.displayObjectContainer.removeChild(child.getConcreteDisplayObject());
            };

            CreateJSContainerWrapper.prototype.removeAllChildren = function () {
                this.displayObjectContainer.removeAllChildren();
            };
            return CreateJSContainerWrapper;
        })(CreateJSImpl.CreateJSDisplayObjectWrapper);
        CreateJSImpl.CreateJSContainerWrapper = CreateJSContainerWrapper;
    })(SimpleLayout.CreateJSImpl || (SimpleLayout.CreateJSImpl = {}));
    var CreateJSImpl = SimpleLayout.CreateJSImpl;
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="reference.ts"/>
var SimpleLayout;
(function (SimpleLayout) {
    (function (CreateJSImpl) {
        var CreateJSLayoutVisualizer = (function (_super) {
            __extends(CreateJSLayoutVisualizer, _super);
            function CreateJSLayoutVisualizer() {
                _super.call(this);
                this.isActive = true;
                this.filterByLayoutItem = null;
                this.filterByLayoutContainer = null;
            }
            CreateJSLayoutVisualizer.prototype.setDebugLayoutItem = function (layoutContainer, layoutItem, x, y, width, height) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer && this.filterByLayoutItem === layoutItem) {
                    this.graphics.beginFill("#8ab3bf");
                    this.graphics.drawRect(x, y, width, height);
                    this.graphics.endFill();
                }
            };

            CreateJSLayoutVisualizer.prototype.setDebugLayoutContainer = function (layoutContainer, w, h) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                    w = Math.max(1, Math.abs(w));
                    h = Math.max(1, Math.abs(h));
                    this.graphics.beginFill("#000000");
                    this.graphics.drawRect(0, 0, w, 1);
                    this.graphics.drawRect(0, 0, 1, h);
                    this.graphics.drawRect(0, h - 1, w, 1);
                    this.graphics.drawRect(w - 1, 0, 1, h);
                    this.graphics.endFill();
                }
            };

            CreateJSLayoutVisualizer.prototype.setDebugPadding = function (layoutContainer, w, h, topPadding, bottomPadding, leftPadding, rightPadding) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                    this.graphics.beginFill("#ffff00");
                    this.graphics.drawRect(0, 0, w, topPadding);
                    this.graphics.drawRect(0, topPadding, leftPadding, h - topPadding - bottomPadding);
                    this.graphics.drawRect(w - rightPadding, topPadding, rightPadding, h - topPadding - bottomPadding);
                    this.graphics.drawRect(0, h - bottomPadding, w, bottomPadding);
                    this.graphics.endFill();
                }
            };

            CreateJSLayoutVisualizer.prototype.setDebugGap = function (layoutContainer, x, y, width, height) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                    this.graphics.beginFill("#bbbb00");
                    this.graphics.drawRect(x, y, width, height);
                    this.graphics.endFill();
                }
            };

            CreateJSLayoutVisualizer.prototype.setPosition = function (point) {
                this.x = point.x;
                this.y = point.y;
            };

            CreateJSLayoutVisualizer.prototype.setAlpha = function (alpha) {
                this.alpha = alpha;
            };

            CreateJSLayoutVisualizer.prototype.clear = function () {
                this.graphics.clear();
            };

            CreateJSLayoutVisualizer.prototype.update = function () {
            };

            CreateJSLayoutVisualizer.prototype.dispose = function () {
                this.clear();
                this.update();
                this.filterByLayoutItem = null;
                this.filterByLayoutContainer = null;
            };
            return CreateJSLayoutVisualizer;
        })(createjs.Shape);
        CreateJSImpl.CreateJSLayoutVisualizer = CreateJSLayoutVisualizer;
    })(SimpleLayout.CreateJSImpl || (SimpleLayout.CreateJSImpl = {}));
    var CreateJSImpl = SimpleLayout.CreateJSImpl;
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="../../defs/tsd.d.ts" />
/// <reference path="CreateJSDisplayObjectWrapper.ts" />
//grunt-start
/// <reference path="CreateJSContainerWrapper.ts" />
/// <reference path="CreateJSLayoutVisualizer.ts" />
//grunt-end
//# sourceMappingURL=simple-layout-for-createjs.js.map
