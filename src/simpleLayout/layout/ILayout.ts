/// <reference path="../reference.ts"/>

module SimpleLayout.layout {
    export interface ILayout
    {
        horizontalAlign:string;
        verticalAlign:string;
        gap:number;
        paddingTop:number;
        paddingBottom:number;
        paddingLeft:number;
        paddingRight:number;
        snapToPixels:boolean;
        layoutVisualizer:visualizer.ILayoutVisualizer;

        fitChildrenInto(targetContainer:LayoutContainer, w:number, h:number):void;
        getLayoutType():string;
        toJson():any;
        dispose():void;
    }
}