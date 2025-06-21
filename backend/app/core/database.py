from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

'''
This line tries to get the database's connection address from your computer's settings (environment variables).
If it can't find it there, it defaults to creating a simple file-based database named 'expenses.db'
right in the same folder where your program runs.
'''

DATABASE_URL = os.getenv('DTABASE_URL', 'sqlite:///./expenses.db')

'''
Here, we're setting up the "engine" that will connect to our database.
Think of it like the specialized machinery that handles all the talking
between your program and the database itself.
The "connect_args" part is a little technical; for simple file-based databases (like "sqlite"),
it ensures that different parts of your program can access the database at the same time
without causing errors.
'''
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
'''
This creates a "session maker." A session is like a temporary workspace
where you do all your database operations (like adding new data,
changing existing data, or looking up data).
"autocommit=False" means you have to explicitly tell the database when to save your changes.
"autoflush=False" means changes aren't immediately sent to the database until you save or query.
This gives you more control and can be more efficient.
'''
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

'''
his creates a base class for your database models.
# In simple terms, when you define what kind of data you want to store (e.g., "users" or "expenses"),
# you'll create Python classes for them. These classes will "inherit" from this 'Base'.
# This helps SQLAlchemy understand how your Python classes relate to tables in your databse
'''
Base = declarative_base()