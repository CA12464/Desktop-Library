from flask import Flask, request, jsonify, Response
import psycopg2
from psycopg2 import sql
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Adjust this for production

def get_db_connection():
    """Create and return a new database connection."""
    conn = psycopg2.connect(
        dbname='postgres',
        user='postgres',
        password='root',
        host='localhost'  # Adjust if your DB is hosted elsewhere
    )
    return conn

@app.route('/api/searchBooks', methods=['GET'])
def search_books():
    """Search for books based on query parameters."""
    query = request.args.get('query', '')
    
    if query == '':
        query = '%'  # This will match all records

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        SELECT id, title, author, genre, publication_date, cover_image FROM books
        WHERE title ILIKE %s OR author ILIKE %s 
    ''', (f'%{query}%', f'%{query}%'))
    
    books = cur.fetchall()
    cur.close()
    conn.close()
    
    result = [
        {
            "id": book[0],
            "title": book[1],
            "author": book[2],
            "genre": book[3],
            "publication_date": book[4],
            "cover_image": book[5] if book[5] else ''  # Handle NULL values
        }
        for book in books
    ]
    
    return jsonify(result)


@app.route('/api/addBook', methods=['POST'])
def add_book():
    """Add a new book to the database."""
    try:
        title = request.form.get('title')
        author = request.form.get('author')
        genre = request.form.get('genre')
        publication_date = request.form.get('publication_date')
        cover_image_url = request.form.get('cover_image')  # Retrieve the URL from the form data

        if not all([title, author, genre, publication_date]):
            return jsonify({"error": "All fields are required"}), 400

        conn = get_db_connection()
        cur = conn.cursor()

        # Insert book details
        cur.execute(
            sql.SQL('INSERT INTO books (title, author, genre, publication_date, cover_image) VALUES (%s, %s, %s, %s, %s) RETURNING id;'),
            (title, author, genre, publication_date, cover_image_url)  # Store URL directly
        )
        book_id = cur.fetchone()[0]

        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"id": book_id, "title": title}), 201
    except Exception as e:
        print(f"Database operation error: {e}")  # Log error message
        return jsonify({"error": "Error adding book"}), 500

@app.route('/api/BookImage/<int:book_id>', methods=['GET'])
def get_book_image(book_id):
    """Retrieve and serve the cover image URL for a given book."""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT cover_image FROM books WHERE id = %s', (book_id,))
        image_url = cur.fetchone()
        cur.close()
        conn.close()

        if image_url and image_url[0]:
            return jsonify({"cover_image_url": image_url[0]})  # Return URL directly
        else:
            return jsonify({"error": "Image not found"}), 404

    except Exception as e:
        print(f"Error fetching book image: {e}")
        return jsonify({"error": "Error fetching book image"}), 500


if __name__ == '__main__':
    app.run(debug=True)







