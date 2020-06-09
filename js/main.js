// {
//   "author": {
//       "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
//   },
//   "offer": {
//       "title": строка, заголовок предложения
//       "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
//       "price": число, стоимость
//       "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
//       "rooms": число, количество комнат
//       "guests": число, количество гостей, которое можно разместить
//       "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//       "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//       "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//       "description": строка с описанием,
//       "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
//   },
//   "location": {
//       "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//       "y": случайное число, координата y метки на карте от 130 до 630.
//   }
// }

'use strict';

var MOCKS_AMOUNT = 8;

var mapPins;

var Photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var TypesOfFlat = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var CheckinTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var CheckoutTimes = [
  '12:00',
  '13:00',
  '14:00'
];

var Features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var avatarsArray = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var titlesArray = [
  'Sugar Loft Apartments',
  'Injoy Lofts Ipanema',
  'Studio Copacabana',
  'Amplo Apartamento com Piscina e Garagem',
  'Residencial Sausalito',
  'Apto Barra-Jeunesse Rio Centro',
  'Bien-être à Ipanema',
  'Tiffany'
];

var descriptionsArray = [
  'Апартаменты расположены рядом с океаном в городе Мертл-Бич, штат Южная Каролина. К услугам гостей открытый бассейн. Предоставляется бесплатный Wi-Fi. До аквапарка Wild Water and Wheels 1,7 км.',
  'Комплекс вилл с собственной кухней расположен в городе Миртл-Бич. К услугам гостей крытый и открытый бассейны, полностью оборудованная кухня, бесплатный Wi-Fi и бесплатный пляжный трансфер.',
  'Апартаменты 2Br Penthouse in the Ocean Forest Plaza с видом на море расположены в 5 км от конгресс-центра Миртл-Бич. К услугам гостей открытый бассейн и балкон.',
  'Апартаменты Hawaii Luxury Suites расположены в Эйлате (Южный округ Израиля), в 1 км от пляжа Кисуски. К услугам гостей бесплатный Wi-Fi, детская игровая площадка, сад и бесплатная частная парковка.',
  'Апартаменты Hannas Place - Great Location расположены в городе Эйлат, в 7 км от морского парка «Подводная обсерватория». В апартаментах работает бесплатный Wi-Fi, из окон открывается вид на море.',
  'Комплекс апартаментов Sunshine Suite Boutique расположен в городе Эйлат, менее чем в 1 км от пляжа Кисуски и в 13 минутах ходьбы от пляжа Декел.',
  'Эти апартаменты расположены в городе Дестин, всего в нескольких шагах от пляжа Дестин, пляжа Оушен-Вью и 8. К услугам гостей апартаментов Flr открытый бассейн, фитнес-центр, бар и бесплатный Wi-Fi.',
  'Апартаменты-студио Bay Front расположены на 4 этаже здания Bay Front, в городе Дестин, штат Сэнддестин. К услугам гостей бесплатный Wi-Fi, кондиционер, ресторан и сад с открытым бассейном.'
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getAvatar = function () {
  return avatarsArray.splice(getRandomIntInclusive(0, avatarsArray.length - 1), 1)[0];
};

var getAuthor = function () {
  var author = {};
  author.avatar = getAvatar();
  return author;
};

var getOfferTitle = function () {
  return titlesArray.splice(getRandomIntInclusive(0, titlesArray.length - 1), 1)[0];
};

var getOfferAddress = function (mockLocation) {
  return mockLocation.x + ', ' + mockLocation.y;
};

var getOfferPrice = function () {
  return getRandomIntInclusive(10000, 500000);
};

var getOfferType = function () {
  var TypesOfFlatKeys = Object.keys(TypesOfFlat);
  return TypesOfFlatKeys[getRandomIntInclusive(0, TypesOfFlatKeys.length - 1)];
};

var getOfferRooms = function () {
  return getRandomIntInclusive(1, 10);
};

var getOfferGuests = function () {
  return getRandomIntInclusive(2, 30);
};

var getOfferCheckin = function () {
  return CheckinTimes[getRandomIntInclusive(0, CheckinTimes.length - 1)];
};

var getOfferCheckout = function () {
  return CheckoutTimes[getRandomIntInclusive(0, CheckoutTimes.length - 1)];
};

var getOfferFeatures = function () {
  var featuresResult = [];
  var featuresSource = Features.slice(0);
  var featuresAmount = getRandomIntInclusive(0, featuresSource.length);
  for (var i = 0; i < featuresAmount; i++) {
    featuresResult.push(featuresSource.splice(getRandomIntInclusive(0, featuresSource.length - 1), 1)[0]);
  }
  return featuresResult;
};

var getOfferDescription = function () {
  return descriptionsArray.splice(getRandomIntInclusive(0, descriptionsArray.length - 1), 1)[0];
};

var getOfferPhotos = function () {
  var photosResult = [];
  var photosSource = Photos.slice(0);
  var photosAmount = getRandomIntInclusive(0, photosSource.length);
  for (var i = 0; i < photosAmount; i++) {
    photosResult.push(photosSource.splice(getRandomIntInclusive(0, photosSource.length - 1), 1)[0]);
  }
  return photosResult;
};

var getOffer = function (mockLocation) {
  var offer = {};
  offer.title = getOfferTitle();
  offer.address = getOfferAddress(mockLocation);
  offer.price = getOfferPrice();
  offer.type = getOfferType();
  offer.rooms = getOfferRooms();
  offer.guests = getOfferGuests();
  offer.checkin = getOfferCheckin();
  offer.checkout = getOfferCheckout();
  offer.features = getOfferFeatures();
  offer.description = getOfferDescription();
  offer.photos = getOfferPhotos();
  return offer;
};

var getLocationX = function () {
  return getRandomIntInclusive(0, mapPins.clientWidth);
};

var getLocationY = function () {
  return getRandomIntInclusive(130, 630);
};

var getLocation = function () {
  var location = {};
  location.x = getLocationX();
  location.y = getLocationY();
  return location;
};

var getMock = function () {
  var mock = {};
  mock.author = getAuthor();
  mock.location = getLocation();
  mock.offer = getOffer(mock.location);
  return mock;
};

var getMocksArray = function () {
  var mocksArray = [];
  mapPins = document.querySelector('.map__pins');
  for (var i = 0; i < MOCKS_AMOUNT; i++) {
    mocksArray.push(getMock());
  }
  return mocksArray;
};

var getPinElement = function (mock, template) {
  var pinElement = template.cloneNode(true);
  pinElement.style = 'left: ' + (mock.location.x - 32.5) + 'px; top: ' + (mock.location.y - 54.5) + 'px;';
  var pinElementImage = pinElement.querySelector('img');
  pinElementImage.src = mock.author.avatar;
  pinElementImage.alt = mock.offer.title;
  return pinElement;
};

var getPinsFragment = function (mocks) {
  var pinsFragment = document.createDocumentFragment();
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  for (var i = 0; i < mocks.length; i++) {
    pinsFragment.appendChild(getPinElement(mocks[i], pinTemplate));
  }

  return pinsFragment;
};

var renderMapPins = function (mocks) {
  var mapPinsBlock = document.querySelector('.map__pins');

  mapPinsBlock.appendChild(getPinsFragment(mocks));
};

var switchMapMode = function () {
  document.querySelector('.map').classList.toggle('map--faded');
};

var mocksData = getMocksArray();
switchMapMode();
renderMapPins(mocksData);
