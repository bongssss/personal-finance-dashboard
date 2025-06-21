# Personal Expense Tracker - One Month Project

## 🎯 Project Overview

A modern personal expense tracking web application that helps users manage their finances with intuitive categorization, visual analytics, and budget management. Perfect for showcasing full-stack development skills.

**Time Estimate**: 4 weeks (15 hours/week = 60 total hours)

## 🛠️ Tech Stack

### Core Technologies
- **Frontend**: React.js 18 + TypeScript
- **Backend**: FastAPI (Python 3.11+)
- **Database**: SQLite (simple, no setup required)
- **Authentication**: Simple JWT (no external provider)
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Charts**: Recharts for visualizations

### Why This Stack?
- **SQLite**: Zero configuration, perfect for development and small projects
- **JWT Auth**: Simple to implement, no external dependencies
- **React Context**: Sufficient for this scale, avoids Redux complexity
- **Tailwind**: Rapid UI development without custom CSS

## 📋 Core Features (MVP)

### Week 1: Authentication & Basic Setup
- [x] User registration and login
- [x] JWT token management
- [x] Basic dashboard layout
- [x] Responsive design foundation

### Week 2: Expense Management
- [x] Add/edit/delete expenses
- [x] Expense categorization (Food, Transport, Entertainment, etc.)
- [x] Date picker and amount input
- [x] Expense list with filtering

### Week 3: Analytics & Visualization
- [x] Monthly spending overview
- [x] Category-wise spending charts
- [x] Spending trends over time
- [x] Budget vs actual comparison

### Week 4: Polish & Advanced Features
- [x] Budget setting and tracking
- [x] Export data to CSV
- [x] Dark/light mode toggle
- [x] Mobile optimization
- [x] Basic search and filtering

## 🏗️ File Structure

### Frontend Structure
```
frontend/
├── .env
├── .eslint.config.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── (static assets) 
├── node_modules/
│   └── (dependencies) 
└── src/
    ├── components/
    │   ├── Auth/
    │   │   ├── LoginForm.jsx
    │   │   └── RegisterForm.jsx
    │   └── Layout/
    │       ├── Header.jsx
    │       ├── Sidebar.jsx
    │       └── Layout.jsx
    ├── context/
    │   └── AuthContext.jsx
    ├── pages/
    │   ├── Dashboard.jsx
    │   └── AuthPage.jsx
    ├── services/
    │   └── api.js
    ├── App.jsx
    └── main.jsx
```

### Backend Structure
```
backend/
├── app/
│   ├── api/
│   │   ├── auth.py
│   │   ├── expenses.py
│   │   └── analytics.py
│   ├── models/
│   │   ├── user.py
│   │   └── expense.py
│   ├── schemas/
│   │   ├── user.py
│   │   └── expense.py
│   ├── services/
│   │   ├── auth_service.py
│   │   └── expense_service.py
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   └── main.py
├── requirements.txt
└── run.py
```

## 🔄 User Stories

### Authentication
- **US-001**: As a user, I can register with email and password
- **US-002**: As a user, I can log in and stay authenticated
- **US-003**: As a user, I can log out securely

### Expense Management
- **US-004**: As a user, I can add a new expense with amount, category, and description
- **US-005**: As a user, I can view all my expenses in a list
- **US-006**: As a user, I can edit or delete existing expenses
- **US-007**: As a user, I can filter expenses by date range and category

### Analytics
- **US-008**: As a user, I can see my total spending for the current month
- **US-009**: As a user, I can view spending breakdown by category in a pie chart
- **US-010**: As a user, I can see spending trends over the last 6 months

### Budget Management
- **US-011**: As a user, I can set monthly budgets for different categories
- **US-012**: As a user, I can see how much I have left in each budget
- **US-013**: As a user, I get visual warnings when approaching budget limits

## 💾 Database Schema (SQLite)

```sql
-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Expenses table
CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    expense_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Budgets table
CREATE TABLE budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    UNIQUE(user_id, category, month, year)
);
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Expenses
- `GET /api/expenses` - Get user expenses (with filtering)
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense

### Analytics
- `GET /api/analytics/summary` - Monthly spending summary
- `GET /api/analytics/by-category` - Spending by category
- `GET /api/analytics/trends` - Spending trends over time

### Budgets
- `GET /api/budgets` - Get user budgets
- `POST /api/budgets` - Create/update budget
- `GET /api/budgets/status` - Get budget status (remaining amounts)

## 🎨 UI/Upip X Design

### Color Scheme
```css
/* Light mode */
--primary: #3B82F6;
--secondary: #10B981;
--danger: #EF4444;
--warning: #F59E0B;
--background: #F8FAFC;
--surface: #FFFFFF;

/* Dark mode */
--primary-dark: #60A5FA;
--secondary-dark: #34D399;
--background-dark: #0F172A;
--surface-dark: #1E293B;
```

### Key Components
1. **Dashboard**: Overview cards + charts
2. **Expense Form**: Modal with category dropdown
3. **Expense List**: Sortable table with actions
4. **Analytics Page**: Interactive charts and filters
5. **Budget Setup**: Category-wise budget setting

## 📊 Sample Data & Categories

### Default Categories
- 🍕 Food & Dining
- 🚗 Transportation  
- 🎬 Entertainment
- 🛒 Shopping
- 🏠 Bills & Utilities
- 💊 Healthcare
- ✈️ Travel
- 📚 Education
- 💼 Business
- 🎁 Gifts & Donations

### Sample Expenses (for demo)
```json
[
  {
    "amount": 25.50,
    "category": "Food & Dining",
    "description": "Lunch at cafe",
    "date": "2024-01-15"
  },
  {
    "amount": 60.00,
    "category": "Transportation",
    "description": "Gas fill-up",
    "date": "2024-01-14"
  }
]
```

## ⚡ Implementation Timeline

### Week 1 (15 hours)
**Backend Setup (8 hours)**
- FastAPI project setup
- SQLite database connection
- User model and authentication
- JWT token implementation
- Basic CRUD for users

**Frontend Setup (7 hours)**
- React + TypeScript setup
- Tailwind CSS configuration
- Authentication forms (login/register)
- Protected routes setup
- Basic layout components

### Week 2 (15 hours)
**Expense Management (15 hours)**
- Expense model and API endpoints
- Expense form component with validation
- Expense list with CRUD operations
- Category management
- Date picker and form handling
- Basic filtering (by date/category)

### Week 3 (15 hours)
**Analytics & Visualization (15 hours)**
- Analytics API endpoints
- Dashboard overview cards
- Recharts integration
- Pie chart for category breakdown
- Line chart for spending trends
- Monthly comparison view
- Responsive chart design

### Week 4 (15 hours)
**Polish & Advanced Features (15 hours)**
- Budget management system
- Dark/light mode implementation
- CSV export functionality
- Mobile responsive improvements
- Search and advanced filtering
- Error handling and loading states
- Final testing and bug fixes

## 🚀 Getting Started

### Prerequisites
```bash
# Backend
Python 3.11+
pip

# Frontend  
Node.js 18+
npm or yarn
```

### Quick Setup
```bash
# Clone and setup backend
mkdir expense-tracker && cd expense-tracker
mkdir backend && cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy sqlite3 python-jose[cryptography] passlib[bcrypt] python-multipart

# Setup frontend
cd .. && npx create-react-app frontend --template typescript
cd frontend
npm install axios recharts lucide-react date-fns
npm install -D tailwindcss postcss autoprefixer
```

### Environment Variables
```bash
# backend/.env
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./expenses.db

# frontend/.env
REACT_APP_API_URL=http://localhost:8000
```

## 🎯 Success Metrics

By the end of the month, you'll have:
- ✅ Full-stack application with authentication
- ✅ CRUD operations for expenses
- ✅ Visual analytics with charts
- ✅ Budget tracking system
- ✅ Responsive, modern UI
- ✅ RESTful API with documentation
- ✅ TypeScript for type safety
- ✅ Mobile-friendly design

## 🔄 Future Enhancements (Post-MVP)

If you want to continue after the month:
- Receipt image upload and OCR
- Recurring expense templates
- Multi-currency support
- Bank account integration
- Sharing expenses with family
- Advanced reporting
- Mobile app (React Native)

## 💡 Key Learning Outcomes

This project will teach you:
- **Full-stack development** with modern technologies
- **API design** and documentation
- **State management** in React
- **Database design** and relationships
- **Authentication** implementation
- **Data visualization** with charts
- **Responsive design** principles
- **TypeScript** best practices

Perfect for showcasing in your portfolio and demonstrating real-world development skills!

---

**Estimated Completion**: 4 weeks at 15 hours/week
**Difficulty**: Intermediate
**Portfolio Value**: High