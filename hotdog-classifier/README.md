# 🌭 Hotdog or Not Hotdog AI Classifier

A fun Next.js application that uses AI to determine whether an uploaded image contains a hotdog or not. Inspired by the HBO Silicon Valley TV show!

## Features

- **Image Upload**: Drag and drop or click to upload images
- **AI Classification**: Simulated AI classification with confidence scores
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, modern interface with Tailwind CSS
- **Real-time Results**: Instant feedback with loading states
- **Error Handling**: Graceful error handling and user feedback

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload an Image**: Click the upload area or drag and drop an image file
2. **Classify**: Click the "Classify Image" button to analyze your image
3. **View Results**: See whether it's a hotdog or not, along with a confidence score

## Technology Stack

- **Next.js 15**: React framework with App Router and Turbopack
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **React Hooks**: Modern React patterns
- **API Routes**: Server-side image processing

## Project Structure

```
hotdog-classifier/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── classify/
│   │   │       └── route.ts      # API endpoint for classification
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main page component
│   └── ...
├── public/                       # Static assets
├── package.json
└── README.md
```

## API Endpoints

### POST /api/classify

Classifies an uploaded image as hotdog or not hotdog.

**Request:**
- Method: POST
- Body: FormData with 'image' field containing the image file

**Response:**
```json
{
  "isHotdog": boolean,
  "confidence": number,
  "filename": string
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Extending the App

To add real AI classification:

1. Replace the mock classification in `src/app/api/classify/route.ts`
2. Integrate with an ML service (TensorFlow.js, OpenAI Vision, etc.)
3. Add proper image preprocessing and validation

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Built with ❤️ using Next.js and TypeScript
