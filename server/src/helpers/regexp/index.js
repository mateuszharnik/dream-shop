const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const usernameRegExp = /^([^@]+|(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;

const dbIdRegExp = /^[a-f\d]{24}$/i;

const avatarRegExp = /^https?:\/\/localhost:3000\/uploads\/avatars\/\d+\.(png|jpeg|jpg)$/;

const thumbnailRegExp = /^https?:\/\/localhost:3000\/uploads\/products\/\d+\.(png|jpeg|jpg)$/;

const nameRegExp = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ]+[ ]?[a-zA-ZąĄćĆęĘłŁńŃóÓśŚźŹżŻ]*$/;

const instagramRegExp = /^https?:\/\/(www.)?instagram.com\/.*$/;

const facebookRegExp = /^https?:\/\/(www.)?facebook.com\/.*$/;

const twitterRegExp = /^https?:\/\/(www.)?twitter.com\/.*$/;

const linkedinRegExp = /^https?:\/\/(www.)?linkedin.com\/.*$/;

const phoneRegExp = /^[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/;

const nipRegExp = /^[0-9]{10}$/;

const streetNumberRegExp = /^([1-9]([0-9]{1,})?)([a-zA-Z])?(\/[1-9]([0-9]{1,})?)?$/;

const zipCodeRegExp = /^[0-9]{2}-[0-9]{3}$/;

const mapRegExp = /^\(-?[0-9]+\.[0-9]+,\s-?[0-9]+\.[0-9]+\)$/;

const workingHoursRegExp = /^([0-1][0-9]|[2][0-4]):[0-5][0-9]\s-\s([0-1][0-9]|[2][0-4]):[0-5][0-9]$/;

const avatarPathRegExp = /^uploads\\avatars\\\d+\.(png|jpg|jpeg)$/;

const thumbnailPathRegExp = /^uploads\\products\\\d+\.(png|jpg|jpeg)$/;

const productCategoryRegExp = /^([a-zA-Z0-9]+-?)*[a-zA-Z0-9]+$/;

const productCategoryNameRegExp = /^([a-zA-Z0-9ąĄćĆęĘłŁńŃóÓśŚźŹżŻ]+[ ]?)*[a-zA-Z0-9ąĄćĆęĘłŁńŃóÓśŚźŹżŻ]+$/;

const productNameRegExp = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\-, .%@$!&()+=?/]+$/;

const mimetypeRegExp = /^image\/(jpeg|jpg|png)$/;

const faqTitleRegExp = /^[a-zA-ZąĄćĆęĘłŁńŃóÓśŚżŻźŹ0-9\-, .%@$!&()+=?/]+$/;

const productPriceRegExp = /^(0|[1-9][0-9]{0,8}),[0-9]{2} zł$/;

const productCategoriesRegExp = /^(bestsellery|nowosci)$/;

module.exports = {
  faqTitleRegExp,
  productPriceRegExp,
  dbIdRegExp,
  emailRegExp,
  nameRegExp,
  instagramRegExp,
  facebookRegExp,
  twitterRegExp,
  linkedinRegExp,
  phoneRegExp,
  nipRegExp,
  thumbnailRegExp,
  productNameRegExp,
  streetNumberRegExp,
  workingHoursRegExp,
  zipCodeRegExp,
  mapRegExp,
  avatarRegExp,
  avatarPathRegExp,
  thumbnailPathRegExp,
  mimetypeRegExp,
  productCategoryRegExp,
  productCategoryNameRegExp,
  usernameRegExp,
  productCategoriesRegExp,
};
