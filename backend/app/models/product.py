from sqlalchemy import Column, Integer, String, DateTime, Text, Float
from sqlalchemy.sql import func

from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(150), nullable=False)

    description = Column(Text, nullable=True)

    price = Column(Float, nullable=False)

    quantity = Column(Integer, default=0)

    image_base64 = Column(Text, nullable=True)

    created_at = Column(
        DateTime,
        server_default=func.now()
    )