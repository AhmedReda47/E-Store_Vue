# E-Store Vue - E-Commerce Frontend

A modern, responsive e-commerce web application built with Vue.js 3, Tailwind CSS, and integrated with a Django backend.

## 🎯 Features

- **Product Browsing**: Browse products by category with detailed product pages
- **Shopping Cart**: Add/remove items, manage cart quantities
- **User Authentication**: User login and registration
- **Search Functionality**: Search for products across the catalog
- **Checkout Process**: Complete purchase flow with success confirmation
- **User Account**: Manage user profile and account settings
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Modern Components**: Reusable Vue components for consistent UI

## 🛠 Technologies

- **Vue.js 3**: Progressive JavaScript framework
- **Vue Router**: Client-side routing
- **Vuex**: State management
- **Tailwind CSS**: Utility-first CSS framework
- **Babel**: JavaScript transpiler
- **PostCSS**: CSS processing

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── AppHeader.vue   # Navigation header
│   ├── AppFooter.vue   # Footer component
│   ├── AppLayout.vue   # Main layout wrapper
│   ├── ProductCard.vue # Product display card
│   ├── CartItem.vue    # Shopping cart item
│   └── Popup.vue       # Popup/modal component
├── views/              # Page components
│   ├── HomeView.vue    # Homepage
│   ├── Product.vue     # Product detail page
│   ├── Category.vue    # Category listing
│   ├── Cart.vue        # Shopping cart page
│   ├── Checkout.vue    # Checkout page
│   ├── Success.vue     # Order success page
│   ├── LogIn.vue       # Login page
│   ├── SignUp.vue      # Registration page
│   ├── MyAccount.vue   # User account page
│   ├── Search.vue      # Search results page
│   └── AboutView.vue   # About page
├── router/             # Vue Router configuration
├── store/              # Vuex store configuration
├── styles/             # Global styles
│   └── tailwind.css    # Tailwind CSS configuration
├── assets/             # Static assets
├── App.vue             # Root component
└── main.js             # Application entry point

public/
└── index.html          # HTML template
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd E-Store_vue
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API endpoint**
   - Update the backend API endpoint in your store/router configuration if needed

### Running the Development Server

```bash
npm run serve
```

The application will be available at `http://localhost:8080` (or the next available port).

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## 🔧 Available Scripts

- `npm run serve` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality

## 📝 Component Architecture

### Layout Components

- **AppLayout**: Main wrapper providing consistent page structure
- **AppHeader**: Navigation header with links and search
- **AppFooter**: Footer with company information and links

### Feature Components

- **ProductCard**: Displays individual product with image, price, and actions
- **CartItem**: Shows items in shopping cart with quantity controls
- **Popup**: Reusable modal/popup for notifications and confirmations

### Page Views

Each view in the `views/` folder represents a complete page route with its own logic and components.

## 🔌 API Integration

The application communicates with a Django backend API. Ensure your backend is running and accessible before starting the Vue application.

### Key Endpoints Used

- Products listing and filtering
- Product details
- User authentication (login/register)
- Cart operations
- Order management

## 🎨 Styling

The project uses **Tailwind CSS** for styling:

- Configuration: `tailwind.config.js`
- Main stylesheet: `src/styles/tailwind.css`
- Responsive breakpoints and utility classes

## 📦 State Management

**Vuex** is used for centralized state management:

- Store configuration: `src/store/index.js`
- Manages cart state, user authentication, and product data

## 🛣 Routing

**Vue Router** handles client-side navigation:

- Configuration: `src/router/index.js`
- Routes defined for all main pages and features

## 🐛 Troubleshooting

**Port already in use**

```bash
npm run serve -- --port 3000
```

**Module not found errors**

```bash
npm install
npm cache clean --force
```

**Build issues**

```bash
rm -rf node_modules dist
npm install
npm run build
```

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request with a clear description

## 📄 License

This project is part of the E-Store e-commerce platform.

## 📞 Support

For issues or questions, please contact the development team or create an issue in the repository.

---

**Happy coding! 🚀**
