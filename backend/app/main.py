from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, products

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth.router,
    prefix="/api/auth"
)

app.include_router(
    products.router,
    prefix="/api/products"
)


@app.get("/")
def root():
    return {
        "message": "EcomStore FastAPI is running"
    }

@app.get("/health")
def health():
    return {
        "status": "success",
        "message": "Backend is working"
    }