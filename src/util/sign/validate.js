// email형식 확인
export const validateEmail = email => {
    if (email === "") return false; // 빈 값 검사 추가
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
};
 
// 공백 제거
export const removeWhitespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
}

// 8-20 사이 알파벳, 숫자, 특수문자 포함
export const validatePassword = password => {
    if (password === "") return false; // 빈 값 검사 추가
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W).{8,20}$/;
    return regex.test(password);
};
