import React from 'react';
import {IntlProvider} from 'react-intl';
import {useSelector} from 'react-redux';
import {languages, selectLocale} from './intlSlice';

const I18nProvider = ({children}: any) => {
  const locale: string = useSelector(selectLocale);
  // const timeZone: string = useSelector(selectTimeZone);
  return (
    <IntlProvider
      locale={locale}
      messages={languages[locale]}
      // timeZone={timeZone}
    >
      {children}
    </IntlProvider>
  );
};
export default I18nProvider;
