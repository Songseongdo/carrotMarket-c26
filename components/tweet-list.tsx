"use client";

import { InitialTweets } from "@/app/(tabs)/tweet/page";
import { useEffect, useRef, useState } from "react";
import ListTweet from "./list-tweet";
import { getMoreTweets } from "@/app/(tabs)/tweet/actions";

interface ITweetListProps {
	initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: ITweetListProps) {
	const [Tweets, setTweets] = useState(initialTweets);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [isLastPage, setIsLastPage] = useState(false);
	const trigger = useRef<HTMLSpanElement>(null);
	const observer = useRef<IntersectionObserver | null>(null);

	const fetchMoreTweets = async () => {
		setIsLoading(true);
		const newTweets = await getMoreTweets(page + 1);

		if (newTweets.length !== 0) {
			setPage((prev) => prev + 1);
			setTweets((prev) => [
				...prev,
				...newTweets.map((tweet) => ({
					...tweet,
					Like: tweet.Like || [],
				})),
			]);
		} else {
			setIsLastPage(true);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(
			async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
				const element = entries[0];
				if (element.isIntersecting && trigger.current && !isLoading && !isLastPage) {
					fetchMoreTweets();
				}
			}
		);

		if (trigger.current) {
			observer.current.observe(trigger.current);
		}

		return () => {
			observer.current?.disconnect();
		};
	}, [page, isLoading, isLastPage]);

	return (
		<div className="p-5 flex flex-col">
			{Tweets.map((tweet) => (
				<ListTweet key={tweet.id} {...tweet} />
			))}
			{!isLastPage ? (
				<span
					ref={trigger}
					className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
				>
					{isLoading ? "로딩 중" : "Load more"}
				</span>
			) : null}
		</div>
	);
}
