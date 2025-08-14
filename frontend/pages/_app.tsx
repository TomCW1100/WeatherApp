import '../globals.css';
import { AppProps } from 'next/app';
import Link from 'next/link';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <Link href="/">
          <h1 className="text-3xl font-bold">Weather App</h1>
        </Link>
      </header>

      <main className="flex-grow p-6">
        <Component {...pageProps} />
      </main>

      <footer className="bg-blue-600 text-white p-4 text-center">
      </footer>
    </div>
  );
}
