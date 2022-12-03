import {StyleSheet, View} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={onLogout}>
        <Text style={styles.title}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} /> */}
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
