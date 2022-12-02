import {get, pick} from 'lodash';
import {Text, TextInputProps} from 'react-native';

import TextInputBase from './TextInputBase';

interface InputFormik extends TextInputProps {
  name: string;
  handleChange: any;
  handleBlur: any;
  touched: any;
  errors: any;
  values: any;
  inputTag?: any;
  trim?: boolean;
  [name: string]: any;
}

const ACCEPT_PROPS = [
  'min',
  'max',
  'type',
  'maxLength',
  'minLength',
  'pattern',
  'required',
  'size',
  'disabled',
  'step',
  'placeholder',
  'variant',
];

const InputFormik: React.FC<InputFormik> = ({
  name,
  trim,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
  inputTag: InputTag = TextInputBase,
  ...props
}) => {
  const message = get(touched, name) && get(errors, name);

  const _handleBlur = (value: string) => {
    if (trim && value) {
      handleChange(name)(value.trim());
    }
    handleBlur(name);
  };

  return (
    <>
      <InputTag
        {...pick(props, ACCEPT_PROPS)}
        value={get(values, name) || ''}
        onChange={handleChange(name)}
        onBlur={_handleBlur}
      />
      {message && <Text>{message}</Text>}
    </>
  );
};

export default InputFormik;
