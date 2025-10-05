# Ecommerce App

This is a full-stack Ecommerce application with both frontend (React) and backend (Django/Flask/Node, specify as needed) components.

## Project Structure

```
/home/sai/ecommerce_app/
├── backend/        # Backend API (specify framework)
├── frontend/       # React frontend
├── .gitignore
├── README.md
└── ...
```

---

## Frontend

- **Location:** `frontend/`
- **Tech Stack:** React, Redux, React-Bootstrap

### Setup

```bash
cd frontend
npm install
npm start
```

- Runs on [http://localhost:3000](http://localhost:3000)

---

## Backend

- **Location:** `backend/`
- **Tech Stack:** (Django/Flask/Node, specify as needed)

### Setup

```bash
cd backend
# For Python (Django/Flask):
python -m venv ven
source ven/bin/activate
pip install -r requirements.txt
python manage.py runserver  # or flask run

# For Node.js:
npm install
npm start
```

- Runs on [http://localhost:8000](http://localhost:8000) or as configured

---

## Features

- Product listing
- Product details
- Cart management
- User authentication
- Order processing

---

## Environment Variables

- Frontend: `.env` in `frontend/`
- Backend: `.env` in `backend/` or use `ven/` for Python virtual environment

---

## License

MIT
