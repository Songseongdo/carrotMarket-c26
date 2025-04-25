"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { FormActionResult } from "../../util";
import db from "../../lib/db";
import getSession from "../../lib/session";
import { redirect } from "next/navigation";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../../lib/consts";

const formSchema = z.object({
	id: z.string().superRefine(async (userId, ctx) => {
		const user = await db.user.findUnique({
			where: {
				userId,
			},
			select: {
				id: true,
			},
		});

		if (user === null) {
			ctx.addIssue({
				code: "custom",
				message: "존재하지 않는 아이디입니다.",
				fatal: true,
			});
		}

		return z.NEVER;
	}),
	password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function handleForm(_: any, formData: FormData): Promise<FormActionResult> {
	const data = {
		id: formData.get("id"),
		password: formData.get("password"),
	};

	const result = await formSchema.spa(data);

	if (result.success) {
		const user = await db.user.findUnique({
			where: {
				userId: result.data.id,
			},
			select: {
				id: true,
				password: true,
			},
		});

		const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
		if (ok) {
			const session = await getSession();
			session.id = user!.id;
			await session.save();

			redirect("/profile");
		} else {
			return {
				success: false,
				fieldErrors: { password: ["비밀번호를 확인해 주세요."] },
			};
		}
	} else {
		return {
			success: false,
			fieldErrors: result.error.flatten().fieldErrors,
		};
	}
}
