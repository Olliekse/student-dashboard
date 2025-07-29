import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary
      fallback={<div>Oops! Something broke. Please try again later.</div>}
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
