# App Store 應用程式瀏覽器

這是一個使用 Next.js 開發的應用程式瀏覽器，可以瀏覽和搜尋 App Store 上的應用程式。

## 功能特點

- 瀏覽推薦應用程式
- 搜尋應用程式
- 無限滾動載入
- 響應式設計
- 繁體中文介面

## 技術棧

- Next.js 15
- React 19
- TypeScript
- Redux Toolkit
- Ant Design
- Tailwind CSS

## 開始使用

1. 克隆專案：
```bash
git clone [您的 GitHub 倉庫 URL]
cd app-spotlight
```

2. 安裝依賴：
```bash
npm install
# 或
yarn install
```

3. 啟動開發伺服器：
```bash
npm run dev
# 或
yarn dev
```

4. 在瀏覽器中開啟 [http://localhost:3000](http://localhost:3000)

## 專案結構

```
src/
  ├── app/              # Next.js 應用程式頁面
  ├── components/       # React 組件
  ├── services/        # API 服務
  ├── store/           # Redux 狀態管理
  └── styles/          # CSS 樣式
```

## 開發指南

- 使用 `npm run lint` 檢查程式碼風格
- 使用 `npm run build` 建置專案
- 使用 `npm run start` 啟動生產環境伺服器

## 貢獻指南

1. Fork 專案
2. 建立您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 授權

此專案採用 MIT 授權 - 查看 [LICENSE](LICENSE) 檔案以了解詳情

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
