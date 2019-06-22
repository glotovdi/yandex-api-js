ymaps.ready(mapInit);

async function mapInit() {
  //   response = await ymaps.geolocation.get();
  //   if (!response) {
  //     return createMap({
  //       center: [55.751574, 37.573856],
  //       zoom: 2
  //     });
  //   }

  //   const mapState = getMapState(response);
  //   return createMap(mapState);
  return createMap({
    center: [55.751574, 37.573856],
    zoom: 13
  });
}

function getMapState(response) {
  const mapContainer = document.querySelector('#map');
  const bounds = response.geoObjects.get(0).properties.get('boundedBy');

  return ymaps.util.bounds.getCenterAndZoom(bounds, [mapContainer.clientWidth, mapContainer.clientHeight]);
}

function createMap(state) {
  const map = new ymaps.Map('map', state);
  document.body.removeChild(document.querySelector('#loader'));
  var clusterer = initCluster();
  addEventClick(map, clusterer);
}

function initCluster(customItemContentLayout) {
  var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
    '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
      '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
      '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
  );
  return new ymaps.Clusterer({
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    // Устанавливаем стандартный макет балуна кластера "Карусель".
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    // Устанавливаем собственный макет.
    clusterBalloonItemContentLayout: customItemContentLayout,
    // Устанавливаем режим открытия балуна.
    // В данном примере балун никогда не будет открываться в режиме панели.
    clusterBalloonPanelMaxMapArea: 0,
    // Устанавливаем размеры макета контента балуна (в пикселях).
    clusterBalloonContentLayoutWidth: 200,
    clusterBalloonContentLayoutHeight: 130,
    // Устанавливаем максимальное количество элементов в нижней панели на одной странице
    clusterBalloonPagerSize: 5,
    clusterDisableClickZoom: true
  });
}

function addEventClick(myMap, clusterer) {
  myMap.events.add('click', function(e) {
    var prevEl = document.body.querySelector('.popup');

    if (prevEl) {
      document.body.removeChild(prevEl);
    }

    var coords = e.get('coords');

    var coordsForPopUp = e._cache.pagePixels;

    renderPopUp(coordsForPopUp);

    var myPlacemark = new ymaps.Placemark(coords, {
      balloonContentHeader: 'test',
      balloonContentBody: 'test',
      balloonContentFooter: 'test'
    });

    clusterer.add(myPlacemark);
    myMap.geoObjects.add(clusterer);
  });
}

function renderPopUp(coords) {
  var el = document.createElement('div');
  el.innerText = 'Тестовый поп-ап';
  el.style.position = 'fixed';
  el.style.top = `${coords[1]}px`;
  el.style.left = `${coords[0]}px`;
  el.classList.add('popup');
  document.body.append(el);
}
