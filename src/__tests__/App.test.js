import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

test('should render page', () => {
  render(<App />);
  const openBtn = screen.getByRole("button", { name: "Cliquez Moi" });
  const modal = screen.queryByRole("dialog");
  expect(openBtn).toBeInTheDocument();
  expect(openBtn).toBeVisible();
  expect(modal).not.toBeInTheDocument();
});

test('should open modal', () => {
  render(<App />);
  const openBtn = screen.getByRole("button", { name: "Cliquez Moi" });
  fireEvent.click(openBtn);
  const modal = screen.getByRole("dialog");

  // assert
  expect(screen.getByText('Bonjour Laval!')).toBeVisible();
  expect(screen.getByRole("button", { name: "Fermez" })).toBeVisible();
  expect(modal).toBeVisible();
  expect(modal).toBeInTheDocument();
  expect(modal).toHaveClass('show');
});

test('should close modal', () => {
  render(<App />);
  const openBtn = screen.getByRole("button", { name: "Cliquez Moi" });
  fireEvent.click(openBtn);

  const modal = screen.queryByRole("dialog");
  const closeBtn = screen.getByRole("button", { name: "Fermez" });
  fireEvent.click(closeBtn);

  setTimeout(() => {
    expect(openBtn).toBeVisible();
    expect(screen.queryByText('Bonjour Laval!')).toBeNull();
    expect(screen.queryByText('Bonjour Laval!')).not.toBeVisible();
    expect(closeBtn).toBeNull();
    expect(modal).not.toBeInTheDocument();
  }, 500);
});

test('main button should have the correct background color', () => {
  render(<App/>);
  const openBtn = screen.getByRole("button", { name: "Cliquez Moi" });
  const computedStyle = window.getComputedStyle(openBtn);
  expect(computedStyle.backgroundColor).toBe('rgb(0, 84, 166)');
});

test('modal should not close when user clicks outside', () => {
  render( < App/> );
  const openBtn = screen.getByRole("button", { name: "Cliquez Moi" });
  fireEvent.click(openBtn);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  userEvent.click(screen.getByRole('dialog'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
