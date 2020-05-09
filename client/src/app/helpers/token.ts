import { User } from '@models/index';

export const decodeToken = (token: string): User => {
  if (!token) {
    return null;
  }

  const data: string = token
    .split('.')[1]
    .replace('-', '+')
    .replace('_', '/');

  return JSON.parse(window.atob(data));
};

export const getToken = () => JSON.parse(localStorage.getItem('token'));

export const removeToken = () => localStorage.removeItem('token');

export const getFullToken = () =>
  localStorage.getItem('token')
    ? `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    : null;

export const setToken = (token: string) =>
  localStorage.setItem('token', JSON.stringify(token));
