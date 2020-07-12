'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mapPinsBlock = mapBlock.querySelector('.map__pins');
  var mapPinMain = mapPinsBlock.querySelector('.map__pin--main');

  window.global = {
    mapBlock: mapBlock,
    mapPinsBlock: mapPinsBlock,
    mapPinMain: mapPinMain
  };
})();

