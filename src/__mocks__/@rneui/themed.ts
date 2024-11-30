import React from "react";

export const Button = ({ children, ...props }: any) =>
  React.createElement("Button", props, children);
export const Text = ({ children, ...props }: any) => React.createElement("Text", props, children);
export const Card = {
  Title: ({ children, ...props }: any) => React.createElement("CardTitle", props, children),
};
export const Icon = () => null;

export const createTheme = (theme: any) => theme;
export const ThemeProvider = ({ children }: any) =>
  React.createElement(React.Fragment, null, children);
export const useTheme = () => ({
  theme: {
    colors: {
      primary: "#000",
      secondary: "#666",
      white: "#fff",
      error: "#ff0000",
    },
  },
});

// Add other commonly used components
export const Input = ({ children, ...props }: any) => React.createElement("Input", props, children);
export const Overlay = ({ children, ...props }: any) =>
  React.createElement("Overlay", props, children);
export const ListItem = ({ children, ...props }: any) =>
  React.createElement("ListItem", props, children);
