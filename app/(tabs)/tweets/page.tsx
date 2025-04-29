import TweetList from "@/components/tweet-list";
import { TWEET_PAGE_SIZE } from "@/lib/consts";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";

async function getTweetInfo() {
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
		take: TWEET_PAGE_SIZE,
	});
	return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getTweetInfo>;

export default async function Tweets() {
	const initialTweets = await getTweetInfo();

	return (
		<div className="w-[70%]">
			<TweetList initialTweets={initialTweets} />
		</div>
	);
}
