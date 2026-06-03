# ♟️ Live Chess Ratings

Real-time FIDE chess ratings, rankings, and game tracking powered by live tournament broadcasts and official rating data.

## 🚀 Live Demo

**Frontend:**
[Add Live Demo URL Here]

**API:**
[Add API URL Here]

---

## 📖 Overview

Live Chess Ratings provides up-to-date chess ratings and rankings for players worldwide across all major time controls:

- Classical
- Rapid
- Blitz

The platform continuously processes live tournament broadcasts, updates player ratings in real time, and serves fast ranking queries through an in-memory caching layer.

---

## ✨ Features

### 📊 Rating Rankings

- Global player rankings
- Classical, Rapid, and Blitz ratings
- Rating change tracking
- Country filtering
- Sorting and searching

### ⚡ Real-Time Updates

- Automatic tournament discovery
- Live game processing
- Continuous rating recalculation
- Periodic cache refresh

### 🎯 Player Information

- FIDE ID
- Federation
- Birthday
- Current rating
- Rating changes
- Recent games

### 🚀 Performance

- PostgreSQL 17
- In-memory caching
- Optimized API responses
- Dockerized deployment

---

## 🛠 Tech Stack

### Backend

- Java 25
- Spring Boot 4
- PostgreSQL 17
- Flyway
- Docker

### Frontend

- React
- React Router
- TypeScript
- Tailwind CSS

### Infrastructure

- Docker Hub
- GitHub Actions
- Oracle Cloud Infrastructure (OCI)

---

## 🏗 Architecture

```text
Lichess Broadcasts
        │
        ▼
Broadcast Discovery
        │
        ▼
Game Processing
        │
        ▼
PostgreSQL
        │
        ▼
In-Memory Cache
        │
        ▼
REST API
        │
        ▼
React Frontend
```

---

## ⚙️ Running Locally

### Clone Repository

```bash
git clone https://github.com/ShohjahonAhmad/live-chess-ratings.git
cd live-chess-ratings
```

### Backend

```bash
./mvnw spring-boot:run
```

### Frontend

```bash
npm install
npm run dev
```

Application:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8080
```

---

## 🐳 Docker

### Build

```bash
docker build -t live-chess-ratings .
```

### Run

```bash
docker run -p 8080:8080 live-chess-ratings
```

---

## 📡 Example API Endpoints

### Top Ratings

```http
GET /top-ratings
```

### Standard Ratings

```http
GET /std-ratings
```

### Country Filter

```http
GET /std-ratings?country=USA
```

### Search

```http
GET /std-ratings?search=carlsen
```

### Sorting

```http
GET /std-ratings?sort=YEAR&dir=ASC
```

---

## 🔄 Continuous Deployment

Every push to the `main` branch automatically:

1. Builds the Docker image
2. Runs GitHub Actions workflow
3. Pushes the latest image to Docker Hub

Docker Image:

```text
777peaceful777/live-chess-ratings:latest
```

---

## 📈 Future Improvements

- Player profile pages
- Historical rating charts
- Federation rankings
- Advanced statistics
- Mobile-first UI improvements
- Custom domains and HTTPS

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

Built with ♟️ by Shohjahon Ahmad.
