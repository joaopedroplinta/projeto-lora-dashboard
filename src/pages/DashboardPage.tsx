import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ConfigPanel } from '../components/ConfigPanel';
import { MessageList } from '../components/MessageList';
import { Footer } from '../components/Footer';
import { SendMessageForm } from '../components/SendMessageForm';
import * as api from '../api/service';
import { LoRaData } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const DashboardPage = () => {
  const [data, setData] = useState<LoRaData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token, logout, user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Autenticação necessária.");
        logout();
        return;
      }
      try {
        const loRaData = await api.getLoRaData(token);
        setData(loRaData);
      } catch (err: any) {
        setError(err.message || "Falha ao carregar dados. Faça login novamente.");
        logout();
      }
    };

    fetchData();
  }, [token, logout]);

  const handleSendMessage = (payload: string) => {
    // Aqui você chamaria um endpoint para enviar mensagens, se ele existir
    console.log("Enviando mensagem (simulado):", payload);
    alert(`Mensagem "${payload}" enviada para a fila! (simulado)`);
  };
  
  if (error) return <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500 text-center p-4">{error}</div>
  if (!data) return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Carregando Dashboard...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_#1e3a8a_0%,_#111827_50%)] opacity-30 -z-10"></div>
      <div className="relative z-10 flex flex-col flex-grow">
        <div className="absolute top-4 right-4 flex items-center gap-4">
          <span className="text-gray-300">Olá, {user?.name}!</span>
          <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-md transition-colors">Logout</button>
        </div>
        <Header />
        <main className="container mx-auto px-4 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex flex-col gap-6">
              <ConfigPanel status={data.status} config={data.config} />
              <SendMessageForm onSendMessage={handleSendMessage} />
            </div>
            <div className="md:col-span-2">
              <MessageList messages={data.messages} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};