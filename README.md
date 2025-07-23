# RedditStream

A responsive React app to stream r/reactjs posts using infinite scroll, with creative UI using Bootstrap & MUI.

🔗 **Live Demo** (if hosted): _coming soon_  
🔗 **GitHub Repo**: [RedditStream](https://github.com/divyanshu-kumar123/RedditStream.git)

---

## 🚀 Features

- 🔄 **Infinite Scrolling**  
  Seamlessly loads more posts as you scroll using IntersectionObserver and Reddit's pagination (`after` token).

- 🪄 **Modern UI with Bootstrap & MUI**  
  Clean, creative, and responsive interface built with Bootstrap's layout and MUI components.

- ⚡ **Fast & Lightweight with Vite**  
  Built using Vite for blazing fast development and production builds.

- 📱 **Fully Responsive Design**  
  Optimized for 1280×720 but adapts perfectly to all screen sizes (mobile, tablet, desktop).

- 🧊 **Skeleton Loaders**  
  Shows loading placeholders while fetching data for smooth UX.

- 📥 **Lazy Loading**  
  Fetches data in small chunks to keep the app fast and efficient.

- 💡 **Memoized Components**  
  Post cards are memoized using `React.memo` to reduce unnecessary re-renders.

- 🧠 **Virtualized List Rendering**  
  Only renders visible posts using `react-window` for performance optimization.

- 🧭 **Search & Score Filter**  
  Allows users to search posts by title and filter based on minimum score.

- ⬆️ **Back to Top Button**  
  Appears on scroll and lets users jump back to the top instantly.

- 🎨 **Creative Animations**  
  Subtle transitions and fade-ins make the UI feel smooth and dynamic.

- 🧪 **Error & Empty States**  
  Displays user-friendly messages when there's no content or a fetch error occurs.

- 🌐 **Accessibility Ready**  
  Uses semantic HTML, proper roles, and keyboard-friendly elements.

- 💾 **Session Caching**  
  Optionally caches posts locally to reduce redundant API calls during the session.

---

## 🛠️ Tech Stack

- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [Material UI (MUI)](https://mui.com/)
- [React Window](https://github.com/bvaughn/react-window)

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/divyanshu-kumar123/RedditStream.git
   cd RedditStream
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```
src/
├── components/         # Reusable components (PostCard, Loader, etc.)
├── hooks/              # Custom hooks (e.g., useInfiniteScroll)
├── assets/             # Images, icons, etc.
├── styles/             # CSS and MUI styling
├── App.jsx             # Main app logic
└── main.jsx            # Entry point
```

---

## 🧩 Future Enhancements

* 🧠 AI-based post summarization
* 🗂️ Category filtering (Hot, New, Top)
* 🗳️ Upvote/downvote UI with local storage
* 📤 Shareable post cards
* 💬 Comment preview pop-up

---

## 🙏 Acknowledgements

* Reddit Public API: [r/reactjs](https://www.reddit.com/r/reactjs.json)
* Icons & Fonts: Google Fonts, MUI Icons

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

```
```
