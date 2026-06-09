import React, { useState } from 'react';


const passwordStrength = (pwd) => {
  let score = 0;
  if (pwd.length >= 6) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

const strongPasswordSuggestion = () => {
  return 'Ex: Abc@1234, Xyz#2025';
};

const LoginModal = ({ isOpen, onClose, onLogin, onSignup, mode, openSignupModal, openLoginModal }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('all_users') || '[]');
    } catch {
      return [];
    }
  };

  const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('all_users', JSON.stringify(users));
  };

  const validatePassword = (pwd) => {
    if (pwd.length < 6) return 'Password must be at least 6 characters.';
    if (!/[A-Za-z]/.test(pwd)) return 'Password must contain a letter.';
    if (!/[0-9]/.test(pwd)) return 'Password must contain a number.';
    if (!/[^A-Za-z0-9]/.test(pwd)) return 'Password must contain a special character.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!username || !password || !email || (mode === 'signup' && !name)) {
      setError('Please fill all fields.');
      return;
    }
    if (mode === 'signup') {
      const pwdErr = validatePassword(password);
      if (pwdErr) {
        setError(pwdErr);
        return;
      }
      const users = getUsers();
      if (users.find(u => u.email === email)) {
        setError('Email already registered. Use another email.');
        return;
      }
      if (users.find(u => u.password === password)) {
        setError('Password already used. Use another password.');
        return;
      }
      const user = { name, username, email, password };
      saveUser(user);
      setMessage('Sign up successful! Please log in.');
      setName(''); setUsername(''); setEmail(''); setPassword('');
    } else {
      const users = getUsers();
      const found = users.find(u => u.email === email && u.password === password);
      if (!found) {
        if (users.find(u => u.email === email)) {
          setError('Incorrect password.');
        } else {
          setError('Email not registered. Please sign up.');
        }
        return;
      }
      // Prevent login if already logged in
      if (localStorage.getItem('user_info')) {
        setError('Already logged in. Please logout first.');
        return;
      }
      onLogin({ username: found.username, name: found.name, email: found.email });
      setMessage('You are logged in');
      setName(''); setUsername(''); setEmail(''); setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white p-8 rounded shadow-lg w-80 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">×</button>
        <h2 className="text-2xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <input
                type="text"
                placeholder="Name"
                className="w-full mb-3 p-2 border rounded"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full mb-3 p-2 border rounded"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="relative mb-1">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="button" className="absolute right-2 top-2 text-xs" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <div className="text-xs text-gray-600 mb-2">
            Password must be at least 6 characters, include a letter, a number, and a special character.<br/>
            {mode === 'signup' && (
              <>
                <span>Password strength: {['Weak','Weak','Medium','Good','Strong','Very strong'][passwordStrength(password)]}</span><br/>
                <span>Suggestions: {strongPasswordSuggestion()}</span>
              </>
            )}
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded mb-2">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        {error && <div className="text-red-600 text-center mb-2">{error}</div>}
        {message && <div className="text-green-600 text-center mb-2">{message}</div>}
        <div className="text-center mt-2">
          {mode === 'login' ? (
            <span>Don't have an account? <button className="text-blue-600 underline" onClick={openSignupModal}>Sign Up</button></span>
          ) : (
            <span>Already have an account? <button className="text-blue-600 underline" onClick={openLoginModal}>Login</button></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
