import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/screens/HomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import ProductDetailScreen from './components/screens/ProductDetailScreen';
import ProductListScreen from './components/screens/ProductListScreen';
import BaseScreen from './components/screens/BaseScreen';
import CartScreen from './components/screens/CartScreen';
import { NavigationScreenProp } from 'react-navigation';

const App = () => {
  const Stack = createNativeStackNavigator();
  const CartButton = (navigation: NavigationScreenProp<any, any>) => {
    return (
      <Button
        onPress={() => {
          navigation.navigate('Cart');
        }}
        title="Cart"
        color="#000"
      />
    );
  };

  return (
    <NavigationContainer>
      <BaseScreen>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation, route }) => ({
                title: 'Categories',
                headerRight: () => CartButton(navigation),
              })}
            />
            <Stack.Screen
              name="Products"
              component={ProductListScreen}
              options={({ navigation, route }) => ({
                title: 'Products',
                headerRight: () => CartButton(navigation),
              })}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailScreen}
              options={({ navigation, route }) => ({
                title: 'Details',
                headerRight: () => CartButton(navigation),
              })}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Login', headerRight: () => null }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: 'Cart' }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </BaseScreen>
    </NavigationContainer>
  );
};

export default App;
