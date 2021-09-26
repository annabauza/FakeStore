import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import CategoryRowView from './../views/CategoryRowView';
import { View, FlatList } from 'react-native';
import UserContext from '../../contexts/UserContext';
import { getCategories } from './../../network/API';

export interface HomeScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [categories, setCategories] = useState<Array<string>>([]);
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const f = getCategories(
      array => {
        setCategories(array);
      },
      error => {
        console.error(error);
      },
    );
    return () => {
      f.abort();
    };
  }, []);

  React.useLayoutEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
    }
  }, [isLoggedIn]);

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryRowView category={item} navigation={navigation} />
        )}
      />
    </View>
  );
};


export default HomeScreen;
