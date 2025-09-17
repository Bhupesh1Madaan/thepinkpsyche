export async function uploadImage(base64Image) {
    const formData = new FormData();
    formData.append("file", base64Image);
    formData.append("upload_preset", "mypreset"); // apna preset yaha daalna

    const res = await fetch("https://api.cloudinary.com/v1_1/thepinkpsyche/image/upload", {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    return data.secure_url; // yeh clean image link hai
}
