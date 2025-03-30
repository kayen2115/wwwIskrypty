from flask import Flask, render_template

app = Flask(__name__)

# Lista użytkowników
users = [
    {"id": 1, "name": "Jan Kowalski", "email": "jan@example.com"},
    {"id": 2, "name": "Anna Nowak", "email": "anna@example.com"},
    {"id": 3, "name": "Marek Wiśniewski", "email": "marek@example.com"},
    {"id": 4, "name": "Kasia Nowak", "email": "kasia@example.com"},
    {"id": 5, "name": "Paweł Zieliński", "email": "pawel@example.com"},
    {"id": 6, "name": "Krzysztof Wójcik", "email": "krzysztof@example.com"},
    {"id": 7, "name": "Alicja Kowalczyk", "email": "alicja@example.com"},
    {"id": 8, "name": "Jakub Jankowski", "email": "jakub@example.com"},
    {"id": 9, "name": "Zofia Dąbrowska", "email": "zofia@example.com"},
    {"id": 10, "name": "Adam Wiśniewski", "email": "adam@example.com"}
]

@app.route('/')
def index():
    return render_template('server.html', users=users)

if __name__ == '__main__':
    app.run(debug=True)