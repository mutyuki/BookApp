// src/api.js

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://あなたのURL.ngrok-free.app";

const headers = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true", // Web版対策
};

// 1. 本の一覧取得
export const getBooks = async () => {
  try {
    const res = await fetch(`${API_URL}/api/books`, { headers });
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
};

// 2. ISBNで本を追加 (OpenBD連携)
export const addBookByIsbn = async (isbn) => {
  const res = await fetch(`${API_URL}/api/books`, {
    method: "POST",
    headers,
    body: JSON.stringify({ isbn }),
  });
  return res;
};

// 3. 貸出処理
export const borrowBook = async (id, borrowerName) => {
  await fetch(`${API_URL}/api/books/${id}/borrow`, {
    method: "POST",
    headers,
    body: JSON.stringify({ borrower: borrowerName }),
  });
};

// 4. 返却処理
export const returnBook = async (id) => {
  await fetch(`${API_URL}/api/books/${id}/return`, {
    method: "POST",
    headers,
  });
};

// 5. 削除処理
export const deleteBook = async (id) => {
  await fetch(`${API_URL}/api/books/${id}`, {
    method: "DELETE",
    headers,
  });
};
