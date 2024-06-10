from pydantic import BaseModel
from models import Project as ProjectModel
from typing import List, Optional

class Project(BaseModel):
    
    title: str
    description: str
    thumbnail: Optional[bytes] = None
    report: Optional[bytes] = None
    goal: str
    purposes: str
        
    class Config:
        orm_mode = True  # Enable ORM mode for Pydantic models to work with SQLAlchemy
    
    def to_model(self) -> ProjectModel:
        return ProjectModel(
            title=self.title, 
            description=self.description, 
            thumbnail=self.thumbnail, 
            report=self.report, 
            goal=self.goal,
            purposes=self.purposes
        )
    