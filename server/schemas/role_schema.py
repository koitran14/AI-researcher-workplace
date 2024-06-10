from pydantic import BaseModel
from typing import List, Optional
from models import Role as RoleModel

class Role(BaseModel):
    id: int
    title: str
    
    def to_model(self) -> RoleModel:
        return RoleModel(
            title=self.title
        )
