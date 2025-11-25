# Villa de Leyva New Year's Trip Website

A beautiful, bilingual (Spanish/English) website for a family New Year's trip to Villa de Leyva, Colombia. Built with Next.js 14+, TypeScript, and Tailwind CSS with an Airbnb-inspired design.

## Features

- 🌐 **Bilingual Support**: Spanish (Colombian) and English with language toggle
- 🏠 **Home Page**: 
  - Hero section with property image
  - Trip information (address, check-in/check-out)
  - Countdown timer (only shows before trip start)
  - Detailed itinerary
  - Room assignments with guest names
  - 4-day weather forecast (Open-Meteo API)
- 🎯 **Things to Do Page**:
  - Restaurant recommendations (Breakfast, Lunch, Dinner)
  - Activity suggestions (Cultural, Nature & Adventure, Nearby Attractions, Family-Friendly)
  - Direct links to Google Maps and Google Search
- 📱 **Responsive Design**: Mobile-first, works on all devices
- ⚡ **Performance**: Optimized images, lazy loading, fast load times

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jzuluaga3/villa-de-leyva.git
cd villa-de-leyva
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (optional):
```bash
# Optional - only displays "Get Directions" button if provided
NEXT_PUBLIC_GOOGLE_MAPS_LINK=
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with nav/footer
│   ├── page.tsx            # Home page
│   ├── things-to-do/
│   │   └── page.tsx        # Things to do page
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Sticky navigation bar
│   ├── Footer.tsx          # Footer component
│   ├── Hero.tsx            # Hero section
│   ├── TripInfo.tsx        # Trip information card
│   ├── Countdown.tsx       # Countdown timer
│   ├── Itinerary.tsx       # Trip itinerary
│   ├── RoomAssignments.tsx # Room assignments grid
│   ├── Weather.tsx         # Weather forecast
│   ├── RestaurantCard.tsx  # Restaurant card component
│   └── ActivityCard.tsx    # Activity card component
├── lib/
│   ├── translations.ts     # i18n dictionary
│   ├── utils.ts            # Helper functions
│   └── i18n-context.tsx    # Language context provider
├── public/
│   └── Reference/          # Images from Reference folder
└── Reference/              # Original reference materials
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional - Google Maps link for "Get Directions" button
NEXT_PUBLIC_GOOGLE_MAPS_LINK=https://maps.google.com/...
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard (if needed)
4. Deploy!

The site will be live at `https://your-project.vercel.app`

## Customization

- **Images**: Place images in `public/Reference/` folder and reference them in components
- **Translations**: Edit `lib/translations.ts` to add/modify translations
- **Styling**: Colors and design system are defined in `tailwind.config.ts` and `app/globals.css`
- **Content**: Update restaurant and activity data in `app/things-to-do/page.tsx`

## Design System

- **Primary Color**: `#FF5A5F` (coral/red)
- **Background**: `#FFFFFF` (white)
- **Text Primary**: `#484848` (dark gray)
- **Text Secondary**: `#767676` (medium gray)
- **Borders**: `#EBEBEB` (light gray)

## Content Style Guide

### Subtitle Capitalization

Since this is a family website, subtitles should use a casual, less formal tone with title case capitalization where important words are capitalized:

- **Style**: Title case for important words, lowercase for articles and prepositions
- **Tone**: Casual and friendly (family-oriented, not overly formal)
- **Examples**:
  - ✅ "Fotos de la Casa" (not "Fotos de la casa de alojamiento")
  - ✅ "Photos of the House" (not "Photos of the accommodation")
  - ✅ "Restaurantes, Actividades y Atracciones cerca de la Casa"
  - ✅ "Restaurants, Activities, and Attractions near the House"

**Guidelines**:
- Capitalize important nouns (Casa, Casa, Restaurantes, Actividades, Atracciones)
- Keep articles and prepositions lowercase (de, la, y, cerca)
- Keep it short and casual for family readability
- Apply this style consistently across all subtitles throughout the website

## License

Private project for family use.

## Repository

GitHub: https://github.com/jzuluaga3/villa-de-leyva
