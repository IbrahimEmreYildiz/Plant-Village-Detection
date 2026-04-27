# 🌿 PlantVillage Disease Detection with EfficientNet-V2

## 🇬🇧 English Version

This project is a Deep Learning (Computer Vision) application developed to detect **38 different plant disease classes** with high accuracy. It is optimized using the **EfficientNet-V2-S** architecture through Transfer Learning and Fine-Tuning techniques.

### 🚀 Performance Metrics
The model was trained on an **NVIDIA H100 GPU** and achieved the following results:
* **Validation Accuracy:** 99.41%
* **Test Accuracy:** 99.18%
* **Weighted F1-Score:** 0.99
* **Test Loss:** 0.0243

### 🛠️ Technologies & Hardware
* **Framework:** PyTorch
* **Model:** EfficientNet-V2-S (Pre-trained on ImageNet)
* **Hardware:** NVIDIA H100 GPU
* **Dataset:** PlantVillage Dataset (~54,000 Images)
* **Libraries:** Torchvision, PIL, Matplotlib, Scikit-learn

### 🏗️ Training Strategy
The project followed a strategic two-stage training process:

#### 1. Stage: Feature Extraction (Transfer Learning)
* The backbone layers were frozen, and only the custom classifier was trained.
* **Epochs:** 5
* **Learning Rate:** 0.001 (AdamW)

#### 2. Stage: Fine-Tuning
* All layers were unfrozen to adapt the pre-trained weights to specific plant disease textures.
* **Learning Rate:** 10x lower (1e-4) to ensure stability.
* **Epochs:** 3
* **Result:** Achieved 99.18% test accuracy without overfitting.

---

## 🇹🇷 Türkçe Versiyon

Bu proje, **38 farklı bitki hastalığı sınıfını** yüksek doğrulukla tespit etmek için geliştirilmiş bir Derin Öğrenme (Computer Vision) projesidir. **EfficientNet-V2-S** mimarisi kullanılarak, Transfer Learning ve Fine-Tuning teknikleri ile optimize edilmiştir.

### 🚀 Başarı Metrikleri
Model, **NVIDIA H100 GPU** üzerinde eğitilmiş ve aşağıdaki sonuçları elde etmiştir:
* **Validation Accuracy:** %99.41
* **Test Accuracy:** %99.18
* **Weighted F1-Score:** 0.99
* **Test Kaybı (Loss):** 0.0243

### 🛠️ Kullanılan Teknolojiler & Donanım
* **Framework:** PyTorch
* **Model:** EfficientNet-V2-S (Pre-trained on ImageNet)
* **Donanım:** NVIDIA H100 GPU
* **Veri Seti:** PlantVillage Dataset (~54.000 Görüntü)
* **Kütüphaneler:** Torchvision, PIL, Matplotlib, Scikit-learn

### 🏗️ Eğitim Stratejisi
Proje, maksimum başarı için iki aşamalı bir süreçle eğitilmiştir:

#### 1. Aşama: Feature Extraction (Transfer Learning)
* Modelin gövdesi donduruldu, sadece son katman (classifier) eğitildi.
* **Epoch:** 5
* **Öğrenme Oranı:** 0.001 (AdamW)

#### 2. Aşama: Fine-Tuning (İnce Ayar)
* Tüm katmanlar çözülerek modelin bitki dokularına tam uyum sağlaması sağlandı.
* **Sonuç:** %99.18 test doğruluğu ile overfitting olmadan yüksek performans elde edildi.

---

## 🌐 Web Application (Web Uygulaması)

A premium web application has been added to the project for real-time plant disease detection.

### 🇬🇧 Setup & Running
1. **Backend:**
   ```bash
   pip install -r requirements.txt
   python backend/main.py
   ```
2. **Frontend:**
   - Open `frontend/index.html` in any modern web browser.
   - Alternatively, use a local server: `python -m http.server -d frontend`

### 🇹🇷 Kurulum ve Çalıştırma
1. **Backend:**
   ```bash
   pip install -r requirements.txt
   python backend/main.py
   ```
2. **Frontend:**
   - `frontend/index.html` dosyasını herhangi bir tarayıcıda açın.
   - Alternatif olarak: `python -m http.server -d frontend`