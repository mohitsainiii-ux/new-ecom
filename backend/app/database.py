from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from dotenv import load_dotenv
import os


# Load .env
load_dotenv()


# ==========================================
# DATABASE URL
# ==========================================

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:@127.0.0.1:3306/ecommerce_db"
)


# ==========================================
# DATABASE ENGINE
# ==========================================

engine = create_engine(
    DATABASE_URL,
    echo=True
)


# ==========================================
# SESSION
# ==========================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# ==========================================
# BASE MODEL
# ==========================================

Base = declarative_base()


# ==========================================
# DATABASE DEPENDENCY
# ==========================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()