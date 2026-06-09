import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import LoginModal from './Components/LoginModal';
import Footer from './Components/Footer';
import About from './Components/About';
import Product from './Components/Product';
import ShopNow from './Components/ShopNow';
import SummerCollection from './Components/SummerCollection';
import SaleCards from './Components/sale-cards';
import New from './Components/new';
import { CartProvider } from './Components/CartContext';
import CartView from './Components/CartView';
import CheckoutView from './Components/CheckoutView';
import Women from './Components/women';

export default class App extends Component {
  state = {
    showCartView: false,
    showCheckoutView: false,
    showLoginModal: false,
    loginMode: 'login', // 'login' or 'signup'
    user: null,
  };

  componentDidMount() {
    // Set initial view based on pathname
    this.syncViewWithPath();

    // Restore user from localStorage
    try {
      const user = JSON.parse(localStorage.getItem('user_info'));
      if (user && user.username) {
        this.setState({ user });
      }
    } catch (_) {}

    this.handlePopState = () => {
      this.syncViewWithPath();
    };

    window.addEventListener('popstate', this.handlePopState);
  }



  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }


  pushView = (view) => {
    try {
      if (view === 'home') {
        window.history.pushState({ view }, '', '/');
      } else if (view === 'cart') {
        window.history.pushState({ view }, '', '/cart');
      } else if (view === 'checkout') {
        window.history.pushState({ view }, '', '/checkout');
      } else {
        window.history.pushState({ view }, '', `/${view}`);
      }
    } catch (_) {}
  };

  syncViewWithPath = () => {
    const path = window.location.pathname;
    if (path === '/cart') {
      this.setState({ showCartView: true, showCheckoutView: false });
    } else if (path === '/checkout') {
      this.setState({ showCartView: false, showCheckoutView: true });
    } else if (path === '/cartpage') {
      // Let Product.js handle overlay state, just don't show cart or checkout views
      this.setState({ showCartView: false, showCheckoutView: false });
    } else {
      this.setState({ showCartView: false, showCheckoutView: false });
    }
  };


  // Navigation handlers

  openCartView = () => {
    this.pushView('cart');
    this.setState({ showCartView: true, showCheckoutView: false });
  };


  closeCartView = () => {
    this.pushView('home');
    this.setState({ showCartView: false, showCheckoutView: false });
  };


  openCheckoutView = () => {
    this.pushView('checkout');
    this.setState({ showCheckoutView: true, showCartView: false });
  };


  closeCheckoutView = () => {
    this.pushView('home');
    this.setState({ showCheckoutView: false, showCartView: false });
  };


  // Logo click → always home, force all homepage sections and close modals/views
  closeToHome = () => {
    // Remove overlay state for CartPage if present
    try {
      localStorage.removeItem('overlay_open');
      localStorage.removeItem('overlay_product_id');
    } catch (_) {}
    this.pushView('home');
    // Force a re-render and reset all views to homepage
    this.setState({
      showCartView: false,
      showCheckoutView: false,
      showLoginModal: false,
      loginMode: 'login',
      homepageKey: Date.now()
    });
  };

  // Login modal handlers
  openLoginModal = () => {
    try {
      window.history.pushState({ view: 'login' }, '', '/login');
    } catch (_) {}
    this.setState({ showLoginModal: true, loginMode: 'login' });
  };
  openSignupModal = () => {
    try {
      window.history.pushState({ view: 'signup' }, '', '/signup');
    } catch (_) {}
    this.setState({ showLoginModal: true, loginMode: 'signup' });
  };
  closeLoginModal = () => {
    try {
      window.history.pushState({ view: 'home' }, '', '/');
    } catch (_) {}
    // Force homepage re-render and reset loginMode to ensure login button always shows
    this.setState({ showLoginModal: false, loginMode: 'login', homepageKey: Date.now() });
  };


  handleLogin = (data, switchMode) => {
    if (switchMode) {
      this.setState({ loginMode: 'login' });
      return;
    }
    // Accept login from LoginModal with email, username, name
    if (data && (data.username || data.email) && data.name) {
      const user = { username: data.username, name: data.name, email: data.email };
      localStorage.setItem('user_info', JSON.stringify(user));
      this.setState({ user, showLoginModal: false });
    }
  };

  handleSignup = (data, switchMode) => {
    if (switchMode) {
      this.setState({ loginMode: 'signup' });
      return;
    }
    if (data && data.username && data.password && data.name && data.email) {
      const user = { username: data.username, name: data.name, email: data.email };
      localStorage.setItem('user_info', JSON.stringify(user));
      this.setState({ user, showLoginModal: false });
    }
  };

  handleLogout = () => {
    localStorage.removeItem('user_info');
    this.setState({ user: null });
  };

  render() {
    const { showLoginModal, loginMode, user, homepageKey, showCartView, showCheckoutView } = this.state;
    const path = window.location.pathname;
    return (
      <CartProvider>
        {showCheckoutView ? (
          <CheckoutView
            onBackToShop={this.closeCheckoutView}
            user={user}
            onLoginClick={this.openLoginModal}
            onLogout={this.handleLogout}
            onViewCart={() => {
              this.pushView('cart');
              this.setState({ showCartView: true, showCheckoutView: false });
            }}
            onLogoClick={this.closeToHome}
          />
        ) : showCartView ? (
          <CartView
            onBackToShop={this.closeCartView}
            onProceedToCheckout={this.openCheckoutView}
            onLogoClick={this.closeToHome}
            user={user}
            onLoginClick={this.openLoginModal}
            onLogout={this.handleLogout}
          />
        ) : (
          path === '/shop' ? (
            <>
              <Navbar
                onViewCart={this.openCartView}
                onCheckout={this.openCheckoutView}
                onLogoClick={this.closeToHome}
                onLoginClick={this.openLoginModal}
                user={user}
                onLogout={this.handleLogout}
              />
              <Women />
              <Footer />
            </>
          ) : (
            <div key={homepageKey || 'home'}>
              <Navbar
                onViewCart={this.openCartView}
                onCheckout={this.openCheckoutView}
                onLogoClick={this.closeToHome}
                onLoginClick={this.openLoginModal}
                user={user}
                onLogout={this.handleLogout}
              />
              <About />
              <Product
                onViewCart={this.openCartView}
                onCheckout={this.openCheckoutView}
              />
              <ShopNow />
              <SummerCollection />
              <SaleCards />
              <New />
              <Footer />
              <LoginModal
                isOpen={showLoginModal}
                onClose={this.closeLoginModal}
                onLogin={this.handleLogin}
                onSignup={this.handleSignup}
                mode={loginMode}
                openSignupModal={this.openSignupModal}
                openLoginModal={this.openLoginModal}
              />
            </div>
          )
        )}
      </CartProvider>
    );
  }
}
