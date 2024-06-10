from pydantic import BaseModel
from datetime import date
from typing import List, Optional
from .role_schema import Role
from .field_schema import Field
from .project_schema import Project

class User(BaseModel):
    id: int
    username: str
    hashed_password: str
    
    firstName: str
    lastName: str
    dob: date
    bio: str
    ava: Optional[str] = None
    roleName: Optional[Role] = None
    
    projects: Optional[List[Project]] = []
    fields: List[Field] = []

    class Config:
        orm_mode = True 
        
        

class CreateUserRequest(BaseModel):
    username: str
    password: str
    firstName: str
    lastName: str
    dob: date
    bio: str
    roleName: str

class register(BaseModel):
    username: str
    hashed_password: str
    firstName: str
    lastName: str
    dob: date
    bio: str
    roleName: str
        
class Token(BaseModel):
    access_token: str
    token_type: str