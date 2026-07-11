# thehongjun

Hong Jun 的中文独立思想刊物，使用 Astro 生成静态站点。

## 本地开发

```bash
cd site
npm ci
npm run dev
```

## 构建

```bash
cd site
npm run build
```

构建会读取仓库根目录中的 `心行向量动力学/` 与 `books/` 下的公开书稿源文件，并将静态结果输出到 `site/dist/`。
