import { RadioTower } from 'lucide-react';

export const Header = () => {
  return (
    <header className="w-full p-4 mb-8">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <RadioTower className="w-10 h-10 text-teal-400" />
        <h1 className="text-4xl font-bold text-white tracking-wider">
          LoRa Project Dashboard
        </h1>
      </div>
    </header>
  );
};