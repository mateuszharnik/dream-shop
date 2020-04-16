const twitterRequired = {
  prop: 'twitter',
  type: 'any.required',
  message: 'Link do konta na Twitter jest wymagany',
  status: 400,
};

const twitterString = {
  prop: 'twitter',
  type: 'string.base',
  message: 'Link do konta na Twitter musi być typu tekstowego',
  status: 400,
};

const twitterPattern = {
  prop: 'twitter',
  type: 'string.pattern.base',
  message: 'Link do konta na Twitter jest niepoprawny',
  status: 400,
};

const facebookRequired = {
  prop: 'facebook',
  type: 'any.required',
  message: 'Link do konta na Facebook jest wymagany',
  status: 400,
};

const facebookString = {
  prop: 'facebook',
  type: 'string.base',
  message: 'Link do konta na Facebook musi być typu tekstowego',
  status: 400,
};

const facebookPattern = {
  prop: 'facebook',
  type: 'string.pattern.base',
  message: 'Link do konta na Facebook jest niepoprawny',
  status: 400,
};

const instagramRequired = {
  prop: 'instagram',
  type: 'any.required',
  message: 'Link do konta na Instagram jest wymagany',
  status: 400,
};

const instagramString = {
  prop: 'instagram',
  type: 'string.base',
  message: 'Link do konta na Instagram musi być typu tekstowego',
  status: 400,
};

const instagramPattern = {
  prop: 'instagram',
  type: 'string.pattern.base',
  message: 'Link do konta na Instagram jest niepoprawny',
  status: 400,
};

const linkedinRequired = {
  prop: 'linkedin',
  type: 'any.required',
  message: 'Link do konta na LinkedIn jest wymagany',
  status: 400,
};

const linkedinString = {
  prop: 'linkedin',
  type: 'string.base',
  message: 'Link do konta na LinkedIn musi być typu tekstowego',
  status: 400,
};

const linkedinPattern = {
  prop: 'linkedin',
  type: 'string.pattern.base',
  message: 'Link do konta na LinkedIn jest niepoprawny',
  status: 400,
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
};
