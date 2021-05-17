// tslint:disable: max-line-length

export const usernameRegExp =
  /^([^@]+|(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;

export const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const facebookRegExp = /^https?:\/\/(www.)?facebook.com\/.+$/;

export const twitterRegExp = /^https?:\/\/(www.)?twitter.com\/.+$/;

export const instagramRegExp = /^https?:\/\/(www.)?instagram.com\/.+$/;

export const linkedinRegExp = /^https?:\/\/(www.)?linkedin.com\/.+$/;

export const phoneRegExp = /^[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/;

export const nipRegExp = /^[0-9]{10}$/;

export const streetNumberRegExp =
  /^([1-9]([0-9]{1,})?)([a-zA-Z])?(\/[1-9]([0-9]{1,})?)?$/;

export const zipCodeRegExp = /^[0-9]{2}-[0-9]{3}$/;

export const mapRegExp = /^\(-?[0-9]+\.[0-9]+,\s-?[0-9]+\.[0-9]+\)$/;

export const workingHoursRegExp =
  /^([0-1][0-9]|[2][0-4]):[0-5][0-9]\s-\s([0-1][0-9]|[2][0-4]):[0-5][0-9]$/;
