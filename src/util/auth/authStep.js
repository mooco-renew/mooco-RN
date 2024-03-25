export const allFalse = showAuth => {
    return showAuth.every(val => val === false);
  }
  
  // 첫 번째 요소만 true인 경우
export const firstTrueOnly = showAuth => {
    return showAuth[0] === true && showAuth.slice(1).every(val => val === false);
  }

    // 첫 번째 요소만 false인 경우
export const firstFalseOnly = showAuth => {
    return showAuth[0] === false && showAuth.slice(1).every(val => val === true);
  }

  export const lastFalseOnly = (showAuth) => {
    // 배열의 마지막 요소만 false이고, 나머지 요소는 모두 true인 경우
    return showAuth.length > 0 && showAuth.slice(0, -1).every(val => val === true) && showAuth[showAuth.length - 1] === false;
  }

   // 1번째 요소가 true인 경우
   export const firstTrue = (showAuth) => { 
    return showAuth[0] === true;
  }
  
  // 2번째 요소가 true인 경우
  export const secondTrue = (showAuth) => { 
    return showAuth[1] === true;
  }

   // 3번째 요소가 true인 경우
   export const thirdTrue = (showAuth) => { 
    return showAuth[2] === true;
  }
  
  
  
  export const allTrue = showAuth => {
    return showAuth.every(val => val === true);
  }
  