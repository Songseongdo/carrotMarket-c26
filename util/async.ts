"use server";

import { redirect } from "next/navigation";
import getSession from "../lib/session";
import db from "@/lib/db";

export async function doLogin(id: number) {
	const session = await getSession();
	session.id = id;
	await session.save();

	return redirect("/profile");
}

export async function getTweetUserInfo(userId: number) {
	const user = db.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			username: true,
		},
	});
	return user;
}

export async function getTweetsTotalCount() {
	const count = await db.tweet.count();
	return count;
}
