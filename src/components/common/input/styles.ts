import {StyleSheet} from 'react-native';

export const stylesInput = StyleSheet.create({
  container: {},
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 1,
    height: 20,
  },
});
