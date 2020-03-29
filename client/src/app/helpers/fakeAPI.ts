import { FAQs, About, Contact, Map, EmailsList, User, SocialMediaLinks, Links } from '@models/index';

export const map: Map = {
  latlng: '(00.00, 00.00)',
};

export const socialMediaLinks: SocialMediaLinks = {
  facebook: '/',
  linkedin: '/',
  instagram: '/',
  twitter: '/',
};

export const navLinks: Links[] = [
  {
    id: '0',
    category: 'Paznokcie',
    title: 'Produkty do paznokci',
    links: [
      {
        id: '90',
        category: 'Lakiery hybrydowe',
        title: 'Lakiery do paznokci hybrydowych',
        link: '/lakiery-hybrydowe',
      },
      {
        id: '91',
        category: 'Lakiery żelowe',
        title: 'Lakiery do paznokci żelowych',
        link: '/lakiery-zelowe',
      },
      {
        id: '92',
        category: 'Zwykłe lakiery',
        title: 'Zwykłe lakiery do paznokci',
        link: '/zwykle-lakiery',
      },
    ],
  },
  {
    id: '1',
    category: 'Buty',
    title: 'Buty',
    links: [
      {
        id: '10',
        category: 'Kobiety',
        title: 'Dla kobiet',
        links: [
          {
            id: '100',
            category: 'Adidasy',
            title: 'Adidasy dla kobiet',
            link: '/adidasy-dla-kobiet',
          },
          {
            id: '101',
            category: 'Kozaki',
            title: 'Kozaki dla kobiet',
            link: '/kozaki-dla-kobiet',
          },
        ],
      },
      {
        id: '11',
        category: 'Mężczyzni',
        title: 'Dla mężczyzn',
        links: [
          {
            id: '110',
            category: 'Adidasy',
            title: 'Adidasy dla mężczyzn',
            link: '/adidasy-dla-mezczyzn',
          },
          {
            id: '111',
            category: 'Klapki',
            title: 'Klapki dla mężczyzn',
            link: '/klapki-dla-mezczyzn',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    category: 'Włosy',
    title: 'Produkty do włosów',
    links: [
      {
        id: '20',
        category: 'Odżywki',
        title: 'Odżywki do włosów',
        link: '/odzywki-do-wlosow',
      },
      {
        id: '21',
        category: 'Szampony',
        title: 'Szampony do włosów',
        link: '/szampony-do-wlosow',
      },
    ],
  },
];

export const emails: EmailsList[] = [
  {
    id: '1',
    email: 'example1@domain.com',
  },
  {
    id: '2',
    email: 'example2@domain.com',
  },
  {
    id: '3',
    email: 'example3@domain.com',
  },
  {
    id: '4',
    email: 'example4@domain.com',
  },
];

export const user: User = {
  name: 'Admin',
  username: 'admin',
  email: 'example@domain.com',
  image: '',
};

export const contact: Contact = {
  id: '0',
  email: 'kontakt@dream.pl',
  phone: '+48 123 123 123',
  nip: '1234567890',
  adress: {
    street: 'Street',
    streetNumber: '7/21',
    city: 'City',
    code: '25-100',
  },
  workHours: '08:00 - 18:30',
};

export const about: About = {
  id: '0',
  // tslint:disable-next-line: max-line-length
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit corrupti ipsam, voluptatibus est, veniam dignissimos adipisci atque eum eligendi esse, voluptatem minima reiciendis temporibus delectus perferendis id ducimus optio voluptate quam? Libero quaerat iure sunt ex qui architecto officiis velit aliquam id quas dicta itaque veritatis quos neque doloribus necessitatibus sequi aliquid, facilis ipsum! Sapiente laborum eveniet fugit illum animi eligendi odio. Nam quo voluptas consectetur dolorem enim alias, doloribus quisquam excepturi fuga consequuntur natus quis mollitia. Rem laboriosam, vero enim porro alias nam illum, similique omnis odio unde dolorem veniam? Distinctio consequatur dolor nisi maxime esse repudiandae aliquid modi! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui inventore voluptatibus repellat fugiat recusandae temporibus dolore sint vitae. Dolor consectetur molestias beatae quia ipsam quae illum, non consequatur dolores libero. Nostrum voluptas dicta nam ipsam iusto facilis alias laboriosam vitae, omnis, facere, odit maiores rem molestiae. Dolor doloribus quae voluptatem.',
};

export const faqs: FAQs[] = [
  {
    id: '1',
    category: 'zwroty',
    icon: 'fas fa-undo',
    title: 'Zwroty i reklamacje',
    questions: [
      {
        id: '11',
        title: 'Po jakim czasie mogę zwrócić zakupiony produkt',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '12',
        title: 'Reklamacja 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '13',
        title: 'Reklamacja 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '14',
        title: 'Reklamacja 4',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '15',
        title: 'Reklamacja 5',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '2',
    category: 'dostawa',
    title: 'Dostawa i wysyłka',
    icon: 'fas fa-truck',
    questions: [
      {
        id: '21',
        title: 'Dostawa 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '22',
        title: 'Dostawa 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '23',
        title: 'Dostawa 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '4',
    category: 'obsługa',
    icon: 'fas fa-headphones',
    title: 'Obsługa klienta',
    questions: [
      {
        id: '41',
        title: 'Basic 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '42',
        title: 'Basic 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '43',
        title: 'Basic 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '5',
    category: 'płatności',
    icon: 'far fa-credit-card',
    title: 'Płatności i przelewy',
    questions: [
      {
        id: '51',
        title: 'Basic 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '52',
        title: 'Basic 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '53',
        title: 'Basic 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '6',
    category: 'produkty',
    icon: 'fas fa-tshirt',
    title: 'Produkty',
    questions: [
      {
        id: '61',
        title: 'Basic 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '62',
        title: 'Basic 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '63',
        title: 'Basic 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '7',
    category: 'rabaty',
    icon: 'fas fa-percent',
    title: 'Rabaty i kupony',
    questions: [
      {
        id: '71',
        title: 'Basic 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '72',
        title: 'Basic 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '73',
        title: 'Basic 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
  {
    id: '3',
    category: 'inne',
    icon: 'fas fa-question',
    title: 'Inne pytania',
    questions: [
      {
        id: '31',
        title: 'Basic 1',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '32',
        title: 'Basic 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
      {
        id: '33',
        title: 'Basic 3',
        content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Ducimuslibero velit similique numquam placeat temporibus iure quae porroesse, quia iusto?
        Amet sunt aliquam beatae quis porro facer`,
      },
    ],
  },
];
