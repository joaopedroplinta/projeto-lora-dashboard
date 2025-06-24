export const Footer = () => {
    const members = ["João Pedro Plinta", "João Pedro Camargo", "Matheus Eiras", "Ricardo", "Yuri"];
  return (
    <footer className="w-full mt-auto p-4 text-center text-gray-500">
        <p>Projeto LoRa - Integrantes:</p>
        <p className="text-gray-400 text-sm">{members.join(' • ')}</p>
    </footer>
  );
};