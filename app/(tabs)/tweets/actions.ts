"use server";

import { TWEET_PAGE_SIZE } from "@/lib/consts";
import db from "@/lib/db";
import { FormActionResult } from "@/util";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { comment } from "postcss";
import { z } from "zod";
import Tweets from "./page";

const s3 = new S3Client({
	endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	region: "auto",
	credentials: {
		accessKeyId: process.env.CF_R2_ACCESS_KEY!,
		secretAccessKey: process.env.CF_R2_SECRET_KEY!,
	},
});

const uploadSchema = z.object({
	filename: z.string(),
	contentType: z.string(),
});

export async function getSignedUploadUrl(data: FormData) {
	const parsed = uploadSchema.safeParse({
		filename: data.get("filename"),
		contentType: data.get("contentType"),
	});

	if (!parsed.success) return { error: "Invalid input" };

	const { filename, contentType } = parsed.data;

	const command = new PutObjectCommand({
		Bucket: process.env.R2_BUCKET_NAME!,
		Key: filename,
		ContentType: contentType,
	});

	const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

	return { url: signedUrl };
}

export async function getMoreTweets(page: number) {
	const tweets = db.tweet.findMany({
		orderBy: {
			create_at: "desc",
		},
		include: {
			Like: {
				select: {
					id: true,
					userId: true,
				},
			},
		},
		skip: (page - 1) * TWEET_PAGE_SIZE,
		take: TWEET_PAGE_SIZE,
	});
	return tweets;
}

const tweetSchema = z.object({
	comment: z.string(),
	url: z.string(),
});

export async function uploadTweet(prevState: any, formData: FormData): Promise<FormActionResult> {
	const data = {
		comment: formData.get("comment"),
		url: formData.get("url"),
	};

	const result = await tweetSchema.spa(data);
	if (result.success) {
		const tweet = await db.tweet.create({
			data: {
				tweet: result.data.comment,
				photo: result.data.url,
			},
			select: {
				id: true,
			},
		});
		if (tweet) {
			return { success: true };
		} else {
			return {
				success: false,
				fieldErrors: { comment: [""] },
			};
		}
	} else {
		return {
			success: false,
			fieldErrors: { comment: [""] },
		};
	}

	return { success: true };
}
