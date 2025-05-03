import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface ISessionContent {
  id?: number;
  username?: string;
  avatar?: number;
}

export default function getSession() {
  return getIronSession<ISessionContent>(cookies(), {
    cookieName: 'karrot-infomation',
    password: process.env.COOKIE_PASSWORD ?? '',
  });
}
