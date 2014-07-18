/// <reference path="../reference.ts"/>

module layoutFramework.layout {
    export interface ILayout
    {
        horizontalAlign:string;
        verticalAlign:string;
        gap:string;
        paddingTop:string;
        paddingBottom:string;
        paddingLeft:string;
        paddingRight:string;
        snapToPixels:boolean;

        fitChildrenInto(targetContainer:containers.LayoutContainer, w:number, h:number):void;
        layoutVisualizer:visualizer.ILayoutVisualizer;
    }
}