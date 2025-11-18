from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os, json, hashlib
from blockchain import add_block, verify_file

app = Flask(__name__)
CORS(app) 
UPLOAD_FOLDER = "uploads"
USERS_FILE = "users.json"
FRONTEND_FOLDER = "Frontend"  # <-- point to your frontend folder
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ----------------- User Functions -----------------
def load_users():
    try:
        with open(USERS_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=4)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# ----------------- Backend Endpoints -----------------
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if not all([name, email, password, role]):
        return jsonify({"status":"error","message":"Fill all fields!"})

    users = load_users()
    if any(u["email"] == email for u in users):
        return jsonify({"status":"error","message":"User already exists!"})

    users.append({
        "name": name,
        "email": email,
        "password": hash_password(password),
        "role": role
    })
    save_users(users)
    return jsonify({"status":"success"})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    users = load_users()
    for user in users:
        if user["email"] == email and user["password"] == hash_password(password):
            return jsonify({
                "status": "success",
                "user": { "name": user["name"], "email": user["email"], "role": user["role"] }
            })
    return jsonify({"status":"error","message":"Invalid credentials"})




@app.route("/upload", methods=["POST"])
def upload_file():
    try:
        if "file" not in request.files or "uploader" not in request.form:
            return jsonify({"status":"error","message":"File or uploader missing"})
        file = request.files["file"]
        uploader = request.form["uploader"]

        # Calculate file hash
        file_hash = hashlib.sha256(file.read()).hexdigest()
        file.seek(0)  # Reset pointer

        # Save file
        file_path = os.path.join("uploads", file.filename)
        file.save(file_path)

        # Add block
        from blockchain import add_block
        block = add_block(file.filename, uploader, file_hash)

        return jsonify({"status": "success", "block": block})
    except Exception as e:
        import traceback
        traceback.print_exc()  # prints full error in terminal
        return jsonify({"status": "error", "message": str(e)})




@app.route("/verify", methods=["POST"])
def verify():
    if "file" not in request.files:
        return jsonify({"status": "error", "message": "No file uploaded"})

    file = request.files["file"]
    file_hash = hashlib.sha256(file.read()).hexdigest()

    exists, block = verify_file(file_hash)
    if exists:
        return jsonify({"status": "verified", "block": block})
    else:
        return jsonify({"status": "not_found"})


@app.route("/blocks", methods=["GET"])
def get_blocks():
    from blockchain import load_chain
    return jsonify(load_chain())

# ----------------- Serve Frontend -----------------
@app.route("/", defaults={"path": "index.html"})
@app.route("/<path:path>")
def serve_frontend(path):
    return send_from_directory(FRONTEND_FOLDER, path)

# ----------------- Run Server -----------------
if __name__ == "__main__":
    app.run(debug=True)
