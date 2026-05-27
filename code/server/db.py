import sqlite3

DB_FILE = "books.db"


def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    # カラムを増やしました
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            isbn TEXT UNIQUE,
            title TEXT NOT NULL,
            author TEXT,
            publisher TEXT,
            pubdate TEXT,
            description TEXT,
            image_url TEXT
        )
    """
    )
    conn.commit()
    conn.close()


# 引数を増やしました
def add_book(isbn, title, author, publisher, pubdate, description, image_url):
    conn = get_db_connection()
    try:
        cur = conn.cursor()
        cur.execute(
            """INSERT INTO books (isbn, title, author, publisher, pubdate, description, image_url)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (isbn, title, author, publisher, pubdate, description, image_url),
        )
        conn.commit()
        return cur.lastrowid
    except sqlite3.IntegrityError:
        return None
    finally:
        conn.close()


def get_all_books():
    conn = get_db_connection()
    books = conn.execute("SELECT * FROM books ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(row) for row in books]


def delete_book(book_id):
    conn = get_db_connection()
    conn.execute("DELETE FROM books WHERE id = ?", (book_id,))
    conn.commit()
    conn.close()
