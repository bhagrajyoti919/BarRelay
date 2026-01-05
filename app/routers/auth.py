from fastapi import APIRouter, HTTPException, Depends, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from uuid import uuid4
from datetime import timedelta
from boto3.dynamodb.conditions import Attr
from app.database import get_table
from app.config import USERS_TABLE, ACCESS_TOKEN_EXPIRE_MINUTES
from app.utils.security import get_password_hash, verify_password, create_access_token, get_current_user
from app.schemas.auth import UserCreate, Token, FCMTokenRequest

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup")
def signup(user: UserCreate):
    table = get_table(USERS_TABLE)
    
    # Check if email exists
    # Note: Scan is inefficient for large tables. Consider adding a GSI on 'email'.
    response = table.scan(
        FilterExpression=Attr("email").eq(user.email)
    )
    if response["Items"]:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = str(uuid4())
    hashed_password = get_password_hash(user.password)

    table.put_item(Item={
        "user_id": user_id,
        "email": user.email,
        "password_hash": hashed_password,
        "name": user.name,
        "age_verified": False
    })
    return {"message": "User created", "user_id": user_id}

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    table = get_table(USERS_TABLE)
    
    # Find user by email (using username field from form)
    response = table.scan(
        FilterExpression=Attr("email").eq(form_data.username)
    )
    items = response.get("Items")
    if not items:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = items[0]
    if not verify_password(form_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["user_id"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/save-fcm-token")
def save_fcm_token(
    request: FCMTokenRequest, 
    current_user: dict = Depends(get_current_user)
):
    table = get_table(USERS_TABLE)
    user_id = current_user["user_id"]
    
    table.update_item(
        Key={"user_id": user_id},
        UpdateExpression="SET fcm_token = :t",
        ExpressionAttributeValues={":t": request.token}
    )
    
    return {"message": "FCM token saved"}
