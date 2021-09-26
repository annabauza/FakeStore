import React, { useContext, useEffect, useState } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import ProductRowView from '../views/ProductRowView';
import { StyleSheet, useColorScheme, View, FlatList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import UserContext from '../../contexts/UserContext';
import { getProductsForCategory, Product } from '../../network/API';

export interface ProductListScreenProps {
  navigation: NavigationScreenProp<any, any>;
  route: {
    params: {
      categoryId: number;
    };
  };
}

const ProductListScreen: React.FC<ProductListScreenProps> = ({
  navigation,
  route: {
    params: { categoryId },
  },
}) => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const { isLoggedIn } = useContext(UserContext);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
    }
    const f = getProductsForCategory(categoryId, products =>
      setProducts(products),
    );
    return () => {
      f.abort();
    };
  }, []);

  return (
    <View>
      <FlatList
        data={products}
        renderItem={product => (
          <ProductRowView
            key={product.index}
            product={product.item}
            navigation={navigation}
          />
        )}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default ProductListScreen;
