import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/IT Corpo React App/i);
  expect(linkElement).toBeInTheDocument();
});
