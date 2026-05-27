import db
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

db.init_db()


@app.route("/api/books", methods=["GET"])
def list_books():
    books = db.get_all_books()
    return jsonify(books)


@app.route("/api/books", methods=["POST"])
def add_book():
    data = request.json
    isbn = data.get("isbn")

    if not isbn:
        return jsonify({"error": "ISBN is required"}), 400

    resp = requests.get(f"https://api.openbd.jp/v1/get?isbn={isbn}")
    book_data = resp.json()

    if not book_data or book_data[0] is None:
        return jsonify({"error": "Book not found"}), 404

    # --- データの抽出 ---
    summary = book_data[0].get("summary", {})
    title = summary.get("title")
    author = summary.get("author")
    publisher = summary.get("publisher")
    pubdate = summary.get("pubdate")  # 出版日
    image_url = summary.get("cover")

    # あらすじの抽出（onixデータ内にあることが多い）
    description = ""
    try:
        onix = book_data[0].get("onix", {})
        text_content = onix.get("CollateralDetail", {}).get("TextContent", [])
        if text_content:
            description = text_content[0].get("Text", "")
    except:
        pass  # あらすじがなくてもエラーにしない

    # DB保存
    new_id = db.add_book(
        isbn, title, author, publisher, pubdate, description, image_url
    )

    if new_id is None:
        return jsonify({"error": "Already exists"}), 409

    return jsonify({"message": "Added", "title": title}), 201


@app.route("/api/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    db.delete_book(book_id)
    return jsonify({"message": "Deleted"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
