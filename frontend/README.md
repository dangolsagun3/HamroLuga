# 🛒 HamroLuga - E-Commerce Product Management

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A modern, responsive e-commerce platform for managing and browsing products with real-time updates and dynamic pricing.**

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Project Structure](#project-structure) • [Contributing](#contributing)

</div>

---

## 📋 Overview

HamroLuga is a full-featured e-commerce application built with cutting-edge web technologies. It provides an intuitive interface for browsing products, managing inventory, and handling administrative tasks. The application is fully responsive and optimized for both desktop and mobile devices.

## ✨ Features

- 🛍️ **Product Management** - Add, edit, and delete products with ease
- 📱 **Fully Responsive Design** - Seamless experience across all devices
- 🎨 **Modern UI/UX** - Built with custom components and Tailwind CSS
- 🔐 **Type-Safe** - Full TypeScript support throughout the application
- 📊 **Admin Dashboard** - Comprehensive dashboard for managing sales and orders
- 📦 **Real-time Updates** - Dynamic product updates using modern APIs
- 🎯 **Clean Architecture** - Well-organized component structure
- ⚡ **High Performance** - Optimized with Next.js Turbopack

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 16.1.1](https://nextjs.org) - React framework for production
- **Language:** [TypeScript 5.0+](https://www.typescriptlang.org) - Type-safe JavaScript
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com) - Utility-first CSS framework
- **UI Components:** Custom React components with Radix UI patterns
- **Icons:** [Lucide React 0.562.0](https://lucide.dev) - Beautiful SVG icons
- **HTTP Client:** [Axios 1.13.2](https://axios-http.com) - Promise-based HTTP client
- **Notifications:** [Sonner 1.2.3](https://sonner.emilkowal.ski) - Toast notifications
- **Utilities:** [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)

### Development Tools
- **Package Manager:** npm
- **Build Tool:** Next.js with Turbopack
- **Linting:** ESLint 9
- **PostCSS:** PostCSS 4 with Tailwind integration

## 📁 Project Structure

```
HamroLuga/
├── frontend/                          # Next.js application
│   ├── app/                          # App router pages
│   │   ├── admin/
│   │   │   ├── dashboard/           # Admin dashboard
│   │   │   └── products/            # Product management
│   │   ├── (authpage)/              # Authentication pages
│   │   │   ├── login/               # Login page
│   │   │   ├── SignUpPage/          # Registration page
│   │   │   └── ForgotPasswordPage/  # Password recovery
│   │   ├── products/                # Product listing
│   │   │   └── [id]/                # Product details
│   │   ├── Home/                    # Home page
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Home page
│   │
│   ├── components/                   # Reusable components
│   │   ├── ui/                      # UI components
│   │   │   ├── button.tsx           # Button component
│   │   │   ├── dialog.tsx           # Modal dialog
│   │   │   ├── drawer.tsx           # Mobile drawer
│   │   │   ├── input.tsx            # Input field
│   │   │   ├── label.tsx            # Form label
│   │   │   ├── table.tsx            # Data table
│   │   │   └── sidebar-page.tsx     # Product table sidebar
│   │   ├── ecom-page.tsx            # E-commerce layout
│   │   └── statchat-page.tsx        # Statistics card
│   │
│   ├── lib/                         # Utilities and helpers
│   │   └── utils.ts                 # Utility functions (cn)
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── use-media-query.ts       # Media query hook
│   │
│   ├── public/                      # Static assets
│   ├── styles/                      # Global styles
│   ├── package.json                 # Dependencies
│   ├── tsconfig.json                # TypeScript config
│   ├── next.config.ts               # Next.js config
│   └── README.md                    # Frontend documentation
│
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** 8.0 or higher (or yarn/pnpm)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/HamroLuga.git
cd HamroLuga
```

2. **Navigate to frontend directory**
```bash
cd frontend
```

3. **Install dependencies**
```bash
npm install
```

### Running the Application

**Development Mode:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production Build:**
```bash
npm run build
npm run start
```

**Linting:**
```bash
npm run lint
```

## 📖 Usage

### Admin Dashboard
Access the admin panel at `/admin/dashboard` to:
- View sales statistics and order metrics
- Monitor customer activity
- Track product performance

### Product Management
Navigate to `/admin/products` to:
- **Add Products** - Create new product listings with details
- **Edit Products** - Update existing product information
- **Delete Products** - Remove products from inventory
- **View Products** - Browse all available products in a table format

### Product Browsing
- **Home Page** - Featured products and promotions
- **Products Listing** - Browse all available products
- **Product Details** - View detailed information about specific products

## 🎨 UI Components

The project includes custom-built UI components:

- **Button** - Versatile button with multiple variants (default, outline, ghost, etc.)
- **Dialog** - Modal dialog for confirmations and forms
- **Drawer** - Mobile-friendly side drawer for actions
- **Input** - Text input fields with validation
- **Label** - Form labels for accessibility
- **Table** - Responsive data tables for product listings

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the frontend directory:
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://fakestoreapi.com

# Add other variables as needed
```

### TypeScript Configuration
The project uses strict TypeScript settings. Check `tsconfig.json` for details.

### Tailwind CSS
Customize styling in `tailwind.config.js` or `postcss.config.mjs`.

## 📱 Responsive Design

The application is optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 🖥️ Desktop (1024px and up)
- 🖥️ Large screens (1280px and up)

Uses custom `useMediaQuery` hook for responsive component behavior.

## 🔄 API Integration

The application integrates with [FakeStore API](https://fakestoreapi.com) for demo purposes:
- Fetch product listings
- Create new products
- Update product information
- Delete products

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

### Build Errors
Clear the build cache:
```bash
rm -rf .next
npm run build
```

### TypeScript Errors
Ensure all imports are correct and types are properly defined.

## 📦 Dependencies

Key dependencies include:
- Next.js 16.1.1
- React 19.2.3
- TypeScript 5.0+
- Tailwind CSS 4.0
- Axios 1.13.2
- Sonner 1.2.3
- Lucide React 0.562.0

See `package.json` for complete dependency list.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/HamroLuga.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

### Guidelines
- Follow the existing code style
- Add TypeScript types for new features
- Update documentation as needed
- Test changes before submitting

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

Have questions or found a bug? Please open an issue on GitHub.

## 👨‍💻 Author

Sagun Dangol - [GitHub Profile](https://github.com/yourusername)

---

<div align="center">

### Made with ❤️ using Next.js and React

⭐ If you find this project useful, please consider giving it a star!

</div>