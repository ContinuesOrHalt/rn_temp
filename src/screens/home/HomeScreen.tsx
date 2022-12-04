import {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useCustomer} from '../../api/auth';

const Item: FC<{
  label: string;
}> = ({label}) => {
  return (
    <View style={styles.wItem}>
      <TouchableOpacity onPress={() => {}} style={styles.wItemIcon}>
        <Text>icon</Text>
      </TouchableOpacity>
      <Text style={styles.itemText}>{label}</Text>
    </View>
  );
};

export default function HomeScreen() {
  const {data: customer} = useCustomer();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.body}>
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

        <View style={styles.gItem}>
          <View style={styles.gRowItem}>
            <Item label="calender" />
            <Item label="policy" />
          </View>

          <View style={styles.gRowItem}>
            <Item label="esign" />
            <Item label="report" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
  },

  wAvatar: {
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  gItem: {
    marginTop: 20,
    width: '100%',
  },
  gRowItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  wItem: {
    flex: 1,
    alignItems: 'center',
    maxWidth: 150,
    padding: 10,
  },
  wItemIcon: {
    borderRadius: 10,
    width: 80,
    height: 80,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    textAlign: 'center',
    marginTop: 10,
  },
});
