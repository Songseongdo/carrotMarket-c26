"use client";

import { InitialTweets } from "@/app/(tabs)/tweet/page";
import { useState } from "react";
import ListTweet from "./list-tweet";

interface ITweetListProps {
	initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: ITweetListProps) {
	const [Tweets, setTweets] = useState(initialTweets);

	return (
		<div>
			{Tweets.map((tweet) => (
				<ListTweet key={tweet.id} {...tweet} />
			))}
		</div>
	);
}
