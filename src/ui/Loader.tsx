import type { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-first-bg/70 backdrop-blur-sm z-50">
      <div className="w-12 h-12 border-4 border-secondary-border border-t-primary-text rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
