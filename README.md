# AI Mail Agent

A complete email composition application built from Figma design, featuring React frontend and PHP backend integration.

## 🎨 Design

Based on the Figma design: [AI Agent email](https://www.figma.com/design/Ku4WcTQslqaxVGBaCcHBbd/AI-Agent-email?node-id=1-3&t=0wG39cN1EsmCw7Cz-4)

## 🏗️ Project Structure

```
agent-email/
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/      # React Components
│   │   │   ├── TextField.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Desktop.jsx
│   │   ├── styles/
│   │   │   └── desktop.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── README.md
├── send.php                  # PHP Backend
├── composer.json            # PHP Dependencies
├── start-app.bat           # Windows startup script
├── start-app.sh            # Unix startup script
└── README.md               # This file
```

## 🚀 Quick Start

### Option 1: Use Startup Scripts
- **Windows**: Double-click `start-app.bat`
- **Unix/Linux/Mac**: Run `./start-app.sh`

### Option 2: Manual Start
```bash
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:3000`

## 🎯 Features

### Frontend (React)
- **Exact Figma Design**: Perfect match to original design
- **Three-Panel Layout**: Settings, Form, and Preview panels
- **Interactive Form**: Real-time form state management
- **Email Preview**: Live preview of composed emails
- **Download Functionality**: Export emails as text files
- **Responsive Design**: Matches desktop frame specifications

### Backend (PHP)
- **Email Sending**: PHPMailer integration
- **OpenAI Integration**: AI-powered email generation
- **Environment Configuration**: Secure API key management

## 🛠️ Development

### Frontend Development
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run tests
```

### Backend Development
```bash
composer install   # Install PHP dependencies
php send.php       # Test email sending
```

## 📦 Dependencies

### Frontend
- React 18
- Create React App
- Modern CSS with Grid/Flexbox

### Backend
- PHP 7.4+
- PHPMailer
- OpenAI PHP Client
- Composer

## 🎨 Design Specifications

- **Colors**: Dark theme (#21252E background, #272A34 panels, #3963A1 buttons)
- **Layout**: Three-column grid (Settings, Form, View)
- **Typography**: Khand font family with precise sizing
- **Spacing**: Exact pixel-perfect positioning from Figma

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```
OPENAI_API_KEY=your_openai_api_key_here
SMTP_HOST=your_smtp_host
SMTP_USERNAME=your_email
SMTP_PASSWORD=your_password
```

## 📱 Usage

1. **Configure Settings**: Enter your API key and model preferences
2. **Compose Email**: Fill in recipient, subject, and content
3. **Preview**: View the generated email in the preview panel
4. **Download**: Export the email as a text file

## 🚀 Deployment

### Frontend
```bash
cd frontend
npm run build
# Deploy the 'build' folder to your web server
```

### Backend
```bash
# Upload PHP files to your web server
# Ensure PHP dependencies are installed
```

## 📄 License

MIT License - feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or issues, please open an issue in the repository.
