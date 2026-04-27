const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const resultSection = document.getElementById('resultSection');
const loadingSection = document.getElementById('loadingSection');
const imagePreview = document.getElementById('imagePreview');
const resultTitle = document.getElementById('resultTitle');
const confidenceValue = document.getElementById('confidenceValue');
const confidenceBar = document.getElementById('confidenceBar');
const resetBtn = document.getElementById('resetBtn');

const API_URL = 'http://localhost:8000/predict';

// Turkish Translations Mapping
const TRANSLATIONS = {
    "Apple___Apple_scab": "Elma - Elma Uyuzu",
    "Apple___Black_rot": "Elma - Siyah Çürük",
    "Apple___Cedar_apple_rust": "Elma - Sedir Elma Pası",
    "Apple___healthy": "Elma - Sağlıklı",
    "Blueberry___healthy": "Yaban Mersini - Sağlıklı",
    "Cherry_(including_sour)___Powdery_mildew": "Kiraz - Külleme",
    "Cherry_(including_sour)___healthy": "Kiraz - Sağlıklı",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "Mısır - Yaprak Lekesi",
    "Corn_(maize)___Common_rust_": "Mısır - Pas Hastalığı",
    "Corn_(maize)___Northern_Leaf_Blight": "Mısır - Kuzey Yaprak Yanıklığı",
    "Corn_(maize)___healthy": "Mısır - Sağlıklı",
    "Grape___Black_rot": "Üzüm - Siyah Çürük",
    "Grape___Esca_(Black_Measles)": "Üzüm - Esca (Kuru Kol)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Üzüm - Yaprak Yanıklığı",
    "Grape___healthy": "Üzüm - Sağlıklı",
    "Orange___Haunglongbing_(Citrus_greening)": "Portakal - Turunçgil Yeşillenme Hastalığı",
    "Peach___Bacterial_spot": "Şeftali - Bakteriyel Leke",
    "Peach___healthy": "Şeftali - Sağlıklı",
    "Pepper,_bell___Bacterial_spot": "Dolmalık Biber - Bakteriyel Leke",
    "Pepper,_bell___healthy": "Dolmalık Biber - Sağlıklı",
    "Potato___Early_blight": "Patates - Erken Yanıklık",
    "Potato___Late_blight": "Patates - Geç Yanıklık",
    "Potato___healthy": "Patates - Sağlıklı",
    "Raspberry___healthy": "Ahududu - Sağlıklı",
    "Soybean___healthy": "Soya Fasulyesi - Sağlıklı",
    "Squash___Powdery_mildew": "Kabak - Külleme",
    "Strawberry___Leaf_scorch": "Çilek - Yaprak Yanığı",
    "Strawberry___healthy": "Çilek - Sağlıklı",
    "Tomato___Bacterial_spot": "Domates - Bakteriyel Leke",
    "Tomato___Early_blight": "Domates - Erken Yanıklık",
    "Tomato___Late_blight": "Domates - Geç Yanıklık",
    "Tomato___Leaf_Mold": "Domates - Yaprak Küfü",
    "Tomato___Septoria_leaf_spot": "Domates - Septoria Yaprak Lekesi",
    "Tomato___Spider_mites Two-spotted_spider_mite": "Domates - Kırmızı Örümcek",
    "Tomato___Target_Spot": "Domates - Hedef Leke",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Domates - Sarı Yaprak Kıvırcıklık Virüsü",
    "Tomato___Tomato_mosaic_virus": "Domates - Mozaik Virüsü",
    "Tomato___healthy": "Domates - Sağlıklı"
};

// Event Listeners
dropzone.addEventListener('click', () => fileInput.click());

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('drag-over');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('drag-over');
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleFile(e.target.files[0]);
    }
});

resetBtn.addEventListener('click', () => {
    resultSection.classList.add('hidden');
    dropzone.parentElement.classList.remove('hidden');
    fileInput.value = '';
});

// Logic
async function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);

    // Show loading state
    dropzone.parentElement.classList.add('hidden');
    loadingSection.classList.remove('hidden');

    // Prepare form data
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Prediction failed');

        const data = await response.json();
        showResult(data);
    } catch (error) {
        console.error(error);
        alert('Error connecting to the backend. Make sure the FastAPI server is running.');
        loadingSection.classList.add('hidden');
        dropzone.parentElement.classList.remove('hidden');
    }
}

function showResult(data) {
    loadingSection.classList.add('hidden');
    resultSection.classList.remove('hidden');

    const className = TRANSLATIONS[data.class_name] || data.class_name.replace(/___/g, ' - ').replace(/_/g, ' ');
    resultTitle.textContent = className;
    
    const confidence = (data.confidence * 100).toFixed(1);
    confidenceValue.textContent = `${confidence}%`;
    
    // Animate bar
    setTimeout(() => {
        confidenceBar.style.width = `${confidence}%`;
    }, 100);
}
