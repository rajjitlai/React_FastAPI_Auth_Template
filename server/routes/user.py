from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import UserCreate, UserLogin, UserResponse, ForgotPassword, ResetPassword, StatusResponse
from auth import get_password_hash, verify_password, create_access_token, verify_token
import os
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", response_model=StatusResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        return {"status": False, "message": "user already existed"} # Match old API response style if needed, or use HTTP exceptions
    
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"status": True, "message": "record registered"}

@router.post("/login")
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        return {"status": False, "message": "invalid email or password"}

    access_token = create_access_token(data={"username": db_user.username})
    response.set_cookie(key="token", value=access_token, httponly=True, max_age=3600)
    return {"status": True, "message": "login successfully"}

@router.get("/verify")
def verify(request: Request):
    token = request.cookies.get("token")
    if not token:
        return {"status": False, "message": "no token"}
    
    payload = verify_token(token)
    if not payload:
        return {"status": False, "message": "invalid token"}
    
    return {"status": True, "message": "authorized"}

@router.get("/logout")
def logout(response: Response):
    response.delete_cookie("token")
    return {"status": True}

@router.post("/forgot-password")
def forgot_password(data: ForgotPassword, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        return {"status": False, "message": "user not registered"}
    
    # In a real app, send email here. For now, just generate token.
    token = create_access_token(data={"id": user.id}, expires_delta=timedelta(minutes=5))
    # Simulated email sending
    print(f"Reset Link: http://localhost:5173/resetPassword/{token}")
    return {"status": True, "message": "email sent"}

@router.post("/reset-password/{token}")
def reset_password(token: str, data: ResetPassword, db: Session = Depends(get_db)):
    payload = verify_token(token)
    if not payload:
        return {"status": False, "message": "invalid token"}
    
    user_id = payload.get("id")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {"status": False, "message": "user not found"}
    
    user.password = get_password_hash(data.password)
    db.commit()
    return {"status": True, "message": "updated password"}
