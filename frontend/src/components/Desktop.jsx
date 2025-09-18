import React, { useState } from 'react';
import TextField from './TextField';
import Button from './Button';
import { getApiUrl, API_CONFIG } from '../config/api';

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

  const handleGenerate = async () => {
    if (!formData.openaiApiKey || !formData.emailTopic) {
      alert('Proszę wypełnić klucz API i temat wiadomości');
      return;
    }

    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.MAIL), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generate',
          openaiApiKey: formData.openaiApiKey,
          emailTopic: formData.emailTopic,
          senderEmail: formData.senderEmail,
          recipientEmail: formData.recipientEmail
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setPreview(data.content);
        alert('Email został wygenerowany pomyślnie!');
      } else {
        alert('Błąd: ' + data.error);
      }
    } catch (error) {
      alert('Błąd połączenia: ' + error.message);
    }
  };

  const handleSend = async () => {
    if (!formData.senderEmail || !formData.senderPassword || !formData.recipientEmail || !preview) {
      alert('Proszę wypełnić wszystkie pola i wygenerować wiadomość');
      return;
    }

    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.MAIL), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send',
          senderEmail: formData.senderEmail,
          senderPassword: formData.senderPassword,
          recipientEmail: formData.recipientEmail,
          host: formData.host,
          emailContent: preview,
          subject: formData.emailTopic
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Email został wysłany pomyślnie!');
      } else {
        alert('Błąd wysyłania: ' + data.error);
      }
    } catch (error) {
      alert('Błąd połączenia: ' + error.message);
    }
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


