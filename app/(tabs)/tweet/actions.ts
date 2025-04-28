"use server";

import { TWEET_PAGE_SIZE } from "@/lib/consts";
import db from "@/lib/db";

export async function getMoreTweets(page: number) {
	const tweets = db.tweet.findMany({
		orderBy: {
			create_at: "asc",
		},
		include: {
			Like: {
				select: {
					id: true,
					userId: true,
				},
			},
		},
		skip: page * TWEET_PAGE_SIZE,
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
