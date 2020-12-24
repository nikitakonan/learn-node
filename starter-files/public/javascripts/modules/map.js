import { $ } from './bling';
import loadMapModule from './loadMapModule';

const defaultLat = 43.2;
const defaultLng = -79.8;
const defaultZoom = 10;

async function loadPlaces(map, lat = defaultLat, lng = defaultLng) {
  const res = await fetch(`/api/stores/near?lat=${lat}&lng=${lng}`);
  const places = await res.json();

  if (!places.length) {
    console.log('No places found');
    return;
  }

  const pins = places.map((place) => {
    const [lng, lat] = place.location.coordinates;
    const center = new Microsoft.Maps.Location(lat, lng);
    const pin = new Microsoft.Maps.Pushpin(center, null);
    pin.place = place;
    map.entities.push(pin);
    return pin;
  });

  const infobox = new Microsoft.Maps.Infobox(pins[0].getLocation(), {
    visible: false,
    autoAlignment: true,
  });
  infobox.setMap(map);

  pins.forEach((pin) => {
    Microsoft.Maps.Events.addHandler(pin, 'click', (e) => {
      const { slug, name, photo, location } = e.target.place;
      const htmlContent = `
        <div class="popup">
          <a href="/stores/${slug}">
            <img src="/uploads/${photo || 'store.png'}" alt="${name}" />
            <p>${name} - ${location.address}</p>
          </a>
        </div>
      `;
      infobox.setOptions({
        location: e.target.getLocation(),
        htmlContent,
        visible: true,
      });
    });
  });

  Microsoft.Maps.Events.addHandler(map, 'click', () => {
    infobox.setOptions({
      visible: false,
    });
  });

  // adjust bounds
  const locations = pins.map((pin) => pin.getLocation());
  map.setView({
    bounds: Microsoft.Maps.LocationRect.fromLocations(locations),
  });
}

async function makeMap(mapDiv) {
  if (!mapDiv) return;

  const mapOptions = {
    center: new Microsoft.Maps.Location(defaultLat, defaultLng),
    zoom: defaultZoom,
  };
  const map = new Microsoft.Maps.Map(mapDiv, mapOptions);
  loadPlaces(map);
  const input = $('[name="geolocate"]');

  await loadMapModule('Microsoft.Maps.AutoSuggest');
  const autosuggestManager = new Microsoft.Maps.AutosuggestManager({
    maxResults: 5,
  });
  autosuggestManager.attachAutosuggest(
    input,
    input.parentElement,
    ({ location }) => {
      const { latitude, longitude } = location;
      map.setView({ center: location });
      loadPlaces(map, latitude, longitude);
    }
  );
}

export default makeMap;
