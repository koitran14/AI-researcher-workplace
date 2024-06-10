from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import timedelta
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import os
from dotenv import load_dotenv

from schemas import user_schema
from models import User
from utils.auth import authenticate_user, create_access_token

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='/token')

async def create_user(create_user_request: user_schema.CreateUserRequest, db: Session):
    try: 
        create_user_model = User(
            username=create_user_request.username,
            hashed_password=bcrypt_context.hash(create_user_request.password),
            firstName= create_user_request.firstName,
            lastName= create_user_request.lastName,
            dob= create_user_request.dob,
            bio= create_user_request.bio,
            roleName= create_user_request.roleName,
        )
        
        db.add(create_user_model)
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Username already exists')
    except Exception as e:
        db.rollback() 
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=e)

async def read_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    
    user_projects = [project.title for project in user.projects]    
    user_favorites = [{
        'id': fav.id,
        'username': fav.username,
        'firstName': fav.firstName,
        'lastName': fav.lastName,
        'dob': fav.dob,
        'avatar': fav.avatar,
        'bio': fav.bio,
        'roleName': fav.roleName,
    } for fav in user.favorites]

    return {
        'id': user.id,
        'username': user.username,
        'hashed_password': user.hashed_password,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'dob': user.dob,
        'avatar': user.avatar,
        'bio': user.bio,
        'roleName': user.roleName,
        'projects': user_projects,
        'favorites': user_favorites
    }

async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends()):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')
    token = create_access_token(user.username, user.id, timedelta(minutes=20))
    return {'access_token': token, 'token_type': 'bearer'}

async def get_current_user(token: str = Depends(oauth2_bearer)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        expires: str = payload.get('exp')

        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid token')
        return {'username': username, 'id': user_id, 'expires': expires}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid token')
