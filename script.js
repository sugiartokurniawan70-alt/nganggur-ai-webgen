let currentForm = '';

function showForm(type) {
  document.querySelectorAll('[id$="Form"]').forEach(f => f.classList.add('hidden'));
  document.getElementById(type + 'Form').classList.remove('hidden');
  currentForm = type;
}

function backToHome() {
  document.querySelectorAll('[id$="Form"]').forEach(f => f.classList.add('hidden'));
}

document.getElementById('posterSubmit').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btnText = document.getElementById('posterBtnText');
  const loading = document.getElementById('posterLoading');
  btnText.classList.add('hidden');
  loading.classList.remove('hidden');

  const product = document.getElementById('productName').value;
  const desc = document.getElementById('description').value;
  const color = document.getElementById('color').value;

  try {
    const res = await fetch('/generate/poster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, desc, color })
    });
    const data = await res.json();
    if (data.image) {
      document.getElementById('posterImage').src = data.image;
      document.getElementById('posterDownload').href = data.image;
      document.getElementById('posterDownload').download = `${product.replace(/\s+/g, '_')}_poster.png`;
      document.getElementById('posterResult').classList.remove('hidden');
    }
  } catch (err) {
    alert('Gagal! Cek token Replicate.');
  } finally {
    btnText.classList.remove('hidden');
    loading.classList.add('hidden');
  }
});

document.getElementById('karikaturSubmit').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btnText = document.getElementById('karikaturBtnText');
  const loading = document.getElementById('karikaturLoading');
  btnText.classList.add('hidden');
  loading.classList.remove('hidden');

  const file = document.getElementById('faceImage').files[0];
  const style = document.getElementById('style').value;
  if (!file) return alert('Upload foto dulu!');

  const formData = new FormData();
  formData.append('image', file);
  formData.append('style', style);

  try {
    const res = await fetch('/generate/karikatur', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (data.image) {
      document.getElementById('karikaturImage').src = data.image;
      document.getElementById('karikaturDownload').href = data.image;
      document.getElementById('karikaturDownload').download = 'karikatur.png';
      document.getElementById('karikaturResult').classList.remove('hidden');
    }
  } catch (err) {
    alert('Gagal! Pastikan foto wajah jelas.');
  } finally {
    btnText.classList.remove('hidden');
    loading.classList.add('hidden');
  }
});
