//@ts-nocheck
import React from "react"
export class ErrorBoundary extends React.Component {
  constructor(props:any) {
      super(props);
      this.state = { hasError: undefined };
    }
  
    static getDerivedStateFromError(error:any) {
      // Update state so the next render will show the fallback UI.
      return { hasError: error };
    }
  
    componentDidCatch(error:any, info:any) {
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