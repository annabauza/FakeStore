import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Product } from '../../network/API';

export interface ProductRowViewProps {
  navigation?: NavigationScreenProp<any, any>;
  product: Product;
}

const ProductRowView: React.FC<ProductRowViewProps> = ({
  product: { id, title, image, price },
  navigation,
}) => {
  return (
    <View style={styles.containerColumn}>
      <View style={styles.containerRow}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: image,
          }}
        />
        <Text style={styles.input}>£{price}</Text>
      </View>
      <Text style={styles.input}>{title}</Text>
      {navigation ? (
        <Button
          title="more >"
          onPress={() => {
            navigation?.navigate('ProductDetails', { productId: id });
          }}
        />
      ) : null}
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerColumn: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
  },
  containerRow: {
    flex: 1,
    width: '100%',
    padding: 16,
    flexDirection: 'row',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginBottom: 12,
  },
  thumbnail: {
    flex: 1,
    width: 66,
    height: 66,
    resizeMode: 'contain',
  },
  input: {
    margin: 16,
  },
});

export default ProductRowView;
