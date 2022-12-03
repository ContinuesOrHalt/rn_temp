import {useLogin} from '../../api/auth';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectLocale, setLanguage} from '../../intl/intlSlice';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useHandleErrorMessage} from '../../hooks/message';
import InputFormik from '../../components/common/input/InputFormik';
import Button from '../../components/common/button/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FormattedMessage} from 'react-intl';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('invalid.mail.required')
    .email('invalid.mail'),
  password: Yup.string().trim().required('invalid.password.required'),
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
      onError: () => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.wLang}>
        <ChangeLanguage />
      </View>
      <Text style={{textAlign: 'center'}}>
        <FormattedMessage id="login.title" />
      </Text>
      <View style={{marginTop: 50}}>
        <InputFormik
          placeholder="email"
          name="email"
          {...propsFormik}
          maxLength={50}
        />
      </View>
      <View style={{marginTop: 10}}>
        <InputFormik
          placeholder="password"
          name="password"
          // inputTag={InputPassword}
          maxLength={20}
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
    </SafeAreaView>
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
