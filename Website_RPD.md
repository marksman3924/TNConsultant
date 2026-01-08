📋 TABLE OF CONTENTS

Project Overview
Tech Stack
Design System
Project Structure
Key Features
Component Guidelines
Integration Details
Development Workflow
Common Tasks
Troubleshooting


# 🎯 PROJECT OVERVIEW
**Purpose**
Professional consulting website for Vietnamese astrology services (Tử Vi & Bát Tự) with modern strategic positioning, targeting business professionals who value data-driven life planning.

**Brand Positioning**

NOT: Traditional fortune telling
IS: Strategic life planning using metaphysical analysis
Tone: Premium, analytical, trustworthy
Target Audience: Vietnamese business professionals, 30-50 years old

**Core User Journey**

Land on homepage → Watch hero video
Learn about Life Strategy → Interactive Venn diagram
Read blog content → Notion-powered CMS
Book consultation → React form → Lark database


# 🛠 TECH STACK
**Core Framework**
json{
  "framework": "Astro 4.x",
  "rendering": "Static Site Generation (SSG) + Client Islands",
  "styling": "Tailwind CSS 3.x",
  "ui-library": "React 18.x (for interactive components only)",
  "cms": "Notion API",
  "deployment": "Vercel (recommended) or Netlify",
  "analytics": "Planned (not implemented)"
}

**Dependencies**
> Core
npm install astro @astrojs/react @astrojs/tailwind

> UI & Icons
npm install react react-dom lucide-react

> CMS Integration
npm install @notionhq/client notion-to-md

> Utilities
npm install tailwindcss
**File Extensions**

.astro - Astro components (server-rendered)
.tsx - React components (client-side interactive)
.md - Markdown content (static pages)


# 🎨 DESIGN SYSTEM
## Color Palette
javascript// tailwind.config.js
colors: {
  // Primary Colors
  'dark': '#1e1e1e',           // Main background
  'dark-lighter': '#2a2a2a',   // Secondary surfaces
  'cream': '#FFF0CA',          // Primary accent
  'gold': '#D4AF37',           // CTA buttons, highlights
  'gold-light': '#E5C158',     // Hover states
  
  // Text Colors
  'gray': '#69727d',           // Body text
  'gray-light': '#cacaca',     // Secondary text
  
  // Semantic (legacy - avoid using)
  'primary': '#1e1e1e',
  'accent': '#FFF0CA',
}
## Typography
### Font Families
css/* Headings & Display Text */
font-family: Georgia, 'Times New Roman', serif;

/* Body & UI Text */
font-family: Montserrat, -apple-system, BlinkMacSystemFont, sans-serif;
### Typography Scale
javascript// Headings (use font-serif)
'hero': '72px / 0.92 / 600',        // Desktop hero
'hero-mobile': '42px / 0.92 / 600', // Mobile hero
'display': '36px / 1.40 / 600',     // Section titles
'heading-xl': '48px / 1.2',         // Large headings
'heading-lg': '32px / 1.3',         // Medium headings

// Body Text (use font-sans)
'base': '16px',                     // Standard body
'lg': '18px',                       // Large body
'xl': '20px',                       // Emphasized text
'2xl': '24px',                      // Large display text
### Spacing System
javascript// Use Tailwind's default scale (4px base unit)
// Common patterns:
- Section padding: py-20 sm:py-28
- Container padding: px-6 sm:px-8 lg:px-12
- Grid gaps: gap-8, gap-16
- Content spacing: space-y-6, space-y-8
- Max widths: max-w-7xl (1280px), max-w-4xl (896px)
## UI Components
### Glass Effect
css.glass {
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 240, 202, 0.1);
}
### Buttons
astro<!-- Primary CTA (Gold) -->
<a 
  href="/booking"
  class="px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 shadow-2xl"
  style="background-color: #D4AF37; color: #1e1e1e;"
>
  Đặt lịch ngay
</a>

<!-- Secondary CTA (Outline) -->
<a 
  class="px-8 py-4 rounded-full font-semibold text-base border-2 border-white/30 text-white hover:bg-white/10 transition-all"
>
  Tìm hiểu thêm
</a>
```

---

## 📁 PROJECT STRUCTURE
```
tn-consultant-blog/
├── src/
│   ├── components/
│   │   ├── Header.astro              # Global navigation
│   │   ├── BlogCard.astro            # Blog post preview card
│   │   ├── StrategyVenn.astro        # Interactive Venn diagram
│   │   └── BookingForm.tsx           # React booking form
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro          # Global HTML wrapper
│   │
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   ├── booking.astro             # Booking page
│   │   ├── blog/
│   │   │   ├── index.astro           # Blog listing
│   │   │   └── [slug].astro          # Blog post detail
│   │   └── 404.astro
│   │
│   ├── lib/
│   │   └── notion.ts                 # Notion API client
│   │
│   └── styles/
│       └── global.css                # Global styles
│
├── public/
│   ├── videos/
│   │   ├── hero-video.mp4            # Hero background video
│   │   └── torii-gate.jpg            # Life Strategy background
│   └── blog/                         # Blog post images
│
├── astro.config.mjs                  # Astro configuration
├── tailwind.config.js                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json
└── .env                              # Environment variables

# ⚡ KEY FEATURES
1. Homepage (index.astro)
Section 1: Hero Video
astro<!-- Features -->
- Full-screen video background
- Overlay gradient (dark to transparent)
- Typography: Large serif headings with italic emphasis
- Dual CTA buttons (gold primary + outline secondary)

<!-- Technical -->
<video autoplay muted loop playsinline>
  <source src="/videos/hero-video.mp4" type="video/mp4" />
</video>

<!-- Typography -->
H1: text-5xl sm:text-6xl md:text-7xl lg:text-8xl
Italic words: text-cream
Body: text-lg sm:text-xl md:text-2xl
Section 2: Life Strategy
astro<!-- Features -->
- Torii gate static background with parallax
- Quote with emphasized "nhưng"
- Two-column layout (Venn diagram + text)
- Expandable "Tìm hiểu thêm" accordion
- 3-layer methodology cards
- Benefits grid (2x2)

<!-- Interactive Venn Diagram -->
Component: <StrategyVenn />
- Three overlapping circles (Thời, Thế, Lực)
- Hover to reveal descriptions
- Center Yin-Yang icon
- Glass morphism effect
Section 3: Blog Posts
astro<!-- Features -->
- 3 recent posts from Notion
- Grid layout (3 columns on desktop)
- Glass card effect
- "Xem tất cả bài viết" link

<!-- Data Source -->
const recentPosts = (await getPublishedPosts()).slice(0, 3);
2. Blog System (Notion CMS)
Blog Listing (/blog)
astro<!-- Features -->
- Fetch all published posts from Notion
- Grid layout with BlogCard components
- Filter by category/tags (optional)
- Pagination (if >12 posts)

<!-- Query -->
const posts = await getPublishedPosts();
Blog Post Detail (/blog/[slug])
astro<!-- Features -->
- Dynamic route based on Notion slug
- Markdown content rendering
- Cover image
- Metadata (date, reading time, tags)
- Related posts (optional)

<!-- Data Fetching -->
const { slug } = Astro.params;
const post = await getPostBySlug(slug);
3. Booking System
Booking Page (/booking)
astro<!-- Features -->
- React form component (<BookingForm client:load />)
- Form fields: Name, Email, Phone, Date, Subject (radio), Opt-in
- Submit to Lark webhook
- Success/error messages
- Form validation

<!-- Integration -->
Component: BookingForm.tsx
Webhook: LARK_WEBHOOK_URL (env variable)
```

---

## 🧩 COMPONENT GUIDELINES

### Astro vs React Decision Tree
```
Is the component interactive? (forms, toggles, real-time updates)
├─ YES → Use React (.tsx)
│   └─ Add client:load directive in .astro file
│
└─ NO → Use Astro (.astro)
    └─ Server-rendered, faster, SEO-friendly
Header Component (Header.astro)
Features:

Fixed position with glass morphism
Auto-hide on scroll down, show on scroll up
Logo with gradient background
Desktop navigation links
Gold CTA button
Mobile menu button (not implemented)

Auto-Hide Script:
javascript// In BaseLayout.astro (not in Header.astro)
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const currentScroll = window.scrollY;
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});
```

### Venn Diagram (StrategyVenn.astro)

**Structure:**
```
3 overlapping circles positioned absolutely:
- Top: Thời (Thiên) - top-0 left-1/2
- Bottom-left: Thế (Địa) - bottom-0 left-0  
- Bottom-right: Lực (Nhân) - bottom-0 right-0

Size: w-[68%] h-[68%] each
Center: Yin-Yang icon (fades on hover)
Interaction:

Default: Show title + phonetic (/thiên/, /địa/, /nhân/)
Hover: Fade to description text
Other circles: Dim with blur + grayscale

Blog Card (BlogCard.astro)
Props:
typescriptinterface Props {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage?: string;
    publishedDate: string;
    tags: string[];
    readingTime?: string;
  };
}
```

**Layout:**
```
┌─────────────────┐
│   Cover Image   │ aspect-[16/10]
│   + Category    │
├─────────────────┤
│ Date • Time     │ text-xs
│ Title           │ font-serif text-xl
│ Excerpt         │ text-sm
│ Đọc tiếp →      │ text-cream
└─────────────────┘
Booking Form (BookingForm.tsx)
Form Fields:
typescriptinterface FormData {
  name: string;        // Required
  email: string;       // Required
  phone: string;       // Optional (Vietnam +84)
  date: string;        // datetime-local
  subject: string;     // Radio group (5 options)
  optIn: boolean;      // Checkbox
}
Validation:

HTML5 required attributes
Email format validation
Phone format (optional)

Submission:
javascript// Dev mode (no webhook)
console.log("Payload:", formData);

// Production
fetch(LARK_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
```

---

## 🔌 INTEGRATION DETAILS

### Notion CMS Setup

#### 1. Database Structure
```
Notion Database Columns:
- Title (title) - Post title
- Slug (rich_text) - URL slug
- Published (checkbox) - Publish status
- Date (date) - Publication date
- Tags (multi_select) - Categories
- Cover (files) - Cover image
- Excerpt (rich_text) - Short description
2. API Configuration
Environment Variables (.env):
bashNOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxx
Integration Setup:

Create Notion integration at notion.so/my-integrations
Copy "Internal Integration Token"
Share database with integration
Copy database ID from URL

3. API Client (src/lib/notion.ts)
typescriptimport { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

// Fetch all published posts
export async function getPublishedPosts() {
  const response = await notion.databases.query({
    database_id: import.meta.env.NOTION_DATABASE_ID,
    filter: {
      property: 'Published',
      checkbox: { equals: true }
    },
    sorts: [
      { property: 'Date', direction: 'descending' }
    ]
  });
  
  return response.results.map(page => ({
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text,
    slug: page.properties.Slug.rich_text[0]?.plain_text,
    // ... map other properties
  }));
}

// Fetch single post by slug
export async function getPostBySlug(slug: string) {
  const posts = await getPublishedPosts();
  return posts.find(post => post.slug === slug);
}

// Get post content as Markdown
export async function getPostContent(pageId: string) {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(mdblocks);
}
```

### Lark Integration (Booking Form)

#### 1. Lark Base Setup
```
Create Lark Bitable with columns:
- Name (text)
- Email (email)
- Phone (phone)
- Date (datetime)
- Subject (single_select)
- OptIn (checkbox)
- SubmittedAt (datetime)
- Source (text)
- Status (single_select: New/Contacted/Completed)
2. Webhook Options
Option A: Direct Lark Webhook
javascript// Create custom bot in Lark group
// Get webhook URL
const WEBHOOK_URL = 'https://open.feishu.cn/open-apis/bot/v2/hook/xxxxx';

fetch(WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({
    msg_type: "text",
    content: { text: JSON.stringify(formData) }
  })
});
```

**Option B: n8n Bridge (Recommended)**
```
Flow: Browser → n8n Webhook → Lark Base API

n8n Workflow:
1. Webhook Trigger (POST)
2. Function Node (format data)
3. Lark Node (insert to Bitable)
3. Environment Variable
bashPUBLIC_LARK_WEBHOOK_URL=https://your-webhook-url.com

🔄 DEVELOPMENT WORKFLOW
Setup New Development Environment
bash# 1. Clone repository
git clone <repository-url>
cd tn-consultant-blog

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your API keys

# 4. Run development server
npm run dev

# 5. Open browser
http://localhost:4321
Environment Variables Checklist
bash# Required
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx

# Optional (for booking)
PUBLIC_LARK_WEBHOOK_URL=https://xxxxx
Build & Deploy
bash# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel (recommended)
vercel --prod

# Or Netlify
netlify deploy --prod

🛠 COMMON TASKS
Add New Blog Post

Create new page in Notion database
Fill in: Title, Slug, Content, Cover, Excerpt, Tags
Check "Published" checkbox
Post appears automatically (SSG rebuild may be needed)

Update Homepage Section
astro// Location: src/pages/index.astro

<!-- Section structure -->
<section class="relative min-h-screen bg-dark overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <!-- Content here -->
  </div>
</section>
Add New Page
bash# 1. Create file
touch src/pages/new-page.astro

# 2. Basic template
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
---

<BaseLayout title="Page Title">
  <Header />
  <main class="min-h-screen bg-dark pt-24">
    <!-- Content -->
  </main>
</BaseLayout>
Modify Color Palette
javascript// File: tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'new-color': '#hexcode',
      }
    }
  }
}
Add Lucide Icon
astro<!-- In .astro file -->
<i data-lucide="icon-name" class="w-5 h-5"></i>

<!-- Icons auto-initialize from BaseLayout.astro -->
<!-- Browse icons: lucide.dev -->

# 🐛 TROUBLESHOOTING
Issue: Navbar Not Auto-Hiding
Solution: Ensure auto-hide script is in BaseLayout.astro, not Header.astro
astro<!-- src/layouts/BaseLayout.astro -->
<body>
  <slot />
  
  <script>
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      const currentScroll = window.scrollY;
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      lastScroll = currentScroll;
    });
  </script>
</body>
Issue: React Component Not Rendering
Checklist:

✅ @astrojs/react installed?
✅ Added to astro.config.mjs integrations?
✅ Used client:load directive?
✅ Component exported as default?

astro<!-- Correct usage -->
---
import MyComponent from '../components/MyComponent.tsx';
---
<MyComponent client:load />
Issue: Notion API Not Working
Debug steps:
javascript// 1. Test API key
console.log('API Key:', import.meta.env.NOTION_API_KEY);

// 2. Test database access
const response = await notion.databases.retrieve({
  database_id: import.meta.env.NOTION_DATABASE_ID
});

// 3. Check integration permissions
// Notion → Settings → Integrations → Your integration → Check permissions
Issue: Tailwind Classes Not Working
Solutions:

Check content paths in tailwind.config.js
Restart dev server after config changes
Clear .astro cache: rm -rf node_modules/.astro

Issue: Icons Not Showing
Solution: Ensure Lucide initialization script in BaseLayout.astro
astro<script src="https://unpkg.com/lucide@latest"></script>
<script is:inline>
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
</script>
Issue: Form Submission Failing
Debug:
javascript// Check webhook URL
console.log('Webhook:', import.meta.env.PUBLIC_LARK_WEBHOOK_URL);

// Test payload
console.log('Payload:', JSON.stringify(formData, null, 2));

// Check network tab in DevTools for actual request/response
```

---

## 📚 DESIGN PRINCIPLES

### Do's ✅
- Use serif fonts (Georgia) for headings and display text
- Use sans-serif (Montserrat) for body text and UI
- Maintain consistent spacing (multiples of 4px)
- Use gold (#D4AF37) for all CTA buttons
- Keep text left-aligned (except centered sections like headers)
- Apply glass morphism to cards and overlays
- Use subtle animations (hover: scale-105, duration-300)
- Maintain mobile-first responsive design

### Don'ts ❌
- Don't use multiple font families within same section
- Don't mix button colors (stick to gold primary)
- Don't center-align body text
- Don't use bright/vibrant colors (keep muted premium palette)
- Don't add unnecessary animations
- Don't create new color variations (use existing palette)
- Don't use traditional fortune-telling imagery

---

## 🎯 CONTENT GUIDELINES

### Tone of Voice
- **Professional:** Business consultant, not fortune teller
- **Analytical:** Data-driven, logical, strategic
- **Empowering:** "You make decisions" not "Fate controls you"
- **Vietnamese:** Native language with some English terms (Life Strategy)

### Terminology
```
✅ Use:
- Life Strategy
- Phân tích dữ liệu
- Chiến lược cuộc đời
- Quản trị rủi ro
- Tối ưu năng lực

❌ Avoid:
- Bói toán
- Xem bói
- Tử vi tình duyên
- Xem số mệnh

# 🚀 FUTURE ENHANCEMENTS
Phase 2 (Planned)

 Mobile navigation menu
 Search functionality
 Blog categories/tags filter
 Related posts section
 Newsletter subscription
 Social sharing buttons

Phase 3 (Backlog)

 User authentication (for premium content)
 Case studies section
 Testimonials carousel
 FAQ accordion
 Live chat integration
 Multi-language support (EN/VI)


# 📞 SUPPORT & MAINTENANCE
## Key Contacts

Client: TN Consultant
CMS: Notion Database
Booking System: Lark Base
Hosting: Vercel/Netlify

## Regular Maintenance Tasks

 Update blog posts weekly
 Review booking submissions daily
 Update dependencies monthly: npm update
 Check broken links quarterly
 Backup Notion database monthly

##Security Checklist

 Keep dependencies updated
 Never commit .env file
 Use environment variables for API keys
 Validate form inputs server-side
 Sanitize user-generated content


# 📄 LICENSE & CREDITS
## Technology Credits

Framework: Astro (MIT License)
UI Library: React (MIT License)
CSS: Tailwind CSS (MIT License)
Icons: Lucide Icons (ISC License)
CMS: Notion API

## Assets

Hero video: [Source/License]
Torii gate image: [Source/License]
Fonts: Google Fonts (Open Font License)