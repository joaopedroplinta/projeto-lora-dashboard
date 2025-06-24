import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../api/service';
import { RadioTower } from 'lucide-react';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.registerUser({ name, email, password_hash: password });
      navigate('/login'); // Redireciona para o login após o sucesso
    } catch (err: any) {
      setError(err.message || 'Não foi possível criar a conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-center"><RadioTower className="w-12 h-12 text-teal-400"/></div>
        <h2 className="text-2xl font-bold text-center text-white">Criar Nova Conta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-300">Nome</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" /></div>
          <div><label className="block text-sm font-medium text-gray-300">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" /></div>
          <div><label className="block text-sm font-medium text-gray-300">Senha</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" /></div>
          {error && <p className="text-sm text-center text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-2 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">{loading ? 'Criando...' : 'Criar Conta'}</button>
        </form>
        <p className="text-sm text-center text-gray-400">Já tem uma conta? <Link to="/login" className="font-medium text-teal-400 hover:underline">Faça login</Link></p>
      </div>
    </div>
  );
};