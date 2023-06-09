import 'react-native';
import React from 'react';
import { Landing } from './landing';

// Note: test renderer must be required after react-native.
import { render } from '../../test-utils';

it('renders correctly', () => {
  render(<Landing />);
});
