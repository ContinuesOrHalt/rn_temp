import {FormattedMessage} from 'react-intl';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export interface Props {
  loading?: boolean;
  disabled?: boolean;
  label: string;
  children?: any;
  onPress: () => void;

  // size?: 'sm' | 'md' | 'xs';
}

const Button: React.FC<Props> = ({loading, disabled, label, onPress}) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={styles.container}
      onPress={onPress}>
      {/* {children} */}
      {loading && <ActivityIndicator style={styles.loading} />}
      <Text style={styles.label}>
        <FormattedMessage id={label} />
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#ccc',
    borderRadius: 4,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    // marginRight: 10,
  },
  loading: {
    position: 'absolute',
  },
});
