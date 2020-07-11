'use strict';

//Работа с пинами
var MAIN_PIN_AFFTER_OFFSET = 16;
var PIN_ELEMENT_WIDTH = 50;
var PIN_ELEMENT_HEIGHT = 70;

var mapPins;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getPinTranslatePosition = function (pin) {
  return {
    locationX: Math.ceil(pin.offsetLeft + pin.offsetWidth / 2),
    locationY: Math.ceil(pin.offsetTop + pin.offsetHeight + MAIN_PIN_AFFTER_OFFSET)
  };
};

var getPinCenterPosition = function (pin) {
  return {
    locationX: Math.ceil(pin.offsetLeft + pin.offsetWidth / 2),
    locationY: Math.ceil(pin.offsetTop + pin.offsetHeight / 2)
  };
};

var onMapPinMainClick = function (evt) {
  if (evt.button === 0) {
    activatePage();
    mapPinMain.removeEventListener('mousedown', onMapPinMainClick);
    mapPinMain.removeEventListener('keydown', onMapPinMainPressEnter);
  }
};

var onMapPinMainPressEnter = function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
    mapPinMain.removeEventListener('mousedown', onMapPinMainClick);
    mapPinMain.removeEventListener('keydown', onMapPinMainPressEnter);
  }
};

var addMapPinActiveClass = function (activePin) {
  mapPins.forEach(function (currentPin) {
    if (currentPin === activePin) {
      currentPin.classList.add('map__pin--active');
    } else {
      currentPin.classList.remove('map__pin--active');
    }
  });
};

var getPinElement = function (datum) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinElementImage = pinElement.querySelector('img');
  var style = 'left: ' + Math.ceil(datum.location.x - PIN_ELEMENT_WIDTH / 2) +
  'px; top: ' + Math.ceil(datum.location.y - PIN_ELEMENT_HEIGHT) + 'px;';
  pinElementImage.src = datum.author.avatar;

  if (datum.offer) {
    pinElementImage.alt = datum.offer.title;
  } else {
    style += 'display: none;';
  }

  pinElement.style = style;

  pinElement.addEventListener('click', function () {
    derenderCard();
    renderCard(getCard(datum));
    addMapPinActiveClass(pinElement);
  });

  return pinElement;
};

var getPinsFragment = function (data) {
  var pinsFragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    pinsFragment.appendChild(getPinElement(data[i]));
  }

  return pinsFragment;
};

var renderMapPins = function (data) {
  mapPinsBlock.appendChild(getPinsFragment(data));
  mapPins = mapPinsBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
};

var derenderMapPins = function () {
  mapPins = mapPinsBlock.querySelectorAll('.map__pin:not(.map__pin--main)');

  mapPins.forEach(function (pin) {
    pin.remove();
  });

  mapPins = [];
};
