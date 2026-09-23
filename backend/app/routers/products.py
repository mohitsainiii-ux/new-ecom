from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.dependencies import require_admin
from app.schemas.product import ProductCreate

router = APIRouter()


# =====================================================
# GET ALL PRODUCTS
# =====================================================

@router.get("/")
def get_products(db: Session = Depends(get_db)):

    products = db.query(Product).all()

    return products


# =====================================================
# GET PRODUCT BY ID
# =====================================================

@router.get("/{product_id}")
def get_product_by_id(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


# =====================================================
# CREATE PRODUCT - ADMIN ONLY
# =====================================================

@router.post("/")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):

    new_product = Product(
        name=product.name,
        description=product.description,
        price=product.price,
        quantity=product.quantity,
        image_base64=product.image_base64
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


# =====================================================
# UPDATE PRODUCT - ADMIN ONLY
# =====================================================

@router.patch("/{product_id}")
def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):

    existing_product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not existing_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    existing_product.name = product.name
    existing_product.description = product.description
    existing_product.price = product.price
    existing_product.quantity = product.quantity
    existing_product.image_base64 = product.image_base64

    db.commit()
    db.refresh(existing_product)

    return existing_product


# =====================================================
# DELETE PRODUCT - ADMIN ONLY
# =====================================================

@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):

    existing_product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not existing_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(existing_product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }