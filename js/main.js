'use strict';

(function () {
  window.data.adData = window.data.getMocksArray();
  window.form.initializeElements();

  window.global.mapPinMain.addEventListener('mousedown', window.pin.onMapPinMainClick);
  window.global.mapPinMain.addEventListener('keydown', window.pin.onMapPinMainPressEnter);

  window.form.resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.form.adForm.reset();
    window.map.deactivatePage();
    window.global.mapPinMain.addEventListener('mousedown', window.pin.onMapPinMainClick);
    window.global.mapPinMain.addEventListener('keydown', window.pin.onMapPinMainPressEnter);
  });

  window.form.typeSelect.addEventListener('change', window.form.onTypeSelectChange);

  window.form.timeInSelect.addEventListener('change', function () {
    window.form.timeOutSelect.value = window.form.timeInSelect.value;
  });

  window.form.timeOutSelect.addEventListener('change', function () {
    window.form.timeInSelect.value = window.form.timeOutSelect.value;
  });

  window.form.roomsSelect.addEventListener('change', function () {
    window.form.compareRoomsWithCapacityAndSetCustomValidity();
  });

  window.form.capacitySelect.addEventListener('change', function () {
    window.form.compareRoomsWithCapacityAndSetCustomValidity();
  });
})();
