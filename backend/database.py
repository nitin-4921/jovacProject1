import motor.motor_asyncio
import os

MONGO_DETAILS = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = None
database = None

async def connect_to_mongo():
    global client, database
    print("Connecting to MongoDB...")
    client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
    database = client.placementiq
    print("Connected to MongoDB.")

async def close_mongo_connection():
    global client
    if client:
        print("Closing MongoDB connection...")
        client.close()
        print("MongoDB connection closed.")

def get_db():
    global database
    return database
