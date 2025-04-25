import Link from "next/link";
import getSession from "../../lib/session";
import { notFound, redirect } from "next/navigation";
import db from "../../lib/db";
import Button from "../../components/button";

async function getUser() {
	const sesstion = await getSession();
	if (sesstion.id) {
		return await db.user.findUnique({
			where: {
				id: sesstion.id,
			},
		});
	} else {
		notFound();
	}
}

export default async function Profile() {
	console.log("this profile");

	const user = await getUser();
	const logout = async () => {
		"use server";
		const session = await getSession();
		await session.destroy();

		redirect("/");
	};

	return (
		<div className="flex flex-col gap-10 py-8 px-6">
			<Link href="/">&larr; 이전 화면으로</Link>
			<div className="flex flex-col gap-2 *:font-medium mt-10">
				<h1 className="text-2xl">{user?.id}님 안녕하세요!</h1>
				<form action={logout}>
					<Button $text="Log Out"></Button>
				</form>
			</div>
		</div>
	);
}
