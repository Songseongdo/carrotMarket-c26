import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface IRoutes {
	[key: string]: boolean;
}
const publicOnyUrls: IRoutes = {
	"/": true,
	"/login": true,
	"/create-account": true,
	"/profile": true,
};

export async function middleware(request: NextRequest) {
	const session = await getSession();
	const exists = publicOnyUrls[request.nextUrl.pathname];
	if (!session.id) {
		if (!exists) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	} else {
		if (exists) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
