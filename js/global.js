'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mapPinsBlock = mapBlock.querySelector('.map__pins');
  var mapPinMain = mapPinsBlock.querySelector('.map__pin--main');
  var positionLimits = {
    xMin: 0,
    xMax: mapPinsBlock.clientWidth,
    yMin: 130,
    yMax: 630
  };

  window.global = {
    mapBlock: mapBlock,
    mapPinsBlock: mapPinsBlock,
    mapPinMain: mapPinMain,
    positionLimits: positionLimits
  };
})();

