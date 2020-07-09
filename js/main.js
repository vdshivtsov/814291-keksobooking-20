'use strict';

var PHOTOS_ARRAY = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var CHECKIN_TYPES_ARRAY = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT_TYPES_ARRAY = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES_ARRAY = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var AVATARS_ARRAY = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var TITLES_ARRAY = [
  'Sugar Loft Apartments',
  'Injoy Lofts Ipanema',
  'Studio Copacabana',
  'Amplo Apartamento com Piscina e Garagem',
  'Residencial Sausalito',
  'Apto Barra-Jeunesse Rio Centro',
  'Bien-être à Ipanema',
  'Tiffany'
];

var DESCRIPTIONS_ARRAY = [
  'Апартаменты расположены рядом с океаном в городе Мертл-Бич, штат Южная Каролина. К услугам гостей открытый бассейн. Предоставляется бесплатный Wi-Fi. До аквапарка Wild Water and Wheels 1,7 км.',
  'Комплекс вилл с собственной кухней расположен в городе Миртл-Бич. К услугам гостей крытый и открытый бассейны, полностью оборудованная кухня, бесплатный Wi-Fi и бесплатный пляжный трансфер.',
  'Апартаменты 2Br Penthouse in the Ocean Forest Plaza с видом на море расположены в 5 км от конгресс-центра Миртл-Бич. К услугам гостей открытый бассейн и балкон.',
  'Апартаменты Hawaii Luxury Suites расположены в Эйлате (Южный округ Израиля), в 1 км от пляжа Кисуски. К услугам гостей бесплатный Wi-Fi, детская игровая площадка, сад и бесплатная частная парковка.',
  'Апартаменты Hannas Place - Great Location расположены в городе Эйлат, в 7 км от морского парка «Подводная обсерватория». В апартаментах работает бесплатный Wi-Fi, из окон открывается вид на море.',
  'Комплекс апартаментов Sunshine Suite Boutique расположен в городе Эйлат, менее чем в 1 км от пляжа Кисуски и в 13 минутах ходьбы от пляжа Декел.',
  'Эти апартаменты расположены в городе Дестин, всего в нескольких шагах от пляжа Дестин, пляжа Оушен-Вью и 8. К услугам гостей апартаментов Flr открытый бассейн, фитнес-центр, бар и бесплатный Wi-Fi.',
  'Апартаменты-студио Bay Front расположены на 4 этаже здания Bay Front, в городе Дестин, штат Сэнддестин. К услугам гостей бесплатный Wi-Fi, кондиционер, ресторан и сад с открытым бассейном.'
];

var typesOfFlatDictionary = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

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

var mapFromFeatureToClass = {
  'wifi': 'popup__feature--wifi',
  'dishwasher': 'popup__feature--dishwasher',
  'parking': 'popup__feature--parking',
  'washer': 'popup__feature--washer',
  'elevator': 'popup__feature--elevator',
  'conditioner': 'popup__feature--conditioner'
};

var MAIN_PIN_AFFTER_OFFSET = 16;
var PIN_ELEMENT_WIDTH = 50;
var PIN_ELEMENT_HEIGHT = 70;

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var mapBlock = document.querySelector('.map');
var mapCard;
var mapFiltersContainer = mapBlock.querySelector('.map__filters-container');
var mapFiltersBlock = mapBlock.querySelector('.map__filters');
var mapFiltersSelects = mapFiltersBlock.querySelectorAll('select');
var mapFiltersFieldsets = mapFiltersBlock.querySelectorAll('fieldset');
var mapPinsBlock = mapBlock.querySelector('.map__pins');
var mapPinMain = mapPinsBlock.querySelector('.map__pin--main');
var mapPins;
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
var adData;

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomLengthArray = function (array) {
  var resultArray = array.slice(0);
  var amount = getRandomIntInclusive(0, resultArray.length);

  for (var i = 0; i < amount; i++) {
    resultArray.splice(getRandomIntInclusive(0, resultArray.length - 1), 1);
  }

  return resultArray;
};

var getAdressString = function (x, y) {
  return x + ', ' + y;
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

var activatePage = function () {
  mapBlock.classList.remove('map--faded');

  renderMapPins(adData);
  unblockAdFormElements();
  unblockMapFiltersElements();
  setAdressInputValue();
};

var deactivatePage = function () {
  mapBlock.classList.add('map--faded');
  derenderMapPins();
  initializeElements();
  setAdressInputValue();
  derenderCard();
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

var initializeElements = function () {
  blockAdFormElements();
  blockMapFiltersElements();
  setAdressInputValue();
  compareRoomsWithCapacityAndSetCustomValidity();
};

var getMocksArray = function () {
  var mocksArray = [];
  var amountOfMocks = AVATARS_ARRAY.length;
  var mock = {};
  var locationX;
  var locationY;
  var avatars = AVATARS_ARRAY.slice(0);
  var titles = TITLES_ARRAY.slice(0);
  var descriptions = DESCRIPTIONS_ARRAY.slice(0);

  for (var i = 0; i < amountOfMocks; i++) {
    locationX = getRandomIntInclusive(0, mapPinsBlock.clientWidth);
    locationY = getRandomIntInclusive(130, 630);
    mock = {
      'author': {
        'avatar': avatars.splice(getRandomIntInclusive(0, avatars.length - 1), 1)[0]
      },
      'offer': {
        'title': titles.splice(getRandomIntInclusive(0, titles.length - 1), 1)[0],
        'address': getAdressString(locationX, locationY),
        'price': getRandomIntInclusive(10000, 500000),
        'type': Object.keys(typesOfFlatDictionary)[getRandomIntInclusive(0, Object.keys(typesOfFlatDictionary).length - 1)],
        'rooms': getRandomIntInclusive(1, 10),
        'guests': getRandomIntInclusive(2, 30),
        'checkin': CHECKIN_TYPES_ARRAY[getRandomIntInclusive(0, CHECKIN_TYPES_ARRAY.length - 1)],
        'checkout': CHECKOUT_TYPES_ARRAY[getRandomIntInclusive(0, CHECKOUT_TYPES_ARRAY.length - 1)],
        'features': getRandomLengthArray(FEATURES_ARRAY),
        'description': descriptions.splice(getRandomIntInclusive(0, descriptions.length - 1), 1)[0],
        'photos': getRandomLengthArray(PHOTOS_ARRAY)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };

    mocksArray.push(mock);
  }
  return mocksArray;
};

var hideElement = function (nodeElement) {
  nodeElement.style.display = 'none';
};

var checkDataAndCreateElement = function (nodeElement, data, option, insertText) {
  if (!data) {
    hideElement(nodeElement);
    return;
  } else {
    if (option) {
      nodeElement.textContent = insertText;
    } else {
      nodeElement.innerHTML = insertText;
    }
  }
};

var checkDataAndChangeAttribute = function (nodeElement, data, attribute) {
  if (!data) {
    hideElement(nodeElement);
    return;
  } else {
    nodeElement.setAttribute(attribute, data);
  }
};

var checkDataAndRemoveElementsByArrayAndClassMap = function (nodeElement, childrenElements, data, classMap) {
  if (data.length) {
    for (var i = 0; i < childrenElements.length; i++) {
      var hasElement = false;
      for (var j = 0; j < data.length; j++) {
        if (childrenElements[i].classList.contains(classMap[data[j]])) {
          hasElement = true;
          break;
        }
      }
      if (!hasElement) {
        childrenElements[i].remove();
      }
    }
  } else {
    hideElement(nodeElement);
  }
};

var checkDataArrayAndCreateElementsFromChild = function (targetElement, data, attribute) {
  if (data.length) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var element = targetElement.children[0].cloneNode(true);
      checkDataAndChangeAttribute(element, data[i], attribute);
      fragment.append(element);
    }
    targetElement.children[0].remove();
    targetElement.appendChild(fragment);
  } else {
    hideElement(targetElement);
  }
};

var getCard = function (datum) {
  var card = cardTemplate.cloneNode(true);

  checkDataAndCreateElement(card.querySelector('.popup__title'), datum.offer.title, false, datum.offer.title);
  checkDataAndCreateElement(card.querySelector('.popup__text--address'), datum.offer.address, false, datum.offer.address);
  checkDataAndCreateElement(card.querySelector('.popup__text--price'), datum.offer.price, false, datum.offer.price + '₽/ночь');
  checkDataAndCreateElement(card.querySelector('.popup__type'), datum.offer.type, false, typesOfFlatDictionary[datum.offer.type]);
  checkDataAndCreateElement(card.querySelector('.popup__text--capacity'), datum.offer.rooms, false, datum.offer.rooms + ' комнаты для ' + datum.offer.guests + ' гостей');
  checkDataAndCreateElement(card.querySelector('.popup__text--time'), [datum.offer.checkin, datum.offer.checkout], false, 'Заезд после ' + datum.offer.checkin + ', выезд до ' + datum.offer.checkout);
  checkDataAndCreateElement(card.querySelector('.popup__description'), datum.offer.description, false, datum.offer.description);
  checkDataAndChangeAttribute(card.querySelector('.popup__avatar'), datum.author.avatar, 'src');
  checkDataAndRemoveElementsByArrayAndClassMap(card.querySelector('.popup__features'), card.querySelectorAll('.popup__feature'), datum.offer.features, mapFromFeatureToClass);
  checkDataArrayAndCreateElementsFromChild(card.querySelector('.popup__photos'), datum.offer.photos, 'src');

  return card;
};

var onMapCardPressEscape = function (evt) {
  if (evt.key === 'Escape') {
    derenderCard();
  }
};

var derenderCard = function () {
  if (mapCard) {
    mapCard.remove();
    document.removeEventListener('keydown', onMapCardPressEscape);
  }
};

var renderCard = function (card) {
  mapFiltersContainer.insertAdjacentElement('beforebegin', card);

  card.querySelector('.popup__close').addEventListener('click', function () {
    derenderCard();
  });

  document.addEventListener('keydown', onMapCardPressEscape);

  mapCard = mapBlock.querySelector('.map__card');
};

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

var setInputValue = function (inputElement, value) {
  inputElement.value = value;
};

var setAdressInputValue = function () {
  var pinPosition;

  if (!mapBlock.classList.contains('map--faded')) {
    pinPosition = getPinTranslatePosition(mapPinMain);
  } else {
    pinPosition = getPinCenterPosition(mapPinMain);
  }

  setInputValue(addressInput, getAdressString(pinPosition.locationX, pinPosition.locationY));
};

var onMapPinMainPressEnterOrClick = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    activatePage();
    mapPinMain.removeEventListener('mousedown', onMapPinMainPressEnterOrClick);
    mapPinMain.removeEventListener('keydown', onMapPinMainPressEnterOrClick);
  }
};

adData = getMocksArray();
initializeElements();

mapPinMain.addEventListener('mousedown', onMapPinMainPressEnterOrClick);
mapPinMain.addEventListener('keydown', onMapPinMainPressEnterOrClick);

resetButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  adForm.reset();
  deactivatePage();
  mapPinMain.addEventListener('mousedown', onMapPinMainPressEnterOrClick);
  mapPinMain.addEventListener('keydown', onMapPinMainPressEnterOrClick);
});

typeSelect.addEventListener('change', function (evt) {
  priceInput.min = mapFromTypeToCost[evt.target.value];
  priceInput.placeholder = mapFromTypeToCost[evt.target.value];
});

timeInSelect.addEventListener('change', function () {
  timeOutSelect.value = timeInSelect.value;
});

timeOutSelect.addEventListener('change', function () {
  timeInSelect.value = timeOutSelect.value;
});

roomsSelect.addEventListener('change', function () {
  compareRoomsWithCapacityAndSetCustomValidity();
});

capacitySelect.addEventListener('change', function () {
  compareRoomsWithCapacityAndSetCustomValidity();
});


