import type { FC } from "react";

const Loader: FC<{ showInitWarning?: boolean }> = ({ showInitWarning }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-first-bg/70 backdrop-blur-sm z-50 space-y-6">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-secondary-border border-t-primary-text rounded-full animate-spin"></div>

      {/* Warning text */}
      {showInitWarning && (
        <p className="text-md text-secondary-border text-center px-4">
          The first request may take a little longer as the server is initializing...
        </p>
      )}
    </div>
  );
};


export default Loader;
