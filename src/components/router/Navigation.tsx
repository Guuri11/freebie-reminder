import React from "react";
import {
  NavigationContainer, DefaultTheme, DarkTheme
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { MODE } from "../../constants";
import Home from "./Main/Home";
import CreateSubscription from "./Main/CreateSubscription";
import DetailSubscription from "./Main/DetailSubscription";
import Settings from "./Main/Settings";

const Stack = createNativeStackNavigator();

const Navigation = observer(() => {
  return (
    <NavigationContainer theme={MODE === 'dark' ? DarkTheme : DefaultTheme}>
      <MainNavigation />
    </NavigationContainer>
  );
});

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Freebie Reminder' component={Home} options={{headerShown: false}} />
      <Stack.Screen name='Create' component={CreateSubscription} options={{headerShown: false}} />
      <Stack.Screen name='Detail' component={DetailSubscription} options={{headerShown: false}} />
      <Stack.Screen name='Settings' component={Settings} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default Navigation;
