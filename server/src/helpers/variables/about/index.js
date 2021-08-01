const { SERVER_URL } = require('../../../config');

const aboutNotFoundMessage = 'Informacje o sklepie nie istnieją.';
const aboutNotUpdatedMessage = 'Nie udało się zaktualizować informacji o sklepie.';

const aboutMinLengthMessage = 'Informacje o sklepie muszą mieć minimum 10 znaków.';
const aboutMaxLengthMessage = 'Informacje o sklepie mogą mieć maksymalnie 5000 znaków.';

const informationMinLength = 10;
const informationMaxLength = 50000;

const about = {
  information: '',
};

const exampleAbout = {
  information: `
    <h2>O nas</h2>
    <img src='http://unsplash.it/800/400?random&gravity=center' alt='Image'/>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptas similique reprehenderit veniam non id facere qui? Molestias accusantium labore sit, blanditiis numquam pariatur adipisci aperiam vitae quaerat! Aperiam, fuga.</p>
    <ul>
      <li><a href="${SERVER_URL}" title="Przejdź do strony z API">Strona API</a></li>
    </ul>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis laboriosam officia eos eveniet asperiores ipsam ut maxime pariatur recusandae, ullam error commodi repudiandae minus voluptates voluptate illum laborum temporibus suscipit!</p>
  `,
};

module.exports = {
  about,
  exampleAbout,
  aboutNotFoundMessage,
  aboutNotUpdatedMessage,
  aboutMinLengthMessage,
  aboutMaxLengthMessage,
  informationMinLength,
  informationMaxLength,
};
