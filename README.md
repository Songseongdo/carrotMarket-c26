# Server Action

1. Server Action 은 POST 전용

2. GET 방식 호출은 불가

# [useFormStatus](https://ko.react.dev/reference/react-dom/hooks/useFormStatus)

1. useFormStatus Hook은 form 내부에 렌더링한 컴포넌트에서 호출

2. useFormStatus는 오직 상위 form 에 대한 상태 정보만 반환. 동일한 컴포넌트나 자식 컴포넌트에서 렌더링한 form의 상태 정보는 반환.

# [useFormState(v18), useActionState(v19)](https://ko.react.dev/reference/react/useActionState)

1. React 서버 컴포넌트를 지원하는 프레임워크에서 useActionState를 사용하면, 클라이언트 자바스크립트 실행 전에도 폼과 상호작용할 수 있음.

    만약 서버 컴포넌트를 사용하지 않는다면, 이는 단순히 컴포넌트 지역 State와 동일하게 동작.

2. useActionState에 전달된 함수는 첫 번째 인수로 이전 또는 초기 State를 추가로 받음. 즉, 직접 폼 액션을 사용했을 때와 비교해 함수의 시그니처가 달라질 수 있음
