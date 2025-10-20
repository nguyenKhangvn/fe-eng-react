# Flashcard App - Frontend

Ứng dụng học tiếng Anh bằng flashcard được xây dựng với React, TypeScript và Vite.

## Tính năng

- ✅ Đăng ký/Đăng nhập với JWT Authentication
- ✅ Quản lý Decks (Tạo, Sửa, Xóa)
- ✅ Quản lý Cards trong mỗi Deck
- ✅ Practice Mode với flip card animation
- ✅ Shuffle cards khi luyện tập
- ✅ Progress tracking
- ✅ Responsive design với TailwindCSS
- ✅ Form validation với React Hook Form + Zod
- ✅ Data fetching và caching với React Query

## Tech Stack

- **React 18+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router v6** - Routing
- **TailwindCSS** - Styling
- **React Query (TanStack Query)** - Data fetching & caching
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client

## Cài đặt

1. Clone repository và cài dependencies:

```bash
cd flashcard-frontend
npm install
```

2. Đảm bảo backend đang chạy tại `http://localhost:3000`

3. Chạy development server:

```bash
npm run dev
```

4. Mở browser tại `http://localhost:5173`

## Cấu trúc dự án

```
src/
├── components/          # Reusable components
│   ├── auth/           # Login, Register, ProtectedRoute
│   ├── layout/         # Layout component
│   └── ui/             # Button, Input, Modal, Loading
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DecksPage.tsx
│   ├── DeckDetailPage.tsx
│   └── PracticePage.tsx
├── services/           # API services
│   ├── api.ts          # Axios instance với JWT interceptor
│   ├── authService.ts  # Authentication APIs
│   ├── deckService.ts  # Decks CRUD APIs
│   └── cardService.ts  # Cards CRUD APIs
├── hooks/              # Custom hooks
│   ├── useDecks.ts     # React Query hooks cho Decks
│   └── useCards.ts     # React Query hooks cho Cards
├── context/            # React Context
│   └── AuthContext.tsx # Authentication state
├── types/              # TypeScript types
│   └── index.ts        # Interfaces
├── utils/              # Utilities
│   ├── storage.ts      # LocalStorage helpers
│   └── constants.ts    # Constants
├── App.tsx
├── main.tsx
└── router.tsx          # React Router config
```

## API Endpoints

Backend API base URL: `http://localhost:3000/api`

### Authentication
- `POST /auth/register` - Đăng ký
- `POST /auth/login` - Đăng nhập

### Decks (Protected)
- `GET /decks` - Lấy danh sách decks
- `GET /decks/:id` - Lấy chi tiết deck
- `POST /decks` - Tạo deck mới
- `PATCH /decks/:id` - Cập nhật deck
- `DELETE /decks/:id` - Xóa deck

### Cards (Protected)
- `GET /decks/:deckId/cards` - Lấy danh sách cards
- `GET /decks/:deckId/cards/:id` - Lấy chi tiết card
- `POST /decks/:deckId/cards` - Tạo card mới
- `PATCH /decks/:deckId/cards/:id` - Cập nhật card
- `DELETE /decks/:deckId/cards/:id` - Xóa card

## Scripts

```bash
# Development
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Routing

- `/` - Redirect to `/decks`
- `/login` - Trang đăng nhập
- `/register` - Trang đăng ký
- `/decks` - Danh sách decks (Protected)
- `/decks/:deckId` - Chi tiết deck (Protected)
- `/decks/:deckId/practice` - Practice mode (Protected)

## Features Details

### Authentication Flow
1. User đăng ký hoặc đăng nhập
2. JWT token được lưu vào localStorage
3. Token tự động được thêm vào headers của mọi request
4. Protected routes kiểm tra authentication trước khi render

### Decks Management
- Hiển thị grid các decks với số lượng cards
- Modal để tạo deck mới
- Xóa deck với confirmation dialog
- Click vào deck để xem cards

### Cards Management
- Hiển thị list cards trong deck
- Click để flip giữa front và back
- Modal để thêm card mới
- Xóa card với confirmation

### Practice Mode
- Flip animation khi click vào card
- Progress bar showing current position
- Next/Previous navigation
- Shuffle cards option
- Completion message khi hết cards

## License

MIT
