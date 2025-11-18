async function loadBlockchain() {
    const tableBody = document.getElementById("blockTable");
    tableBody.innerHTML = "";

    try {
        const res = await fetch("http://localhost:5000/blocks");
        const data = await res.json();

        data.forEach(block => {  // load_chain() returns a list of blocks directly
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${block.index}</td>
                <td>${block.file_name}</td>
                <td>${block.uploader}</td>
                <td>${block.timestamp}</td>
                <td>${block.file_hash}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (err) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="5">Error fetching blockchain data</td>`;
        tableBody.appendChild(tr);
    }
}

// Call on page load
window.onload = loadBlockchain;
