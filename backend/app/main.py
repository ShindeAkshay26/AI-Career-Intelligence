from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="AI Career Intelligence"
)

app.include_router(router)