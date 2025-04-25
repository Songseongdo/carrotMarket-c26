export type FormFields = "email" | "password" | "username" | "confirm_password" | "phonenumber" | "verifycode";
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
