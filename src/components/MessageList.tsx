import { Rssi, MessageSquareText, Clock } from 'lucide-react';
import { LoraMessage } from '../types';
import { Card } from './Card';

export const MessageList: React.FC<{ messages: LoraMessage[] }> = ({ messages }) => {
  return (
    <Card title="Mensagens Recebidas">
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {messages.length === 0 ? (<p className="text-gray-400">Nenhuma mensagem recebida.</p>) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
              <div className="flex justify-between items-start"><p className="font-mono text-lg text-white">{msg.payload}</p><div className="flex items-center text-xs text-gray-400 gap-1"><Clock size={14}/>{new Date(msg.timestamp).toLocaleTimeString()}</div></div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400"><span className="flex items-center gap-1"><Rssi size={16} className="text-blue-400"/> RSSI: {msg.rssi} dBm</span><span className="flex items-center gap-1"><MessageSquareText size={16} className="text-green-400"/> SNR: {msg.snr.toFixed(1)}</span></div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};