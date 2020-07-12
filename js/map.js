'use strict';

(function () {
  var activatePage = function () {
    window.global.mapBlock.classList.remove('map--faded');
    window.pin.renderMapPins();
    window.form.unblockAdFormElements();
    window.form.unblockMapFiltersElements();
    window.form.setAdressInputValue();
  };

  var deactivatePage = function () {
    window.global.mapBlock.classList.add('map--faded');
    window.pin.derenderMapPins();
    window.form.initializeElements();
    window.form.setAdressInputValue();
    window.card.derenderCard();
  };

  window.map = {
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };
})();
