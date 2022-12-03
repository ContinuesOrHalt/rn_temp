import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useLogout} from '../../api/auth';

export default function ProfileScreen() {
  const {mutate: logout} = useLogout();
  const onLogout = () => {
    logout();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} />
      <TouchableOpacity onPress={onLogout}>
        <Text style={styles.title}>Logout</Text>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
