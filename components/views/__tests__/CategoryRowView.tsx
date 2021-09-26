import React from 'react';
import renderer from 'react-test-renderer';
import CategoryRowView from '../CategoryRowView';

test('renders correctly', () => {
  const tree = renderer
    .create(<CategoryRowView navigation={undefined} category={''} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
