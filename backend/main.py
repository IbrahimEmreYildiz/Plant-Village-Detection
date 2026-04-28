from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from model_handler import PlantDiseaseModel
import uvicorn
import io
import os

app = FastAPI(title="PlantVillage Disease Detection API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "plant_disease_final_model_99_acc.pth")
try:
    plant_model = PlantDiseaseModel(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}")
    plant_model = None

@app.get("/")
async def root():
    return {"message": "PlantVillage Disease Detection API is running"}

# Serve static files from the frontend directory
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend")
app.mount("/ui", StaticFiles(directory=frontend_path, html=True), name="ui")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not plant_model:
        raise HTTPException(status_code=500, detail="Model not loaded on server")
    
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image")
    
    try:
        content = await file.read()
        prediction = plant_model.predict(io.BytesIO(content))
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
