import {createRef, useState, useImperativeHandle} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingRef: any = createRef();

export const Loading = {
  show: () => {
    LoadingRef.current?.show?.();
  },
  hide: () => {
    LoadingRef.current?.hide?.();
  },
};

export default function ModalLoading() {
  const [open, setOpen] = useState(false);

  useImperativeHandle(LoadingRef, () => ({
    show: () => {
      setOpen(true);
    },
    hide: () => {
      setOpen(false);
    },
  }));

  if (!open) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff33',
    position: 'absolute',
  },
});
