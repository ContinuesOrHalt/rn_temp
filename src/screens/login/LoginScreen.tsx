import {useLogin} from '../../api/auth';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectLocale, setLanguage} from '../../intl/intlSlice';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useHandleErrorMessage} from '../../hooks/message';
import InputFormik from '../../components/common/input/InputFormik';
import Button from '../../components/common/button/Button';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('invalid.mail.required')
    .max(255, 'invalid.mail.max255')
    .email('invalid.mail'),
  password: Yup.string()
    .trim()
    .required('invalid.password.required')
    .max(255, 'invalid.password.max255'),
});

const LoginInitValue = {
  email: '',
  password: '',
};

const ChangeLanguage = () => {
  const dispatch = useDispatch();
  const locale: string = useSelector(selectLocale);
  const onChangeLanguage = () => {
    dispatch(setLanguage(locale === 'vi' ? 'en' : 'vi'));
  };
  return (
    <TouchableOpacity onPress={onChangeLanguage}>
      <Text style={{fontSize: 30}}>{locale}</Text>
    </TouchableOpacity>
  );
};

export default function LoginScreen() {
  const {mutate: login, isLoading, error} = useLogin();

  const message = useHandleErrorMessage(error);

  const handleLogin = async (payload: any) =>
    login(payload, {
      onError: (err: any) => {
        console.log('😡coh / file: LoginScreen.tsx:48 / err', err);
        // propsFormik.setErrors(getFormikErr(err?.data))
      },
      onSuccess: () => {},
    });

  const {handleSubmit, isSubmitting, ...propsFormik} = useFormik({
    initialValues: LoginInitValue,
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  });

  return (
    <View style={styles.container}>
      <View style={styles.wLang}>
        <ChangeLanguage />
      </View>
      <Text style={{textAlign: 'center'}}>welcome</Text>
      <View style={{marginTop: 50}}>
        <InputFormik placeholder="email" name="email" {...propsFormik} />
      </View>
      <View style={{marginTop: 10}}>
        <InputFormik
          placeholder="password"
          name="password"
          // inputTag={InputPassword}
          secureTextEntry
          {...propsFormik}
        />
      </View>

      {!!message && <Text>{message}</Text>}

      <Button
        loading={isSubmitting || isLoading}
        label="login"
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  wLang: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    marginTop: 50,
  },
});
