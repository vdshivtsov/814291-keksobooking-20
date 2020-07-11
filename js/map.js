'use strict';

var adData;

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
