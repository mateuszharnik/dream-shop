const {
  PROPERTY_REQUIRED,
  TYPE_STRING,
} = require('../../../constants/error-messages');
const {
  FACEBOOK_NOT_CORRECT,
  TWITTER_NOT_CORRECT,
  INSTAGRAM_NOT_CORRECT,
  LINKEDIN_NOT_CORRECT,
} = require('../../../constants/social-media');

// TWITTER
const twitterRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const twitterString = {
  'string.base': TYPE_STRING,
};

const twitterPattern = {
  'string.pattern.base': TWITTER_NOT_CORRECT,
};

// FACEBOOK
const facebookRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const facebookString = {
  'string.base': TYPE_STRING,
};

const facebookPattern = {
  'string.pattern.base': FACEBOOK_NOT_CORRECT,
};

// INSTAGRAM
const instagramRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const instagramString = {
  'string.base': TYPE_STRING,
};

const instagramPattern = {
  'string.pattern.base': INSTAGRAM_NOT_CORRECT,
};

// LINKEDIN
const linkedinRequired = {
  'any.required': PROPERTY_REQUIRED,
};

const linkedinString = {
  'string.base': TYPE_STRING,
};

const linkedinPattern = {
  'string.pattern.base': LINKEDIN_NOT_CORRECT,
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
