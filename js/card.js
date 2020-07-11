'use strict';

var mapFromFeatureToClass = {
  'wifi': 'popup__feature--wifi',
  'dishwasher': 'popup__feature--dishwasher',
  'parking': 'popup__feature--parking',
  'washer': 'popup__feature--washer',
  'elevator': 'popup__feature--elevator',
  'conditioner': 'popup__feature--conditioner'
};

var mapCard;
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var mapFiltersContainer = mapBlock.querySelector('.map__filters-container');

var derenderCard = function () {
  if (mapCard) {
    mapCard.remove();
    document.removeEventListener('keydown', onMapCardPressEscape);
  }
};

var renderCard = function (card) {
  mapFiltersContainer.insertAdjacentElement('beforebegin', card);
  document.addEventListener('keydown', onMapCardPressEscape);
  mapCard = mapBlock.querySelector('.map__card');
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

  card.querySelector('.popup__close').addEventListener('click', function () {
    derenderCard();
  });

  return card;
};

var onMapCardPressEscape = function (evt) {
  if (evt.key === 'Escape') {
    derenderCard();
  }
};
