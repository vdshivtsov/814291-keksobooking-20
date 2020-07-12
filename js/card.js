'use strict';

(function () {
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
  var mapFiltersContainer = window.global.mapBlock.querySelector('.map__filters-container');

  var derenderCard = function () {
    if (mapCard) {
      mapCard.remove();
      document.removeEventListener('keydown', onMapCardPressEscape);
    }
  };

  var renderCard = function (card) {
    mapFiltersContainer.insertAdjacentElement('beforebegin', card);
    document.addEventListener('keydown', onMapCardPressEscape);
    mapCard = window.global.mapBlock.querySelector('.map__card');
  };

  var getCard = function (datum) {
    var card = cardTemplate.cloneNode(true);

    window.data.checkDataAndCreateElement(card.querySelector('.popup__title'), datum.offer.title, false, datum.offer.title);
    window.data.checkDataAndCreateElement(card.querySelector('.popup__text--address'), datum.offer.address, false, datum.offer.address);
    window.data.checkDataAndCreateElement(card.querySelector('.popup__text--price'), datum.offer.price, false, datum.offer.price + '₽/ночь');
    window.data.checkDataAndCreateElement(card.querySelector('.popup__type'), datum.offer.type, false, window.data.typesOfFlatDictionary[datum.offer.type]);
    window.data.checkDataAndCreateElement(card.querySelector('.popup__text--capacity'), datum.offer.rooms, false, datum.offer.rooms + ' комнаты для ' + datum.offer.guests + ' гостей');
    window.data.checkDataAndCreateElement(card.querySelector('.popup__text--time'), [datum.offer.checkin, datum.offer.checkout], false, 'Заезд после ' + datum.offer.checkin + ', выезд до ' + datum.offer.checkout);
    window.data.checkDataAndCreateElement(card.querySelector('.popup__description'), datum.offer.description, false, datum.offer.description);
    window.data.checkDataAndChangeAttribute(card.querySelector('.popup__avatar'), datum.author.avatar, 'src');
    window.data.checkDataAndRemoveElementsByArrayAndClassMap(card.querySelector('.popup__features'), card.querySelectorAll('.popup__feature'), datum.offer.features, mapFromFeatureToClass);
    window.data.checkDataArrayAndCreateElementsFromChild(card.querySelector('.popup__photos'), datum.offer.photos, 'src');

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

  window.card = {
    getCard: getCard,
    renderCard: renderCard,
    derenderCard: derenderCard
  };
})();

