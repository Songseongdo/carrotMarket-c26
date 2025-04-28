import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import getSession from "@/lib/session";

async function getTweetInfo() {
	const tweets = db.tweet.findMany({
		orderBy: {
			create_at: "desc",
		},
	});
	return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getTweetInfo>;

export default async function Tweet() {
	const initialTweets = await getTweetInfo();

	return (
		<div>
			<TweetList initialTweets={initialTweets} />
		</div>
	);
}
