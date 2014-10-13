/// <reference path="../reference.ts"/>

module SimpleLayout.visualizer {
    export interface ILayoutVisualizer {
        isActive:Boolean;
        filterByLayoutItem : LayoutItem;
        filterByLayoutContainer : LayoutContainer;
        setDebugLayoutItem(layoutContainer:LayoutContainer, layoutItem:LayoutItem, x:number, y:number, width:number, height:number):void;
        setDebugLayoutContainer(layoutContainer:LayoutContainer, w:number, h:number):void;
        setDebugPadding(layoutContainer:LayoutContainer, w:number, h:number, topPadding:number, bottomPadding:number, leftPadding:number, rightPadding:number):void;
        setDebugGap(layoutContainer:LayoutContainer, x:number, y:number, width:number, height:number):void;
        setAlpha(alpha:number):void;
        setPosition(point:displayObject.IPoint):void;
        update():void;
        clear():void;
        dispose():void;
    }
}