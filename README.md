# Portfolio — React + Tailwind + GSAP + Express + MySQL

Reference design ka full replica. Do parts hain: `frontend` (React/Vite) aur `backend` (Express + MySQL, sirf contact form ke liye).

---

## 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

`.env` file kholo aur apne MySQL credentials daalo:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio_db
```

Database aur table banao (MySQL/phpMyAdmin me `schema.sql` run kar do):

```bash
mysql -u root -p < schema.sql
```

Server start karo:

```bash
npm run dev
```

Backend `http://localhost:5000` pe chalega. Test: browser me `http://localhost:5000` khol ke check karo "Portfolio backend is running 🚀" dikhna chahiye.

---

## 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend `http://localhost:5174` pe khulega.

---

## 3. Apna Content Daalna (SABSE ZAROORI STEP)

Poora content ek hi jagah centralize kiya hai:

```
frontend/src/data/portfolioData.js
```

Isi file me edit karo:
- `profile` → naam, role, description, photo URL, availability
- `stats` → years experience, projects, clients
- `projects` → apne 3 (ya jitne chaho) projects — title, category, image, link
- `education` → degree/certifications
- `skills` → tumhare skill tags
- `workProcess` → 5 steps (icon lucide-react se hai, `icon` key change kar sakte ho)
- `quote` → tumhari quote/tagline
- `contact` → email, website, phone, location

**Apni photo lagane ke liye:** photo ko `frontend/public/` folder me daalo (e.g. `my-photo.jpg`) aur `profile.photo` me `"/my-photo.jpg"` likh do. Abhi placeholder photo (`pravatar.cc`) lagi hui hai.

Projects/mockup images bhi abhi Unsplash placeholder hain — apni screenshots se replace kar dena.

---

## 4. Tech Stack

| Layer      | Tech |
|------------|------|
| Frontend   | React 18, Vite, Tailwind CSS |
| Animation  | GSAP + ScrollTrigger (`@gsap/react`) |
| Icons      | lucide-react |
| Backend    | Node.js, Express |
| Database   | MySQL (raw `mysql2`, connection pool) |

---

## 5. Structure

```
portfolio/
├── backend/
│   ├── config/db.js          # MySQL connection pool
│   ├── controllers/          # contact form logic
│   ├── routes/                # /api/contact routes
│   ├── schema.sql            # DB table
│   └── server.js
└── frontend/
    └── src/
        ├── components/        # Navbar, Hero, Projects, EducationSkills,
        │                       # WorkProcess, Quote, Contact
        ├── data/portfolioData.js   # <-- apna content yahan
        ├── hooks/useScrollReveal.js # GSAP scroll animation hook
        └── api/contact.js     # backend se baat karne wala axios call
```

---

## 6. Deployment (jaise Real Estate project me kiya tha)

- **Frontend** → Vercel (root: `frontend`, build command: `npm run build`, output: `dist`)
- **Backend** → Render / Railway
- **MySQL** → Railway / Hostinger / freesqldatabase.com

Deploy karte waqt `frontend/.env` me `VITE_API_URL` ko live backend URL se replace karna, aur backend `.env` me `CLIENT_URL` ko live frontend URL se.
