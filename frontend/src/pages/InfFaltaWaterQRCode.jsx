import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const InfFaltaWaterQRCode = () => {
  // URL padrão para a versão mobile — altere conforme seu ambiente
  const defaultMobileUrl = 'https://meusistema.com/mobile/alerta-falta-agua';
  const [mobileUrl, setMobileUrl] = useState(() => {
    // se houver uma URL salva no localStorage, usa ela
    return localStorage.getItem('mobileUrlInfFalta') || defaultMobileUrl;
  });

  const qrSrc = (url) => `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(url)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mobileUrl);
      alert('Link copiado para a área de transferência!');
    } catch (e) {
      alert('Não foi possível copiar. Copie manualmente: ' + mobileUrl);
    }
  };

  const handleOpenMobile = () => {
    window.open(mobileUrl, '_blank');
  };

  const handleSave = () => {
    localStorage.setItem('mobileUrlInfFalta', mobileUrl);
    alert('URL salva localmente.');
  };

  return (
    <Layout>
      <Logo />
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow mt-6 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">QR Code - Versão Mobile</h2>

        <p className="text-sm text-gray-600 mb-4">Aponte a câmera do seu celular para o QR Code abaixo para abrir a versão mobile deste serviço.</p>

        <div className="flex flex-col items-center gap-4">
          <img src={qrSrc(mobileUrl)} alt="QR Code para mobile" className="w-40 h-40 shadow-lg rounded" />

          <input
            className="w-full p-2 border rounded text-sm"
            value={mobileUrl}
            onChange={(e) => setMobileUrl(e.target.value)}
            aria-label="URL mobile"
          />

          <div className="flex gap-3 w-full">
            <div className="flex-1"><Button label={"Abrir no celular"} onClick={handleOpenMobile} /></div>
            <div className="flex-1"><Button label={"Copiar link"} onClick={handleCopy} /></div>
            <div className="flex-1"><Button label={"Salvar URL"} onClick={handleSave} /></div>
          </div>

          <p className="text-xs text-gray-500 mt-2">Dica: você pode editar o link acima e salvar para trocar o destino do QR Code.</p>
        </div>
      </div>
    </Layout>
  );
};

export default InfFaltaWaterQRCode;
