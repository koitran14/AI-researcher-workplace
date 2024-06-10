from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import Depends, status
from typing import Annotated

from schemas import user_schema
from controllers import user_controller
from db import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)] 
user_dependency = Annotated[dict, Depends(user_controller.get_current_user)]
form_dependency = Annotated[OAuth2PasswordRequestForm, Depends()]

@router.get("/users/{user_id}", status_code=status.HTTP_200_OK)
async def read_user(user_id: int, db: db_dependency):
    return await user_controller.read_user(user_id=user_id, db=db)

@router.post("/users/", status_code=status.HTTP_201_CREATED)
async def createUser(user: user_schema.CreateUserRequest, db: db_dependency):
    return await user_controller.create_user(create_user_request=user, db=db)

@router.get('/', status_code=status.HTTP_200_OK)
async def user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return {"User": user}

@router.post('/currentUser', status_code=status.HTTP_200_OK)
async def getCurrent(token: user_schema.Token):
    if token is None:
        raise HTTPException(status_code=401, detail='Token is Null')

    return await user_controller.get_current_user(token.access_token)
    

@router.post('/token', response_model=user_schema.Token)
async def login(form_data: form_dependency, db: db_dependency):
    return await user_controller.login_for_access_token(form_data=form_data, db=db)


