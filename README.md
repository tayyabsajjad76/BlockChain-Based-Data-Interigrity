## Blockchain-Based Data Integrity System
# Overview

This project implements a Blockchain-Based Data Integrity System that ensures the security, authenticity, and tamper-proof storage of digital data. Traditional centralized databases are vulnerable to unauthorized modifications and single points of failure. Using blockchain technology, this system provides a decentralized approach where all records are immutable, cryptographically secured, and transparently auditable.

Users can upload files, which are hashed using SHA-256 and stored on a blockchain ledger. These hashes can be verified anytime to confirm that the data hasn’t been altered. The system supports role-based authentication, ensuring that only authorized users can perform uploads or verifications.

The frontend provides a user-friendly interface, while the backend handles blockchain operations, user authentication, and file storage. This combination demonstrates how blockchain can transform traditional data integrity verification into a secure, decentralized process.

#Key Features

Data Hashing: Each file or record is converted into a unique SHA-256 hash.

Blockchain Storage: Hashes are stored on an immutable blockchain ledger.

Verification: Users can check any record against the blockchain to confirm authenticity.

User Authentication: Secure login with role-based access control.

Decentralized Validation: Data integrity is distributed across the system.

Audit Trail: Every transaction is timestamped and permanently recorded.

# Technologies Used

Backend: Python, Flask

Blockchain: Custom blockchain logic using SHA-256

Frontend: HTML, CSS, JavaScript

Storage: JSON files for user and blockchain data (users.json, blocks.json)

# Project Structure

blockchain-integrity-system/
│
├── backend/
│   ├── app.py
│   ├── blockchain.py
│   ├── uploads/
│   ├── users.json
│   └── blocks.json
│
└── frontend/
    ├── index.html
    ├── login.html
    ├── register.html
    ├── upload.html
    ├── verify.html
    ├── blockchain.html
    ├── css/
    │   └── style.css
    └── js/
        ├── main.js
        ├── upload.js
        ├── verify.js
        └── blockchain.js

# How to Run
# Backend
1. Go to the backend folder:
cd backend

2. Install dependencies:
pip install Flask flask-cors

3. Run the backend server:
python app.py

# Frontend
1. Open the frontend/ folder.
2. Serve files using a local server:
python -m http.server 8000
3. Open your browser at http://localhost:8000/index.html

# Usage
Register as a student or faculty.

Login to access the dashboard.

Upload files to store their hash on the blockchain.

Verify files anytime to ensure integrity.

View blockchain records for all uploaded data.
