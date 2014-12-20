/// <reference path="reference.ts"/>
var SimpleLayout;
(function (SimpleLayout) {
    var SVGImpl;
    (function (SVGImpl) {
        var SVGDisplayObjectWrapper = (function () {
            function SVGDisplayObjectWrapper(svgElement) {
                if (svgElement == null)
                    throw "svgElement is null";
                this.m_wrappedDispObj = svgElement;
                this.m_x = 0;
                this.m_y = 0;
                this.m_scaleX = 1;
                this.m_scaleY = 1;
                this.m_rotation = 0;
            }
            Object.defineProperty(SVGDisplayObjectWrapper.prototype, "svgElement", {
                get: function () {
                    return this.m_wrappedDispObj.ownerSVGElement;
                },
                enumerable: true,
                configurable: true
            });
            SVGDisplayObjectWrapper.prototype.initMat = function () {
                if (this.svgElement) {
                    if (!this.m_translateMat) {
                        this.m_translateMat = this.svgElement.createSVGTransform();
                        this.m_scaleMat = this.svgElement.createSVGTransform();
                        this.m_rotationMat = this.svgElement.createSVGTransform();
                        this.m_wrappedDispObj.transform.baseVal.appendItem(this.m_translateMat);
                        this.m_wrappedDispObj.transform.baseVal.appendItem(this.m_rotationMat);
                        this.m_wrappedDispObj.transform.baseVal.appendItem(this.m_scaleMat);
                    }
                }
            };
            SVGDisplayObjectWrapper.prototype.getPivotPoint = function () {
                var p = this.m_wrappedDispObj.getBBox();
                return { x: -p.x, y: -p.y };
            };
            SVGDisplayObjectWrapper.prototype.getGlobalPos = function () {
                if (this.svgElement) {
                    var p = this.svgElement.createSVGPoint();
                    p = p.matrixTransform(this.m_wrappedDispObj.getCTM());
                    return { x: p.x, y: p.y };
                }
                else {
                    return { x: 0, y: 0 };
                }
            };
            SVGDisplayObjectWrapper.prototype.getConcreteDisplayObject = function () {
                return this.m_wrappedDispObj;
            };
            Object.defineProperty(SVGDisplayObjectWrapper.prototype, "width", {
                get: function () {
                    var rect = this.m_wrappedDispObj.getBoundingClientRect();
                    return rect.width;
                },
                set: function (value) {
                    this.scaleX = value / this.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGDisplayObjectWrapper.prototype, "height", {
                get: function () {
                    var rect = this.m_wrappedDispObj.getBoundingClientRect();
                    return rect.height;
                },
                set: function (value) {
                    this.scaleY = value / this.height;
                },
                enumerable: true,
                configurable: true
            });
            SVGDisplayObjectWrapper.prototype.resetScaling = function () {
                this.x = 0;
                this.y = 0;
                this.scaleX = 1;
                this.scaleY = 1;
                this.rotation = 0;
            };
            Object.defineProperty(SVGDisplayObjectWrapper.prototype, "scaleX", {
                get: function () {
                    return this.m_scaleX;
                },
                set: function (value) {
                    this.initMat();
                    this.m_scaleX = value;
                    if (this.m_scaleMat)
                        this.m_scaleMat.setScale(this.m_scaleX, this.m_scaleY);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGDisplayObjectWrapper.prototype, "scaleY", {
                get: function () {
                    return this.m_scaleY;
                },
                set: function (value) {
                    this.initMat();
                    this.m_scaleY = value;
                    if (this.m_scaleMat)
                        this.m_scaleMat.setScale(this.m_scaleX, this.m_scaleY);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGDisplayObjectWrapper.prototype, "x", {
                get: function () {
                    return this.m_x;
                },
                set: function (value) {
                    this.initMat();
                    this.m_x = value;
                    if (this.m_translateMat)
                        this.m_translateMat.setTranslate(this.m_x, this.m_y);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGDisplayObjectWrapper.prototype, "y", {
                get: function () {
                    return this.m_y;
                },
                set: function (value) {
                    this.initMat();
                    this.m_y = value;
                    if (this.m_translateMat)
                        this.m_translateMat.setTranslate(this.m_x, this.m_y);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGDisplayObjectWrapper.prototype, "rotation", {
                get: function () {
                    return this.m_rotation;
                },
                set: function (value) {
                    this.initMat();
                    this.m_rotation = value;
                    if (this.m_rotationMat)
                        this.m_rotationMat.setRotate(this.m_rotation, this.m_x, this.m_y);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGDisplayObjectWrapper.prototype, "visible", {
                get: function () {
                    var style = window.getComputedStyle(this.m_wrappedDispObj);
                    return (style.display === 'none');
                },
                set: function (value) {
                    if (value)
                        this.m_wrappedDispObj.setAttributeNS(null, 'display', 'inline');
                    else
                        this.m_wrappedDispObj.setAttributeNS(null, 'display', 'none');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGDisplayObjectWrapper.prototype, "name", {
                get: function () {
                    return this.m_wrappedDispObj.id;
                },
                set: function (value) {
                    this.m_wrappedDispObj.id = value;
                },
                enumerable: true,
                configurable: true
            });
            SVGDisplayObjectWrapper.prototype.dispose = function () {
                this.m_wrappedDispObj = null;
            };
            return SVGDisplayObjectWrapper;
        })();
        SVGImpl.SVGDisplayObjectWrapper = SVGDisplayObjectWrapper;
    })(SVGImpl = SimpleLayout.SVGImpl || (SimpleLayout.SVGImpl = {}));
})(SimpleLayout || (SimpleLayout = {}));
var SimpleLayout;
(function (SimpleLayout) {
    var SVGImpl;
    (function (SVGImpl) {
        var AssetsFactory_SVG = (function () {
            function AssetsFactory_SVG() {
                this.xmlns = "http://www.w3.org/2000/svg";
                this.m_assetIDs = ["red", "green", "blue"];
            }
            AssetsFactory_SVG.prototype.hasAssetsToLoad = function () {
                return true;
            };
            AssetsFactory_SVG.prototype.loadAssets = function (doneCallback, errorCallback, progressCallback) {
                doneCallback();
            };
            AssetsFactory_SVG.prototype.getAssetsIds = function () {
                return this.m_assetIDs;
            };
            AssetsFactory_SVG.prototype.hasAsset = function (assetId) {
                return this.m_assetIDs.indexOf(assetId) > -1;
            };
            AssetsFactory_SVG.prototype.createDisplayObjectContainer = function () {
                var container;
                var displayObjectContainer;
                container = document.createElementNS(this.xmlns, "g");
                displayObjectContainer = new SimpleLayout.SVGImpl.SVGContainerWrapper(container);
                return displayObjectContainer;
            };
            AssetsFactory_SVG.prototype.createDisplayObject = function (assetId) {
                var displayObject;
                var shape = document.createElementNS(this.xmlns, "circle");
                shape.setAttribute("r", 50);
                shape.setAttribute("fill", "green");
                displayObject = new SimpleLayout.SVGImpl.SVGDisplayObjectWrapper(shape);
                return displayObject;
            };
            AssetsFactory_SVG.prototype.disposeAssets = function () {
                // nothing to dispose
            };
            return AssetsFactory_SVG;
        })();
        SVGImpl.AssetsFactory_SVG = AssetsFactory_SVG;
    })(SVGImpl = SimpleLayout.SVGImpl || (SimpleLayout.SVGImpl = {}));
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
    var SVGImpl;
    (function (SVGImpl) {
        var SVGContainerWrapper = (function (_super) {
            __extends(SVGContainerWrapper, _super);
            function SVGContainerWrapper(svgElement) {
                this.m_givenWidth = 0;
                this.m_givenHeight = 0;
                if (svgElement == null)
                    throw "svgElement is null";
                _super.call(this, svgElement);
            }
            Object.defineProperty(SVGContainerWrapper.prototype, "width", {
                get: function () {
                    return this.m_givenWidth;
                },
                set: function (value) {
                    this.m_givenWidth = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SVGContainerWrapper.prototype, "height", {
                get: function () {
                    return this.m_givenHeight;
                },
                set: function (value) {
                    this.m_givenHeight = value;
                },
                enumerable: true,
                configurable: true
            });
            SVGContainerWrapper.prototype.getPivotPoint = function () {
                return { x: 0, y: 0 };
            };
            Object.defineProperty(SVGContainerWrapper.prototype, "displayObjectContainer", {
                get: function () {
                    return this.getConcreteDisplayObject();
                },
                enumerable: true,
                configurable: true
            });
            SVGContainerWrapper.prototype.addChild = function (child) {
                this.displayObjectContainer.appendChild(child.getConcreteDisplayObject());
            };
            SVGContainerWrapper.prototype.removeChild = function (child) {
                this.displayObjectContainer.removeChild(child.getConcreteDisplayObject());
            };
            SVGContainerWrapper.prototype.removeAllChildren = function () {
                while (this.displayObjectContainer.childNodes.length > 0)
                    this.displayObjectContainer.removeChild(this.displayObjectContainer.childNodes[0]);
            };
            return SVGContainerWrapper;
        })(SVGImpl.SVGDisplayObjectWrapper);
        SVGImpl.SVGContainerWrapper = SVGContainerWrapper;
    })(SVGImpl = SimpleLayout.SVGImpl || (SimpleLayout.SVGImpl = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="reference.ts"/>
var SimpleLayout;
(function (SimpleLayout) {
    var SVGImpl;
    (function (SVGImpl) {
        var SVGLayoutVisualizer = (function () {
            function SVGLayoutVisualizer(parentElement) {
                this.parentElement = parentElement;
                this.xmlns = "http://www.w3.org/2000/svg";
                this.isActive = true;
                this.filterByLayoutItem = null;
                this.filterByLayoutContainer = null;
                this.items = [];
            }
            SVGLayoutVisualizer.prototype.initMat = function () {
                if (this.parentElement) {
                    if (!this.m_translateMat) {
                        this.m_translateMat = this.parentElement.ownerSVGElement.createSVGTransform();
                        this.parentElement.transform.baseVal.appendItem(this.m_translateMat);
                    }
                }
            };
            SVGLayoutVisualizer.prototype.createRect = function (x, y, width, height, color) {
                var rect = document.createElementNS(this.xmlns, "rect");
                rect.width.baseVal.value = width;
                rect.height.baseVal.value = height;
                rect.x.baseVal.value = x;
                rect.y.baseVal.value = y;
                rect.setAttributeNS(null, 'fill', color);
                this.parentElement.appendChild(rect);
                this.items.push(rect);
            };
            SVGLayoutVisualizer.prototype.setDebugLayoutItem = function (layoutContainer, layoutItem, x, y, width, height) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer && this.filterByLayoutItem === layoutItem) {
                    this.createRect(x, y, width, height, "#8ab3bf");
                }
            };
            SVGLayoutVisualizer.prototype.setDebugLayoutContainer = function (layoutContainer, w, h) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                    w = Math.max(1, Math.abs(w));
                    h = Math.max(1, Math.abs(h));
                    this.createRect(0, 0, w, 1, "#000000");
                    this.createRect(0, 0, 1, h, "#000000");
                    this.createRect(0, h - 1, w, 1, "#000000");
                    this.createRect(w - 1, 0, 1, h, "#000000");
                }
            };
            SVGLayoutVisualizer.prototype.setDebugPadding = function (layoutContainer, w, h, topPadding, bottomPadding, leftPadding, rightPadding) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                    this.createRect(0, 0, w, topPadding, "#ffff00");
                    this.createRect(0, topPadding, leftPadding, h - topPadding - bottomPadding, "#ffff00");
                    this.createRect(w - rightPadding, topPadding, rightPadding, h - topPadding - bottomPadding, "#ffff00");
                    this.createRect(0, h - bottomPadding, w, bottomPadding, "#ffff00");
                }
            };
            SVGLayoutVisualizer.prototype.setDebugGap = function (layoutContainer, x, y, width, height) {
                if (this.isActive && this.filterByLayoutContainer === layoutContainer) {
                    this.createRect(x, y, width, height, "#bbbb00");
                }
            };
            SVGLayoutVisualizer.prototype.setPosition = function (point) {
                this.initMat();
                if (this.m_translateMat)
                    this.m_translateMat.setTranslate(point.x, point.y);
            };
            SVGLayoutVisualizer.prototype.setAlpha = function (alpha) {
                this.parentElement.style.opacity = alpha.toString();
            };
            SVGLayoutVisualizer.prototype.clear = function () {
                while (this.items.length > 0) {
                    var item = this.items.pop();
                    this.parentElement.removeChild(item);
                }
            };
            SVGLayoutVisualizer.prototype.update = function () {
            };
            SVGLayoutVisualizer.prototype.dispose = function () {
                this.clear();
                this.update();
                this.filterByLayoutItem = null;
                this.filterByLayoutContainer = null;
            };
            return SVGLayoutVisualizer;
        })();
        SVGImpl.SVGLayoutVisualizer = SVGLayoutVisualizer;
    })(SVGImpl = SimpleLayout.SVGImpl || (SimpleLayout.SVGImpl = {}));
})(SimpleLayout || (SimpleLayout = {}));
/// <reference path="../../defs/tsd.d.ts" />
/// <reference path="SVGDisplayObjectWrapper.ts" />
//# sourceMappingURL=simple-layout-for-svg.js.map