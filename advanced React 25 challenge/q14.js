import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch() {}

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 10 }}>
          <div style={{ color: "crimson" }}>Something went wrong.</div>
          <div style={{ marginTop: 8 }}>{String(this.state.error?.message || this.state.error)}</div>
          <button onClick={this.reset} style={{ marginTop: 10 }}>Reset</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Buggy({ boom }) {
  if (boom) throw new Error("Boom");
  return <div>OK</div>;
}

export default function App() {
  const [boom, setBoom] = React.useState(false);
  return (
    <div style={{ padding: 16 }}>
      <h3>Error Boundary</h3>
      <button onClick={() => setBoom((v) => !v)}>Toggle Error</button>
      <div style={{ marginTop: 12 }}>
        <ErrorBoundary>
          <Buggy boom={boom} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
