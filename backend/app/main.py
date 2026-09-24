from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, products


app = FastAPI(
    title="EcomStore API",
    description="E-commerce backend API",
    version="1.0.0"
)


# =========================
# CORS
# =========================

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


# =========================
# AUTH ROUTES
# =========================

app.include_router(
    auth.router,
    prefix="/api/auth",
    tags=["Authentication"]
)


# =========================
# PRODUCT ROUTES
# =========================

app.include_router(
    products.router,
    prefix="/api/products",
    tags=["Products"]
)


# =========================
# ROOT
# =========================

@app.get("/")
def root():
    return {
        "message": "EcomStore FastAPI is running"
    }


# =========================
# HEALTH CHECK
# =========================

@app.get("/health")
def health():
    return {
        "status": "success",
        "message": "Backend is working"
    }