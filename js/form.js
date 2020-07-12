'use strict';

(function () {
  var mapFromTypeToCost = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var mapFromRoomsToCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var mapFiltersBlock = window.global.mapBlock.querySelector('.map__filters');
  var mapFiltersSelects = mapFiltersBlock.querySelectorAll('select');
  var mapFiltersFieldsets = mapFiltersBlock.querySelectorAll('fieldset');
  var adForm = document.querySelector('.ad-form');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var roomsSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');
  var typeSelect = adForm.querySelector('#type');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var priceInput = adForm.querySelector('#price');

  var deactivateElements = function (elements) {
    elements.forEach(function (element) {
      element.setAttribute('disabled', '');
    });
  };

  var activateElements = function (elements) {
    elements.forEach(function (element) {
      element.removeAttribute('disabled', '');
    });
  };

  var setInputValue = function (inputElement, value) {
    inputElement.value = value;
  };

  var setAdressInputValue = function () {
    var pinPosition;

    if (!window.global.mapBlock.classList.contains('map--faded')) {
      pinPosition = window.pin.getPinTranslatePosition(window.global.mapPinMain);
    } else {
      pinPosition = window.pin.getPinCenterPosition(window.global.mapPinMain);
    }

    setInputValue(addressInput, window.data.getAdressString(pinPosition.locationX, pinPosition.locationY));
  };

  var blockAdFormElements = function () {
    adForm.classList.add('ad-form--disabled');
    deactivateElements(adFormFieldsets);
  };

  var unblockAdFormElements = function () {
    adForm.classList.remove('ad-form--disabled');
    activateElements(adFormFieldsets);
  };

  var blockMapFiltersElements = function () {
    deactivateElements(mapFiltersSelects);
    deactivateElements(mapFiltersFieldsets);
  };

  var unblockMapFiltersElements = function () {
    activateElements(mapFiltersSelects);
    activateElements(mapFiltersFieldsets);
  };

  var compareRoomsWithCapacityAndSetCustomValidity = function () {
    if (mapFromRoomsToCapacity[roomsSelect.value].indexOf(capacitySelect.value) === -1) {
      var message = 'Возможные варианты: ';

      for (var i = 0; i < capacityOptions.length; i++) {
        if (mapFromRoomsToCapacity[roomsSelect.value].indexOf(capacityOptions[i].value) !== -1) {
          message += capacityOptions[i].textContent;
          if (i !== capacityOptions.length - 2) {
            message += ', ';
          }
        }
      }

      capacitySelect.setCustomValidity(message);
    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  var onTypeSelectChange = function (evt) {
    priceInput.min = mapFromTypeToCost[evt.target.value];
    priceInput.placeholder = mapFromTypeToCost[evt.target.value];
  };

  var initializeElements = function () {
    blockAdFormElements();
    blockMapFiltersElements();
    setAdressInputValue();
    compareRoomsWithCapacityAndSetCustomValidity();
  };

  window.form = {
    adForm: adForm,
    timeInSelect: timeInSelect,
    timeOutSelect: timeOutSelect,
    typeSelect: typeSelect,
    resetButton: resetButton,
    roomsSelect: roomsSelect,
    capacitySelect: capacitySelect,
    initializeElements: initializeElements,
    onTypeSelectChange: onTypeSelectChange,
    unblockMapFiltersElements: unblockMapFiltersElements,
    unblockAdFormElements: unblockAdFormElements,
    setAdressInputValue: setAdressInputValue,
    compareRoomsWithCapacityAndSetCustomValidity: compareRoomsWithCapacityAndSetCustomValidity
  };
})();
