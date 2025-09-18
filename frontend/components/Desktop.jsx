import React, { useState } from 'react';
import TextField from './TextField';
import Button from './Button';

export default function Desktop() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    subject: '',
    content: '',
    apiKey: '',
    model: 'gpt-4o-mini'
  });

  const [preview, setPreview] = useState('');

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSend = () => {
    const emailPreview = `Od: ${formData.from}
Do: ${formData.to}
Temat: ${formData.subject}

${formData.content}`;
    setPreview(emailPreview);
    alert('Email został wygenerowany!');
  };

  const handleDownload = () => {
    const blob = new Blob([preview], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="desktop-root">
      <div className="desktop-title">AI Mail Agent</div>

      <div className="desktop-main">
        <aside className="panel settings">
          <div className="panel-title">Ustawienia</div>
          <TextField 
            label="API Key" 
            placeholder="Wpisz klucz API" 
            value={formData.apiKey}
            onChange={handleInputChange('apiKey')}
          />
          <TextField 
            label="Model" 
            placeholder="gpt-4o-mini" 
            value={formData.model}
            onChange={handleInputChange('model')}
          />
        </aside>

        <section className="panel form">
          <div className="panel-title center">Wyślij maila</div>
          <TextField 
            label="Od" 
            placeholder="you@example.com" 
            value={formData.from}
            onChange={handleInputChange('from')}
          />
          <TextField 
            label="Do" 
            placeholder="recipient@example.com" 
            value={formData.to}
            onChange={handleInputChange('to')}
          />
          <TextField 
            label="Temat" 
            placeholder="Temat wiadomości" 
            value={formData.subject}
            onChange={handleInputChange('subject')}
          />
          <TextField 
            label="Treść" 
            placeholder="Napisz wiadomość" 
            multiline 
            value={formData.content}
            onChange={handleInputChange('content')}
          />
          <Button onClick={handleSend}>Wyślij</Button>
        </section>

        <aside className="panel view">
          <TextField 
            label="Podgląd" 
            multiline 
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
          />
          <Button onClick={handleDownload}>Pobierz</Button>
        </aside>
      </div>
    </div>
  );
}


