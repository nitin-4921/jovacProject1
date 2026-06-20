from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from database import get_db
import bcrypt
from auth_utils import create_access_token

router = APIRouter()

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate):
    db = get_db()
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_dict = user.model_dump()
    user_dict["password"] = hashed_password
    
    new_user = await db.users.insert_one(user_dict)
    
    # Generate token for immediate login after signup
    token = create_access_token(data={"sub": user.email, "role": user.role})
    
    return {
        "message": "User created successfully", 
        "id": str(new_user.inserted_id),
        "access_token": token,
        "token_type": "bearer",
        "user": {"email": user.email, "name": user.name, "role": user.role}
    }

@router.post("/login")
async def login(user: UserLogin):
    db = get_db()
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    token = create_access_token(data={"sub": db_user["email"], "role": db_user["role"]})
    
    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {"email": db_user["email"], "name": db_user["name"], "role": db_user["role"]}
    }
