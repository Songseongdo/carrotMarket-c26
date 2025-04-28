import { formatToTimeAgo } from "@/util";
import Link from "next/link";
import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getTweetUserInfo } from "@/app/(tabs)/tweet/actions";

interface ILike {
	id: number;
	userId: number;
}
interface IListTweetProps {
	id: number;
	tweet: string;
	create_at: Date;
	userId: number | null;
	Like: ILike[];
}

interface IUserInfo {
	username: string;
}

export default function ListTweet({ id, tweet, create_at, userId, Like }: IListTweetProps) {
	const [user, setUser] = useState<IUserInfo | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const userInfo = await getTweetUserInfo(userId || 0);
			if (userInfo) {
				setUser(userInfo);
			}
		};
		fetchData();
	}, [userId]);
	return (
		<div className="border mt-[-1px] border-neutral-600 p-2">
			<div className="flex flex-col gap-5">
				<div className="flex gap-3">
					<UserIcon className="w-8" />
					<div className="flex flex-col justify-center">
						<div className="flex gap-2 items-center">
							<div>{user?.username || "알 수 없는 사용자"}</div>
							<div>|</div>
							<div className="text-neutral-500">{formatToTimeAgo(create_at)}</div>
						</div>
						<div>{tweet}</div>
					</div>
				</div>
				<div className="w-full pl-8">
					<div className="w-full">
						<Link href={`/tweets/${id}`}>
							<PhotoIcon className="size-full" />
						</Link>

						<div className="flex items-center justify-between px-5">
							<div className="flex items-center gap-1 hover:cursor-pointer">
								<ChatBubbleOvalLeftIcon className="size-3" />
								<div className="text-xs text-neutral-400">0</div>
							</div>
							<div className="flex items-center gap-1 hover:cursor-pointer">
								<HeartIcon className="size-3" />
								<div className="text-xs text-neutral-400">{Like.length}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
