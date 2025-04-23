# 4월 23일 챌린지27

-   ["@zod.com" 이메일 허용](./app/actions.ts)

    ```
    const emailRegex = new RegExp(/([\w\.\-_]+)?\w+@zod.com/gim);
    ```

-   [유저명 5글자 이상](./app/actions.ts)

    ```
    username: z.string().min(5, "사용자 이름을 최소 5자 이상 입력해 주세요."),
    ```

-   [비밀번호 10자 이상, 숫자 포함](./app/actions.ts)

    ```
    const checkPassword = new RegExp(/(?=.*\d)/);

    .min(PASSWORD_MIN_LENGTH, "비밀번호는 최소 10자 이상을 입력해주세요.")
    .regex(checkPassword, "비밀번호는 숫자를 포함해야 합니다.")

    ```

-   [로그인 성공](./app/page.tsx)

    ```
    useEffect(() => {
    	if (state && state?.success) {
    		setPopup(true);
    	}
    }, [state]);


    {popup ? <SuccessMsg /> : null}
    ```
