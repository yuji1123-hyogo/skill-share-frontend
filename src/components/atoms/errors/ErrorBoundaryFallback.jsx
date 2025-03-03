import React from "react";

//  エラーバウンダリのフォールバック UI
const ErrorBoundaryFallback = ({ error, resetErrorBoundary }) => (
    <div>
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>リトライ</button>
    </div>
  );
  
export default ErrorBoundaryFallback;