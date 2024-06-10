from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import Depends, status
from typing import Annotated

from schemas import project_schema
from controllers import project_controller
from db import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)] 

@router.get("/projects/{user_id}", status_code=status.HTTP_200_OK)
async def read_user(user_id: int, db: db_dependency):
    return await project_controller.read_projects_by_user(user_id=user_id, db=db)

@router.post("/projects/", status_code=status.HTTP_201_CREATED)
async def createUser(project: project_schema.Project, db: db_dependency):
    return await project_controller.create_project(project=project, db=db)

