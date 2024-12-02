"use client";  // Add this line at the very top of your file

interface Book {
  id: number;
  title: string;
  author: string;
}

interface BookListProps {
  books: Book[];
  onDeleteBook: (id: number) => void;
  onUpdateBook: (id: number, updatedTitle: string, updatedAuthor: string) => void;
}

export default function BookList({ books, onDeleteBook, onUpdateBook }: BookListProps) {
  return (
    <ul className="mt-4">
      {books.map((book) => (
        <li key={book.id} className="flex justify-between items-center mb-2 p-2 border border-gray-300 rounded">
          <div>
            <strong>{book.title}</strong>
            <p className="text-sm text-gray-600">by {book.author}</p>
          </div>
          <div className="flex">
            <button
              onClick={() => onUpdateBook(book.id, prompt("Enter updated title:", book.title) || book.title, prompt("Enter updated author:", book.author) || book.author)}
              className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteBook(book.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
