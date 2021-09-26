import React from 'react';
import renderer from 'react-test-renderer';
import ProductRowView from '../ProductRowView';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <ProductRowView
        product={{
          id: 0,
          title: 'test',
          image: 'test.png',
          price: 11,
          category: 'test',
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
