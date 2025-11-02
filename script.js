document.getElementById("generateBtn").addEventListener("click", async () => {
  const product = document.getElementById("product").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const color = document.getElementById("color").value.trim();
  const resultDiv = document.getElementById("result");

  if (!product || !desc || !color) {
    alert("Mohon isi semua kolom sebelum generate ya 🙏🏻");
    return;
  }

  resultDiv.innerHTML = "<p>Sedang membuat gambar... mohon tunggu sebentar 🙏🏻</p>";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, desc, color }),
    });

    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<p style="color:red;">⚠️ Gagal: ${data.error}</p>`;
      return;
    }

    if (data.output && data.output[0]) {
      const imageUrl = data.output[0];
      resultDiv.innerHTML = `
        <img src="${imageUrl}" alt="Generated Image" style="max-width:100%;border-radius:10px;margin-top:10px;" />
      `;
    } else {
      resultDiv.innerHTML = `<p style="color:red;">⚠️ Tidak ada output dari AI.</p>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<p style="color:red;">Terjadi kesalahan: ${err.message}</p>`;
  }
});
