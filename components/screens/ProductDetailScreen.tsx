import React, { useContext, useEffect, useState } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import { getProduct, Product } from '../../network/API';
import UserContext from '../../contexts/UserContext';

export interface ProductDetailScreenProps {
  navigation: NavigationScreenProp<any, any>;
  route: {
    params: {
      productId: number;
    };
  };
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
}) => {
  const { userCart, addToCart, removeFromCart } = useContext(UserContext);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [countInCart, setCountInCart] = useState<number>(0);

  useEffect(() => {
    const productId = route.params.productId;
    if (!product) {
      const f = getProduct(productId, product => {
        setProduct(product);
      });
      return () => {
        f.abort();
      };
    }
  }, []);

  useEffect(() => {
    if (product != undefined) {
      const result = userCart?.products.find(p => p.productId == product.id);
      if (result) {
        setCountInCart(result.quantity);
      }
    }
  }, [userCart, product]);

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.banner} source={{ uri: product?.image }} />
      <Text style={styles.sectionTitle}>{product?.title}</Text>
      <Text style={styles.sectionDescription}>{product?.description}</Text>
      <Text style={styles.sectionDescription}>£{product?.price}</Text>
      <View style={styles.bottomElement}>
        {countInCart == 0 ? (
          <Button
            title="add to cart"
            onPress={() => {
              if (product && addToCart) {
                addToCart(product.id);

                setCountInCart(countInCart + 1);
              }
            }}
          />
        ) : (
          <View style={styles.quantityContainer}>
            <Button
              title="-"
              onPress={() => {
                if (product && removeFromCart) {
                  removeFromCart(product.id);
                  setCountInCart(countInCart - 1);
                }
              }}
            />
            <Text>{countInCart}</Text>
            <Button
              title="+"
              onPress={() => {
                if (product && addToCart) {
                  addToCart(product.id);
                  setCountInCart(countInCart + 1);
                }
              }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
  },
  banner: {
    width: '100%',
    marginTop: 32,
    height: 300,
    resizeMode: 'contain',
    backgroundColor: '#fff',
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
  bottomElement: {
    marginBottom: 32,
  },
});

export default ProductDetailScreen;
