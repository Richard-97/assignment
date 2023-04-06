export const components = {
  Button: {
    variants: {
      primary: {
        bg: "primary",
        color: "white",
        px: "5",
        py: "3",
        fontSize: "14px",
        fontWeight: 600,
        minWidth: "initial",
        _disabled: {
          backgroundColor: "gray.200",
          color: "primary",
        },
      },
      transparent: {
        bg: "white",
        color: "primary",
        fontSize: "14px",
        fontWeight: 400,
      },
    },
    defaultProps: {
      variant: "primary",
    },
  },
};
