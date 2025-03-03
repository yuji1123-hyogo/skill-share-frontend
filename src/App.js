import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import ErrorBoundaryFallback from "./components/atoms/errors/ErrorBoundaryFallback";
import LoadingIndicator from "./components/atoms/loading/LoadingIndicator";



const App = () => {
  return (
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            <Suspense fallback={<LoadingIndicator />}>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <AppRoutes />
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
  );
};

export default App;
