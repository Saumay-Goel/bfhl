
# SRM Full Stack Engineering Challenge - BFHL

🚀 **Live Demos**
- **Frontend Web App:** [https://bfhl-43ty.vercel.app/](https://bfhl-43ty.vercel.app/)
- **Backend API Base URL:** [https://bfhl-mauve.vercel.app/](https://bfhl-mauve.vercel.app/) *(Endpoint: POST `/bfhl`)*

---

## 🎯 Objective
A robust REST API that processes an array of directed graph edges (nodes), calculates hierarchical relationships, detects cycles, and calculates tree depths. The backend is paired with a sleek, responsive frontend that visualizes the resulting hierarchies, statistics, and handles edge cases dynamically.

---

## 💻 Tech Stack

### **Frontend**
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Key Features
- **Strict Input Validation:** Automatically filters out invalid nodes, self-loops, and improper formats.
- **Cycle Detection & Isolation:** Uses DFS/Union-Find logic to securely separate valid hierarchical trees from cyclical dependencies.
- **Intelligent Tiebreakers:** Calculates exact maximum depths and resolves ties using lexicographical node sorting.
- **Dynamic Tree Visualization:** The frontend features a recursive tree builder that accurately maps infinite depths.
- **High Performance:** Designed to handle complex inputs and respond within the sub-3-second threshold requirement.

---

## 🔌 API Specification

### `POST /bfhl`
**Headers:** `Content-Type: application/json`

#### **Request Body**
```json
{
  "data": ["X->Y", "Y->Z", "P->Q", "Q->R", "M->N", "N->O", "O->M"]
}
```

#### **Sample Response**
```json
{
    "user_id": "saumaygoel_14102004",
    "email_id": "sg0627@srmist.edu.in",
    "college_roll_number": "RA2311029010013",
    "hierarchies": [
        {
            "root": "X",
            "tree": {
                "X": {
                    "Y": {
                        "Z": {}
                    }
                }
            },
            "depth": 3
        },
        {
            "root": "P",
            "tree": {
                "P": {
                    "Q": {
                        "R": {}
                    }
                }
            },
            "depth": 3
        },
        {
            "root": "M",
            "tree": {},
            "has_cycle": true
        }
    ],
    "invalid_entries": [],
    "duplicate_edges": [],
    "summary": {
        "total_trees": 2,
        "total_cycles": 1,
        "largest_tree_root": "P"
    }
}
```

---

## 🛠️ Local Setup & Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

### 2. Environment Variables
Create a `.env` file in the root directory and add the following keys required by the backend:
```env
USER_ID="saumaygoel_14102004"
EMAIL_ID="sg0627@srmist.edu.in"
COLLEGE_ROLL="RA2311029010013"
NEXT_PUBLIC_API_URL="http://localhost:3000/api" 
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Run the Development Server
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
