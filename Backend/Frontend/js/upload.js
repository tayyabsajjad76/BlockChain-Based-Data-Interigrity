async function uploadFile() {
    const uploader = document.getElementById("uploader").value.trim();
    const fileInput = document.getElementById("fileInput");
    const result = document.getElementById("result");

    if (!uploader || fileInput.files.length === 0) {
        result.innerText = "Enter your name and select a file!";
        return;
    }

    const formData = new FormData();
    formData.append("uploader", uploader);
    formData.append("file", fileInput.files[0]);

    try {
        const res = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData
        });
        const data = await res.json();

        if (data.status === "success") {
            result.innerText = "File uploaded successfully!";
        } else {
            result.innerText = data.message;
        }
    } catch (err) {
        result.innerText = "Error uploading file!";
    }
}

