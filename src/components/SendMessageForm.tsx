import { useState } from 'react';
import { Send } from 'lucide-react';
import { Card } from './Card';

export const SendMessageForm: React.FC<{ onSendMessage: (payload: string) => void; }> = ({ onSendMessage }) => {
  const [payload, setPayload] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (payload.trim()) {
      onSendMessage(payload.trim());
      setPayload('');
    }
  };

  return (
    <Card title="Transmitir Mensagem">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input type="text" value={payload} onChange={(e) => setPayload(e.target.value)} placeholder="Digite sua mensagem..." className="flex-grow bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"/>
        <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-colors duration-200"><Send size={16} /> Enviar</button>
      </form>
    </Card>
  );
};