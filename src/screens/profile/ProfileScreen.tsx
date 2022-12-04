import {FC} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCustomer, useLogout} from '../../api/auth';

const Item: FC<{onPress: () => void; label: string}> = ({onPress, label}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={{}}>{label}</Text>
  </TouchableOpacity>
);

const Line: FC = () => <View style={styles.line} />;

export default function ProfileScreen() {
  const {data: customer} = useCustomer();

  const {mutate: logout} = useLogout();

  const onLogout = () => {
    logout();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wUser}>
        <View style={styles.wAvatar}>
          {!!customer?.avatar && (
            <Image
              style={styles.avatar}
              source={{uri: customer?.avatar}}
              resizeMode="cover"
            />
          )}
        </View>
        <Text style={styles.name}>{customer?.firstName}</Text>
      </View>
      <View style={styles.box}>
        <Item onPress={() => {}} label="profile.info" />
        <Line />
        <Item onPress={() => {}} label="profile.group" />
        <Line />
        <Item onPress={() => {}} label="profile.room" />
        <Line />
        <Item onPress={() => {}} label="profile.event" />
        <Line />
        <Item onPress={() => {}} label="profile.report" />
      </View>

      <View style={styles.box}>
        <Item onPress={() => {}} label="profile.language" />
        <Line />
        <Item onPress={() => {}} label="profile.app_info" />
      </View>

      <View style={[styles.box, styles.boxLogout]}>
        <Item onPress={onLogout} label="logout" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  wUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  box: {
    paddingHorizontal: 40,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 20,
  },
  boxLogout: {
    marginTop: 40,
  },
  item: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#f1f1f1',
  },
});
