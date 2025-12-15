import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FoodForm } from './components/FoodForm';
import { ResultOverlay } from './components/ResultOverlay';
import { DEFAULT_FOODS, OverlayState } from './types';

// Constants for animation
const ANIMATION_SPEED_MS = 60;
const MAX_LOOPS = 30;
const STORAGE_KEY = 'food_picker_options';

const App: React.FC = () => {
  // Initialize state from local storage if available, otherwise use defaults
  const [inputText, setInputText] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? saved : DEFAULT_FOODS;
    } catch (e) {
      console.warn('Failed to access localStorage:', e);
      return DEFAULT_FOODS;
    }
  });

  const [overlayState, setOverlayState] = useState<OverlayState>({
    isOpen: false,
    currentText: '准备中...',
    backgroundColor: '#333',
    isAnimating: false,
  });

  // Save to local storage whenever inputText changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, inputText);
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [inputText]);

  // Helper to generate readable dark background colors
  const getRandomColor = useCallback(() => {
    // HSL: Hue 0-360, Saturation 70%, Lightness 35% (Darker for white text contrast)
    const h = Math.floor(Math.random() * 360);
    return `hsl(${h}, 70%, 35%)`;
  }, []);

  const startDeciding = useCallback(() => {
    const foods = inputText
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    if (foods.length === 0) {
      alert('请先在输入框里写几个选项（每行一个）！');
      return;
    }

    // Initial state for animation
    setOverlayState({
      isOpen: true,
      currentText: foods[0],
      backgroundColor: getRandomColor(),
      isAnimating: true,
    });

    let loopCount = 0;
    
    const intervalId = setInterval(() => {
      loopCount++;
      
      // Random pick during animation
      const randomIndex = Math.floor(Math.random() * foods.length);
      const randomColor = getRandomColor();

      if (loopCount >= MAX_LOOPS) {
        clearInterval(intervalId);
        
        // Final selection
        const finalIndex = Math.floor(Math.random() * foods.length);
        const finalColor = getRandomColor();
        
        setOverlayState({
          isOpen: true,
          currentText: foods[finalIndex],
          backgroundColor: finalColor,
          isAnimating: false, // Animation done, enable click to close
        });
      } else {
        // Animation step
        setOverlayState({
          isOpen: true,
          currentText: foods[randomIndex],
          backgroundColor: randomColor,
          isAnimating: true,
        });
      }
    }, ANIMATION_SPEED_MS);

  }, [inputText, getRandomColor]);

  const closeOverlay = () => {
    setOverlayState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
      <FoodForm 
        value={inputText} 
        onChange={setInputText} 
        onStart={startDeciding} 
      />
      
      <ResultOverlay 
        state={overlayState} 
        onClose={closeOverlay} 
      />
    </div>
  );
};

export default App;