# RideSync

Campus ride-sharing prototype: **Next.js** frontend + **Spring Boot** backend + **MySQL**.

## Quick start

### 1. Database

Import the schema from [RideSync-Database](https://github.com/b-shiva-prasad/RideSync-Database) into MySQL database `ridesync`.

### 2. Backend

```bash
cd BACKEND
export DB_URL=jdbc:mysql://localhost:3306/ridesync
export DB_USERNAME=root
export DB_PASSWORD=your_password
# optional:
export GEMINI_API_KEY=your_key
./mvnw spring-boot:run
```

See [BACKEND/README.md](BACKEND/README.md) for API docs and demo flow.

### 3. Frontend

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login).

## Features

- Register / Login (BCrypt + MySQL)
- Profile
- Post Ride (auto vehicle creation)
- Search & Book Ride
- Booking History
- AI Assistant (Gemini + local fallback)
- Smart recommendations (rule-based)
