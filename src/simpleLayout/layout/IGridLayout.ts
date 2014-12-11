/// <reference path="../reference.ts"/>

module SimpleLayout.layout {
    export interface IGridLayout extends ILayout
    {
        columns:number;
        rows:number;
        horizontalGap:number;
        verticalGap:number;
    }
}