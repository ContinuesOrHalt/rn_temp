import {useLogin} from '../../api/auth';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {selectLocale, setLanguage} from '../../intl/intlSlice';

const ChangeLanguage = () => {
  const dispatch = useDispatch();
  const locale: string = useSelector(selectLocale);
  const onChangeLanguage = () => {
    dispatch(setLanguage(locale === 'vi' ? 'en' : 'vi'));
  };
  return (
    <TouchableOpacity onPress={onChangeLanguage}>
      <Text style={styles.title}>{locale}</Text>
    </TouchableOpacity>
  );
};

export default function LoginScreen() {
  const {mutate: login, isLoading} = useLogin();

  const onLogin = () => {
    login({
      email: 'string',
      password: 'string',
    });
  };
  return (
    <View style={styles.container}>
      <ChangeLanguage />
      <TouchableOpacity onPress={onLogin} disabled={isLoading}>
        <Text style={styles.title}>
          <FormattedMessage id="login" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
