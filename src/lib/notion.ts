import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  coverImage?: string;
  cover?: string;
  category?: string;
}

export async function getPublishedPosts(): Promise<Post[]> {
  if (!DATABASE_ID) return [];
  
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      
      let coverUrl = "";
      if (page.cover) {
        if (page.cover.type === "external") {
          coverUrl = page.cover.external.url;
        } else if (page.cover.type === "file") {
          coverUrl = page.cover.file.url;
        }
      }
      
      if (!coverUrl && props.Cover?.files[0]) {
        const file = props.Cover.files[0];
        coverUrl = file.type === 'file' ? file.file.url : file.external?.url || '';
      }

      return {
        id: page.id,
        slug: props.Slug?.rich_text[0]?.plain_text || page.id,
        title: props.Title?.title[0]?.plain_text || "Untitled",
        excerpt: props.Excerpt?.rich_text[0]?.plain_text || "",
        date: props.Date?.date?.start || new Date().toISOString(),
        author: props.Author?.rich_text[0]?.plain_text || "TN Consultant",
        tags: props.Tags?.multi_select?.map((t: any) => t.name) || [],
        coverImage: coverUrl,
        cover: coverUrl,
        category: props.Category?.select?.name,
      };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBlocks(blockId: string) {
  const blocks = [];
  let cursor;
  
  while (true) {
    const { results, next_cursor }: any = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });
    
    blocks.push(...results);
    
    if (!next_cursor) break;
    cursor = next_cursor;
  }
  
  return blocks;
}
