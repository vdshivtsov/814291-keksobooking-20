'use strict';

var amountOfMocks = 8;
var mapPinsBlock = document.querySelector('.map__pins');

var photosArray = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var typesOfFlatArray = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var checkinTimesArray = [
  '12:00',
  '13:00',
  '14:00'
];

var checkoutTimesArray = [
  '12:00',
  '13:00',
  '14:00'
];

var featuresArray = [
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

var getRandomLengthArray = function (array) {
  var resultArray = array.slice(0);
  var amount = getRandomIntInclusive(0, resultArray.length);

  for (var i = 0; i < amount; i++) {
    resultArray.splice(getRandomIntInclusive(0, resultArray.length - 1), 1);
  }

  return resultArray;
};

var getMocksArray = function () {
  var mocksArray = [];
  var mock = [];
  var locationX;
  var locationY;

  for (var i = 0; i < amountOfMocks; i++) {
    locationX = getRandomIntInclusive(0, mapPinsBlock.clientWidth);
    locationY = getRandomIntInclusive(130, 630);
    mock = {
      'author': {
        'avatar': avatarsArray.splice(getRandomIntInclusive(0, avatarsArray.length - 1), 1)[0]
      },
      'offer': {
        'title': titlesArray.splice(getRandomIntInclusive(0, titlesArray.length - 1), 1)[0],
        'address': locationX + ', ' + locationY,
        'price': getRandomIntInclusive(10000, 500000),
        'type': typesOfFlatArray[getRandomIntInclusive(0, typesOfFlatArray.length - 1)],
        'rooms': getRandomIntInclusive(1, 10),
        'guests': getRandomIntInclusive(2, 30),
        'checkin': checkinTimesArray[getRandomIntInclusive(0, checkinTimesArray.length - 1)],
        'checkout': checkoutTimesArray[getRandomIntInclusive(0, checkoutTimesArray.length - 1)],
        'features': getRandomLengthArray(featuresArray),
        'description': descriptionsArray.splice(getRandomIntInclusive(0, descriptionsArray.length - 1), 1)[0],
        'photos': getRandomLengthArray(photosArray)
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

var getPinElement = function (mock, template) {
  var pinElement = template.cloneNode(true);
  var pinElementImage = pinElement.querySelector('img');

  pinElement.style = 'left: ' + (mock.location.x - 32.5) + 'px; top: ' + (mock.location.y - 54.5) + 'px;';
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
  mapPinsBlock.appendChild(getPinsFragment(mocks));
};

var switchMapMode = function () {
  document.querySelector('.map').classList.toggle('map--faded');
};

var mocksData = getMocksArray();
switchMapMode();
renderMapPins(mocksData);
