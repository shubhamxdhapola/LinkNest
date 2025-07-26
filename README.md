# LinkNest 🪺

A sleek, customizable **Link-in-Bio** platform for creators, professionals, and businesses to share all their important links in one place.
Inspired by **Linktree** and designed with a modern UI using **shadcn/ui**.

## ✨ Features

* 🔐 **Authentication** – Sign up with email, username & password
* 📝 **Custom Link Pages** – Add, edit, and manage your personal links
* 📱 **Responsive Design** – Optimized for mobile and desktop
* 🎨 **Minimal UI** – Built with **shadcn/ui** + **Tailwind CSS**
* ⚡ **Fast & Smooth** – Built with **Next.js App Router** and deployed on **Vercel**
* 🛠️ **Planned Features** – Link analytics, custom themes, and vanity URLs

---

## 🚀 Live Demo

👉 [\[Your Live Demo Link Here]](https://linknest-woad.vercel.app/)

---

## 🛠️ Tech Stack

* **Framework**: Next.js 14 (App Router)
* **UI Components**: shadcn/ui, Tailwind CSS
* **Database**: MongoDB + Mongoose
* **Authentication**: JSON Web Tokens (JWT) + Cookies
* **Deployment**: Vercel

---

## 📂 Project Structure (Simplified)

```
/app
  /auth      → Login & Register pages
  /dashboard → User dashboard to manage links
  /[username]→ Public profile page with user links
/components   → Reusable UI components
/lib          → Utility functions (e.g., auth helpers)
/models       → Mongoose schemas
/middleware   → Auth route protection
```

---

## 🧑‍💻 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/shubhamxdhapola/linknest.git
   cd linknest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:

   ```
   JWT_SECRET=your_jwt_secret_key
   NEXT_PUBLIC_HOST=http: your_host
   MONGO_ATLAS_URI=your_database_url
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset_name
   ```

4. **Run locally**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

---

## 📈 Upcoming Features

* 🔍 Link Analytics (views, clicks, etc.)
* 🎨 Custom Themes & Branding
* 🌐 Custom Domains
* 💾 Social Login (Google, GitHub)

---

## 📝 License

MIT License. Feel free to use, modify, and contribute!

---

## 🙌 Acknowledgements

* [shadcn/ui](https://ui.shadcn.com) – for the elegant component system
* [Next.js](https://nextjs.org) – for powering the frontend/backend
* [Vercel](https://vercel.com) – for seamless deployment

---
