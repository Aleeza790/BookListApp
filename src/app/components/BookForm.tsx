"use client";  // Add this line at the very top of your file

import { useState } from "react";

interface BookFormProps {
  onAddBook: (newBook: { title: string; author: string }) => void;
}

export default function BookForm({ onAddBook }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return alert("Both title and author are required.");

    // Send only title and author to the parent
    onAddBook({ title, author });

    // Clear the form after submission
    setTitle("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex mb-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 mr-2 w-full"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border px-2 py-1 mr-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Add Book
      </button>
    </form>
  );
}
