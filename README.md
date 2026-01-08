# TN Consultant Blog System

A high-performance static blog built with Astro, Tailwind CSS, Notion API, and Cloudinary.

## Prerequisites

1. Node.js 18+
2. Notion Integration Token
3. Cloudinary Account

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root:
   ```env
   NOTION_TOKEN=secret_your_notion_token
   NOTION_DATABASE_ID=your_database_id
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Notion Setup**
   - Create a database in Notion matching `notion-schema.json`.
   - Add the "Name", "Slug", "Status", "Date", "Tags", "Excerpt" columns.
   - Share the database with your Notion Integration.

## Development Workflow

1. **Sync Images**
   Before building or developing, sync images from Notion to Cloudinary to prevent link expiration.
   ```bash
   npm run sync:images
   ```
   *This creates `src/data/image-map.json` which maps Notion block IDs to Cloudinary URLs.*

2. **Run Dev Server**
   ```bash
   npm run dev
   ```

## Design System
- **Colors**: Navy (#0F4C75) & Gold (#D4AF37).
- **Typography**: Playfair Display (Headings), Poppins (Body).
- **Layout**: Blog posts are constrained to `45rem` (720px) for readability.

## Deployment
This project is configured for static hosting (Netlify/Vercel).
Ensure the `npm run sync:images` command is run as part of the build command (e.g., `"build": "npm run sync:images && astro build"`).
