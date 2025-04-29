import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import getSession from "@/lib/session";

export async function getTweetInfo(id: number) {
	new Promise((resolve) => setTimeout(() => resolve, 5000));

	const tweet = db.tweet.findUnique({
		where: {
			id,
		},
		include: {
			Like: true,
		},
	});
	return tweet;
}

export type TweetType = Prisma.PromiseReturnType<typeof getTweetInfo>;

export async function getIsOwner(userId: number) {
	const session = await getSession();
	if (session.id) {
		return session.id === userId;
	}

	return false;
}

export async function getTweetUserInfo(userId: number) {
	if (!userId) {
		return null;
	}

	return db.user.findUnique({
		where: {
			id: userId,
		},
	});
}
