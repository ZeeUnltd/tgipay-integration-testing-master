import React from "react";

interface Props {
  show?: boolean;
}
const FullscreenLoader: React.FC<Props> = ( { show = false } ) => {

  if (!show) return null;

  return (
    <div data-cy="fullscreen-loader" className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default FullscreenLoader;
