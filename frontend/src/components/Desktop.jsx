import React, { useState } from 'react';
import TextField from './TextField';
import Button from './Button';

export default function Desktop() {
  const [formData, setFormData] = useState({
    openaiApiKey: '',
    host: '',
    senderEmail: '',
    senderPassword: '',
    recipientEmail: '',
    emailTopic: ''
  });

  const [preview, setPreview] = useState('');

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleGenerate = () => {
    const emailPreview = `Od: ${formData.senderEmail}
Do: ${formData.recipientEmail}
Temat: ${formData.emailTopic}

Treść wiadomości zostanie wygenerowana przez AI...`;
    setPreview(emailPreview);
    alert('Email został wygenerowany!');
  };

  const handleSend = () => {
    alert('Email został wysłany!');
  };

  return (
    <div className="desktop-root">
      <div className="desktop-title">AI Mail Agent</div>

      <div className="desktop-main">
        <aside className="panel settings">
          <div className="panel-title">Ustawienia</div>
          <TextField 
            label="OPENAI_API_KEY" 
            placeholder="Wpisz klucz API OpenAI" 
            value={formData.openaiApiKey}
            onChange={handleInputChange('openaiApiKey')}
          />
          <TextField 
            label="Host" 
            placeholder="smtp.gmail.com" 
            value={formData.host}
            onChange={handleInputChange('host')}
          />
        </aside>

        <section className="panel form">
          <div className="panel-title center">Wyślij maila</div>
          <TextField 
            label="Email nadawcy" 
            placeholder="your-email@gmail.com" 
            value={formData.senderEmail}
            onChange={handleInputChange('senderEmail')}
          />
          <TextField 
            label="Hasło do emaila" 
            placeholder="Wpisz hasło" 
            type="password"
            value={formData.senderPassword}
            onChange={handleInputChange('senderPassword')}
          />
          <TextField 
            label="Email odbiorcy" 
            placeholder="recipient@example.com" 
            value={formData.recipientEmail}
            onChange={handleInputChange('recipientEmail')}
          />
          <TextField 
            label="O czym ma być mail?" 
            placeholder="Opisz temat wiadomości" 
            value={formData.emailTopic}
            onChange={handleInputChange('emailTopic')}
          />
          <Button onClick={handleGenerate}>Generuj</Button>
        </section>

        <aside className="panel view">
          <div className="panel-title">Podgląd</div>
          <TextField 
            multiline 
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            placeholder="Tutaj pojawi się wygenerowana wiadomość..."
          />
          <Button onClick={handleSend}>Wyślij</Button>
        </aside>
      </div>
    </div>
  );
}


