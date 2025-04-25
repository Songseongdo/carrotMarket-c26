"use client";

import Link from "next/link";
import Button from "../components/button";

export default function RootPage() {
	return (
		<div className="flex flex-col items-center min-h-screen pt-[200px]">
			<div className="text-xl mb-10">로그인하고 편리하게 이용하세요.</div>

			<div className="flex gap-5 w-xs mb-3">
				<Link
					href="/login"
					className="flex justify-center items-center w-full h-10 rounded-full disabled:bg-neutral-600 disabled:text-neutral-300 disabled:cursor-not-allowed bg-neutral-400 hover:bg-neutral-500"
				>
					로그인
				</Link>
			</div>
			<div className="flex justify-between w-[250px] text-xs">
				<Link href="/" className="hover:border-b-1">
					아이디 찾기
				</Link>
				<div>|</div>
				<Link href="/" className="hover:border-b-1">
					비밀번호 찾기
				</Link>
				<div>|</div>
				<Link href="/create-account" className="hover:border-b-1">
					회원가입
				</Link>
			</div>
		</div>
	);
}
