# AI Mail Agent

A React application for intelligent email composition, built from Figma design.

## Features

- **Settings Panel**: Configure API key and AI model
- **Email Form**: Compose emails with from, to, subject, and content fields
- **Preview Panel**: View and download generated emails
- **Responsive Design**: Matches Figma design specifications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TextField.jsx
│   │   ├── Button.jsx
│   │   └── Desktop.jsx
│   ├── styles/
│   │   └── desktop.css
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## Components

- **TextField**: Reusable input component with label support
- **Button**: Reusable button component with hover effects
- **Desktop**: Main layout component with three-panel design

## Design

Based on Figma design with:
- Dark theme (#21252E background, #272A34 panels)
- Three-column layout (Settings, Form, View)
- Precise spacing and typography matching original design
- Interactive form elements with state management

## Technologies

- React 18
- Create React App
- CSS3 with CSS Grid and Flexbox
- Modern JavaScript (ES6+)
