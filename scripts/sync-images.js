import { Client } from "@notionhq/client";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const MAP_FILE = path.join(process.cwd(), "src/data/image-map.json");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function syncImages() {
  console.log("🚀 Starting Image Sync...");
  
  // Load existing map
  let imageMap = {};
  try {
    const data = await fs.readFile(MAP_FILE, "utf-8");
    imageMap = JSON.parse(data);
  } catch (e) {
    console.log("No existing map found, creating new one.");
  }

  // Fetch all posts
  const posts = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: { property: "Status", status: { equals: "Published" } },
  });

  for (const post of posts.results) {
    console.log(`Processing post: ${post.id}`);
    
    // 1. Handle Cover Image
    if (post.cover && post.cover.type === "file") {
        const notionUrl = post.cover.file.url;
        const mappedUrl = await uploadToCloudinary(notionUrl, `cover-${post.id}`, imageMap);
        imageMap[post.id] = mappedUrl; // We can use post ID as key for cover
    }

    // 2. Handle Block Images
    const blocks = await getAllBlocks(post.id);
    for (const block of blocks) {
        if (block.type === 'image' && block.image.type === 'file') {
            const notionUrl = block.image.file.url;
            const mappedUrl = await uploadToCloudinary(notionUrl, `block-${block.id}`, imageMap);
            imageMap[block.id] = mappedUrl;
        }
    }
  }

  await fs.writeFile(MAP_FILE, JSON.stringify(imageMap, null, 2));
  console.log("✅ Image Sync Complete. Map saved.");
}

async function getAllBlocks(blockId) {
    let blocks = [];
    let cursor;
    while (true) {
        const { results, next_cursor } = await notion.blocks.children.list({
            block_id: blockId,
            start_cursor: cursor,
        });
        blocks.push(...results);
        if (!next_cursor) break;
        cursor = next_cursor;
    }
    return blocks;
}

async function uploadToCloudinary(url, publicId, map) {
    // If we already have this ID mapped, checking expiry is complex. 
    // For simplicity in this script, we assume if it exists in map, it's good, 
    // BUT Notion URLs expire. So we actually shouldn't rely on the URL as the key.
    // We rely on the publicId (block ID).
    
    // Check if image exists in Cloudinary (optional optimization: skip if already uploaded)
    // Here we just upload/overwrite to ensure fresh link.
    try {
        const result = await cloudinary.uploader.upload(url, {
            folder: "tn-consultant-blog",
            public_id: publicId,
            overwrite: true, 
            resource_type: "image"
        });
        return result.secure_url;
    } catch (error) {
        console.error(`Error uploading ${publicId}:`, error.message);
        return url; // Fallback to original (will expire, but better than crash)
    }
}

syncImages();