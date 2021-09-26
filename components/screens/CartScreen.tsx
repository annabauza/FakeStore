import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import UserContext from '../../contexts/UserContext';
import { getAllProducts, Product } from '../../network/API';
import ProductRowView from '../views/ProductRowView';
import { ErrorHandler } from './BaseScreen';

export interface CartScreenProps {
}

const CartScreen: React.FC<CartScreenProps> = () => {
  const { userCart } = useContext(UserContext);
  const [state, setState] = useState('loaded');
  const [products, setProducts] = useState(new Array<Product>());
  const [errorMessage] = useState("Could not load card, please try again later");
  console.log({ userCart });

  useEffect(() => {
    const f = getAllProducts((products) => {
      setProducts(products)
    })
    return () => {
      f.abort();
    };
  }, [])

  const mappedProducts = userCart?.products.map((cartProduct) => {
    return { product: products.find((p) => p.id === cartProduct.productId) || { price: 0 }, quantity: cartProduct.quantity }
  });
  const total = mappedProducts?.reduce((a, v) => a = a + (v.quantity * v.product.price), 0);

  return ErrorHandler(state, errorMessage,
    (
      <View>
        <Text>Total: {total}</Text>
        <FlatList
          data={mappedProducts}
          renderItem={(nappedProduct) => (
            <View>
              <View style={styles.quantityContainer}>
                <Text>Quantity: {nappedProduct.item.quantity} x £{nappedProduct.item.product?.price} = £{nappedProduct.item.quantity * nappedProduct.item.product?.price}</Text>
              </View>
              {(products.length > 0) ? <ProductRowView key={nappedProduct.index} product={nappedProduct.item.product} /> : null}
            </View>
          )}
        />
      </View>
    ), () => { setState("loaded") });
};

const styles = StyleSheet.create({
  quantityContainer: {
    marginLeft: 22,
    marginTop: 22,
    flexDirection: "row",

  },
});

export default CartScreen;
