'use client';

import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { WidgetCardProps } from '../types/widgetCardProps';



export default function WidgetCard({ widget, onDelete }: WidgetCardProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // prevent Link navigation

        if (!confirm(`Are you sure you want to delete widget "${widget.location}"?`)) return;

        try {
            setLoading(true);
            await axios.delete(`http://localhost:5000/api/widgets/${widget._id}`);
            onDelete(); 
        } catch (err) {
            console.error('Failed to delete widget:', err);
            alert('Failed to delete widget.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold">{widget.location}</h2>
            <p className="text-gray-600">Created At: {new Date(widget.createdAt).toLocaleString()}</p>

            {widget.latitude && widget.longitude && (
                <p className="text-gray-700 mt-2">
                    <strong>Coordinates:</strong> {widget.latitude.toFixed(5)}, {widget.longitude.toFixed(5)}
                </p>
            )}

            <div className="mt-4 flex gap-2">
                <Link
                    href={`/widgets/${widget._id}`}
                    className="flex-1 text-center p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    View Details
                </Link>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex-1 p-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}
