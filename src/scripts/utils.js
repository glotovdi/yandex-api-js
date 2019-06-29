
function closePopUp(popup) {
    popup.style.display = 'none';
    popup.innerHTML = '';
  }
  
  function render() {
    return `<header class="header">
    <div class="header__address">
      <img src="./images/address.png" alt="" class="header__address-image" />
      <div class="header__address-text"></div>
    </div>
    <button class="header__close">
      <img src="./images/close.png" alt="" class="header__close-image" />
    </button>
  </header>
  <ul class="feedbacks"></ul>
  <div class="form">
    <div class="form__title">ваш отзыв</div>
    <input type="text" class="form__input form__name" placeholder="Ваше имя" />
    <input type="text" class="form__input form__place" placeholder="Укажите место" />
    <textarea type="text" class="form__input form__text" placeholder="Поделитесь впечатлениями"></textarea>
  </div>
  <footer class="footer">
    <button class="footer__add">Добавить</button>
  </footer>`;
  }
  function getMapState(response) {
    const mapContainer = document.querySelector('#map');
    const bounds = response.geoObjects.get(0).properties.get('boundedBy');
  
    return ymaps.util.bounds.getCenterAndZoom(bounds, [mapContainer.clientWidth, mapContainer.clientHeight]);
  }
  