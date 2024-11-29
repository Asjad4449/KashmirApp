import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="bg-kashmir-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-4">
          Stay Connected with Kashmir
        </h2>
        <p className="text-kashmir-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for exclusive updates on new artisan collections,
          cultural stories, and special offers.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-kashmir-300"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-2 bg-white text-kashmir-600 rounded-md hover:bg-kashmir-50 transition-colors duration-200 disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {status === 'success' && (
            <p className="mt-2 text-kashmir-100">Thank you for subscribing!</p>
          )}
          {status === 'error' && (
            <p className="mt-2 text-red-300">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}