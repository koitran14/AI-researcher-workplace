from fastapi import HTTPException
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from models import Project  # Import Project model instead of Post
from schemas import project_schema  # Import project_schema instead of post_schema

load_dotenv()
UPLOAD_DIRECTORY = os.getenv('UPLOAD_DIRECTORY')

async def create_project(project: project_schema.Project, db: Session):
    new_project = project.to_model() 
    db.add(new_project)
    db.commit()
    return new_project

async def read_project(project_id: int, db: Session):
    project = db.query(Project).filter(Project.id == project_id).first() 
    if project is None:
        raise HTTPException(status_code=404, detail='Project not found')
    return project

async def read_projects_by_user(user_id: int, db: Session):
    projects = db.query(Project).filter(Project.user_id == user_id).all() 
    if not projects:
        raise HTTPException(status_code=404, detail='No projects found for the user')
    return projects
