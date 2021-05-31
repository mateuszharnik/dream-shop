const {
  facebookNotCorrectMessage,
  twitterNotCorrectMessage,
  instagramNotCorrectMessage,
  linkedinNotCorrectMessage,
} = require('../../../variables/social-media');
const {
  propertyRequiredMessage,
  typeStringMessage,
} = require('../../../variables/error-messages');

// TWITTER
const twitterRequired = {
  'any.required': propertyRequiredMessage,
};

const twitterString = {
  'string.base': typeStringMessage,
};

const twitterPattern = {
  'string.pattern.base': twitterNotCorrectMessage,
};

// FACEBOOK
const facebookRequired = {
  'any.required': propertyRequiredMessage,
};

const facebookString = {
  'string.base': typeStringMessage,
};

const facebookPattern = {
  'string.pattern.base': facebookNotCorrectMessage,
};

// INSTAGRAM
const instagramRequired = {
  'any.required': propertyRequiredMessage,
};

const instagramString = {
  'string.base': typeStringMessage,
};

const instagramPattern = {
  'string.pattern.base': instagramNotCorrectMessage,
};

// LINKEDIN
const linkedinRequired = {
  'any.required': propertyRequiredMessage,
};

const linkedinString = {
  'string.base': typeStringMessage,
};

const linkedinPattern = {
  'string.pattern.base': linkedinNotCorrectMessage,
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
