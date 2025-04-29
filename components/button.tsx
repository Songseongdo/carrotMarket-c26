"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

interface IFormButtonProps {
	$text: string;
	$callFn?: () => void;
	$btn_type?: string;
}

const _Button = forwardRef<HTMLButtonElement, IFormButtonProps>(({ $text, $callFn, $btn_type = "default" }, ref) => {
	const { pending } = useFormStatus();

	const baseClass =
		"w-full h-full rounded-full disabled:bg-neutral-600 disabled:text-neutral-300 disabled:cursor-not-allowed";

	const variantClass =
		$btn_type === "default" ? "bg-neutral-400 hover:bg-neutral-500" : "bg-blue-500 hover:bg-blue-600";

	return (
		<button ref={ref} onClick={$callFn ?? undefined} disabled={pending} className={`${baseClass} ${variantClass}`}>
			{pending ? "로딩 중" : $text}
		</button>
	);
});

export default _Button;
