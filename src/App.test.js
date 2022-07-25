import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {replaceCamelCaseWithSpaces} from './App';

test('button has correct initial color', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name : 'Change to Midnight Blue'});
  expect(colorButton).toHaveStyle({backgroundColor: 'MediumVioletRed'});
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({backgroundColor : 'MidnightBlue'});
  expect(colorButton.textContent).toBe('Change to Medium Violet Red');
});

test('initial conditions', () => {
  render (<App />);
  const colorButton = screen.getByRole('button', { name : 'Change to Midnight Blue'});
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('Checkbox disabled button on first click and enables on second click', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox');
  const button = screen.getByRole('button');
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test('Disabled button has a gray background and reverts to red', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const colorButton = screen.getByRole('button', {name : 'Change to Midnight Blue'});
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray');
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: MediumVioletRed');
});

test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const colorButton = screen.getByRole('button', { name : 'Change to Midnight Blue'});
  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color : gray');
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: MidnightBlue');
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelCaseWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelCaseWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelCaseWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  })
})
