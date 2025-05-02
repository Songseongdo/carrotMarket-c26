import { HeartIcon, ChatBubbleOvalLeftIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { PhotoIcon, UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { formatToTimeAgo } from '@/util';
import { getTweetInfo, getTweetUserInfo, TweetType } from './acttions';
import { notFound } from 'next/navigation';
import { getSessionUserInfo } from '@/util/async';
import Reply from '@/components/reply';

export default async function TweetsDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const TweetInfo: TweetType = await getTweetInfo(id);
  if (!TweetInfo) {
    return notFound();
  }

  const TweetUser = await getTweetUserInfo(TweetInfo.userId!);
  const sessionUser = await getSessionUserInfo();

  return (
    <div>
      <div className="my-5 text-2xl">
        <Link href="/" className="flex items-center">
          <div className="size-5">
            <ArrowLeftIcon />
          </div>
          &nbsp;&nbsp;&nbsp;Post
        </Link>
      </div>

      <div className="border mt-[-1px] border-neutral-600 p-2">
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <UserIcon className="w-8" />
            <div className="flex flex-col justify-center">
              <div className="flex gap-2 items-center">
                <div>{TweetUser?.username || '알 수 없는 사용자'}</div>

                <div className="text-neutral-500">
                  <span className="mr-3">|</span>
                  {formatToTimeAgo(TweetInfo.create_at)}
                </div>
              </div>
              <div>{TweetInfo?.tweet}</div>
            </div>
          </div>
          <div className="w-full pl-8">
            <div className="w-full">
              <Link href={`/tweets/${id}`}>
                {TweetInfo?.photo ? (
                  <img src={TweetInfo?.photo} className="rounded-3xl" />
                ) : (
                  <PhotoIcon className="size-full" viewBox="1.4 3.6 21.3 16.7" />
                )}
              </Link>

              <div className="flex items-center justify-between px-5 text-2xl mt-3 text-neutral-400">
                <div
                  className="flex items-center gap-1 hover:cursor-pointer tooltip tooltip-primary"
                  data-tip="Reply"
                >
                  <ChatBubbleOvalLeftIcon className="size-6" />
                  <div className=" ">0</div>
                </div>
                <div
                  className="flex items-center gap-1 hover:cursor-pointer tooltip tooltip-secondary"
                  data-tip="Like"
                >
                  <HeartIcon className="size-6 mt-[2px]" />
                  <div className=" ">{TweetInfo?.Like.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-5">
        <Reply />
      </div>
    </div>
  );
}
