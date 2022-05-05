import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
  isLoading: boolean;
}

export function Button({ isLoading, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      {
        isLoading ?
        <ActivityIndicator
          color={theme.colors.text_on_brand_color} 
          size='small' 
        /> 
        :
        <Text style={styles.title}>Enviar feedback</Text>
      }
    </TouchableOpacity>
  );
}