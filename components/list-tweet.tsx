import { formatToTimeAgo } from "@/util";
import Link from "next/link";

interface IListTweetProps {
	id: number;
	tweet: string;
	create_at: Date;
	userId: number | null;
}

export default function ListTweet({ id, tweet, create_at, userId }: IListTweetProps) {
	return (
		<div className="border border-neutral-600 p-1">
			<Link href={`/tweets/${id}`} className="flex gap-5">
				<div>{id}</div>
				<div>{tweet}</div>
				<div>{formatToTimeAgo(create_at)}</div>
			</Link>
		</div>
	);
}
