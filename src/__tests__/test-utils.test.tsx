import React from "react";
import { Text } from "react-native";
import { renderWithNavigation, mockNavigation } from "../test-utils";

describe("Test Utilities", () => {
  it("should render component with navigation mock", () => {
    const { getByText } = renderWithNavigation(<Text>Test Component</Text>);
    expect(getByText("Test Component")).toBeTruthy();
  });

  it("should provide navigation mock functions", () => {
    expect(mockNavigation.navigate).toBeDefined();
    expect(mockNavigation.goBack).toBeDefined();
    expect(mockNavigation.setOptions).toBeDefined();
    expect(mockNavigation.addListener).toBeDefined();
    expect(mockNavigation.removeListener).toBeDefined();
  });
});
