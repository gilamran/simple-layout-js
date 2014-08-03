/// <reference path="../reference.ts"/>

module SimpleLayout.displayObject {
    export interface IPoint {
        x : number;
        y : number;
    }

    export interface IDisplayObject {
        width                   : number;
        height                  : number;
        x                       : number;
        y                       : number;
        name                    : string;
        concreteDisplayObject   : Object;
        globalPos               : IPoint;
        resetScaling()          : void;
        dispose()               : void;
    }
}