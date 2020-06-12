const mapRequired = {
  'any.required': 'Właściwość "latlng" jest wymagana.',
};

const mapNotEmpty = {
  'string.empty': 'Musisz podać długość i szerokość geograficzną.',
};

const mapString = {
  'string.base': 'Właściwość "latlng" musi być typu "string".',
};

const mapPattern = {
  'string.pattern.base': 'Długość i szerokość geograficzna jest nieprawidłowa.',
};

const mapMessages = {
  ...mapRequired,
  ...mapNotEmpty,
  ...mapString,
  ...mapPattern,
};

module.exports = {
  mapRequired,
  mapNotEmpty,
  mapString,
  mapPattern,
  mapMessages,
};
