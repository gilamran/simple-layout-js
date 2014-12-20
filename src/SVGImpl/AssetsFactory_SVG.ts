module SimpleLayout.SVGImpl {

    export class AssetsFactory_SVG implements IAssetsFactory {
        private xmlns = "http://www.w3.org/2000/svg";
        private m_assetIDs:string[] = ["red", "green", "blue"];

        public constructor() {
        }

        public hasAssetsToLoad():boolean {
            return true;
        }

        public loadAssets(doneCallback:() => void, errorCallback:(errorMessage:string) => void, progressCallback:(percentDone:number) => void):void {
            doneCallback();
        }

        public getAssetsIds():string[] {
            return this.m_assetIDs;
        }

        public hasAsset(assetId:string):Boolean {
            return this.m_assetIDs.indexOf(assetId) > -1;
        }

        public createDisplayObjectContainer():SimpleLayout.displayObject.IDisplayObjectContainer {
            var container:SVGGElement;
            var displayObjectContainer:SimpleLayout.displayObject.IDisplayObjectContainer;

            container = <SVGGElement>document.createElementNS(this.xmlns, "g");
            displayObjectContainer = new SimpleLayout.SVGImpl.SVGContainerWrapper(container);

            return displayObjectContainer;
        }

        public createDisplayObject(assetId:string):SimpleLayout.displayObject.IDisplayObject {
            var displayObject:SimpleLayout.displayObject.IDisplayObject;

            var shape:any = document.createElementNS(this.xmlns, "circle");
            shape.setAttribute("r",  50);
            shape.setAttribute("fill", "green");
            displayObject = new SimpleLayout.SVGImpl.SVGDisplayObjectWrapper(shape);

            return displayObject;
        }

        public disposeAssets():void {
            // nothing to dispose
        }

    }
}
