import React, {createContext} from 'react';
import {Cart, User} from '../network/API';

export interface LocalUser {
  isLoggedIn: boolean;
  username?: string;
  token?: string;
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername?: React.Dispatch<React.SetStateAction<string>>;
  setToken?: React.Dispatch<React.SetStateAction<string>>;
  userDetails?: User;
  userCart?: Cart;
  addToCart?: (productId: number) => void;
  removeFromCart?: (productId: number) => void;
}

const localUser: LocalUser = {
  isLoggedIn: false,
};

const UserContext = createContext(localUser);

export default UserContext;
