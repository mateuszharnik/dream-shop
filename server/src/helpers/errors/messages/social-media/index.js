const twitterRequired = {
  'any.required': 'Właściwość "twitter" jest wymagana',
};

const twitterString = {
  'string.base': 'Właściwość "twitter" musi być typu "string"',
};

const twitterPattern = {
  'string.pattern.base': 'Link do konta na Twitter jest nieprawidłowy',
};

const facebookRequired = {
  'any.required': 'Właściwość "facebook" jest wymagana',
};

const facebookString = {
  'string.base': 'Właściwość "facebook" musi być typu "string"',
};

const facebookPattern = {
  'string.pattern.base': 'Link do konta na Facebook jest nieprawidłowy',
};

const instagramRequired = {
  'any.required': 'Właściwość "instagram" jest wymagana',
};

const instagramString = {
  'string.base': 'Właściwość "instagram" musi być typu "string"',
};

const instagramPattern = {
  'string.pattern.base': 'Link do konta na Instagram jest nieprawidłowy',
};

const linkedinRequired = {
  'any.required': 'Właściwość "linkedin" jest wymagana',
};

const linkedinString = {
  'string.base': 'Właściwość "linkedin" musi być typu "string"',
};

const linkedinPattern = {
  'string.pattern.base': 'Link do konta na LinkedIn jest nieprawidłowy',
};

const facebookMessages = {
  ...facebookRequired,
  ...facebookString,
  ...facebookPattern,
};

const twitterMessages = {
  ...twitterRequired,
  ...twitterString,
  ...twitterPattern,
};

const instagramMessages = {
  ...instagramRequired,
  ...instagramString,
  ...instagramPattern,
};

const linkedinMessages = {
  ...linkedinRequired,
  ...linkedinString,
  ...linkedinPattern,
};

module.exports = {
  twitterRequired,
  twitterString,
  twitterPattern,
  facebookRequired,
  facebookString,
  facebookPattern,
  linkedinRequired,
  linkedinString,
  linkedinPattern,
  instagramRequired,
  instagramString,
  instagramPattern,
  linkedinMessages,
  instagramMessages,
  twitterMessages,
  facebookMessages,
};
