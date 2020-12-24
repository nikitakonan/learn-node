async function loadMapModule(moduleName) {
  return new Promise((resolve, reject) => {
    Microsoft.Maps.loadModule(moduleName, {
      callback: resolve,
      errorCallback: reject,
    });
  });
}

export default loadMapModule;
