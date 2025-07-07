// 'use client';

// import { Pencil, Trash2 } from 'lucide-react';
// import { useRouter } from 'next/navigation'; // ✅ import useRouter

// export default function TopicsList() {
//   const router = useRouter(); // ✅ define router

//   const topics = [
//     { id: 1, title: 'React Basics', description: 'Introduction to components and props' },
//     { id: 2, title: 'Next.js Routing', description: 'Learn about file-based routing in Next.js' },
//     { id: 3, title: 'Tailwind CSS', description: 'Style your app quickly with utility classes' },
//   ];

//   const handleEdit = (id) => {
//     console.log('Edit topic with ID:', id);
//     router.push('/editTopic/${}'); // ✅ now router is defined
//   };

//   const handleDelete = (id) => {
//     console.log('Delete topic with ID:', id);
//     // TODO: Add delete logic or API call here
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">Topics List</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {topics.map((topic) => (
//           <div
//             key={topic.id}
//             className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200"
//           >
//             <h2 className="text-xl font-semibold text-blue-600 mb-2">{topic.title}</h2>
//             <p className="text-gray-700 mb-4">{topic.description}</p>

//             <div className="flex space-x-3">
//               <button
//                 onClick={() => handleEdit(topic.id)}
//                 className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
//               >
//                 <Pencil size={16} /> Edit
//               </button>

//               <button
//                 onClick={() => handleDelete(topic.id)}
//                 className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 <Trash2 size={16} /> Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TopicsList() {
  const [topics, setTopics] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/topics'); // ✅ Make sure backend is running
        const data = await res.json();
        console.log("Fetched topics:", data);

        // Ensure that `data` is an array
        setTopics(Array.isArray(data) ? data : data.topics || []);
      } catch (err) {
        console.error('Failed to fetch topics:', err);
      }
    };

    fetchTopics();
  }, []);

  const handleEdit = (id) => {
    router.push(`/editTopic/${id}`);
    
  };

  const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this topic?");
  if (!confirm) return;

  try {
    const res = await fetch(`/api/topics/${id}`, {
      method: 'DELETE',
    });

    const result = await res.json();
    if (res.ok) {
      setTopics(topics.filter((topic) => topic._id !== id));
    } else {
      alert(`Delete failed: ${result.message}`);
    }
  } catch (err) {
    console.error('Failed to delete topic:', err);
  }
};



  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">Topics List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(topics) && topics.length > 0 ? (
          topics.map((topic) => (
            <div
              key={topic._id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">{topic.title}</h2>
              <p className="text-gray-700 mb-4">{topic.description}</p>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(topic._id)}
                  className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  <Pencil size={16} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(topic._id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No topics found.</p>
        )}
      </div>
    </div>
  );
}
