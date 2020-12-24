import loadMapModule from './loadMapModule';

async function autocomplete(input, latInput, lngInput) {
  if (!input) return;

  await loadMapModule('Microsoft.Maps.AutoSuggest');

  const manager = new Microsoft.Maps.AutosuggestManager({ maxResults: 5 });
  manager.attachAutosuggest(input, input.parentElement, ({ location }) => {
    latInput.value = location.latitude;
    lngInput.value = location.longitude;
  });
}

export default autocomplete;
