const letters = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
  ' ': '-',
};

const addCategory = (body) => {
  if (body && body.name && typeof body.name === 'string') {
    return body.name.toLowerCase().split('')
      .map((letter) => (letters[letter] ? letters[letter] : letter)).join('');
  }

  return '';
};

module.exports = { addCategory };
