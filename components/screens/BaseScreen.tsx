import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { Cart, getAllUsers, getUerCart, User } from '../../network/API';
import UserContext from './../../contexts/UserContext';
import { NativeModules } from 'react-native';

export interface BaseScreenProps { }

const { UserDataModule } = NativeModules;

const save = async (
  key: string,
  cart: Cart,
  result: (response: string) => void,
) => {
  const value = JSON.stringify(cart);
  const response = await UserDataModule.save('FakeStore::' + key, value);
  result(response);
};

const load = async (key: string, result: (response: string) => void) => {
  const response = await UserDataModule.load('FakeStore::' + key);
  result(response);
};
var { width, height } = Dimensions.get('window');

const BaseScreen: React.FC<BaseScreenProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [userDetails, setUserDetails] = useState<User | undefined>(undefined);
  const [userCart, setUserCart] = useState<Cart | undefined>(undefined);

  const addToCart = (productId: number) => {
    if (userCart) {
      const product = userCart.products.find(p => p.productId == productId);
      if (product) {
        product.quantity += 1;
      } else {
        userCart.products.push({ productId, quantity: 1 });
      }
    }
  };

  const removeFromCart = (productId: number) => {
    if (userCart) {
      const product = userCart.products.find(p => p.productId == productId);
      if (product) {
        product.quantity -= 1;
      }
    }
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    token,
    setToken,
    userDetails,
    userCart,
    addToCart,
    removeFromCart,
  };

  useEffect(() => {
    getAllUsers(users => {
      if (isLoggedIn) {
        const user = users.find(user => user.username === username);
        console.log({ username, user, users });
        setUserDetails ? setUserDetails(user) : null;
      }
    });
  }, [isLoggedIn, username]);

  useEffect(() => {
    if (userDetails) {
      load(`Cart::${userDetails.id}`, localCart => {
        const f = getUerCart(
          userDetails.id,
          remoteCart => {
            if (localCart === '') {
              setUserCart(remoteCart);
            } else {
              const cart: Cart = JSON.parse(localCart);
              if (Date.parse(cart.date) > Date.parse(remoteCart.date)) {
                setUserCart(cart);
              } else {
                setUserCart(remoteCart);
              }
            }
            console.log({ remoteCart, userCart });
          },
          error => { },
        );
        return () => {
          f.abort();
        };
      });
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails && userCart) {
      userCart.date = new Date().toUTCString();
      save(`Cart::${userDetails.id}`, userCart, result => {
        console.log({ result });
      });
    }
  }, [userCart]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const ErrorHandler = (
  state: string,
  errorMessage: string,
  children: any,
  ok: () => void,
) => {
  switch (state) {
    case 'loading': {
      return (
        <View style={styles.container}>
          {children}
          <View style={styles.overlay}>
            <Text style={styles.loading}>Loading</Text>
          </View>
        </View>
      );
    }
    case 'error': {
      return (
        <View style={styles.container}>
          {children}
          <View style={styles.overlay}>
            <Text style={styles.error}>{errorMessage}</Text>
            <Button title="OK" onPress={() => ok()} />
          </View>
        </View>
      );
    }
    default: {
      return children;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#f00',
  },
  loading: {
    flex: 1,
    color: '#fff',
  },
});

export default BaseScreen;
