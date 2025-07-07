'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white px-8 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold hover:text-blue-400">
          GTCoding
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            href="/"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/addTopic"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Topic
          </Link>
        </div>
      </div>
    </nav>
  );
}
