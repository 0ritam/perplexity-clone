# Perplexity AI Clone

A pixel-perfect clone of Perplexity AI's chat interface built with Next.js, featuring real-time streaming responses and smooth animations.

## 🚀 Live Demo

**Vercel Deployment:** [https://perplexity-clone-liart.vercel.app/](https://perplexity-clone-liart.vercel.app/)

## ✨ Features

### Core Functionality
- ✅ Multi-turn conversation support (unlimited messages)
- ✅ Real-time streaming API integration
- ✅ Server-Sent Events (SSE) parsing
- ✅ Progressive loading states ("Searching..." → "Finding results...")
- ✅ Source citations with clickable links
- ✅ Markdown rendering with table support
- ✅ New Chat button to reset conversations

### UI/UX Polish
- ✅ Pixel-perfect Perplexity UI replication
- ✅ Smooth fade-in and slide animations
- ✅ Auto-scroll behavior (only when near bottom)
- ✅ Fixed input at bottom, questions scroll to top
- ✅ Hover effects on source cards
- ✅ Custom scrollbar styling
- ✅ Responsive sidebar navigation
- ✅ Loading spinners and status indicators

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** TailwindCSS
- **UI Components:** Custom components + shadcn/ui base
- **Markdown:** react-markdown + remark-gfm
- **Icons:** lucide-react
- **API:** Server-Sent Events (SSE) streaming

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/0ritam/perplexity-clone.git

# Navigate to project directory
cd perplexity-clone

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🏗️ Project Structure

```
perplexity-clone/
├── app/
│   ├── page.tsx           # Main chat interface
│   ├── layout.tsx         # Root layout with sidebar
│   └── globals.css        # Global styles
├── components/
│   ├── ChatInput.tsx      # Message input with icons
│   ├── MessageBubble.tsx  # Individual message component
│   ├── SourceCarousel.tsx # Horizontal scrolling source cards
│   ├── StatusIndicator.tsx # Loading state component
│   ├── NewChatButton.tsx  # Reset conversation button
│   └── PerplexitySidebar.tsx # Left navigation sidebar
├── hooks/
│   ├── use-perplexity-stream.ts # SSE streaming logic
│   └── use-auto-scroll.ts       # Smart scroll behavior
└── public/
    └── download.png       # Perplexity logo
```

## 🔌 API Integration

**Endpoint:** `https://mock-askperplexity.piyushhhxyz.deno.net`

The app connects to a mock Perplexity API that returns Server-Sent Events (SSE) with:
- Answer text in `blocks[0].diff_block.patches`
- Sources in `content.web_results`
- Loading states in `step_type`

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 👨‍💻 Author

**Ritam Chakraborty**
- GitHub: [@0ritam](https://github.com/0ritam)

---

Built for educational purposes. Replicates Perplexity AI's UI/UX with a mock API endpoint.
