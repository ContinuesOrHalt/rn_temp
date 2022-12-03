/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React, {useEffect, useState} from 'react';
import LoginScreen from '../screens/login/LoginScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCustomer} from '../api/auth';

import {ColorSchemeName, Pressable, Text} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SplashScreen from '../screens/splash/SplashScreen';
import HomeScreen from '../screens/home/HomeScreen';
import {useIntl} from 'react-intl';
import NotifyScreen from '../screens/notify/NotifyScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {data: customer, isLoading} = useCustomer();

  // show splash 1.5s
  const [isShow, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => setShow(false), 1500);
  }, []);

  if (isLoading || isShow) {
    return <SplashScreen />;
  }

  if (!customer) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
      {/* <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const {formatMessage} = useIntl();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{tabBarActiveTintColor: Colors[colorScheme].tint}}>
      <BottomTab.Screen
        name="TabOne"
        component={HomeScreen}
        options={{
          title: formatMessage({id: 'home'}),
          tabBarIcon: ({color}) => <TabBarIcon name="code" color={color} />,
          header: () => null,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={NotifyScreen}
        options={({navigation}: RootTabScreenProps<'TabTwo'>) => ({
          title: formatMessage({id: 'notify'}),
          tabBarIcon: ({color}) => <TabBarIcon name="code" color={color} />,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('TabOne')}
              style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
              <Text>Back</Text>
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabThree"
        component={ProfileScreen}
        options={({navigation}: RootTabScreenProps<'TabThree'>) => ({
          title: formatMessage({id: 'profile'}),
          tabBarIcon: ({color}) => <TabBarIcon name="code" color={color} />,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('TabOne')}
              style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
              <Text>Back</Text>
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {name: string; color: string}) {
  return <Text>{props.name}</Text>;
}
