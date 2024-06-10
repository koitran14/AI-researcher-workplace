from pydantic import BaseModel

class Field(BaseModel):
    id: int
    title: str
