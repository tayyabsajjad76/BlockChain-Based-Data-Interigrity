import hashlib
import json
from datetime import datetime

BLOCKS_FILE = "blocks.json"

def load_chain():
    try:
        with open(BLOCKS_FILE, "r") as f:
            content = f.read().strip()
            if not content:  # <-- Added check for empty file
                return []
            chain = json.loads(content)
    except FileNotFoundError:
        chain = []
    except json.JSONDecodeError:  # <-- Handles corrupted JSON
        chain = []
    return chain

def save_chain(chain):
    with open(BLOCKS_FILE, "w") as f:
        json.dump(chain, f, indent=4)

def hash_data(data):
    return hashlib.sha256(data.encode()).hexdigest()

def add_block(file_name, uploader, file_hash):
    chain = load_chain()
    index = len(chain)
    timestamp = datetime.utcnow().isoformat()
    prev_hash = chain[-1]['hash'] if chain else "0"*64
    block_data = {
        "index": index,
        "file_name": file_name,
        "uploader": uploader,
        "timestamp": timestamp,
        "file_hash": file_hash,
        "previous_hash": prev_hash
    }
    block_data["hash"] = hash_data(json.dumps(block_data, sort_keys=True))
    chain.append(block_data)
    save_chain(chain)
    return block_data

def verify_file(file_hash):
    chain = load_chain()
    for block in chain:
        if block["file_hash"] == file_hash:
            return True, block
    return False, None

