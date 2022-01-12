import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Compare from './ComparisonsModule/comparison';
import Selection from './ComparisonsModule/selecting2';
import playingXI from './PlayingXIModule/playingXI';
import batsmen from './PlayingXIModule/batsmen';
import bowlers from './PlayingXIModule/bowlers';
import allRounders from './PlayingXIModule/allRounders';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const PlayingIXScreens = () =>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="playingIX" component={playingXI} options={{ headerShown: false}}/>
      <Stack.Screen name="Batsmen" component={batsmen} options={{ headerShown: false}}/>
      <Stack.Screen name="Bowler" component={bowlers} options={{ headerShown: false}}/>
      <Stack.Screen name="AllRounder" component={allRounders} options={{ headerShown: false}}/>
    </Stack.Navigator>
  );
}
const ComprisonScreens = () =>{
  return (    
    <Stack.Navigator>
      <Stack.Screen name="Player Select" component={Selection} options={{ headerShown: false}}/>
      <Stack.Screen name="Compare" component={Compare} options={{ headerShown: false}}/>
    </Stack.Navigator>
  )
}



export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Comparison" component={ComprisonScreens} />
        <Drawer.Screen name="PlayingIX" component={PlayingIXScreens} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}