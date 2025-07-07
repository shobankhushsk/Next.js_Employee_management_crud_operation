// 'use client';

// import { useState } from 'react';

// export default function AddTopic() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!title || !description) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     // TODO: Replace with API call
//     console.log('Submitted:', { title, description });

//     // Reset form
//     setTitle('');
//     setDescription('');
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Add New Topic</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded-lg p-6 space-y-6"
//       >
//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Title
//           </label>
//           <input
//             type="text"
//             className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter topic title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-semibold mb-2">
//             Description
//           </label>
//           <textarea
//             className="w-full border border-gray-300 px-4 py-2 rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter topic description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTopic() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        setTitle('');
        setDescription('');
        alert('Topic added successfully!');
        router.refresh(); // Refresh the page to reload topics list
      } else {
        const err = await res.json();
        alert('Failed to add topic: ' + err.message);
      }
    } catch (error) {
      console.error('Error submitting topic:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Add New Topic</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter topic title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter topic description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
