import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
 } from 'react-native';
import { theme } from '../../theme';
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { Copyright } from '../Copyright';
import { api } from '../../libs/api';

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackReturn: () => void;
  onFeedbackSend: () => void;
}

export function Form({ feedbackType, onFeedbackReturn, onFeedbackSend }: FormProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const [ screenshot, setScreenshot ] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ comment, setComment ] = useState('');

  function handleScreenshot() {
    captureScreen({
      format: 'png',
      quality: 0.9,
    }).then(uri => setScreenshot(uri)).catch(err => console.log(err));
  }

  function handleRemoveScreenshot() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if(isLoading) return;

    setIsLoading(true);

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64'});

    try {
      await api.post('feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      });

      onFeedbackSend();

    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackReturn}>
          <ArrowLeft 
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput 
        multiline
        style={styles.input}
        placeholder='Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...'
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton 
          onTakeShot={handleScreenshot}
          onRemoveShot={handleRemoveScreenshot}
          screenshot={screenshot}
        />
        <Button isLoading={isLoading} onPress={handleSendFeedback} />
      </View>

      <Copyright />
    </View>
  );
}