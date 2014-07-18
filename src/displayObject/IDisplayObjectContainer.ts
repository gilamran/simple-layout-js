/// <reference path="../reference.ts"/>

module layoutFramework.displayObject {
    export interface IDisplayObjectContainer extends IDisplayObject {
        addChild(child:IDisplayObject):void;
        removeChild(child:IDisplayObject):void;
    }
}