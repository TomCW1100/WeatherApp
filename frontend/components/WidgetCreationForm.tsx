'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const WidgetForm = () => {
  const [location, setLocation] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const validateLocation = (value: string) => {
    if (!value.trim()) {
      return 'Location cannot be empty.';
    }
    if (value.length > 50) {
      return 'Location is too long (max 50 characters).';
    }
    if (!/^[a-zA-Z0-9\s-]+$/.test(value)) {
      return 'Location can only contain letters, numbers, spaces, and dashes.';
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationError = validateLocation(location);
    if (validationError) {
      setError(validationError);
      setMessage('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/widgets/create-widget', {
        location,
      });

      setMessage(response.data.message);
      setLocation('');
      setError('');
    } catch (err: any) {
      setError('Failed to create widget. ' + (err.response?.data?.message || err.message));
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-lg font-semibold text-gray-700">
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Widget
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default WidgetForm;
