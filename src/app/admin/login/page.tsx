'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Se già autenticato, redirect alla dashboard
    const token = localStorage.getItem('admin_token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        if (decoded.exp > Date.now()) {
          router.push('/admin');
        }
      } catch {
        localStorage.removeItem('admin_token');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Errore durante il login.');
        return;
      }

      localStorage.setItem('admin_token', data.token);
      router.push('/admin');
    } catch {
      setError('Errore di connessione al server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-brand">
          <h1>Difetti</h1>
          <p>Pannello Amministratore</p>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-form-group">
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            className="admin-input"
            type="email"
            placeholder="admin@difetti.it"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            className="admin-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="admin-btn-login"
          disabled={loading}
        >
          {loading ? 'Accesso in corso…' : 'Accedi al Pannello'}
        </button>
      </form>
    </div>
  );
}
