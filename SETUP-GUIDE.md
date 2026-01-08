# Setup Guide

## 1. Environment Setup
Create a `.env` file in the root directory based on `.env.example`:

```env
NOTION_TOKEN=secret_...
NOTION_DATABASE_ID=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## 2. Install Dependencies
```bash
npm install
```

## 3. Notion Configuration
Ensure your Notion database has the following properties:
- **Name**: Title
- **Slug**: Text (Unique ID for URL)
- **Status**: Select (Options: Draft, Published)
- **Date**: Date
- **Author**: Person
- **Tags**: Multi-select
- **Excerpt**: Text
- **Cover**: Page Cover Image

**Important**: Share your database with the Notion Integration created in the developer portal.

## 4. Sync Images
Run this command to download images from Notion and upload to Cloudinary. This generates `src/data/image-map.json`.
```bash
npm run sync:images
```

## 5. Run Development Server
```bash
npm run dev
```

## 6. Build for Production
```bash
npm run build
```