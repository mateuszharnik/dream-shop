const regulationsNotFoundMessage = 'Regulaminy nie istnieją.';
const regulationNotFoundMessage = 'Regulamin nie istnieje.';
const regulationNotUpdatedMessage = 'Nie udało się zaktualizować regulaminu.';
const regulationNameIsNotAllowedMessage = 'Nazwa regulaminu jest niedozwolona.';

const regulationNameRequiredMessage = 'Musisz podać nazwę regulaminu.';
const regulationNameMinLengthMessage = 'Nazwa regulaminu musi mieć minimum 3 znaki.';
const regulationNameMaxLengthMessage = 'Nazwa regulaminu może mieć maksymalnie 300 znaków.';

const regulationNameMinLength = 3;
const regulationNameMaxLength = 300;

const contentRequiredMessage = 'Musisz podać treść regulaminu.';
const contentMinLengthMessage = 'Regulamin musi mieć minimum 3 znaki.';
const contentMaxLengthMessage = 'Regulamin może mieć maksymalnie 50000 znaków.';

const contentMinLength = 3;
const contentMaxLength = 50000;

const defaultNewsletterRegulationsName = 'newsletter';
const defaultNewsletterRegulationsContent = 'Regulamin Newslettera.';

const defaultContactRegulationsName = 'kontakt';
const defaultContactRegulationsContent = 'Regulamin Formularza.';

const content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, qui facilis! Beatae nihil eligendi nam cumque praesentium repellat possimus dignissimos fugit cupiditate cum obcaecati nisi, magni mollitia harum necessitatibus officia provident quaerat minima blanditiis sint rem sequi architecto repellendus neque? Sint sed minus necessitatibus iste distinctio harum deserunt reprehenderit, perferendis, nesciunt ab adipisci dolorum quia debitis fugit voluptate itaque corporis at. Aspernatur earum reiciendis similique, sequi ipsa explicabo asperiores minus! Facilis veniam repellendus excepturi harum quidem minima itaque a aut. Consectetur provident adipisci debitis, numquam modi autem dolor commodi mollitia quibusdam, voluptatibus libero inventore dolorum necessitatibus magnam nostrum beatae. Quidem quo rerum reprehenderit nesciunt, numquam non illo repellat eius cumque, aliquam animi tempore veritatis ullam eaque id cum iure impedit magni perspiciatis ratione distinctio pariatur alias tempora? Quasi fugiat placeat maxime, voluptates, odio blanditiis veritatis eaque hic laudantium doloremque, harum vel. Quis dolores explicabo voluptatem ea quo cumque dicta ut expedita, nihil eaque iste, repellat nulla culpa nesciunt iure reiciendis ducimus. Perferendis optio, doloremque perspiciatis commodi reprehenderit aliquam. Labore adipisci esse, amet odio ipsum recusandae, quibusdam veniam architecto eaque, eligendi fugit quos itaque nam quis facilis quae debitis asperiores. Aspernatur, qui? A iste, temporibus doloremque reiciendis nesciunt non illo error esse aliquam voluptates quam molestiae voluptatem ex provident odio deleniti blanditiis voluptatum tempore saepe tenetur commodi assumenda sapiente. Ipsum, pariatur vitae aspernatur maxime quaerat optio. Temporibus, commodi repellat eum similique autem voluptatibus minus nam ullam totam corrupti vitae cupiditate necessitatibus ducimus quo enim iste ratione sint obcaecati tempore delectus doloribus? At ad aliquid voluptates voluptatem in molestias amet dolorem omnis quibusdam nemo, exercitationem repellat asperiores repudiandae obcaecati accusamus architecto a voluptatum accusantium suscipit. Fugit nam perferendis cupiditate porro esse officiis magnam vitae odio quis quasi! Quod eaque, obcaecati illum ab soluta omnis ducimus vel vitae earum reprehenderit saepe ex tempora.';

const regulations = [
  {
    name: defaultNewsletterRegulationsName,
    content: defaultNewsletterRegulationsContent,
  },
  {
    name: defaultContactRegulationsName,
    content: defaultContactRegulationsContent,
  },
];

const exampleRegulations = [
  {
    name: defaultNewsletterRegulationsName,
    content,
  },
  {
    name: defaultContactRegulationsName,
    content,
  },
];

module.exports = {
  regulations,
  exampleRegulations,
  regulationsNotFoundMessage,
  regulationNotFoundMessage,
  regulationNotUpdatedMessage,
  regulationNameIsNotAllowedMessage,
  regulationNameRequiredMessage,
  regulationNameMinLengthMessage,
  regulationNameMaxLengthMessage,
  regulationNameMinLength,
  regulationNameMaxLength,
  contentRequiredMessage,
  contentMinLengthMessage,
  contentMaxLengthMessage,
  contentMinLength,
  contentMaxLength,
  defaultNewsletterRegulationsName,
  defaultNewsletterRegulationsContent,
  defaultContactRegulationsName,
  defaultContactRegulationsContent,
};
