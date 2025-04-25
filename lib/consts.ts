export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/gm);
export const PASSWORD_REGEX_ERROR = `A password must have lowercase, UPPERCASE, a number, at least ${PASSWORD_MIN_LENGTH} characters,  and special characters`;
