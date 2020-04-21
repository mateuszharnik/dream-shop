const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const dbIdRegExp = /^[a-f\d]{24}$/i;

const nameRegExp = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ]+[ ]?[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ]*$/;

const instagramRegExp = /^https?:\/\/www.instagram.com\/.+$/;

const facebookRegExp = /^https?:\/\/www.facebook.com\/.+$/;

const twitterRegExp = /^https?:\/\/www.twitter.com\/.+$/;

const linkedinRegExp = /^https?:\/\/www.linkedin.com\/.+$/;

const phoneRegExp = /^(\+[1-9]{1}([0-9]{1,})?\s)?[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/;

const nipRegExp = /^[0-9]{10}$/;

const streetNumberRegExp = /^([1-9]([0-9]{1,})?)(\/[1-9]([0-9]{1,})?)?$/;

const zipCodeRegExp = /^[0-9]{2}-[0-9]{3}$/;

const mapRegExp = /^\(-?[0-9]+\.[0-9]+,\s-?[0-9]+\.[0-9]+\)$/;

const workingHoursRegExp = /^([0-1][0-9]|[2][0-4]):[0-5][0-9]\s-\s([0-1][0-9]|[2][0-4]):[0-5][0-9]$/;

module.exports = {
  dbIdRegExp,
  emailRegExp,
  nameRegExp,
  instagramRegExp,
  facebookRegExp,
  twitterRegExp,
  linkedinRegExp,
  phoneRegExp,
  nipRegExp,
  streetNumberRegExp,
  workingHoursRegExp,
  zipCodeRegExp,
  mapRegExp,
};
