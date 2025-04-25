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
