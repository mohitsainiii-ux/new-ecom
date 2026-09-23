from pydantic import BaseModel, ConfigDict
from typing import Optional


from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    description: str | None = None
    price: float
    quantity: int = 0
    category: str | None = None
    image_base64: str | None = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    category: Optional[str] = None
    stock: Optional[int] = None


class ProductResponse(ProductCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)