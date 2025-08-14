'use client';

import { useEffect, useState } from 'react';
import WidgetCard from '../../components/WidgetCard';
import { Widget } from '../../types/widget';
import axios from 'axios';

export default function WidgetListPage() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/widgets');
        setWidgets(res.data.widgetsWithCoords || []);
      } catch (err) {
        console.error('Failed to fetch widgets:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWidgets();
  }, []);

  const handleDelete = (deletedId: string) => {
    // Remove the widget from the state immediately
    setWidgets((prev) => prev.filter((w) => w._id !== deletedId));
  };

  if (loading) {
    return <p className="text-center mt-8">Loading widgets...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Widget Dashboard</h1>

      {widgets.length === 0 ? (
        <p className="text-center text-gray-500 mt-8 text-lg">
          No widgets found. Start by creating your first widget!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget) => (
            <WidgetCard
              key={widget._id}
              widget={widget}
              onDelete={() => handleDelete(widget._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
