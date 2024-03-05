import React from "react";
import {
  Button,
  AlertDialog,
  Center,
  NativeBaseProvider,
  Text,
} from "native-base";
export default function DailyModal({
  isOpen,
  onClose,
  Header,
  Content,
  Btn1,
  Btn1Event,
  Btn2,
  Btn2Event,
}) {
  const cancelRef = React.useRef(null);
  return (
    <NativeBaseProvider>
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content backgroundColor="black">
            <AlertDialog.Header borderColor="black" bgColor="black">
              <Text color="white" fontSize="18px" fontWeight="700">
                {Header}
              </Text>
            </AlertDialog.Header>
            <AlertDialog.Body borderColor="black" bgColor="black">
              <Text color="white" fontSize="16px" fontWeight="400">
                {Content}
              </Text>
            </AlertDialog.Body>
            <AlertDialog.Footer borderColor="black" bgColor="black">
              <Button.Group space={2}>
                <Button bgColor="#FFFFFF80" onPress={Btn1Event} ref={cancelRef}>
                  <Text color="black" fontSize="16px" fontWeight="700">
                    {Btn1}
                  </Text>
                </Button>
                {Btn2 && (
                  <Button bgColor="#B466C3" onPress={Btn2Event}>
                    <Text color="black" fontSize="16px" fontWeight="700">
                      {Btn2}
                    </Text>
                  </Button>
                )}
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </NativeBaseProvider>
  );
}
