'use strict';

(function () {
  var MAIN_PIN_OFFSET_WIDTH = 65;
  var MAIN_PIN_OFFSET_HEIGHT = 65;
  var MAIN_PIN_AFFTER_OFFSET = 16;
  var PIN_ELEMENT_WIDTH = 50;
  var PIN_ELEMENT_HEIGHT = 70;

  var mapPins;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getTranslatePosition = function (position) {
    return {
      locationX: Math.ceil(position.x + MAIN_PIN_OFFSET_WIDTH / 2),
      locationY: Math.ceil(position.y + MAIN_PIN_OFFSET_HEIGHT + MAIN_PIN_AFFTER_OFFSET)
    };
  };

  var getPinTranslatePosition = function (pin) {
    return {
      locationX: Math.ceil(pin.offsetLeft + MAIN_PIN_OFFSET_WIDTH / 2),
      locationY: Math.ceil(pin.offsetTop + MAIN_PIN_OFFSET_HEIGHT + MAIN_PIN_AFFTER_OFFSET)
    };
  };

  var getPinCenterPosition = function (pin) {
    return {
      locationX: Math.ceil(pin.offsetLeft + MAIN_PIN_OFFSET_WIDTH / 2),
      locationY: Math.ceil(pin.offsetTop + MAIN_PIN_OFFSET_HEIGHT / 2)
    };
  };

  var checkAndFixPinPosition = function (position) {
    var translatePosition = getTranslatePosition(position);

    if (translatePosition.locationX < window.global.positionLimits.xMin) {
      position.x = Math.ceil(window.global.positionLimits.xMin - MAIN_PIN_OFFSET_WIDTH / 2);
    } else if (translatePosition.locationX > window.global.positionLimits.xMax) {
      position.x = Math.ceil(window.global.positionLimits.xMax - MAIN_PIN_OFFSET_WIDTH / 2);
    }

    if (translatePosition.locationY < window.global.positionLimits.yMin) {
      position.y = Math.ceil(window.global.positionLimits.yMin - MAIN_PIN_OFFSET_HEIGHT - MAIN_PIN_AFFTER_OFFSET);
    } else if (translatePosition.locationY > window.global.positionLimits.yMax) {
      position.y = Math.ceil(window.global.positionLimits.yMax - MAIN_PIN_OFFSET_HEIGHT - MAIN_PIN_AFFTER_OFFSET);
    }
  };

  var calculateNewPinPosition = function (startPosition, evt) {
    var shift = {
      x: startPosition.x - evt.clientX,
      y: startPosition.y - evt.clientY
    };

    startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    var newPosition = {
      x: window.global.mapPinMain.offsetLeft - shift.x,
      y: window.global.mapPinMain.offsetTop - shift.y
    };

    checkAndFixPinPosition(newPosition);
    window.global.mapPinMain.style.left = newPosition.x + 'px';
    window.global.mapPinMain.style.top = newPosition.y + 'px';
    return startPosition;
  };

  var onMapPinMainMouseDown = function (downEvt) {
    if (downEvt.button === 0) {
      downEvt.preventDefault();

      var startPosition = {
        x: downEvt.clientX,
        y: downEvt.clientY
      };

      var onMapPinMainMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        startPosition = calculateNewPinPosition(startPosition, moveEvt);
        window.form.setAdressInputValue();
      };

      var onMapPinMainMouseUp = function (upEvt) {
        if (upEvt.button === 0) {
          upEvt.preventDefault();
          startPosition = calculateNewPinPosition(startPosition, upEvt);
          window.form.setAdressInputValue();
          document.removeEventListener('mousemove', onMapPinMainMouseMove);
          document.removeEventListener('mouseup', onMapPinMainMouseUp);
        }
      };

      document.addEventListener('mousemove', onMapPinMainMouseMove);
      document.addEventListener('mouseup', onMapPinMainMouseUp);
    }
  };

  var onMapPinMainClick = function (evt) {
    if (evt.button === 0) {
      window.map.activatePage();
      window.global.mapPinMain.removeEventListener('mousedown', onMapPinMainClick);
      window.global.mapPinMain.removeEventListener('keydown', onMapPinMainPressEnter);
      window.global.mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
    }
  };

  var onMapPinMainPressEnter = function (evt) {
    if (evt.key === 'Enter') {
      window.map.activatePage();
      window.global.mapPinMain.removeEventListener('mousedown', onMapPinMainClick);
      window.global.mapPinMain.removeEventListener('keydown', onMapPinMainPressEnter);
      window.global.mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
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
      window.card.derenderCard();
      window.card.renderCard(window.card.getCard(datum));
      addMapPinActiveClass(pinElement);
    });

    return pinElement;
  };

  var getPinsFragment = function () {
    var pinsFragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.adData.length; i++) {
      pinsFragment.appendChild(getPinElement(window.data.adData[i]));
    }

    return pinsFragment;
  };

  var renderMapPins = function () {
    window.global.mapPinsBlock.appendChild(getPinsFragment());
    mapPins = window.global.mapPinsBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
  };

  var derenderMapPins = function () {
    mapPins = window.global.mapPinsBlock.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.forEach(function (pin) {
      pin.remove();
    });

    mapPins = [];
  };

  window.pin = {
    renderMapPins: renderMapPins,
    derenderMapPins: derenderMapPins,
    getPinTranslatePosition: getPinTranslatePosition,
    getPinCenterPosition: getPinCenterPosition,
    onMapPinMainClick: onMapPinMainClick,
    onMapPinMainPressEnter: onMapPinMainPressEnter
  };
})();
