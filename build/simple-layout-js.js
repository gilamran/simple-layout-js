var layoutFramework;
(function (layoutFramework) {
    (function (items) {
        var LayoutItem = (function () {
            function LayoutItem(dispObj) {
                this.fittedIntoWidth = 0.0;
                this.fittedIntoHeight = 0.0;
                this.horizontalAlign = layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE;
                this.verticalAlign = layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE;
                this.bestFit = true;
                this.requestedWidthPercent = 0.0;
                this.requestedHeightPercent = 0.0;
                this.parent = null;
                this.uniqueID = null;
                this.displayObject = dispObj;

                this.m_id = null;
            }
            Object.defineProperty(LayoutItem.prototype, "id", {
                get: function () {
                    return this.m_id;
                },
                set: function (value) {
                    this.m_id = value;
                    if (this.displayObject)
                        this.displayObject.name = this.m_id;
                },
                enumerable: true,
                configurable: true
            });


            LayoutItem.prototype.fitToSize = function (dispObj, w, h) {
                if (typeof w === "undefined") { w = 0.0; }
                if (typeof h === "undefined") { h = 0.0; }
                var imageRatio = dispObj.width / dispObj.height;
                var containerRatio = w / h;

                if (containerRatio > imageRatio) {
                    dispObj.height = h;
                    dispObj.width = imageRatio * dispObj.height;
                } else {
                    dispObj.width = w;
                    dispObj.height = dispObj.width / imageRatio;
                }
            };

            LayoutItem.prototype.executeLayout = function () {
                if (this.displayObject) {
                    if (this.bestFit) {
                        this.fitToSize(this.displayObject, this.fittedIntoWidth, this.fittedIntoHeight);
                    } else {
                        this.displayObject.width = this.fittedIntoWidth;
                        this.displayObject.height = this.fittedIntoHeight;
                    }
                }
            };

            LayoutItem.prototype.fitInto = function (w, h) {
                if (this.displayObject == null)
                    return;

                this.fittedIntoWidth = w;
                this.fittedIntoHeight = h;

                this.executeLayout();
            };
            return LayoutItem;
        })();
        items.LayoutItem = LayoutItem;
    })(layoutFramework.items || (layoutFramework.items = {}));
    var items = layoutFramework.items;
})(layoutFramework || (layoutFramework = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var layoutFramework;
(function (layoutFramework) {
    (function (containers) {
        var LayoutContainer = (function (_super) {
            __extends(LayoutContainer, _super);
            function LayoutContainer(dispObjCont) {
                this.m_layoutItems = [];
                _super.call(this, dispObjCont);
            }
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
                    this.layout.fitChildrenInto(this, this.fittedIntoWidth, this.fittedIntoHeight);
                    this.displayObject.width = this.fittedIntoWidth;
                    this.displayObject.height = this.fittedIntoHeight;
                } else {
                    _super.prototype.executeLayout.call(this);
                }
            };

            LayoutContainer.prototype.getLayoutItemAt = function (index) {
                return this.m_layoutItems[index];
            };

            LayoutContainer.prototype.addLayoutItem = function (layoutItem) {
                if (layoutItem == null)
                    throw "Can not add a null layoutItem";

                if (this.m_layoutItems.indexOf(layoutItem) != -1) {
                    return null;
                } else {
                    this.m_layoutItems.push(layoutItem);
                    layoutItem.parent = this;
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
                } else {
                    layoutItem.parent = null;
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
            return LayoutContainer;
        })(layoutFramework.items.LayoutItem);
        containers.LayoutContainer = LayoutContainer;
    })(layoutFramework.containers || (layoutFramework.containers = {}));
    var containers = layoutFramework.containers;
})(layoutFramework || (layoutFramework = {}));
var layoutFramework;
(function (layoutFramework) {
    (function (displayObject) {
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

            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "concreteDisplayObject", {
                get: function () {
                    return this.m_wrappedDispObj;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CreateJSDisplayObjectWrapper.prototype, "globalPos", {
                get: function () {
                    var point = this.m_wrappedDispObj.localToGlobal(0, 0);
                    return { x: point.x, y: point.y };
                },
                set: function (value) {
                },
                enumerable: true,
                configurable: true
            });


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
            return CreateJSDisplayObjectWrapper;
        })();
        displayObject.CreateJSDisplayObjectWrapper = CreateJSDisplayObjectWrapper;
    })(layoutFramework.displayObject || (layoutFramework.displayObject = {}));
    var displayObject = layoutFramework.displayObject;
})(layoutFramework || (layoutFramework = {}));
var layoutFramework;
(function (layoutFramework) {
    (function (displayObject) {
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
                    return this.concreteDisplayObject;
                },
                enumerable: true,
                configurable: true
            });

            CreateJSContainerWrapper.prototype.addChild = function (child) {
                this.displayObjectContainer.addChild(child.concreteDisplayObject);
            };

            CreateJSContainerWrapper.prototype.removeChild = function (child) {
                this.displayObjectContainer.removeChild(child.concreteDisplayObject);
            };
            return CreateJSContainerWrapper;
        })(displayObject.CreateJSDisplayObjectWrapper);
        displayObject.CreateJSContainerWrapper = CreateJSContainerWrapper;
    })(layoutFramework.displayObject || (layoutFramework.displayObject = {}));
    var displayObject = layoutFramework.displayObject;
})(layoutFramework || (layoutFramework = {}));
var layoutFramework;
(function (layoutFramework) {
    (function (displayObject) {
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
        displayObject.PixiJSDisplayObjectWrapper = PixiJSDisplayObjectWrapper;
    })(layoutFramework.displayObject || (layoutFramework.displayObject = {}));
    var displayObject = layoutFramework.displayObject;
})(layoutFramework || (layoutFramework = {}));
var layoutFramework;
(function (layoutFramework) {
    (function (displayObject) {
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
        })(displayObject.PixiJSDisplayObjectWrapper);
        displayObject.PixiJSContainerWrapper = PixiJSContainerWrapper;
    })(layoutFramework.displayObject || (layoutFramework.displayObject = {}));
    var displayObject = layoutFramework.displayObject;
})(layoutFramework || (layoutFramework = {}));
var layoutFramework;
(function (layoutFramework) {
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
    })(layoutFramework.enums || (layoutFramework.enums = {}));
    var enums = layoutFramework.enums;
})(layoutFramework || (layoutFramework = {}));
var layoutFramework;
(function (layoutFramework) {
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
    })(layoutFramework.enums || (layoutFramework.enums = {}));
    var enums = layoutFramework.enums;
})(layoutFramework || (layoutFramework = {}));
var layoutFramework;
(function (layoutFramework) {
    (function (layout) {
        var BasicLayout = (function () {
            function BasicLayout() {
                this.horizontalAlign = layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER;
                this.verticalAlign = layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE;
                this.paddingTop = "0";
                this.paddingBottom = "0";
                this.paddingLeft = "0";
                this.paddingRight = "0";
                this.gap = "0";

                this.snapToPixels = false;
            }
            BasicLayout.prototype.setLayoutVisualizer = function (value) {
                if (this.layoutVisualizer !== value) {
                    if (this.layoutVisualizer) {
                        this.layoutVisualizer.attachedTo = null;
                    }

                    this.layoutVisualizer = value;

                    if (this.layoutVisualizer) {
                        this.layoutVisualizer.attachedTo = this;
                    }
                }
            };

            BasicLayout.prototype.calcPercentField = function (field, percentFrom) {
                var isPercent = (field.indexOf("%") == field.length - 1);
                if (isPercent)
                    return percentFrom * parseInt(field.substr(0, field.length - 1)) / 100;
                else
                    return parseFloat(field);
            };

            BasicLayout.prototype.fitChildrenInto = function (targetContainer, w, h) {
                if (targetContainer == null || targetContainer.countLayoutItems == 0)
                    return;

                var targetWidth;
                var targetHeight;
                var displayObject;
                var layoutItem;

                var paddingTopVal = this.calcPercentField(this.paddingTop, h);
                var paddingBottomVal = this.calcPercentField(this.paddingBottom, h);
                var paddingLeftVal = this.calcPercentField(this.paddingLeft, w);
                var paddingRightVal = this.calcPercentField(this.paddingRight, w);

                targetWidth = w - (paddingLeftVal + paddingRightVal);
                targetHeight = h - (paddingTopVal + paddingBottomVal);

                if (this.snapToPixels == true) {
                    targetWidth = Math.round(targetWidth);
                    targetHeight = Math.round(targetHeight);
                }

                for (var i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    displayObject = layoutItem.displayObject;
                    layoutItem.fitInto(targetWidth, targetHeight);

                    var hAlignment;
                    if (layoutItem.horizontalAlign != layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                        hAlignment = layoutItem.horizontalAlign;
                    else
                        hAlignment = this.horizontalAlign;

                    switch (hAlignment) {
                        case layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER: {
                            displayObject.x = paddingLeftVal + ((targetWidth - displayObject.width) / 2);
                            break;
                        }

                        case layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT: {
                            displayObject.x = paddingLeftVal;
                            break;
                        }

                        case layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT: {
                            displayObject.x = paddingLeftVal + (targetWidth - displayObject.width);
                            break;
                        }
                    }

                    var vAlignment;
                    if (layoutItem.verticalAlign != layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE)
                        vAlignment = layoutItem.verticalAlign;
                    else
                        vAlignment = this.verticalAlign;

                    switch (vAlignment) {
                        case layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_TOP: {
                            displayObject.y = paddingTopVal;
                            break;
                        }

                        case layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE: {
                            displayObject.y = paddingTopVal + ((targetHeight - displayObject.height) / 2);
                            break;
                        }

                        case layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM: {
                            displayObject.y = paddingTopVal + (targetHeight - displayObject.height);
                            break;
                        }
                    }

                    if (this.snapToPixels == true)
                        displayObject.x = Math.round(displayObject.x);

                    if (this.snapToPixels == true)
                        displayObject.y = Math.round(displayObject.y);
                }
            };
            return BasicLayout;
        })();
        layout.BasicLayout = BasicLayout;
    })(layoutFramework.layout || (layoutFramework.layout = {}));
    var layout = layoutFramework.layout;
})(layoutFramework || (layoutFramework = {}));
var layoutFramework;
(function (layoutFramework) {
    (function (layout) {
        var HorizontalLayout = (function (_super) {
            __extends(HorizontalLayout, _super);
            function HorizontalLayout() {
                _super.call(this);
            }
            HorizontalLayout.prototype.fitChildrenInto = function (targetContainer, w, h) {
                if (targetContainer == null || targetContainer.countLayoutItems == 0)
                    return;

                var paddingTopVal = this.calcPercentField(this.paddingTop, h);
                var paddingBottomVal = this.calcPercentField(this.paddingBottom, h);
                var paddingLeftVal = this.calcPercentField(this.paddingLeft, w);
                var paddingRightVal = this.calcPercentField(this.paddingRight, w);
                var gapVal = this.calcPercentField(this.gap, w);

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

                if (this.layoutVisualizer) {
                    this.layoutVisualizer.clear();
                    this.layoutVisualizer.setDebugPadding(w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
                }

                totalItemsGap = gapVal * (targetContainer.countLayoutItems - 1);
                totalVPadding = paddingTopVal + paddingBottomVal;
                totalHPadding = paddingLeftVal + paddingRightVal;
                totalGaps = totalItemsGap + totalHPadding;
                spaceForItems = w - totalGaps;

                targetHeight = h - totalVPadding;
                targetGap = gapVal;

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

                if (unRequestedWidthPercent < 0.0)
                    throw "Too much space was requested from the horizontal layout";

                var widthPercentForUnrequested = 0.0;
                if (countRequestedItems < targetContainer.countLayoutItems) {
                    widthPercentForUnrequested = unRequestedWidthPercent / (targetContainer.countLayoutItems - countRequestedItems);
                }

                currentX = paddingLeftVal;
                for (i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    displayObject = layoutItem.displayObject;
                    if (layoutItem.requestedWidthPercent > 0.0)
                        targetWidth = spaceForItems * layoutItem.requestedWidthPercent;
                    else
                        targetWidth = spaceForItems * widthPercentForUnrequested;

                    if (this.snapToPixels == true)
                        targetWidth = Math.round(targetWidth);

                    layoutItem.fitInto(targetWidth, targetHeight);

                    var hAlignment;
                    if (layoutItem.horizontalAlign != layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                        hAlignment = layoutItem.horizontalAlign;
                    else
                        hAlignment = this.horizontalAlign;

                    switch (hAlignment) {
                        case layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER: {
                            displayObject.x = currentX + ((targetWidth - displayObject.width) / 2);
                            break;
                        }

                        case layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT: {
                            displayObject.x = currentX;
                            break;
                        }

                        case layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT: {
                            displayObject.x = currentX + (targetWidth - displayObject.width);
                            break;
                        }
                    }

                    var vAlignment;
                    if (layoutItem.verticalAlign != layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE)
                        vAlignment = layoutItem.verticalAlign;
                    else
                        vAlignment = this.verticalAlign;

                    switch (vAlignment) {
                        case layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE: {
                            displayObject.y = paddingTopVal + ((targetHeight - displayObject.height) / 2);
                            break;
                        }

                        case layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_TOP: {
                            displayObject.y = paddingTopVal;
                            break;
                        }

                        case layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM: {
                            displayObject.y = paddingTopVal + (targetHeight - displayObject.height);
                            break;
                        }
                    }

                    if (this.snapToPixels == true)
                        displayObject.x = Math.round(displayObject.x);

                    if (this.snapToPixels == true)
                        displayObject.y = Math.round(displayObject.y);

                    if (this.layoutVisualizer)
                        this.layoutVisualizer.setDebugItem(currentX, paddingTopVal, targetWidth, targetHeight);

                    currentX = currentX + targetWidth;

                    if (this.layoutVisualizer && i < targetContainer.countLayoutItems - 1)
                        this.layoutVisualizer.setDebugGap(currentX, paddingTopVal, targetGap, h - totalVPadding);

                    currentX = currentX + targetGap;
                }

                if (this.layoutVisualizer)
                    this.layoutVisualizer.update();
            };
            return HorizontalLayout;
        })(layout.BasicLayout);
        layout.HorizontalLayout = HorizontalLayout;
    })(layoutFramework.layout || (layoutFramework.layout = {}));
    var layout = layoutFramework.layout;
})(layoutFramework || (layoutFramework = {}));
var layoutFramework;
(function (layoutFramework) {
    (function (layout) {
        var VerticalLayout = (function (_super) {
            __extends(VerticalLayout, _super);
            function VerticalLayout() {
                _super.call(this);
            }
            VerticalLayout.prototype.fitChildrenInto = function (targetContainer, w, h) {
                if (targetContainer == null || targetContainer.countLayoutItems == 0)
                    return;

                var paddingTopVal = this.calcPercentField(this.paddingTop, h);
                var paddingBottomVal = this.calcPercentField(this.paddingBottom, h);
                var paddingLeftVal = this.calcPercentField(this.paddingLeft, w);
                var paddingRightVal = this.calcPercentField(this.paddingRight, w);
                var gapVal = this.calcPercentField(this.gap, h);

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

                if (this.layoutVisualizer) {
                    this.layoutVisualizer.clear();
                    this.layoutVisualizer.setDebugPadding(w, h, paddingTopVal, paddingBottomVal, paddingLeftVal, paddingRightVal);
                }

                totalItemsGap = gapVal * (targetContainer.countLayoutItems - 1);
                totalVPadding = paddingTopVal + paddingBottomVal;
                totalHPadding = paddingLeftVal + paddingRightVal;
                totalGaps = totalItemsGap + totalVPadding;
                spaceForItems = h - totalGaps;

                targetWidth = w - totalHPadding;
                targetGap = gapVal;

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

                if (unRequestedHeightPercent < 0.0)
                    throw "Too much space was requested from the vertical layout";

                var heightPercentForUnrequested = 0.0;
                if (countRequestedItems < targetContainer.countLayoutItems) {
                    heightPercentForUnrequested = unRequestedHeightPercent / (targetContainer.countLayoutItems - countRequestedItems);
                }

                currentY = paddingTopVal;
                for (i = 0; i < targetContainer.countLayoutItems; i++) {
                    layoutItem = targetContainer.getLayoutItemAt(i);
                    displayObject = layoutItem.displayObject;
                    if (layoutItem.requestedHeightPercent > 0.0)
                        targetHeight = spaceForItems * layoutItem.requestedHeightPercent;
                    else
                        targetHeight = spaceForItems * heightPercentForUnrequested;

                    if (this.snapToPixels == true)
                        targetHeight = Math.round(targetHeight);

                    layoutItem.fitInto(targetWidth, targetHeight);

                    var hAlignment;
                    if (layoutItem.horizontalAlign != layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_NONE)
                        hAlignment = layoutItem.horizontalAlign;
                    else
                        hAlignment = this.horizontalAlign;

                    switch (hAlignment) {
                        case layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_CENTER: {
                            displayObject.x = paddingLeftVal + ((targetWidth - displayObject.width) / 2);
                            break;
                        }

                        case layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_LEFT: {
                            displayObject.x = paddingLeftVal;
                            break;
                        }

                        case layoutFramework.enums.HorizontalAlignEnum.H_ALIGN_TYPE_RIGHT: {
                            displayObject.x = paddingLeftVal + (targetWidth - displayObject.width);
                            break;
                        }
                    }

                    var vAlignment;
                    if (layoutItem.verticalAlign != layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_NONE)
                        vAlignment = layoutItem.verticalAlign;
                    else
                        vAlignment = this.verticalAlign;

                    switch (vAlignment) {
                        case layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_TOP: {
                            displayObject.y = currentY;
                            break;
                        }

                        case layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_MIDDLE: {
                            displayObject.y = currentY + ((targetHeight - displayObject.height) / 2);
                            break;
                        }

                        case layoutFramework.enums.VerticalAlignEnum.V_ALIGN_TYPE_BOTTOM: {
                            displayObject.y = currentY + (targetHeight - displayObject.height);
                            break;
                        }
                    }

                    if (this.snapToPixels == true)
                        displayObject.x = Math.round(displayObject.x);

                    if (this.snapToPixels == true)
                        displayObject.y = Math.round(displayObject.y);

                    if (this.layoutVisualizer)
                        this.layoutVisualizer.setDebugItem(paddingLeftVal, currentY, targetWidth, targetHeight);

                    currentY = currentY + targetHeight;

                    if (this.layoutVisualizer && i < targetContainer.countLayoutItems - 1)
                        this.layoutVisualizer.setDebugGap(paddingLeftVal, currentY, w - totalHPadding, targetGap);

                    currentY = currentY + targetGap;
                }

                if (this.layoutVisualizer)
                    this.layoutVisualizer.update();
            };
            return VerticalLayout;
        })(layout.BasicLayout);
        layout.VerticalLayout = VerticalLayout;
    })(layoutFramework.layout || (layoutFramework.layout = {}));
    var layout = layoutFramework.layout;
})(layoutFramework || (layoutFramework = {}));
var layoutFramework;
(function (layoutFramework) {
    (function (layout) {
        (function (visualizer) {
            var CreateJSLayoutVisualizer = (function (_super) {
                __extends(CreateJSLayoutVisualizer, _super);
                function CreateJSLayoutVisualizer() {
                    _super.call(this);
                    this.attachedTo = null;
                }
                CreateJSLayoutVisualizer.prototype.setDebugPadding = function (w, h, topPadding, bottomPadding, leftPadding, rightPadding) {
                    this.graphics.beginFill("#ffff00");
                    this.graphics.drawRect(0, 0, w, topPadding);
                    this.graphics.drawRect(0, topPadding, leftPadding, h - topPadding - bottomPadding);
                    this.graphics.drawRect(w - rightPadding, topPadding, rightPadding, h - topPadding - bottomPadding);
                    this.graphics.drawRect(0, h - bottomPadding, w, bottomPadding);
                    this.graphics.endFill();
                };

                CreateJSLayoutVisualizer.prototype.setDebugGap = function (x, y, width, height) {
                    this.graphics.beginFill("#bbbb00");
                    this.graphics.drawRect(x, y, width, height);
                    this.graphics.endFill();
                };

                CreateJSLayoutVisualizer.prototype.setDebugItem = function (x, y, width, height) {
                    return;
                    this.graphics.beginFill("#8ab3bf");
                    this.graphics.drawRect(x, y, width, height);
                    this.graphics.endFill();
                };

                CreateJSLayoutVisualizer.prototype.setAlpha = function (alpha) {
                    this.alpha = alpha;
                };

                CreateJSLayoutVisualizer.prototype.clear = function () {
                    this.graphics.clear();
                };

                CreateJSLayoutVisualizer.prototype.update = function () {
                };
                return CreateJSLayoutVisualizer;
            })(createjs.Shape);
            visualizer.CreateJSLayoutVisualizer = CreateJSLayoutVisualizer;
        })(layout.visualizer || (layout.visualizer = {}));
        var visualizer = layout.visualizer;
    })(layoutFramework.layout || (layoutFramework.layout = {}));
    var layout = layoutFramework.layout;
})(layoutFramework || (layoutFramework = {}));
var layoutFramework;
(function (layoutFramework) {
    (function (layout) {
        (function (visualizer) {
            var PixiJSLayoutVisualizer = (function (_super) {
                __extends(PixiJSLayoutVisualizer, _super);
                function PixiJSLayoutVisualizer() {
                    _super.call(this);
                    this.attachedTo = null;
                }
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

                PixiJSLayoutVisualizer.prototype.setDebugItem = function (x, y, width, height) {
                    return;
                    this.beginFill(0x8ab3bf);
                    this.drawRect(x, y, width, height);
                    this.endFill();
                };

                PixiJSLayoutVisualizer.prototype.setAlpha = function (alpha) {
                    this.alpha = alpha;
                };

                PixiJSLayoutVisualizer.prototype.update = function () {
                };
                return PixiJSLayoutVisualizer;
            })(PIXI.Graphics);
            visualizer.PixiJSLayoutVisualizer = PixiJSLayoutVisualizer;
        })(layout.visualizer || (layout.visualizer = {}));
        var visualizer = layout.visualizer;
    })(layoutFramework.layout || (layoutFramework.layout = {}));
    var layout = layoutFramework.layout;
})(layoutFramework || (layoutFramework = {}));
//# sourceMappingURL=simple-layout-js.js.map
