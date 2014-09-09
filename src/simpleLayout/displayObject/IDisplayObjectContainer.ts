/// <reference path="../reference.ts"/>

module SimpleLayout.displayObject {
    export interface IDisplayObjectContainer extends IDisplayObject {
        addChild(child:IDisplayObject):void;
        removeChild(child:IDisplayObject):void;
        removeAllChildren():void;
    }
}