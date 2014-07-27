/// <reference path="../reference.ts"/>

module SimpleLayout.visualizer {
    export interface ILayoutVisualizer {
        highlightedLayoutItem : LayoutItem;
        attachedTo : layout.ILayout;
        setDebugFitAreaSize(w:number, h:number):void;
        setDebugPadding(w:number, h:number, topPadding:number, bottomPadding:number, leftPadding:number, rightPadding:number):void;
        setDebugGap(x:number, y:number, width:number, height:number):void;
        setDebugItem(layoutItem:LayoutItem, x:number, y:number, width:number, height:number):void;
        setAlpha(alpha:number):void;
        setPosition(point:displayObject.IPoint):void;
        update():void;
        clear():void;
    }
}