import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    }

	render() {
		if (this.state.hasError) {
			return (
				<div className='w-full h-full flex justify-center items-center'>
					<p>
						Oops! Something has gone wrong.<br/>Please try refreshing.
					</p>
				</div>
			)
		} 
		return this.props.children
	}
} 

export default ErrorBoundary;