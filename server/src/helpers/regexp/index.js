const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const dbIdRegExp = /^[a-f\d]{24}$/i;

const nameRegExp = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ]+$/;

const instagramRegExp = /^https?:\/\/www.instagram.com\/.+$/;

const facebookRegExp = /^https?:\/\/www.facebook.com\/.+$/;

const twitterRegExp = /^https?:\/\/www.twitter.com\/.+$/;

const linkedinRegExp = /^https?:\/\/www.linkedin.com\/.+$/;

module.exports = {
  dbIdRegExp,
  emailRegExp,
  nameRegExp,
  instagramRegExp,
  facebookRegExp,
  twitterRegExp,
  linkedinRegExp,
};
