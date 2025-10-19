import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const DEFAULT_MOBILE_URL = 'https://meusistema.com/mobile/editar-cadastro';

const EditCadastroQRCode = () => {
  const [url, setUrl] = useState(localStorage.getItem('editCadastroUrl') || DEFAULT_MOBILE_URL);

  const qrSrc = (u) => `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(u)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copiado!');
    } catch (e) {
      alert('Não foi possível copiar. Copie manualmente: ' + url);
    }
  };

  const handleOpen = () => window.open(url, '_blank');

  const handleSave = () => {
    localStorage.setItem('editCadastroUrl', url);
    alert('URL salva localmente.');
  };

  return (
    <Layout>
      <Logo />
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow mt-6 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">QR Code - Editar Cadastro (Mobile)</h2>

        <img src={qrSrc(url)} alt="QR Editar Cadastro" className="w-40 h-40 mx-auto mb-4" />

        <input className="w-full p-2 mb-3 border rounded" value={url} onChange={(e) => setUrl(e.target.value)} />

        <div className="flex gap-3">
          <div className="flex-1"><Button label="Abrir" onClick={handleOpen} /></div>
          <div className="flex-1"><Button label="Copiar" onClick={handleCopy} /></div>
          <div className="flex-1"><Button label="Salvar" onClick={handleSave} /></div>
        </div>

        <p className="text-xs text-gray-500 mt-3">Edite o link caso queira apontar para um servidor de homologação ou outra rota mobile.</p>
      </div>
    </Layout>
  );
};

export default EditCadastroQRCode;
