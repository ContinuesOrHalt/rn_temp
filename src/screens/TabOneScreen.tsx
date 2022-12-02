import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useLogout} from '../api/auth';

import EditScreenInfo from '../components/EditScreenInfo';

import {RootTabScreenProps} from '../types';

export default function TabOneScreen({}: RootTabScreenProps<'TabOne'>) {
  const {mutate: logout} = useLogout();
  const onLogout = () => {
    logout();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogout}>
        <Text style={styles.title}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
