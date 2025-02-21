import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

//  エラーバウンダリのフォールバック UI
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <h2>エラーが発生しました</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>リトライ</button>
  </div>
);

// ローディングフォールバック UI
const LoadingFallback = () => <p>ページを読み込み中...</p>;

const App = () => {
  return (
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingFallback />}>
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
