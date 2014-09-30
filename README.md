simple-layout-js
================
<img align="right" width="180" src="http://simple-layout.com/images/logo.svg">
Simple-Layout is a lightweight yet powerfull generic layout engine for canvas based games and apps.
The engine will help you fit your game/app to any device resolution, it uses percent based width and height.

Checkout the [Layout-Editor](http://www.simple-layout.com/#/layout-editor) to experience the engine's abilities.


Installing
--------------------
Install using [bower](https://github.com/bower/bower)

```sh
bower install simple-layout-js --save
```

Including
--------------------
Include the engine simple-layout-js.js
```html
<script src="bower_components/simple-layout-js/build/simple-layout-js.js"/>
```

For [CreateJs](https://github.com/CreateJS/EaselJS) also include:
```html
<script src="bower_components/simple-layout-js/build/simple-layout-for-createjs.js"/>
```

For [PIXI](https://github.com/GoodBoyDigital/pixi.js/) also include:
```html
<script src="bower_components/simple-layout-js/build/simple-layout-for-pixijs.js"/>
```

Usage
--------------------
The easiest way to use Simple-Layout is to build your layout using the [Layout-Editor](http://www.simple-layout.com/#/layout-editor), once you are done, export to JSON, and import it in your app/game at run-time.
```JavaScript
var myLayout = SimpleLayout.LayoutContainer.itemFromJson(exported_json);
myLayout.createAssets(myAssetsFactory);
myLayout.fitInto(this.m_canvasElement.offsetWidth, this.m_canvasElement.offsetHeight);
```

The API
--------------------
The code was written with JSDoc, so it should be fairly easy to understand each and every class/function/param.
There's also a web version of the api [HERE](http://www.simple-layout.com/#/docs).

IAssetsFactory
--------------------
In your exported json, you've mentioned the asset id for each asset in your ui, if you want Simple-Layout to created your assets (Mostly known as DisplayObject or Sprite), you can call createAssets, while passing an AssetsFactory. AssetsFactory is an object that implemets a simple interface:
```TypeScript
// The IAssetsFactory interface //
{
  createDisplayObject(assetId: string): SimpleLayout.displayObject.IDisplayObject;
  createDisplayObjectContainer(): SimpleLayout.displayObject.IDisplayObjectContainer;
}
```
Your assets factory should be able to create and return any asset that was used while building the layout.

IDisplayObject and IDisplayObjectContainer
--------------------
The IDisplayObject and IDisplayObjectContainer interfaces are what makes Simple-Layout a generic layout engine. Any game engine that can implement these interfaces can use Simple-Layout!
Currently Simple-Layout comes with CreateJs and PIXI implementations of these interfaces. More to come soon.

```TypeScript
// The IPoint interface //
{
  x : number;
  y : number;
}

// The IDisplayObject interface //
{
  width                       : number;
  height                      : number;
  x                           : number;
  y                           : number;
  name                        : string;
  getConcreteDisplayObject()  : Object;
  getGlobalPos()              : IPoint;
  getPivotPoint()             : IPoint;
  resetScaling()              : void;
  dispose()                   : void;
}

// The IDisplayObjectContainer interface (extends IDisplayObject) //
{
  addChild(child:IDisplayObject):void;
  removeChild(child:IDisplayObject):void;
  removeAllChildren():void;
}
```

Contributing & adding new engines
--------------------
As mentioned before, Simple Layout is a generic layout engine that can work with any game engine. The only condition is that the game engine supports a Display-Tree (Most engines do).
To make Simple-Layout support your engine, fork this repo. implement the SimpleLayout.displayObject.IDisplayObject and SimpleLayout.displayObject.IDisplayObjectContainer interfaces and ask for a pull request.
You can look as the existing implementations like PIXI and CreateJS.

The Layout-Editor
--------------------
This is a side project that uses Simple-Layout to help you build your app/game UI, export it to JSON and import it at run-time.
