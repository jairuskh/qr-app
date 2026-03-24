# QR Code Tools

A minimalist web app to generate and decode QR codes instantly. Works on all devices worldwide.

## Features

- 🎯 **Generate QR Codes** - Convert any text or URL into a QR code
- 📸 **Decode QR Codes** - Upload screenshots to instantly decode QR codes
- 📱 **Mobile Friendly** - Works seamlessly on phones, tablets, and desktops
- 🌍 **Worldwide Access** - Deployed globally with instant loading
- ✨ **Clean Design** - Minimalist white UI with smooth micro animations
- ⚡ **Fast** - Built with React and Vite for blazing-fast performance

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

## Deployment

This app is ready to deploy on:

- **Vercel** (Recommended)
  1. Push code to GitHub
  2. Connect repo to Vercel
  3. Deploy automatically

- **Other Platforms**
  - Netlify
  - GitHub Pages
  - Any static hosting service

The `dist/` folder contains the production build.

## Technologies

- React 19
- Vite 8
- html5-qrcode - QR decoding
- qrcode - QR generation

## License

MIT
