ymaps.ready(mapInit);

async function mapInit() {
  // response = await ymaps.geolocation.get();
  // // if (!response) {
  // //   return createMap({
  // //     center: [55.751574, 37.573856]
  // //   });
  // // }

  // // const mapState = getMapState(response);
  // // return createMap(mapState);
  return createMap({
    center: [55.751315197185384, 37.62054749044975]
  });
}
function openPopup(obj, myMap, position, clusterer, hintContent) {
  var popup = document.querySelector('.popup');

  popup.style.display = 'block';
  popup.innerHTML = render();
  popup.style.top = position[1] + 'px';
  popup.style.left = position[0] + 'px';

  addFeedback(obj, myMap, position, clusterer, popup, hintContent);

  closeAddEventListeres(popup);
}

function addFeedback(obj, myMap, position, clusterer, popup, hintContent) {
  var inputName = document.querySelector('.form__name');
  var inputPlace = document.querySelector('.form__place');
  var inputText = document.querySelector('.form__text');
  var addButton = document.querySelectorAll('.footer__add')[document.querySelectorAll('.footer__add').length - 1];

  var headerAddress = document.querySelector('.header__address-text');

  headerAddress.innerHTML = obj.address;

  var feedbacks = document.querySelector('.feedbacks');
  var feedback = document.createElement('li');

  feedback.classList.add('feedback');
  feedback.innerHTML = hintContent;
  feedbacks.appendChild(feedback);

  addButton.addEventListener('click', () => {
    if (inputName.value && inputPlace.value && inputText.value) {
      var feedback = document.createElement('li');

      var name = document.createElement('div');
      var place = document.createElement('div');
      var text = document.createElement('div');
      var day = document.createElement('div');
      var firstLine = document.createElement('div');

      name.innerHTML = inputName.value;
      place.innerHTML = inputPlace.value;
      text.innerHTML = inputText.value;

      const parsedText = {
        place: inputPlace.value,
        feedback: inputText.value
      };

      var date = new Date();

      day.innerHTML = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

      feedback.classList.add('feedback');
      name.classList.add('feedback__name');
      place.classList.add('feedback__place');
      text.classList.add('feedback__text');
      firstLine.classList.add('feedback__firstLine');

      [name, place, day].forEach(element => firstLine.appendChild(element));

      feedback.appendChild(firstLine);
      feedback.appendChild(text);
      [firstLine, text].forEach(element => feedback.appendChild(element));
      feedbacks.appendChild(feedback);
      [(inputPlace, inputName, inputText)].forEach(element => (element.value = ''));

      placemarks(obj, myMap, position, clusterer, popup, parsedText);
      closePopUp(popup);
    } else {
      alert('Заполните все поля!');
    }
  });
}

function closeAddEventListeres(popup) {
  var closeButton = document.querySelector('.header__close');

  closeButton.addEventListener('click', () => {
    closePopUp(popup);
  });
}
