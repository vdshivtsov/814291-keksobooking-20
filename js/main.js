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

// var mapFromFeatureToClass = {
//   'wifi': 'popup__feature--wifi',
//   'dishwasher': 'popup__feature--dishwasher',
//   'parking': 'popup__feature--parking',
//   'washer': 'popup__feature--washer',
//   'elevator': 'popup__feature--elevator',
//   'conditioner': 'popup__feature--conditioner'
// };

var MAIN_PIN_AFFTER_OFFSET = 16;
var PIN_ELEMENT_WIDTH = 50;
var PIN_ELEMENT_HEIGHT = 70;

var mapPinsBlock = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');
var roomsSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
var typeSelect = document.querySelector('#type');
var mapPinMain = document.querySelector('.map__pin--main');
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

var getPinElement = function (datum) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinElementImage = pinElement.querySelector('img');

  pinElement.style = 'left: ' + Math.ceil(datum.location.x - PIN_ELEMENT_WIDTH / 2) +
  'px; top: ' + Math.ceil(datum.location.y - PIN_ELEMENT_HEIGHT) + 'px;';
  pinElementImage.src = datum.author.avatar;
  pinElementImage.alt = datum.offer.title;

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
  var adFormFieldsets = document.querySelector('.ad-form').querySelectorAll('fieldset');

  deactivateElements(adFormFieldsets);
};

var unblockAdFormElements = function () {
  var adFormFieldsets = document.querySelector('.ad-form').querySelectorAll('fieldset');

  activateElements(adFormFieldsets);
};

var blockMapFiltersElements = function () {
  var mapFiltersBlock = document.querySelector('.map__filters');
  var mapFiltersSelects = mapFiltersBlock.querySelectorAll('select');
  var mapFiltersFieldsets = mapFiltersBlock.querySelectorAll('fieldset');

  deactivateElements(mapFiltersSelects);
  deactivateElements(mapFiltersFieldsets);
};

var unblockMapFiltersElements = function () {
  var mapFiltersBlock = document.querySelector('.map__filters');
  var mapFiltersSelects = mapFiltersBlock.querySelectorAll('select');
  var mapFiltersFieldsets = mapFiltersBlock.querySelectorAll('fieldset');

  activateElements(mapFiltersSelects);
  activateElements(mapFiltersFieldsets);
};

var activatePage = function () {
  document.querySelector('.map').classList.remove('map--faded');

  renderMapPins(adData);
  unblockAdFormElements();
  unblockMapFiltersElements();
};

var compareRoomsWithCapacityAndSetCustomValidity = function () {
  if (mapFromRoomsToCapacity[roomsSelect.value].indexOf(capacitySelect.value) === -1) {
    var capacityOptions = capacitySelect.querySelectorAll('option');
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
  var addressInput = document.querySelector('#address');
  var pinTranslatePosition = getPinCenterPosition(mapPinMain);

  blockAdFormElements();
  blockMapFiltersElements();
  setInputValue(addressInput, getAdressString(pinTranslatePosition.locationX, pinTranslatePosition.locationY));
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

// var hideElement = function (nodeElement) {
//   nodeElement.style.display = 'none';
// };

// var checkDataAndCreateElement = function (nodeElement, data, option, insertText) {
//   if (!data) {
//     hideElement(nodeElement);
//     return;
//   } else {
//     if (option) {
//       nodeElement.textContent = insertText;
//     } else {
//       nodeElement.innerHTML = insertText;
//     }
//   }
// };

// var checkDataAndChangeAttribute = function (nodeElement, data, attribute) {
//   if (!data) {
//     hideElement(nodeElement);
//     return;
//   } else {
//     nodeElement.setAttribute(attribute, data);
//   }
// };

// var checkDataAndRemoveElementsByArrayAndClassMap = function (nodeElement, childrenElements, data, classMap) {
//   if (data.length) {
//     for (var i = 0; i < childrenElements.length; i++) {
//       var hasElement = false;
//       for (var j = 0; j < data.length; j++) {
//         if (childrenElements[i].classList.contains(classMap[data[j]])) {
//           hasElement = true;
//           break;
//         }
//       }
//       if (!hasElement) {
//         childrenElements[i].remove();
//       }
//     }
//   } else {
//     hideElement(nodeElement);
//   }
// };

// var checkDataArrayAndCreateElementsFromChild = function (targetElement, data, attribute) {
//   if (data.length) {
//     var fragment = document.createDocumentFragment();
//     for (var i = 0; i < data.length; i++) {
//       var element = targetElement.children[0].cloneNode(true);
//       checkDataAndChangeAttribute(element, data[i], attribute);
//       fragment.append(element);
//     }
//     targetElement.children[0].remove();
//     targetElement.appendChild(fragment);
//   } else {
//     hideElement(targetElement);
//   }
// };

// var getCard = function (datum) {
//   var announcementCard = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);

//   checkDataAndCreateElement(announcementCard.querySelector('.popup__title'), datum.offer.title, false, datum.offer.title);
//   checkDataAndCreateElement(announcementCard.querySelector('.popup__text--address'), datum.offer.address, false, datum.offer.address);
//   checkDataAndCreateElement(announcementCard.querySelector('.popup__text--price'), datum.offer.price, false, datum.offer.price + '₽/ночь');
//   checkDataAndCreateElement(announcementCard.querySelector('.popup__type'), datum.offer.type, false, typesOfFlatDictionary[datum.offer.type]);
//   checkDataAndCreateElement(announcementCard.querySelector('.popup__text--capacity'), datum.offer.rooms, false, datum.offer.rooms + ' комнаты для ' + datum.offer.guests + ' гостей');
//   checkDataAndCreateElement(announcementCard.querySelector('.popup__text--time'), [datum.offer.checkin, datum.offer.checkout], false, 'Заезд после ' + datum.offer.checkin + ', выезд до ' + datum.offer.checkout);
//   checkDataAndCreateElement(announcementCard.querySelector('.popup__description'), datum.offer.description, false, datum.offer.description);
//   checkDataAndChangeAttribute(announcementCard.querySelector('.popup__avatar'), datum.author.avatar, 'src');
//   checkDataAndRemoveElementsByArrayAndClassMap(announcementCard.querySelector('.popup__features'), announcementCard.querySelectorAll('.popup__feature'), datum.offer.features, mapFromFeatureToClass);
//   checkDataArrayAndCreateElementsFromChild(announcementCard.querySelector('.popup__photos'), datum.offer.photos, 'src');

//   return announcementCard;
// };

// var renderCard = function (testDatum) {
//   document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', testDatum);
// };

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

adData = getMocksArray();
initializeElements();
// renderCard(getCard(adData[0]));

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    var addressInput = document.querySelector('#address');
    var pinTranslatePosition = getPinTranslatePosition(mapPinMain);

    activatePage();
    setInputValue(addressInput, getAdressString(pinTranslatePosition.locationX, pinTranslatePosition.locationY));
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
});

typeSelect.addEventListener('change', function (evt) {
  var priceInput = document.querySelector('#price');
  switch (evt.target.value) {
    case 'bungalo':
      priceInput.min = mapFromTypeToCost['bungalo'];
      priceInput.placeholder = mapFromTypeToCost['bungalo'];
      break;
    case 'flat':
      priceInput.min = mapFromTypeToCost['flat'];
      priceInput.placeholder = mapFromTypeToCost['flat'];
      break;
    case 'house':
      priceInput.min = mapFromTypeToCost['house'];
      priceInput.placeholder = mapFromTypeToCost['house'];
      break;
    case 'palace':
      priceInput.min = mapFromTypeToCost['palace'];
      priceInput.placeholder = mapFromTypeToCost['palace'];
      break;
  }
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
