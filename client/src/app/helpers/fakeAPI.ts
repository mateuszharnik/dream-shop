import { Links, Product, User } from '@models/index';

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
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: '91',
        category: 'Lakiery żelowe',
        title: 'Lakiery do paznokci żelowych',
        link: '/lakiery-zelowe',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: '92',
        category: 'Zwykłe lakiery',
        title: 'Zwykłe lakiery do paznokci',
        link: '/zwykle-lakiery',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
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
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
          {
            id: '101',
            category: 'Kozaki',
            title: 'Kozaki dla kobiet',
            link: '/kozaki-dla-kobiet',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
        ],
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
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
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
          {
            id: '111',
            category: 'Klapki',
            title: 'Klapki dla mężczyzn',
            link: '/klapki-dla-mezczyzn',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          },
        ],
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
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
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: '21',
        category: 'Szampony',
        title: 'Szampony do włosów',
        link: '/szampony-do-wlosow',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
];

export const user: User = {
  _id: '1',
  name: 'Admin',
  username: 'admin',
  email: 'example@domain.com',
  image: '',
  roles: ['user'],
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

export const product: Product = {
  _id: '1',
  name: 'Buty',
  img: '',
  description: 'Opis',
  fullDescription: '',
  category: 'buty',
  price: '100 zł',
  quantity: 4,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

export const products: Product[] = [
  {
    _id: '1',
    name: 'Buty',
    img: '',
    description: 'Opis',
    fullDescription: '',
    category: 'buty',
    price: '100 zł',
    quantity: 4,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    _id: '2',
    name: 'Koszulka',
    img: '',
    description: 'Opis',
    fullDescription: '',
    category: 'koszulki',
    price: '15 zł',
    quantity: 10,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
];
