import {TextInput, TextInputProps} from 'react-native';
import {stylesInput} from './styles';

interface Props extends TextInputProps {
  onChange: any;
}

export default function TextInputBase({onChange, ...props}: Props) {
  return (
    <TextInput
      {...props}
      onChangeText={text => onChange(text)}
      style={stylesInput.input}
    />
  );
}
