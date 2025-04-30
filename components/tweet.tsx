"use client";

import Input from "./input";
import Button from "./button";
import { useState } from "react";
import { PhotoIcon, GifIcon } from "@heroicons/react/24/outline";

export default function Tweet() {
	const [input, setInput] = useState("");
	const [preview, setPreview] = useState("");

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event;
		setInput(value);
	};
	const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = event;
		if (!files) {
			return;
		}

		const file = files[0];
		if (!file.type.startsWith("image/")) {
			alert("이미지 파일만 등록 가능합니다.");
		}
		const MAX_SIZE = 5 * 1024 * 1024 * 1024;
		if (file.size > MAX_SIZE) {
			alert("5GB 미만의 파일만 등록 가능합니다.");
		}

		const url = URL.createObjectURL(file);
		setPreview(url);
	};
	const checkInputDisabled = (): boolean => {
		if (input.length !== 0 || preview !== "") {
			return false;
		}
		return true;
	};

	return (
		<div className="border  border-neutral-600 w-full rounded-t-2xl">
			<form>
				<Input $name="comment" placeholder="What's happening?" onChange={onChange} />

				<div
					className="aspect-square mt-3 rounded-2xl overflow-hidden"
					style={{
						backgroundImage: `url(${preview})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						display: `${preview === "" ? "none" : "flex"}`,
					}}
				></div>
				<div className="flex items-center p-2 justify-between ">
					<div className="w-5"></div>
					<div className="aspect-square flex-1 h-5 *:hover:cursor-pointer text-blue-600 flex items-center gap-5 font-light">
						<label htmlFor="photo">
							<PhotoIcon className="size-5" />
						</label>
						<input
							onChange={onImageChange}
							type="file"
							id="photo"
							name="photo"
							accept="image/*"
							className="hidden"
						/>
						<GifIcon className="size-5" />
					</div>
					<div className="w-20 h-10">
						<Button $text="Post" $btn_type="white" $disabled={checkInputDisabled()} />
					</div>
				</div>
			</form>
		</div>
	);
}
