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

const nestedScreens = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Batsmen" component={batsmen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Covid-Stats">
        <Drawer.Screen name="Select Players for Comparison" component={Selection} />
        <Drawer.Screen name="Comparison" component={Compare} />
        <Drawer.Screen name="PlayingXI" component={playingXI} />
        <Drawer.Screen name="Batsmen" component={batsmen} />
        <Drawer.Screen name="Bowlers" component={bowlers} />
        <Drawer.Screen name="AllRounders" component={allRounders} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}