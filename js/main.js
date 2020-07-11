'use strict';

adData = getMocksArray();
initializeElements();

mapPinMain.addEventListener('mousedown', onMapPinMainClick);
mapPinMain.addEventListener('keydown', onMapPinMainPressEnter);

resetButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  adForm.reset();
  deactivatePage();
  mapPinMain.addEventListener('mousedown', onMapPinMainClick);
  mapPinMain.addEventListener('keydown', onMapPinMainPressEnter);
});

typeSelect.addEventListener('change', onTypeSelectChange);

timeInSelect.addEventListener('change', function () {
  timeOutSelect.value = timeInSelect.value;
});

timeOutSelect.addEventListener('change', function () {
  timeInSelect.value = timeOutSelect.value;
});

roomsSelect.addEventListener('change', function () {
  compareRoomsWithCapacityAndSetCustomValidity();
});

capacitySelect.addEventListener('change', function () {
  compareRoomsWithCapacityAndSetCustomValidity();
});


