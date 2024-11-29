import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Roles, Role } from '../../constants/enums'; // Ensure correct path to enums

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Define type for expected signIn result
      type SignInResult = {
        error?: string;
        role?: Role;
      };

      // Sign in using NextAuth credentials
      const result = (await signIn('credentials', {
        email,
        password,
        redirect: false,
      })) as SignInResult;

      if (result?.error) {
        setError('Invalid email or password');
        return;
      }

      // Retrieve role safely with a fallback
      const userRole = (result.role as Role) || Roles.BUYER;

      // Redirect user based on their role
      if (userRole === Roles.ADMIN) {
        router.push('/admin/dashboard');
      } else {
        router.push((router.query.callbackUrl as string) || '/');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-kashmir-500 focus:border-kashmir-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-kashmir-500 focus:border-kashmir-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-kashmir-600 hover:bg-kashmir-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kashmir-500"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="/auth/signup"
                className="font-medium text-kashmir-600 hover:text-kashmir-500"
              >
                Don't have an account? Sign up
              </a>
            </div>
            <div className="text-sm">
              <a
                href="/auth/forgot-password"
                className="font-medium text-kashmir-600 hover:text-kashmir-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
