'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditTopic() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Fetch existing topic
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(`/api/topics/${id}`);
        const { topic } = await res.json(); // ⬅ Ensure you're accessing "topic" from response

        if (topic) {
          setTitle(topic.title);
          setDescription(topic.description);
        } else {
          alert('Topic not found');
        }
      } catch (err) {
        console.error('Error loading topic:', err);
        alert('Failed to load topic');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTopic();
  }, [id]);

  // ✅ Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newTitle: title,
          newDescription: description,
        }),
      });

      if (res.ok) {
        alert('Topic updated successfully');
        router.push('/');
      } else {
        const { message } = await res.json();
        alert(`Update failed: ${message}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred while updating.');
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Edit Topic</h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Update Topic
        </button>
      </form>
    </div>
  );
}
