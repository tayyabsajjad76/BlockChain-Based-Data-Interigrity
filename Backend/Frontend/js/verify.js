async function verifyFile() {
    const fileInput = document.getElementById("fileInput");
    const result = document.getElementById("verifyResult");

    if (fileInput.files.length === 0) {
        result.innerText = "Select a file to verify!";
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const res = await fetch("http://localhost:5000/verify", {
            method: "POST",
            body: formData
        });
        const data = await res.json();

        if (data.status === "verified") {
            result.innerText = "File is authentic and stored in blockchain!";
        } else {
            result.innerText = "File not found or has been tampered!";
        }
    } catch (err) {
        result.innerText = "Error connecting to backend!";
    }
}
