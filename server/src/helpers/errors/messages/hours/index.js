// WORK HOURS
const workingHoursRequired = {
  'any.required': 'Właściwość "working_hours" jest wymagana',
};

const workingHoursString = {
  'string.base': 'Właściwość "working_hours" musi być typu "string"',
};

const workingHoursPattern = {
  'string.pattern.base': 'Godziny pracy są nieprawidłowe',
};

const workingHoursMessages = {
  ...workingHoursRequired,
  ...workingHoursString,
  ...workingHoursPattern,
};

module.exports = {
  workingHoursRequired,
  workingHoursString,
  workingHoursPattern,
  workingHoursMessages,
};
