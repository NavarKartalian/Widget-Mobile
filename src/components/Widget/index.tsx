import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../theme';
import { Options } from '../Options';
import { Form } from '../Form';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Success } from '../Success';


export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [ feedbackType, setFeedbackType ] = useState<FeedbackType | null>(null);
  const [ feedbackSent, setFeedbackSent ] = useState(false);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleReset() {
    setFeedbackType(null)
    setFeedbackSent(false);
  }

  return (
    <>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots 
          size={24}
          color={theme.colors.text_on_brand_color}
          weight='bold'
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 350]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent ? 
            <Success onSendAnotherFeedback={handleReset} /> :
            <>
              { feedbackType ? 
                <Form 
                  feedbackType={feedbackType} 
                  onFeedbackReturn={handleReset}
                  onFeedbackSend={() => setFeedbackSent(true)}
                /> :
                <Options onFeedbackTypeChange={setFeedbackType} /> 
              }
            </>
        }
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);