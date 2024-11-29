import { Fragment } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = !!session;

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-display text-kashmir-600">
                    Kashmir Artisans
                  </span>
                </Link>
              </div>

              <div className="flex items-center">
                <Link
                  href="/cart"
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                </Link>

                {isAuthenticated ? (
                  <Menu as="div" className="ml-3 relative">
                    <Menu.Button className="p-2 text-gray-600 hover:text-gray-900">
                      <UserIcon className="h-6 w-6" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                        <div className="py-1">
                          <Menu.Item>
                            <Link
                              href="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link
                              href="/orders"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Orders
                            </Link>
                          </Menu.Item>
                          {session?.user?.role === 'SELLER' && (
                            <Menu.Item>
                              <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Seller Dashboard
                              </Link>
                            </Menu.Item>
                          )}
                          <Menu.Item>
                            <button
                              onClick={() => signOut()}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Sign Out
                            </button>
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="ml-4 btn-primary"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}