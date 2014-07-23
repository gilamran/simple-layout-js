/// <reference path="../../reference.ts"/>

module layoutFramework.layout.visualizer {
    export interface ILayoutVisualizer {
        attachedTo : ILayout;
        setDebugFitAreaSize(w:number, h:number):void;
        setDebugPadding(w:number, h:number, topPadding:number, bottomPadding:number, leftPadding:number, rightPadding:number):void;
        setDebugGap(x:number, y:number, width:number, height:number):void;
        setDebugItem(x:number, y:number, width:number, height:number):void;
        setAlpha(alpha:number):void;
        setPosition(point:displayObject.IPoint):void;
        update():void;
        clear():void;
    }
}