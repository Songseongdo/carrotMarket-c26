export type FormFields =
	| "id"
	| "email"
	| "password"
	| "username"
	| "confirm_password"
	| "phonenumber"
	| "verifycode"
	| "prev_password";
export type FormActionResult =
	| null
	| { success: true }
	| { success: false; fieldErrors: Partial<Record<FormFields, string[]>> };

export function getError(state: FormActionResult, name: FormFields): string[] {
	if (state && !state.success && state.fieldErrors) {
		return state.fieldErrors[name] ?? [];
	}
	return [];
}

export function formatToTimeAgo(date: Date): string {
	const dayInMs = 1000 * 60 * 60 * 24;
	const time = new Date(date).getTime();
	const now = new Date().getTime();
	const diff = Math.round((time - now) / dayInMs);

	const formatter = new Intl.RelativeTimeFormat("ko");
	return formatter.format(diff, "days");
}
