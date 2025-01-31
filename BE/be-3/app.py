from fastapi import FastAPI
from fastapi.responses import JSONResponse
from core.models import QueryRequest
from core.pipeline import rag_pipeline
from core.utils import process_pdf, create_embeddings_and_vectorstore, extract_images_from_pdf
import time
import os
import json  # Ensure this is imported


# Initialize FastAPI app
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# PDF File Path (Replace with your actual credit card PDF)
PDF_FILE_PATH = "core/knowledgebase/knowledgebase.pdf"

# Process knowledge base at startup
KNOWLEDGE_BASE_PDF = "core/knowledgebase/knowledgebase.pdf"
texts = process_pdf(KNOWLEDGE_BASE_PDF)
vectorstore = create_embeddings_and_vectorstore(texts)

@app.post("/api/query")
async def query_api(request: QueryRequest):
    """Endpoint to handle queries including image extraction."""
    start_time = time.time()
    query = request.query.lower()
    
    try:
        # Check if the query is about credit card images
        if "types of credit card" in query or "credit card design" in query:
            # Use pre-extracted images instead of extracting dynamically
            extracted_images_dir = "static/extracted_images"
            base_url = "https://fastapi-app1-855220130399.us-central1.run.app/static/extracted_images/"
            
            # List all pre-extracted images
            image_filenames = [f for f in os.listdir(extracted_images_dir) if f.endswith((".png", ".jpg", ".jpeg"))]
            image_urls = [base_url + filename for filename in image_filenames]

            elapsed_time = time.time() - start_time
            return JSONResponse(content={
                "query": query,
                "videoLink": 'https://www.youtube.com/watch?v=wCCxjd24sRs',
                "images": image_urls,
                "answer": "Here are some famous credit card types offered by Lloyds Banking Group.",
                "processing_time": f"{elapsed_time:.2f} seconds"
            }, status_code=200)

        answer = rag_pipeline(query, vectorstore)

        # Ensure `answer` is a dictionary (if string, parse it)
        if isinstance(answer, str):
            try:
                # Attempt to convert JSON string to a dictionary
                answer = json.loads(answer)
            except json.JSONDecodeError:
                answer = {"answer": answer.strip('`').strip()}

        print(answer)  # Debugging Output
        elapsed_time = time.time() - start_time

        return JSONResponse(content={
            "query": query,
            "answer": answer.get("answer", "Sorry, I could not find an answer."),
            "videoLink": answer.get("videoLink", "https://www.youtube.com/watch?v=wCCxjd24sRs"),
            "additionalHelp": answer.get("additionalHelp", "Do you need more help?"),
            "processing_time": f"{elapsed_time:.2f} seconds"
        }, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Serve static images
#from fastapi.staticfiles import StaticFiles
#app.mount("/static", StaticFiles(directory="extracted_images"), name="static")

from fastapi.staticfiles import StaticFiles
import os


# Ensure extracted_images directory exists
EXTRACTED_IMAGES_DIR = "static/extracted_images"
os.makedirs(EXTRACTED_IMAGES_DIR, exist_ok=True)

# Mount static directory properly
app.mount("/static", StaticFiles(directory="static"), name="static")
