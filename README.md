# Pixels Gallery

**Pixels Gallery** is a modern, full-stack image gallery application built with **Next.js**, **TypeScript**, **Material UI**, and **Cloudinary**, offering a seamless and responsive user experience. The project leverages a RESTful backend built with **Express** and **MongoDB** to handle secure image metadata operations.

---

## Features

- Upload single or multiple images to Cloudinary
- Responsive and adaptive image grid layout
- Infinite scrolling with lazy loading
- Modal-based image preview with like and view counters
- Drag-and-drop image upload
- Search functionality based on image title or tags
- Trending section based on popularity metrics
- Delete images with confirmation prompt
- Polished UI using Material UI with custom header and footer components

---

## Tech Stack

### Client
- **Next.js** 15 (with Turbopack)
- **TypeScript**
- **Material UI** 7
- **Cloudinary SDK** + `next-cloudinary`
- **Tailwind CSS** 4
- **React Hot Toast**

### Server
- **Express.js** 5
- **MongoDB** with **Mongoose**
- **TypeScript** with `ts-node-dev`
- **CORS** and **dotenv**

---

## File Structure

```
pixels-gallery/
├── client/       # Frontend (Next.js + TypeScript)
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── ...
├── server/       # Backend (Express + MongoDB)
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── server.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB URI
- Cloudinary account with credentials

---

## Environment Variables

Create a `.env` file in both the `client` and `server` directories.

### Client `.env`

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Server `.env`

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Installation

### Client Setup

```bash
cd client
npm install
npm run dev
```

### Server Setup

```bash
cd server
npm install
npm run start:dev
```

---

## Scripts

### Client

- `npm run dev` – Start development server
- `npm run build` – Create production build
- `npm run start` – Start production server

### Server

- `npm run start:dev` – Start development server with auto-reload
- `npm run build` – Compile TypeScript

---

## Deployment

The project can be deployed using platforms like **Vercel** (for frontend) and **Render / Railway / Cyclic** (for backend). Make sure to add required environment variables during deployment.

---

## Live Preview & Repository

- **Live Site:** [https://pixels-client.vercel.app/](https://pixels-client.vercel.app/)
- **GitHub Repo:** [github.com/mehadi-shuvo/pixels-gallery](https://github.com/mehadi-shuvo/pixels-gallery)

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

Developed by [Mehadi Shuvo](https://www.linkedin.com/in/mehadi-shuvo/)  
Feel free to reach out for collaboration or feedback!
```