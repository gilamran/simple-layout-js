/// <reference path="../reference.ts"/>

module SimpleLayout.displayObject {
    export interface IPoint {
        x : number;
        y : number;
    }

    export interface IDisplayObject {
        width                       : number;
        height                      : number;
        x                           : number;
        y                           : number;
        rotation                    : number;
        name                        : string;
        visible                     : boolean;
        getConcreteDisplayObject()  : Object;
        getGlobalPos()              : IPoint;
        getPivotPoint()             : IPoint;
        resetScaling()              : void;
        dispose()                   : void;
    }
}