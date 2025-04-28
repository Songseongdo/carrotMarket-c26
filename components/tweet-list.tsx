"use client";

import { InitialTweets } from "@/app/(tabs)/tweet/page";
import { useEffect, useRef, useState } from "react";
import ListTweet from "./list-tweet";
import Pagination from "./pagination";
import { getMoreTweets, getTotalCount } from "@/app/(tabs)/tweet/actions";
import { TWEET_PAGE_SIZE } from "@/lib/consts";

interface ITweetListProps {
	initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: ITweetListProps) {
	const [Tweets, setTweets] = useState(initialTweets);
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		const getCount = async () => {
			const count = await getTotalCount();
			setTotalCount(count);
		};

		getCount();
	}, []);

	const fetchMoreTweets = async (page: number) => {
		const newTweets = await getMoreTweets(page);
		setTweets(newTweets);
	};

	const onPageChange = (page: number) => {
		fetchMoreTweets(page);
		setPage(page);
	};

	return (
		<div className="p-5 flex flex-col">
			{Tweets.map((tweet) => (
				<ListTweet key={tweet.id} {...tweet} />
			))}
			<Pagination
				totalCount={totalCount}
				pageSize={TWEET_PAGE_SIZE}
				onPageChange={(page) => onPageChange(page)}
			/>
		</div>
	);
}
