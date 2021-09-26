import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../LoginScreen';

test('renders correctly', async () => {
  const tree = renderer.create(<LoginScreen navigation={undefined} />).toJSON();
  expect(tree).toMatchSnapshot();
});
