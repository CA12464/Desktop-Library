
from flask import Flask, request, jsonify
import psycopg2
from psycopg2 import sql
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS


def get_db_connection():
    conn = psycopg2.connect(
        dbname='postgres',
        user='postgres',
        password='root',
        host='localhost'  # Adjust if your DB is hosted elsewhere
    )
    return conn

@app.route('/api/search', methods=['GET'])
def search_books():
    query = request.args.get('query', '')
    if not query:
        return jsonify({"error": "No search query provided"}), 400
    
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        SELECT * FROM books
        WHERE title ILIKE %s OR author ILIKE %s 
    ''', (f'%{query}%', f'%{query}%'))
    
    books = cur.fetchall()
    cur.close()
    conn.close()
    
    # Convert to a list of dictionaries
    result = [{"id": book[0], "title": book[1], "author": book[2], "genre": book[3], "publication_date": book[4]} for book in books]
    
    return jsonify(result)


@app.route('/api/addBook', methods=['POST'])
def add_book():
    data = request.json
    title = data.get('title')
    author = data.get('author')
    genre = data.get('genre')
    publication_date = data.get('publication_date')

    if not all([title, author, genre, publication_date]):
        return jsonify({"error": "All fields are required"}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection error"}), 500

    try:
        cur = conn.cursor()
        cur.execute(
            sql.SQL('INSERT INTO books (title, author, genre, publication_date) VALUES (%s, %s, %s, %s) RETURNING id;'),
            (title, author, genre, publication_date)
        )
        book_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"id": book_id, "title": title}), 201
    except Exception as e:
        print(f"Database operation error: {e}")
        return jsonify({"error": "Error adding book"}), 500

if __name__ == '__main__':
    app.run(debug=True)

