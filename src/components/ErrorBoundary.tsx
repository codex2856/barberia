import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error inesperado en la aplicación:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-void px-6 text-center text-bone">
          <p className="font-display text-3xl">Algo salió mal</p>
          <p className="max-w-sm text-bone-dim">
            Recarga la página para continuar. Si el problema persiste, contacta con nosotros directamente.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
