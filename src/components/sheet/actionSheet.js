import { Text, Box, Actionsheet, Button } from "native-base";
import React, { useEffect, useState } from "react";
import DetailTerms from './detailTerms';
import { allTrue } from "../../util/auth/authStep";
import requestEmail from "../../server/auth/emailAuth";

export default function CustomActionSheet({open, isOpen, setStep, setTerm, check, email}) {

  // 서버 에러용
  const onServerError = () => {
    //네비게이션 스택 없앤 후 서버 에러 페이지로 이동
    navigation.reset({
      index: 0,
      routes: [{ name: "ServerError" }],
    });
  };

    const handleSecondStep = async () => {
        if(allTrue(check)) {
            let data = await requestEmail(email);
            if(data.success == true) {
            setStep(3); // 다음 단계로
            isOpen(false);
            setTerm(0); // 이용약관 닫기
              } else if(data.success == false) {
                alert(data.error.message);
              } else {
                onServerError();
              }
        }
    }
    
    // check 배열의 true false 확인
    function checkConditions(checkArray) {
        const isFirstIndexTrue = checkArray[0] === true;
        const isSecondIndexTrue = checkArray[1] === true;
        return {
          isFirstIndexTrue,
          isSecondIndexTrue,
        };
      }
      

  return (
    <Actionsheet isOpen={open} onClose={() => isOpen(false)}>
    <Actionsheet.Content>
      <Box w="100%" h={70} px={4} justifyContent="center" alignItems="flex-start">
        <Text w="100%" fontSize="20" color="black" fontWeight="bold">
          서비스 이용을 위해 {'\n'}꼭 필요한 약관만 추렸어요.
        </Text>

      </Box>
      <Box w="100%" px={4} mb={4}>
          <DetailTerms index={1} setTerm={setTerm} color={checkConditions(check).isFirstIndexTrue}/>
          <DetailTerms index={2} setTerm={setTerm}  color={checkConditions(check).isSecondIndexTrue}/>
      </Box>
      <Button w="94%" p={4} marginTop={5} onPress={() => handleSecondStep()} disabled={!allTrue(check)} style={{ backgroundColor: allTrue(check) ? '#151515' : 'rgba(217,217,217, 0.5)', borderRadius: 10 }}>
        <Text color={'#ffffff'} fontWeight={700}>약관 동의</Text>
      </Button>
    </Actionsheet.Content>
  </Actionsheet>
  )
}
