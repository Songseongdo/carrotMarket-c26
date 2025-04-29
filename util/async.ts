"use server";

import { redirect } from "next/navigation";
import getSession from "../lib/session";

export async function doLogin(id: number) {
	const session = await getSession();
	session.id = id;
	await session.save();

	return redirect("/profile");
}
