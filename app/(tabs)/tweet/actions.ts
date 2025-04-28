"use server";

import { TWEET_PAGE_SIZE } from "@/lib/consts";
import db from "@/lib/db";

export async function getMoreTweets(page: number) {
	const tweets = db.tweet.findMany({
		orderBy: {
			create_at: "desc",
		},
		include: {
			Like: {
				select: {
					id: true,
					userId: true,
				},
			},
		},
		skip: (page - 1) * TWEET_PAGE_SIZE,
		take: TWEET_PAGE_SIZE,
	});
	return tweets;
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

export async function getTotalCount() {
	const count = await db.tweet.count();
	return count;
}
