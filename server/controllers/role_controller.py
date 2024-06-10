from fastapi import HTTPException
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from models import Role as RoleModel  
from schemas import role_schema  

load_dotenv()
UPLOAD_DIRECTORY = os.getenv('UPLOAD_DIRECTORY')

async def create_role(role: role_schema.Role, db: Session):
    new_role = role.to_model() 
    db.add(new_role)
    db.commit()
    return new_role

async def get_all_roles(db: Session):
    roles = db.query(RoleModel).all()
    if not roles:
        raise HTTPException(status_code=404, detail='Roles not found')
    return roles



