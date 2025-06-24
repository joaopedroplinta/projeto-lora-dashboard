import { Settings, Cpu, Zap } from 'lucide-react';
import { LoraConfig, LoraDeviceStatus } from '../types';
import { Card } from './Card';

interface ConfigPanelProps {
  status: LoraDeviceStatus | null;
  config: LoraConfig | null;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ status, config }) => {
  const isOnline = status?.status === 'online';

  return (
    <Card title="Status & Configuração">
      {status && (
        <div className="flex items-center mb-4">
          <span className={`w-4 h-4 rounded-full mr-3 ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <span className="font-semibold text-lg text-white">{status.deviceId}</span>
          <span className={`ml-auto text-sm font-bold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>{status.status.toUpperCase()}</span>
        </div>
      )}
      <div className="space-y-3 text-gray-300">
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Settings size={18} /> Frequência:</div><span className="font-mono bg-gray-700 px-2 py-1 rounded">{config?.frequency} MHz</span></div>
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Cpu size={18} /> Largura de Banda:</div><span className="font-mono bg-gray-700 px-2 py-1 rounded">{config?.bandwidth} KHz</span></div>
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Zap size={18} /> Spreading Factor:</div><span className="font-mono bg-gray-700 px-2 py-1 rounded">{config?.spreadingFactor}</span></div>
      </div>
    </Card>
  );
};