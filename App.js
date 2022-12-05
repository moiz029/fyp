import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Compare from './ComparisonsModule/comparison';
import Selection from './ComparisonsModule/selecting2';
import PlayingXI from './PlayingXIModule/playingXI';
import Batsmen from './PlayingXIModule/batsmen';
import Bowlers from './PlayingXIModule/bowlers';
import AllRounders from './PlayingXIModule/allRounders';
import AllPlayers from './PlayingXIModule/allPlayers';
import Home from './home';
import PlayerStats from './PlayingXIModule/playersStats';
import Signup from './UserAccounts/signUp';
import Login from './UserAccounts/login';
import Draft from './DraftingScreens/draft';



const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const PlayingIXScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="playingIX" component={PlayingXI} options={{ headerShown: false }} />
      <Stack.Screen name="Batsmen" component={Batsmen} options={{ headerShown: false }} />
      <Stack.Screen name="Bowler" component={Bowlers} options={{ headerShown: false }} />
      <Stack.Screen name="AllRounder" component={AllRounders} options={{ headerShown: false }} />
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
      <Stack.Screen name="AllPlayers" component={AllPlayers} options={{ headerShown: false }} />
      <Stack.Screen name="PlayerStats" component={PlayerStats} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
const Accounts = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={Signup} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
}
const FanScreens = () => {
  return (


    <Tab.Navigator screenOptions={{ drawerStyle: { backgroundColor: '#ededed' }, drawerActiveBackgroundColor: 'black', drawerActiveTintColor: 'white' }}>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home" component={Home} />
      <Tab.Screen
        options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
        name="Comparison" component={ComparisonScreens} />
      <Tab.Screen
        options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
        name="Players" component={Players} />
      <Tab.Screen
        options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
        name="Account" component={Accounts} />
    </Tab.Navigator>
  )
}
const FranchiseScreens = () => {
  return (
    <Tab.Navigator screenOptions={{ drawerStyle: { backgroundColor: '#ededed' }, drawerActiveBackgroundColor: 'black', drawerActiveTintColor: 'white' }}>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home" component={Home} />
      <Tab.Screen
        options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
        name="Comparison" component={ComparisonScreens} />
      <Tab.Screen
        options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
        name="PlayingXI" component={PlayingIXScreens} />
      <Tab.Screen
        options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
        name="Drafting" component={Draft} />
      <Tab.Screen
        options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
        name="Players" component={Players} />
      <Tab.Screen
        options={{ headerStyle: { backgroundColor: 'black' }, headerTitleStyle: { color: 'white' } }}
        name="Account" component={Accounts} />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="FanScreens" component={FanScreens} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="FranchiseScreens" component={FranchiseScreens} options={{ headerShown: false }} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}