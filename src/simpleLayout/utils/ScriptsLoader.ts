/// <reference path='../reference.ts'/>
module SimpleLayout.utils {
    export class ScriptsLoader {
        private m_scriptsUrls       : string[];
        private m_loadedScripts     : HTMLScriptElement[];

        public constructor() {
            this.m_scriptsUrls = [];
            this.m_loadedScripts = [];
        }

        public addScriptsToLoad(scriptsUrls:string[]):void {
            for (var i:number=0; i<scriptsUrls.length; i++) {
                this.addScriptToLoad(scriptsUrls[i]);
            }
        }

        public addScriptToLoad(scriptUrl:string):void {
            if (this.m_scriptsUrls.indexOf(scriptUrl) == -1) {
                this.m_scriptsUrls.push(scriptUrl);
            }
        }

        private addCacheKill(url:string):string {
            if (url.indexOf("?") === -1) {
                url = url + "?";
            }
            else {
                url = url + "&";
            }

            return url + "cacheKiller=" + Math.random();
        }

        public load(loadedCallback:() => void, errorCallback:(errorDesc:string) => void):void {
            if (this.m_scriptsUrls.length==0) {
                loadedCallback();
            }
            else {
                var countOfLoaded : number = 0;
                for (var i:number=0; i<this.m_scriptsUrls.length; i++) {
                    var scriptElement : HTMLScriptElement = document.createElement("script");
                    scriptElement.type = "text/javascript";
                    scriptElement.src = this.addCacheKill(this.m_scriptsUrls[i]);
                    scriptElement.onload = (event: Event) => {
                        this.m_loadedScripts.push(<HTMLScriptElement>event.target);
                        countOfLoaded++;
                        if (countOfLoaded==this.m_loadedScripts.length)
                            loadedCallback();
                    };

                    scriptElement.onerror = (event: Event) => {
                        errorCallback("The script " + (<any>event.target).src + " is not accessible.");
                    };

                    document.getElementsByTagName("head")[0].appendChild(scriptElement);
                }
            }
        }

        public reset():void {
            this.m_scriptsUrls = [];
            for (var i:number=0; i<this.m_loadedScripts.length; i++) {
                var scriptElement : HTMLScriptElement = this.m_loadedScripts[i];
                scriptElement.parentElement.removeChild(scriptElement);
            }

            this.m_loadedScripts = [];
        }

        public dispose():void {
            this.reset();
        }
    }
}