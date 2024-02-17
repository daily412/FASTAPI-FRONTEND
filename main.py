from fastapi import FastAPI
import psycopg2
from fastapi.middleware.cors import CORSMiddleware
from subprocess import Popen, PIPE
import json

app = FastAPI()

# Allow requests from all origins (replace "*" with specific origins if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/list_directories")
async def list_directories():
    command = "dir /B"  # Command to list directories (Update as needed)
    process = Popen(command, shell=True, stdout=PIPE, stderr=PIPE)
    stdout, _ = process.communicate()
    directories = stdout.decode().splitlines()
    return directories

@app.get("/api/data")
async def get_data():
    try:
        # Connect to PostgreSQL database
        conn = psycopg2.connect(
            dbname="postgres",
            user="postgres",
            password="root",
            host="localhost"
        )
        
        # Create a cursor object
        cur = conn.cursor()

        # Execute a query to fetch data
        cur.execute("SELECT * FROM users;")

        # Fetch all rows
        rows = cur.fetchall()

        # Close cursor and connection
        cur.close()
        conn.close()

        # Return fetched data
        return rows

    except Exception as e:
        return {"error": str(e)}
