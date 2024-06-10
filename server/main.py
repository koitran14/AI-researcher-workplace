from fastapi import FastAPI
from db import engine
import models
from views import user_view, project_view
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  
    "http://localhost:8000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

models.Base.metadata.create_all(bind=engine)

app.include_router(user_view.router)
app.include_router(project_view.router)