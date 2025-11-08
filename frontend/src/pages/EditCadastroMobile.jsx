import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const STORAGE_KEY = 'cadastroMobile';

const EditCadastroMobile = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSave = () => {
    // validação simples
    if (!form.nome.trim()) return alert('Por favor, preencha o nome.');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    alert('Dados salvos com sucesso!');
  };

  const handleReset = () => {
    if (!confirm('Deseja limpar os dados locais?')) return;
    localStorage.removeItem(STORAGE_KEY);
    setForm({ nome: '', email: '', telefone: '', endereco: '' });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto p-4">
        <Logo />
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-4">Alterar Dados Cadastrais (Mobile)</h1>

        <label className="block text-sm font-medium mb-1 text-gray-700">Nome</label>
        <input className="w-full p-2 mb-3 rounded border" value={form.nome} onChange={handleChange('nome')} />

        <label className="block text-sm font-medium mb-1 text-gray-700">E-mail</label>
        <input className="w-full p-2 mb-3 rounded border" value={form.email} onChange={handleChange('email')} />

        <label className="block text-sm font-medium mb-1 text-gray-700">Telefone</label>
        <input className="w-full p-2 mb-3 rounded border" value={form.telefone} onChange={handleChange('telefone')} />

        <label className="block text-sm font-medium mb-1 text-gray-700">Endereço</label>
        <textarea className="w-full p-2 mb-3 rounded border" value={form.endereco} onChange={handleChange('endereco')} rows={3} />

        <div className="flex gap-3">
          <Button label="Salvar" onClick={handleSave} className="flex-1" />
          <Button label="Limpar" onClick={handleReset} className="flex-1" />
        </div>

        {/* Geração de link compartilhável e QR para mudança rápida */}
        <div className="mt-4 bg-gray-50 p-3 rounded">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Gerar link para alteração rápida</h3>
          <p className="text-xs text-gray-500 mb-2">O link inclui os dados atuais do formulário e pode ser aberto em um dispositivo móvel.</p>
          <ShareBlock form={form} />
        </div>
      </div>
    </Layout>
  );
};

export default EditCadastroMobile;

const ShareBlock = ({ form }) => {
  const baseUrl = window.location.origin + '/mobile/editar-cadastro';
  // gera query string simples (atenção: para produção, faça codificação/assinatura adequada)
  const qs = new URLSearchParams();
  if (form.nome) qs.set('nome', form.nome);
  if (form.email) qs.set('email', form.email);
  if (form.telefone) qs.set('telefone', form.telefone);
  if (form.endereco) qs.set('endereco', form.endereco);
  const shareUrl = `${baseUrl}?${qs.toString()}`;

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copiado!');
    } catch (e) {
      alert('Não foi possível copiar. Copie manualmente: ' + shareUrl);
    }
  };

  const handleOpen = () => window.open(shareUrl, '_blank');

  return (
    <div className="flex flex-col items-center gap-3">
      <img src={qrSrc} alt="QR Share" className="w-36 h-36" />
      <input className="w-full p-2 border rounded text-sm" value={shareUrl} readOnly />
      <div className="flex gap-2 w-full">
        <Button label="Abrir link" onClick={handleOpen} />
        <Button label="Copiar link" onClick={handleCopy} />
      </div>
    </div>
  );
};
