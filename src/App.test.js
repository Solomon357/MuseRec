import { render, screen } from '@testing-library/react';
//import App from './App';
import Homepage from './components/Homepage';

test('renders Homepage title element', () => {
  render(<Homepage />);
  const titleElement = screen.getByText(/Homepage/i);
  expect(titleElement).toBeInTheDocument();
});
