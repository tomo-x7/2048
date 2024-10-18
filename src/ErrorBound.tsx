//@ts-nocheck
import React from "react"
export class ErrorBoundary extends React.Component {
  constructor() {
      super();
      this.state = { hasError: undefined };
    }
  
    componentDidCatch(error:unknown, info:unknown) {
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      window.alert(error)
    }
  
    render() {
      return this.props.children;
    }
  }