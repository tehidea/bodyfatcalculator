import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";

// Mock navigation for components that use useNavigation
export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
};

// Mock the navigation module
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => mockNavigation,
    NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
  };
});

export function renderWithNavigation(ui: React.ReactElement) {
  return render(ui);
}
