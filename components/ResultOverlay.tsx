import React from 'react';
import { OverlayState } from '../types';

interface ResultOverlayProps {
  state: OverlayState;
  onClose: () => void;
}

export const ResultOverlay: React.FC<ResultOverlayProps> = ({ state, onClose }) => {
  if (!state.isOpen) return null;

  return (
    <div
      onClick={state.isAnimating ? undefined : onClose}
      style={{ backgroundColor: state.backgroundColor }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-100 ease-linear ${
        state.isAnimating ? 'cursor-wait' : 'cursor-pointer'
      }`}
    >
      <div 
        className="font-bold text-white text-center leading-tight p-5 break-all select-none drop-shadow-md transition-all duration-75"
        style={{ fontSize: '15vw', textShadow: '3px 3px 10px rgba(0,0,0,0.6)' }}
      >
        {state.currentText}
      </div>

      {!state.isAnimating && (
        <div className="absolute bottom-12 text-white/80 text-lg md:text-xl font-medium drop-shadow-md animate-bounce">
          点击屏幕任意处返回
        </div>
      )}
    </div>
  );
};