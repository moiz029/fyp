import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Compare from './ComparisonsModule/comparison';
import Selection from './ComparisonsModule/selecting2';
import playingXI from './PlayingXIModule/playingXI';
import batsmen from './PlayingXIModule/batsmen';
import bowlers from './PlayingXIModule/bowlers';
import allRounders from './PlayingXIModule/allRounders';
import allPlayers from './PlayingXIModule/allPlayers';
import home from './home';
import playerStats from './PlayingXIModule/playersStats';
import signup from './UserAccounts/signUp';
import login from './UserAccounts/login';



const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const PlayingIXScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="playingIX" component={playingXI} options={{ headerShown: false }} />
      <Stack.Screen name="Batsmen" component={batsmen} options={{ headerShown: false }} />
      <Stack.Screen name="Bowler" component={bowlers} options={{ headerShown: false }} />
      <Stack.Screen name="AllRounder" component={allRounders} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
const ComparisonScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Player Select" component={Selection} options={{ headerShown: false }} />
      <Stack.Screen name="Compare" component={Compare} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
const Players = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AllPlayers" component={allPlayers} options={{ headerShown: false }} />
      <Stack.Screen name="PlayerStats" component={playerStats} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
const Accounts = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={signup} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator screenOptions={{ drawerStyle: { backgroundColor: '#ededed' }, drawerActiveBackgroundColor: 'black', drawerActiveTintColor: 'white' }}>
        <Tab.Screen
          options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
          name="Home" component={home} />
        <Tab.Screen
          options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
          name="Comparison" component={ComparisonScreens} />
        <Tab.Screen
          options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
          name="PlayingXI" component={PlayingIXScreens} />
        <Tab.Screen
          options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
          name="Players" component={Players} />
        <Tab.Screen
          options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
          name="Account" component={Accounts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}