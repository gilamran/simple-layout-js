var SimpleLayout;
(function (SimpleLayout) {
    (function (PixiJSImpl) {
        var PixiJSDisplayObjectWrapper = (function () {
            function PixiJSDisplayObjectWrapper(pixiJSDisplayObject) {
                if (pixiJSDisplayObject == null)
                    throw "pixiJSDisplayObject is null";

                this.m_wrappedDispObj = pixiJSDisplayObject;
            }
            Object.defineProperty(PixiJSDisplayObjectWrapper.prototype, "globalPos", {
                get: function () {
                    var point;
                    var currentObj = this.m_wrappedDispObj;
                    point = new PIXI.Point(0, 0);
                    while (currentObj) {
                        point.x += currentObj.position.x;
                        point.y += currentObj.position.y;
                        currentObj = currentObj.parent;
                    }
                    return { x: point.x, y: point.y };
                },
                set: function (value) {
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(PixiJSDisplayObjectWrapper.prototype, "allowResize", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(PixiJSDisplayObjectWrapper.prototype, "concreteDisplayObject", {
                get: function () {
                    return this.m_wrappedDispObj;
                },
                enumerable: true,
                configurable: true
            });

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
            return PixiJSDisplayObjectWrapper;
        })();
        PixiJSImpl.PixiJSDisplayObjectWrapper = PixiJSDisplayObjectWrapper;
    })(SimpleLayout.PixiJSImpl || (SimpleLayout.PixiJSImpl = {}));
    var PixiJSImpl = SimpleLayout.PixiJSImpl;
})(SimpleLayout || (SimpleLayout = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SimpleLayout;
(function (SimpleLayout) {
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
                    return this.concreteDisplayObject;
                },
                enumerable: true,
                configurable: true
            });

            PixiJSContainerWrapper.prototype.addChild = function (child) {
                this.displayObjectContainer.addChild(child.concreteDisplayObject);
            };

            PixiJSContainerWrapper.prototype.removeChild = function (child) {
                this.displayObjectContainer.removeChild(child.concreteDisplayObject);
            };
            return PixiJSContainerWrapper;
        })(PixiJSImpl.PixiJSDisplayObjectWrapper);
        PixiJSImpl.PixiJSContainerWrapper = PixiJSContainerWrapper;
    })(SimpleLayout.PixiJSImpl || (SimpleLayout.PixiJSImpl = {}));
    var PixiJSImpl = SimpleLayout.PixiJSImpl;
})(SimpleLayout || (SimpleLayout = {}));
var SimpleLayout;
(function (SimpleLayout) {
    (function (PixiJSImpl) {
        var PixiJSLayoutVisualizer = (function (_super) {
            __extends(PixiJSLayoutVisualizer, _super);
            function PixiJSLayoutVisualizer() {
                _super.call(this);
                this.attachedTo = null;
            }
            PixiJSLayoutVisualizer.prototype.setDebugFitAreaSize = function (w, h) {
                w = Math.max(1, Math.abs(w));
                h = Math.max(1, Math.abs(h));
                this.beginFill(0x000000);
                this.drawRect(0, 0, w, 1);
                this.drawRect(0, 0, 1, h);
                this.drawRect(0, h - 1, w, 1);
                this.drawRect(w - 1, 0, 1, h);
                this.endFill();
            };

            PixiJSLayoutVisualizer.prototype.setDebugPadding = function (w, h, topPadding, bottomPadding, leftPadding, rightPadding) {
                this.beginFill(0xffff00);
                this.drawRect(0, 0, w, topPadding);
                this.drawRect(0, topPadding, leftPadding, h - topPadding - bottomPadding);
                this.drawRect(w - rightPadding, topPadding, rightPadding, h - topPadding - bottomPadding);
                this.drawRect(0, h - bottomPadding, w, bottomPadding);
                this.endFill();
            };

            PixiJSLayoutVisualizer.prototype.setDebugGap = function (x, y, width, height) {
                this.beginFill(0xbbbb00);
                this.drawRect(x, y, width, height);
                this.endFill();
            };

            PixiJSLayoutVisualizer.prototype.setDebugItem = function (layoutItem, x, y, width, height) {
                if (this.highlightedLayoutItem == layoutItem) {
                    this.beginFill(0x8ab3bf);
                    this.drawRect(x, y, width, height);
                    this.endFill();
                }
            };

            PixiJSLayoutVisualizer.prototype.setAlpha = function (alpha) {
                this.alpha = alpha;
            };

            PixiJSLayoutVisualizer.prototype.setPosition = function (point) {
                this.x = point.x;
                this.y = point.y;
            };

            PixiJSLayoutVisualizer.prototype.update = function () {
            };

            PixiJSLayoutVisualizer.prototype.dispose = function () {
                this.clear();
                this.update();
                this.highlightedLayoutItem = null;
                if (this.attachedTo) {
                    this.attachedTo.setLayoutVisualizer(null);
                    this.attachedTo = null;
                }
            };
            return PixiJSLayoutVisualizer;
        })(PIXI.Graphics);
        PixiJSImpl.PixiJSLayoutVisualizer = PixiJSLayoutVisualizer;
    })(SimpleLayout.PixiJSImpl || (SimpleLayout.PixiJSImpl = {}));
    var PixiJSImpl = SimpleLayout.PixiJSImpl;
})(SimpleLayout || (SimpleLayout = {}));
//# sourceMappingURL=simple-layout-for-pixijs.js.map
