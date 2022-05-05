import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 24,
  },
  titleText: {
    fontSize: 20,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  input: {
    height: 112,
    borderRadius: 4,
    borderWidth: 1,
    padding: 12,
    borderColor: theme.colors.stroke,
    marginBottom: 8,
    color: theme.colors.text_primary,
    fontFamily: theme.fonts.regular,
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 16,
  }
});