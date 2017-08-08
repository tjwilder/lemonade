require("./indexB.html");
require("./embedEnB.html");
require("./css/materialdesignicons.css");
require("./css/master.css");
require("./js/master.js");
/*
db    db d8888b. d8888b.  .d8b.  d888888b d88888b .d8888. 
88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     88'  YP 
88    88 88oodD' 88   88 88ooo88    88    88ooooo `8bo.   
88    88 88~~~   88   88 88~~~88    88    88~~~~~   `Y8b. 
88b  d88 88      88  .8D 88   88    88    88.     db   8D 
~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P `8888Y' 
                                                          
                                                          
*/
const runtime = require("offline-plugin/runtime");
runtime.install({
  onUpdating: () => {
    console.log("SW Event:", "onUpdating");
  },
  onUpdateReady: () => {
    console.log("SW Event:", "onUpdateReady");
    // Tells to new SW to take control immediately
    runtime.applyUpdate();
  },
  onUpdated: () => {
    console.log("SW Event:", "onUpdated");
    // Reload the webpage to load into the new version
    window.location.reload();
  },
  onUpdateFailed: () => {
    console.log("SW Event:", "onUpdateFailed");
  }
});
