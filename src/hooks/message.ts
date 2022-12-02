import {useMemo} from 'react';
import {useIntl} from 'react-intl';

export const useHandleErrorMessage = (error: any) => {
  const {formatMessage} = useIntl();
  return useMemo(() => {
    const message = error?.message || '';
    switch (message) {
      case 'Network Error':
        return formatMessage({id: 'error.network'});

      default:
        return message;
    }
  }, [error, formatMessage]);
};
