export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidGl3YXJpc2hydXRpIiwiYSI6ImNsY3B0YjZybTA2N3kzb2xxcTdmYWNhbXAifQ.I1uqTM4lrwrM-1h4m-TkyA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tiwarishruti/clcpwh2r2000f15m0optmjkon',
    scrollZoom: false
    //   center: [-118.119398, 34.105497],
    //   zoom: 8,
    //   interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    //Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //Extend the map bounds to include current locations
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
