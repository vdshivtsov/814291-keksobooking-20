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

var mapFromFeatureToClass = {
  'wifi': 'popup__feature--wifi',
  'dishwasher': 'popup__feature--dishwasher',
  'parking': 'popup__feature--parking',
  'washer': 'popup__feature--washer',
  'elevator': 'popup__feature--elevator',
  'conditioner': 'popup__feature--conditioner'
};

var mapPinsBlock = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

var getPinElement = function (datum) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinElementImage = pinElement.querySelector('img');

  pinElement.style = 'left: ' + (datum.location.x - 32.5) + 'px; top: ' + (datum.location.y - 54.5) + 'px;';
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

var switchMapMode = function () {
  document.querySelector('.map').classList.toggle('map--faded');
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
        'address': locationX + ', ' + locationY,
        'price': getRandomIntInclusive(10000, 500000),
        // 'type': TYPES_OF_FLAT_ARRAY[getRandomIntInclusive(0, TYPES_OF_FLAT_ARRAY.length - 1)],
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

var getCard = function (datum) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var announcementCard = cardTemplate.cloneNode(true);

  announcementCard.querySelector('.popup__title').textContent = datum.offer.title;
  announcementCard.querySelector('.popup__text--address').textContent = datum.offer.address;
  announcementCard.querySelector('.popup__text--price').textContent = datum.offer.price + '₽/ночь';
  announcementCard.querySelector('.popup__type').textContent = typesOfFlatDictionary[datum.offer.type];
  announcementCard.querySelector('.popup__text--capacity').textContent = datum.offer.rooms + ' комнаты для ' + datum.offer.guests + ' гостей';
  announcementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + datum.offer.checkin + ', выезд до ' + datum.offer.checkout;
  announcementCard.querySelector('.popup__description').textContent = datum.offer.description;
  announcementCard.querySelector('.popup__avatar').src = datum.author.avatar;

  var popupFeatures = announcementCard.querySelectorAll('.popup__feature');
  for (var i = 0; i < popupFeatures.length; i++) {
    var hasElement = false;
    for (var j = 0; j < datum.offer.features.length; j++) {
      if (popupFeatures[i].classList.contains(mapFromFeatureToClass[datum.offer.features[j]])) {
        hasElement = true;
        break;
      }
    }
    if (!hasElement) {
      popupFeatures[i].remove();
    }
  }

  var popupPhotos = announcementCard.querySelector('.popup__photos').querySelectorAll('.popup__photo');
  var popupPhotosFragment = document.createDocumentFragment();
  for (i = 0; i < datum.offer.photos.length; i++) {
    var photo = popupPhotos[0].cloneNode(true);
    photo.src = datum.offer.photos[i];
    popupPhotosFragment.append(photo);
  }
  announcementCard.querySelector('.popup__photos').appendChild(popupPhotosFragment);
  popupPhotos[0].remove();

  return announcementCard;
};

var renderCard = function (testDatum) {
  document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', testDatum);
};

var testData = getMocksArray();
switchMapMode();
renderMapPins(testData);
renderCard(getCard(testData[0]));

