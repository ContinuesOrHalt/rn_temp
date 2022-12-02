import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../stores';

import messagesEN from './translations/en.json';
import messagesVI from './translations/vi.json';
// import messagesID from "translations/id.json";
// import messagesTH from "translations/th.json";
// import messagesJA from "translations/ja.json";

export const languages: any = {
  en: messagesEN,
  vi: messagesVI,
};

type Locate = 'en' | 'vi' | 'jp';

export const DEFAULT_LOCALE = 'en';

export const intlSlice = createSlice({
  name: 'intl',
  initialState: {
    timeZone: '',
    locale: DEFAULT_LOCALE,
    messages: languages[DEFAULT_LOCALE],
  },
  reducers: {
    setLanguage: (state, action: PayloadAction<Locate>) => ({
      ...state,
      locale: action.payload,
      messages: languages[action.payload],
    }),
    setTimeZone: (state, action: PayloadAction<string>) => ({
      ...state,
      timeZone: action.payload,
    }),
  },
});

export const {setLanguage} = intlSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectLocale = (state: RootState) => state.intl.locale;
export const selectTimeZone = (state: RootState) => state.intl.timeZone;

export default intlSlice.reducer;
