/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import DetailsPokemon from './pages/DetailsPokemon';
import HomePokemon from './pages/HomePokemon';
import store from './redux/store';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomePokemon"
            component={HomePokemon}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailsPokemon"
            component={DetailsPokemon}
            options={{
              headerTitle: 'Pokemon Details',
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
