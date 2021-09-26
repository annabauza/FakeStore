import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

export interface CategoryRowViewProps {
  navigation: NavigationScreenProp<any, any>;
  category: string;
}

const CategoryRowView: React.FC<CategoryRowViewProps> = ({
  category,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.input}>{category}</Text>
      <Button
        title="more >"
        onPress={() => {
          navigation.navigate('Products', {categoryId: category});
        }}
      />
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  logo: {
    width: 66,
    height: 58,
  },
  input: {
    margin: 16,
  },
});

export default CategoryRowView;
