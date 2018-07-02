import * as OfflinePluginRuntime from "offline-plugin/runtime";

OfflinePluginRuntime.install({
  onInstalled() {},

  onUpdating() {},

  onUpdateReady() {
    OfflinePluginRuntime.applyUpdate();
  },
  onUpdated() {
    setTimeout(() => {
      window.location.reload();
    }, 10000);
  }
});
