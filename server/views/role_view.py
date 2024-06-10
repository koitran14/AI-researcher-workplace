from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import Depends, status
from typing import Annotated

from schemas import role_schema
from controllers import role_controller
from db import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)] 

@router.get("/roles/", status_code=status.HTTP_200_OK)
async def createUser(db: db_dependency):
    return await role_controller.get_all_roles(db=db)

@router.post("/roles/", status_code=status.HTTP_201_CREATED)
async def createUser(role: role_schema.Role, db: db_dependency):
    return await role_controller.create_role(role=role, db=db)



