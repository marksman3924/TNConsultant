require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_KEY });
const pageId = '2d9e8c86-2e22-80b0-adab-db3319ae9b62';

notion.blocks.children.list({
  block_id: pageId,
  page_size: 100
}).then(response => {
  console.log('Total blocks:', response.results.length);
  
  response.results.forEach((block, i) => {
    console.log(`\nBlock ${i + 1}:`);
    console.log('Type:', block.type);
    
    const content = block[block.type];
    if (content?.rich_text && content.rich_text[0]) {
      console.log('Text:', content.rich_text[0].plain_text);
    }
  });
}).catch(err => console.error(err));
