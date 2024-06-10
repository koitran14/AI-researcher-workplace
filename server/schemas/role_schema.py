from pydantic import BaseModel
from typing import List, Optional

class Role(BaseModel):
    id: int
    title: str
