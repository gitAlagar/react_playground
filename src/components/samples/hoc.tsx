import React from "react";

type WithLoaderProps = {
  isLoading?: boolean;
  error?: string;
};

const withLoader = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P & WithLoaderProps> => {
  const EnhancedComponent: React.FC<P & WithLoaderProps> = ({isLoading,error, ...props}) => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      console.log(error)
      return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return EnhancedComponent;
};

export default withLoader;

// A Higher-Order Component (HOC) is a function that takes a component 
// as input and returns a new component with additional functionality.

// function withExtraProps(WrappedComponent) {
//   return function EnhancedComponent(props) {
//     return <WrappedComponent {...props} extraProp="I am added by HOC" />;
//   };
// }

// When to Use HOCs

// Code reuse (common logic across multiple components).

// Injecting props (like authentication, theming).

// Conditional rendering.

// Handling cross-cutting concerns (logging, error boundaries, analytics).