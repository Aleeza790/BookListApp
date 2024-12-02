"use client";  // Add this line at the very top of your file

import { useState, useEffect } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

interface Book {
  id: number;
  title: string;
  author: string;
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/book");
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  // Add a new book
  const addBook = (newBook: { title: string; author: string }) => {
    const newBookWithId = { ...newBook, id: Date.now() }; // Add the id here
    setBooks((prevBooks) => [...prevBooks, newBookWithId]);
  };

  // Delete a book
  const deleteBook = async (id: number) => {
    await fetch("/api/book", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  // Update a book
  const updateBook = async (id: number, updatedTitle: string, updatedAuthor: string) => {
    await fetch("/api/book", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: updatedTitle, author: updatedAuthor }),
    });
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, title: updatedTitle, author: updatedAuthor } : book
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white p-6 rounded shadow-lg">
        <h1 className="text-xl font-bold mb-4 text-center text-blue-600">Books Management</h1>

        {/* Add book form */}
        <BookForm onAddBook={addBook} />

        {/* Book list */}
        <BookList books={books} onDeleteBook={deleteBook} onUpdateBook={updateBook} />
      </div>
    </div>
  );
}
