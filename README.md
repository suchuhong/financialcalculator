# Financial Calculator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black.svg?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC.svg?logo=tailwind-css)

[简体中文](README.zh.md) | [日本語](README.ja.md)

An elegant and powerful financial calculator web application built with the latest web technologies. It provides a suite of essential financial tools with a clean, responsive interface, available in English, Chinese, and Japanese. Perfect for students, professionals, and anyone looking to make informed financial decisions.

---

## 🌐 Live Demo

**[https://financialcalculator.site/](https://financialcalculator.site/)**

## 📸 Screenshots

*Insert screenshots of your application here to showcase the elegant UI.*

## ✨ Key Features

### Core Calculators
- **Present Value Calculator**: Calculate the current worth of a future sum of money.
- **Future Value Calculator**: Determine the value of a current asset at a future date.
- **IRR (Internal Rate of Return) Calculator**: Evaluate the profitability of an investment.
- **Loan Calculator**: Compute monthly payments and total interest for a loan.
- **Breakeven Analysis Calculator**: Find the point where total revenue equals total costs.
- **Opportunity Cost Calculator**: Understand the potential benefits missed when choosing one alternative over another.

### User Experience
- **Multilingual Support**: Seamlessly switch between English, Chinese, and Japanese.
- **Modern UI**: A clean and beautiful design built with Tailwind CSS.
- **Fully Responsive**: A flawless experience on desktop, tablet, and mobile devices.
- **Intuitive Components**: Built with Radix UI for accessibility and best practices.

### Educational Content
- **Knowledge Base**: Learn the core financial concepts behind each calculator.
- **Case Studies**: Understand practical applications through real-world examples.

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.3.4, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Lucide React (for icons)
- **Internationalization**: `next-intl`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended), npm, or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd financial-calculator

# Install dependencies
pnpm install
````

### Development

```bash
# Run the development server
pnpm dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## 📁 Project Structure

```
financial-calculator/
├── app/                  # Next.js App Directory
│   └── [locale]/         # Dynamic locale routing
│       ├── cases/        # Case studies pages
│       ├── knowledge/    # Knowledge base pages
│       ├── tools/        # Financial tools pages
│       └── page.tsx      # Home page
├── components/           # React components
├── i18n/                 # Internationalization configs
├── messages/             # Translation messages (en.json, zh.json, ja.json)
└── public/               # Public assets
```

## 🤝 Contributing

Contributions are welcome\! Please feel free to submit a Pull Request or create an Issue if you have any ideas or suggestions.

## 📄 License

This project is licensed under the [MIT](https://www.google.com/search?q=LICENSE) License.

