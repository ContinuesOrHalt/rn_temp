import {get, pick} from 'lodash';
import {useIntl} from 'react-intl';
import {Text, TextInputProps, View} from 'react-native';
import {stylesInput} from './styles';

import TextInputBase from './TextInputBase';

interface InputFormik extends TextInputProps {
  name: string;
  handleChange: any;
  handleBlur: any;
  touched: any;
  errors: any;
  values: any;
  inputTag?: any;
  [name: string]: any;
}

const ACCEPT_PROPS = ['placeholder', 'secureTextEntry'];

const InputFormik: React.FC<InputFormik> = ({
  name,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
  inputTag: InputTag = TextInputBase,
  placeholder,
  ...props
}) => {
  const {formatMessage} = useIntl();
  const message = get(touched, name) && get(errors, name);

  return (
    <View style={stylesInput.container}>
      <InputTag
        {...pick(props, ACCEPT_PROPS)}
        value={get(values, name) || ''}
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        placeholder={placeholder ? formatMessage({id: placeholder}) : ''}
      />
      <Text numberOfLines={1} style={stylesInput.error}>
        {message}
      </Text>
    </View>
  );
};

export default InputFormik;
