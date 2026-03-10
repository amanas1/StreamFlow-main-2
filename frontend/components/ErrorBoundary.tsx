import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-slate-900 flex items-center justify-center p-6 text-white text-center">
            <div className="max-w-xl">
                <h1 className="text-3xl font-bold mb-4 text-red-500">Something went wrong</h1>
                <p className="mb-4 text-slate-300">The application encountered an error. Please try refreshing the page.</p>
                {this.state.error && (
                    <pre className="bg-black/50 p-4 rounded text-left overflow-auto text-xs font-mono border border-red-500/20 mb-4">
                        {this.state.error.toString()}
                    </pre>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-primary rounded-full hover:bg-primary/80 transition-colors font-bold uppercase tracking-wider text-sm"
                    >
                        Reload Page
                    </button>
                    <button 
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors font-bold uppercase tracking-wider text-sm border border-white/10"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
