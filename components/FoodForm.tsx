import React from 'react';
import { Utensils } from 'lucide-react';

interface FoodFormProps {
  value: string;
  onChange: (value: string) => void;
  onStart: () => void;
}

export const FoodForm: React.FC<FoodFormProps> = ({ value, onChange, onStart }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md z-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Utensils className="text-blue-500" />
        今天吃什么？
      </h1>
      
      <p className="text-gray-500 text-sm mb-3 self-start pl-1">
        在下方输入候选项，每行一个：
      </p>
      
      <textarea
        className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl resize-y text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 mb-6 text-gray-700"
        placeholder="在这里输入食物，每行一个"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-4 px-12 text-xl rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all duration-200 w-full sm:w-auto"
      >
        开始选！
      </button>
    </div>
  );
};