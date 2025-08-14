'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Widget } from '../../types/widget';
import { Weather } from '../../types/weather';

const WidgetDetail = () => {
  const [widget, setWidget] = useState<Widget | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchWidget = async () => {
      try {
        const response = await axios.get<{ widget: Widget; weather: Weather }>(
          `http://localhost:5000/api/widgets/${id}`
        );
        setWidget(response.data.widget);
        setWeather(response.data.weather);
      } catch (err) {
        setError('Widget not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchWidget();
  }, [id]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <button
        onClick={() => router.back()}
        className="bg-blue-500 text-white p-2 rounded-md mb-6"
      >
        Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold text-center mb-8">Widget Detail</h1>

      {loading && <p className="text-center">Loading...</p>}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {widget && !loading && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold">{widget.location}</h2>
          <p className="text-gray-600">
            Created At: {new Date(widget.createdAt).toLocaleString()}
          </p>

          {weather && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Weather Info</h3>
              <ul className="space-y-3 mt-4">
                <li>
                  <strong>Temperature:</strong> {weather.temperature ?? 'N/A'}°C
                </li>
                <li>
                  <strong>Wind Speed:</strong> {weather.windspeed ?? 'N/A'} km/h
                </li>
                <li>
                  <strong>Wind Direction:</strong> {weather.winddirection ?? 'N/A'}°
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WidgetDetail;
