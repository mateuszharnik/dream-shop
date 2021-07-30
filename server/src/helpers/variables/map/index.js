const mapNotFoundMessage = 'Informacje o mapie nie istnieją.';
const mapNotUpdatedMessage = 'Nie udało się zaktualizować koordynatów mapy.';

const mapLatLngReqiuredMessage = 'Musisz podać długość i szerokość geograficzną.';
const mapLatLngNotCorrectMessage = 'Długość i szerokość geograficzna jest nieprawidłowa.';

const map = {
  latlng: '(00.00, 00.00)',
};

const exampleMap = {
  latlng: '(57.85629709249028, -96.10208126949148)',
};

module.exports = {
  mapNotFoundMessage,
  mapNotUpdatedMessage,
  mapLatLngReqiuredMessage,
  mapLatLngNotCorrectMessage,
  map,
  exampleMap,
};
