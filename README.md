# Chat Application - Take-Home Assignment

This is a chat application built as part of a take-home assignment for Periskope’s recruitment process. The project replicates a chat UI with real-time messaging functionality using Next.js, Tailwind CSS, Supabase, and TypeScript.

---

## Demo

Live Demo: [https://your-vercel-link.com](https://periskope-chat-app-h8cd.vercel.app/login)

---

## Tech Stack

- **Next.js** (React framework for server-side rendering and routing)  
- **Tailwind CSS** (Utility-first CSS framework for styling)  
- **Supabase** (Backend-as-a-Service providing authentication and realtime database)  
- **TypeScript** (Static typing for improved developer experience)  
- **React Icons** (Icon library for UI elements)

---

## Features

- User Authentication with Supabase (Sign Up, Login, Logout)  
- Pixel-perfect UI closely following the provided design  
- Real-time chat messaging with live updates using Supabase’s real-time features  
- Display list of chats and open conversations by clicking  
- Sending messages stores them in the Supabase database  
- Responsive design for desktop and mobile  
- All buttons and icons included, some peripheral buttons are non-functional as per assignment instructions

---

## Optional & Bonus Features
- Implement Filters and Search for Chats
- Implement a way to add labels to chats
- Implement a way to assign members to different chats
- IndexedDB integration for offline data persistence
- Use of semantic HTML tags for accessibility

---

## Supabase Database Schema

- **users**: Stores user profiles  
- **chats**: Stores chat room info 
- **messages**: Stores messages linked to chats and users  
- **chat_members**: between users and chats
