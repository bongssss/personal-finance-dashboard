import sqlite3
import psycopg2

# --- STEP 1: Read all SQLite data ---
# Make sure 'expenses.db' is in the same folder as this script, or provide full path
sqlite_conn = sqlite3.connect("expenses.db")
sqlite_cursor = sqlite_conn.cursor()

# Fetch all rows from the 'expenses' table
sqlite_cursor.execute("SELECT * FROM expenses")
rows = sqlite_cursor.fetchall()

# Get column names from SQLite table
sqlite_cursor.execute("PRAGMA table_info(expenses)")
columns = [col[1] for col in sqlite_cursor.fetchall()]  # col[1] is column name
columns_str = ", ".join(columns)
placeholders = ", ".join(["%s"] * len(columns))

sqlite_conn.close()  # Close SQLite connection to avoid memory conflicts

# --- STEP 2: Insert into PostgreSQL ---
pg_conn = psycopg2.connect(
    "postgresql://personal_financedb_user:wRRy5VtJguyq3Q6TRuVApUHNXx9AMMFk@dpg-d2it2endiees738pula0-a.oregon-postgres.render.com/personal_financedb"
)
pg_cursor = pg_conn.cursor()

# Insert all rows into PostgreSQL
for row in rows:
    pg_cursor.execute(
        f"INSERT INTO expenses ({columns_str}) VALUES ({placeholders})",
        row
    )

pg_conn.commit()
pg_cursor.close()
pg_conn.close()

print(f"Successfully migrated {len(rows)} rows from SQLite to PostgreSQL.")
