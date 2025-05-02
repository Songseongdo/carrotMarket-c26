'use server';

import { redirect } from 'next/navigation';
import getSession from '../lib/session';
import db from '@/lib/db';
import { unstable_cache as nextCatch } from 'next/cache';
import { Prisma } from '@/lib/generated/prisma';

export async function doLogin(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();

  return redirect('/profile');
}

export async function getTweetUserInfo(userId: number) {
  const user = db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });
  return user;
}

export async function getTweetsTotalCount() {
  const count = await db.tweet.count();
  return count;
}

export async function getSessionUserInfo() {
  const session = await getSession();
  const user = db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      username: true,
      avatar: true,
    },
  });

  return user;
}
export type UserInfoType = Prisma.PromiseReturnType<typeof getSessionUserInfo>;

// 이미지 업로드
export async function uploadToSignedUrl(signedUrl: string, file: File) {
  try {
    const res = await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    return res.ok;
  } catch (err) {
    console.error('업로드 에러', err);
    return false;
  }
}
