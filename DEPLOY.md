# Deploy to Vercel

## Bước 1: Cài đặt Vercel CLI (Optional)

```bash
npm install -g vercel
```

## Bước 2: Deploy qua Vercel Dashboard (Khuyến nghị)

### Cách 1: Deploy từ GitHub (Tự động)

1. **Push code lên GitHub** (đã làm rồi ✅)

2. **Truy cập Vercel:**
   - Vào https://vercel.com
   - Đăng nhập bằng GitHub account

3. **Import Project:**
   - Click "Add New..." → "Project"
   - Chọn repository `fe-eng-react`
   - Click "Import"

4. **Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `flashcard-frontend` (nếu project nằm trong subfolder)
   - **Build Command:** `npm run build` (mặc định)
   - **Output Directory:** `dist` (mặc định)
   
5. **Environment Variables:**
   Thêm biến môi trường:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```
   ⚠️ **Quan trọng:** Thay `https://your-backend-url.com/api` bằng URL backend production của bạn

6. **Deploy:**
   - Click "Deploy"
   - Chờ 1-2 phút để build xong
   - Vercel sẽ tự động tạo URL: `https://your-project.vercel.app`

### Cách 2: Deploy từ CLI

```bash
# Di chuyển vào thư mục project
cd flashcard-frontend

# Login vào Vercel
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

## Bước 3: Cấu hình sau khi deploy

### 3.1. CORS trên Backend
Backend NestJS cần cho phép CORS từ domain Vercel:

```typescript
// main.ts
app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://your-project.vercel.app',
  ],
  credentials: true,
});
```

### 3.2. Environment Variables trên Vercel
Sau khi deploy, vào **Settings → Environment Variables** và thêm:

```
VITE_API_BASE_URL=https://your-backend-api.com/api
```

Sau đó **Redeploy** project để áp dụng thay đổi.

## Bước 4: Custom Domain (Optional)

1. Vào **Settings → Domains**
2. Add custom domain
3. Update DNS records theo hướng dẫn

## Auto Deploy

Sau lần deploy đầu tiên, mỗi khi bạn push code lên GitHub:
- Push vào `main` branch → Auto deploy to **Production**
- Push vào branch khác → Auto deploy to **Preview**

## Troubleshooting

### Lỗi 404 khi refresh page
- ✅ Đã fix bằng `vercel.json` (SPA routing)

### CORS Error
- Kiểm tra backend đã enable CORS cho domain Vercel chưa
- Kiểm tra `VITE_API_BASE_URL` đã đúng chưa

### Build Failed
- Kiểm tra lỗi trong build log
- Đảm bảo `package.json` có đúng dependencies
- Node version phù hợp (trong Vercel settings)

## Links hữu ích

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Build Logs: Xem trong mỗi deployment

## Note

- **Free tier** Vercel: 
  - Unlimited deployments
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Auto SSL certificates

- **Backend deployment:**
  Nếu backend NestJS chưa deploy, có thể deploy lên:
  - Railway.app
  - Render.com
  - Heroku
  - AWS/GCP/Azure
