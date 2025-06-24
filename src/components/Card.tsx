import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 ${className}`}>
      <h2 className="text-xl font-bold text-teal-300 mb-4 border-b border-gray-600 pb-2">{title}</h2>
      {children}
    </div>
  );
};