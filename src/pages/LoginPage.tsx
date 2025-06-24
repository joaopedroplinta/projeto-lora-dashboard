import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RadioTower } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('test@example.com'); // Preenchido para facilitar o teste
  const [password, setPassword] = useState('password123'); // Preenchido para facilitar o teste
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password_hash: password });
      // A navegação ocorre dentro do AuthContext
    } catch (err: any) {
      setError(err.message || 'Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-center"><RadioTower className="w-12 h-12 text-teal-400"/></div>
        <h2 className="text-2xl font-bold text-center text-white">Login no Dashboard</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-300">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" /></div>
          <div><label className="block text-sm font-medium text-gray-300">Senha</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" /></div>
          {error && <p className="text-sm text-center text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-2 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
        <p className="text-sm text-center text-gray-400">Não tem uma conta? <Link to="/register" className="font-medium text-teal-400 hover:underline">Cadastre-se</Link></p>
      </div>
    </div>
  );
};