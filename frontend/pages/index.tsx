import Link from 'next/link';
import WidgetCreationForm from '../components/WidgetCreationForm';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a Widget</h2>
        <WidgetCreationForm />
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/widgets" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          View All Widgets
        </Link>
      </div>
    </div>
  );
}
