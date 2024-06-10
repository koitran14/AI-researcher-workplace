from pydantic import BaseModel
from models import Project as ProjectModel
from typing import List, Optional
from project_schema import Project

class Attribute(BaseModel):
    
    def __init__(self):
        pass
    
    id: int
    title: str
    content: str
    project: Project