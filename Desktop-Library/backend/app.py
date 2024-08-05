from flask import Flask, request, jsonify, send_file
import psycopg2
from psycopg2 import sql
from flask_cors import CORS
from io import BytesIO
import base64

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

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
    
    result = [{"id": book[0], "title": book[1], "author": book[2], "genre": book[3], "publication_date": book[4], "cover_image": book[5]} for book in books]
    
    return jsonify(result)

@app.route('/api/addBook', methods=['POST'])
def add_book():
    """Add a new book to the database."""
    try:
        title = request.form.get('title')
        author = request.form.get('author')
        genre = request.form.get('genre')
        publication_date = request.form.get('publication_date')
        cover_image = request.files.get('cover_image')  # Retrieve the uploaded file

        if not all([title, author, genre, publication_date]):
            return jsonify({"error": "All fields are required"}), 400

        conn = get_db_connection()
        cur = conn.cursor()

        # Insert book details
        cur.execute(
            sql.SQL('INSERT INTO books (title, author, genre, publication_date) VALUES (%s, %s, %s, %s) RETURNING id;'),
            (title, author, genre, publication_date)
        )
        book_id = cur.fetchone()[0]

        # Insert cover image if available
        if cover_image:
            cover_image_data = cover_image.read()  # Read image data
            cover_image_base64 = base64.b64encode(cover_image_data).decode('utf-8')  # Convert to base64 string
            cur.execute(
                sql.SQL('UPDATE books SET cover_image = %s WHERE id = %s;'),
                (cover_image_base64, book_id)  # Store as base64 string
            )

        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"id": book_id, "title": title}), 201
    except Exception as e:
        print(f"Database operation error: {e}")  # Log error message
        return jsonify({"error": "Error adding book"}), 500

@app.route('/api/getBookImage/<int:book_id>', methods=['GET'])
def get_book_image(book_id):
    """Retrieve and serve the cover image for a given book."""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT cover_image FROM books WHERE id = %s', (book_id,))
        image_data = cur.fetchone()
        cur.close()
        conn.close()

        if image_data and image_data[0]:
            return send_file(BytesIO(image_data[0]), mimetype='image/png')
        else:
            return jsonify({"error": "Image not found"}), 404
    except Exception as e:
        print(f"Error fetching book image: {e}")
        return jsonify({"error": "Error fetching book image"}), 500


if __name__ == '__main__':
    app.run(debug=True)




