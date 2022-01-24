import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/IT Corpo React App/i);
  expect(linkElement).toBeInTheDocument();
});
