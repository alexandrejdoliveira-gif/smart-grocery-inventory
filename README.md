# 🛒 Smart Grocery Inventory - Intelligent Price Tracking PWA

> **Revolutionary grocery inventory management system powered by crowdsourced real-world pricing data**

## 🎯 Vision

The first and only app that tracks **real physical store prices** (not online prices) through passive crowdsourcing. Every receipt scanned makes the system smarter for everyone.

## 🚀 Key Features

### Phase 1 (MVP) - Current
- 📸 **OCR Receipt Scanning** - Automatic data extraction from grocery receipts
- 📦 **Digital Inventory** - Track what you have at home
- 💰 **Price Intelligence** - Know if prices went up or down
- 🏪 **Multi-Store Comparison** - Find the best deals near you

### Phase 2 (Planned)
- 🧠 **Predictive Restocking** - AI predicts when you'll run out
- 📊 **Price Trends** - Historical price analysis
- 🎯 **Smart Recommendations** - Best time and place to buy
- 👥 **Crowdsourced Data** - Network effect pricing intelligence

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **PWA**: next-pwa (Service Workers, offline support)
- **Deployment**: Vercel
- **Database**: (TBD - Supabase/PostgreSQL planned)
- **OCR**: (TBD - Google Cloud Vision API planned)

## 📋 Prerequisites

- Node.js 18+ 
- npm 9+
- Git

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-grocery-inventory.git
cd smart-grocery-inventory
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
smart-grocery-inventory/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utilities and helpers
├── public/               # Static assets
│   ├── icons/           # PWA icons
│   └── manifest.json    # PWA manifest
├── docs/                # Documentation
│   ├── especificacao-tecnica.md
│   ├── us-market-adaptations.md
│   └── intelligent-pricing-system.md
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js and deploys
4. Done! ✅

### Manual Deployment

```bash
npm run build
# Deploy the .next folder to your hosting provider
```

## 🗺️ Roadmap

- [x] Project setup and documentation
- [x] Git repository initialization
- [ ] Basic UI/UX design
- [ ] Receipt upload functionality
- [ ] OCR integration
- [ ] Product database schema
- [ ] Price prediction algorithm
- [ ] User authentication
- [ ] Crowdsourcing system
- [ ] Mobile app (React Native)

## 📊 Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Production hotfixes

### Commit Convention

```
feat: Add receipt OCR functionality
fix: Resolve price calculation bug
docs: Update API documentation
style: Format code with Prettier
refactor: Optimize price prediction algorithm
test: Add unit tests for product normalization
chore: Update dependencies
```

## 🤝 Contributing

This is currently a private project. Contribution guidelines will be added when open-sourced.

## 📄 License

Proprietary - All rights reserved (for now)

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for smarter grocery shopping**
