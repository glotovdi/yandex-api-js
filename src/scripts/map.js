function createMap(mapState) {
  var myMap = new ymaps.Map(
    'map',
    {
      center: mapState.center,
      zoom: 13,
      controls: ['zoomControl'],
      behaviors: ['drag', 'dblClickZoom', 'scrollZoom']
    },
    {
      searchControlProvider: 'yandex#search',
      geoObjectOpenBalloonOnClick: false
    }
  );

  var clusterer = new ymaps.Clusterer({
    preset: 'islands#blueClusterIcons',
    clusterDisableClickZoom: true,
    openBalloonOnClick: true,
    groupByCoordinates: false,
    clusterBalloonContentLayout: 'cluster#balloonCarousel'
  });

  clusterer.add(historyMarks.map(mark => new ymaps.Placemark(mark.coords, mark.baloonOptions, mark.other)));
  myMap.geoObjects.add(clusterer);
  loader.style.display = 'none';
  myMap.events.add('click', async function(e) {
    await addEvent(e, myMap, clusterer);
  });
}

async function addEvent(e, myMap, clusterer) {
  var coords = e.get('coords');
  var geoCoords = await ymaps.geocode(coords);
  var position = e.get('position');

  var obj = {};
  obj.coords = coords;
  obj.address = geoCoords.geoObjects.get(0).properties.get('text');
  obj.comments = [];
  if (position[0] > window.screen.availWidth - 367) {
    position[0] = window.screen.availWidth - 400;
  }
  if (position[1] > window.screen.availHeight - 675) {
    position[1] = window.screen.availHeight - 675;
  }

  openPopup(obj, myMap, position, clusterer, '');
}

function placemarks(obj, myMap, position, clusterer, popup, text) {
  var placemarkOptions = {
    coords: obj.coords,

    baloonOptions: {
      hintContent: popup.children[1].lastChild.innerHTML,
      balloonContentHeader: text.place,
      balloonContentBody: obj.address,
      balloonContentFooter: text.feedback
    },
    other: {
      preset: 'islands#blueDotIcon',
      openHintOnHover: false
    }
  };
  var placemark = new ymaps.Placemark(placemarkOptions.coords, placemarkOptions.baloonOptions, placemarkOptions.other);

  myMap.geoObjects.add(placemark);
  clusterer.add(placemark);
  historyMarks.push(placemarkOptions);
  localStorage.setItem('placemarks', JSON.stringify(historyMarks));
  placemark.events.add('click', () => {
    openPopup(obj, myMap, position, clusterer, placemark.properties._data.hintContent);
  });
}
