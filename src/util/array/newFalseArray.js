    // 배열 true로 변환
export const setNewFalseArray = (setAuth, index) => {
        setAuth((prevAuth) => {
        const newAuth = [...prevAuth]; // 배열 복사
        newAuth[index] = false; // 특정 인덱스의 값을 false로 설정
        return newAuth; // 업데이트된 배열 반환
    });
  }
