# Big Brain - Frontend

Welcome to the **Big Brain** frontend repository! This project is built with **React**, **TypeScript**, **Redux Toolkit**, **Tailwind CSS**, and **Framer Motion**. It is designed to manage and interact with "Brain Items" efficiently with a clean UI/UX.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/big-brain-frontend.git
cd big-brain-frontend
```
### 2. Install dependencies
```
npm install
# or
yarn install
```
### 3. Set up environment variables
```
VITE_API_URL=https://your-api-url.com
```
### 4. Start the development server
```
npm run dev
# or
yarn dev
```

---

## 📁 Project Structure
```
src/
├─ assets/         # Icons, images
├─ components/     # React components
├─ slices/         # Redux slices
├─ store/          # Redux store setup
├─ ui/             # Reusable UI elements (buttons, inputs, loaders)
├─ utils/          # Services and helper functions (API requests, BrainService)
├─ App.tsx         # Root component and routes
└─ main.tsx        # Entry point
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

Pick an issue from the repository issues list.

Create a branch:
```

main-issue-name-your-name


Example:

main-fix-login-bug-john
```

Make changes following project conventions.

Commit changes using structured messages with tags:
```
[FIX] big_brain_frontend: fixed login button bug
- fixed button alignment
- removed redundant CSS

[ADD] big_brain_frontend: added new loader component

[REM] big_brain_frontend: removed unused utils

[REF] big_brain_frontend: refactored BrainService API methods

[IMP] big_brain_frontend: improved performance of BrainItem component
```

Push your branch:

git push origin main-issue-name-your-name


Create a Pull Request on GitHub and reference the issue.
```

⚡ Commit Message Tags

[FIX] - bug fixes

[ADD] - new features

[REM] - removed code/features

[REF] - refactoring

[IMP] - performance improvements or enhancements
```

Please make sure you commit message and PR description should explain your work.

Thank you for contributing to Big Brain! 🎉
