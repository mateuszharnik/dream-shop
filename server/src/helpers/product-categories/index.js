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

const addCategory = (category) => category.toLowerCase().split('').map((letter) => (letters[letter] ? letters[letter] : letter)).join('');

module.exports = { addCategory };
