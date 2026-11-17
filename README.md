<div align="center">
  <img src="app/icon.png" alt="F1 Dashboard Logo" width="120" height="120">
  
  # 🏎️ F1 Dashboard
  
  A modern, high-performance Formula 1 dashboard website built with Next.js 14, featuring real-time race data, driver standings, and beautiful glassmorphism UI.
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
  
  [Live Demo](https://f1-dashboard.onurakyuz.com.tr) • [Documentation](#documentation) • [Report Bug](#) • [Request Feature](#)
</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Design System](#-design-system)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

## 🎯 About

F1 Dashboard is a comprehensive Formula 1 statistics and information platform that provides real-time data about drivers, teams, races, and standings. Built with modern web technologies, it offers a sleek, dark-themed interface with glassmorphism effects and smooth animations.

The application fetches live data from the [Ergast F1 API](http://ergast.com/mrd/) via the [Jolpi mirror](https://api.jolpi.ca/ergast/f1), ensuring up-to-date information about the current Formula 1 season (2026 grid, including Audi and Cadillac).

## ✨ Features

### 🏁 Core Functionality
- **Real-time Race Countdown**: Live countdown timer for the next Grand Prix
- **Driver Standings**: Complete driver rankings with points, wins, and team information
- **Constructor Standings**: Team rankings and statistics
- **Race Schedule**: Full season calendar with past and upcoming races
- **Race Results**: Podium (P1–P3) from the most recent Grand Prix
- **Circuit Details**: Track map, length, laps, lap record and live track weather for every circuit
- **Race Details Modal**: Tap any race for its track layout, local start time and circuit specs
- **Teams Overview**: Team-colored cards with points-vs-leader bar and each team's drivers
- **Statistics Dashboard**: Comprehensive season statistics and insights

### 🎨 User Experience
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Eye-friendly dark mode with F1 Red accents
- **Glassmorphism UI**: Modern frosted glass effects throughout the interface
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Fast Performance**: Server-side rendering with 5-minute data revalidation
- **Local Times**: Race times shown in the visitor's timezone, without hydration mismatches
- **No Broken Images**: Every visual is local or generated, with graceful fallbacks

### 📊 Data Visualization
- **Driver Cards**: Card layout inspired by formula1.com with illustrated team-color helmets
- **Track Maps**: Generated SVG layouts for all 2026 circuits
- **Team Colors**: Dynamic color coding by constructor
- **Podium Highlights**: Special styling for top 3 positions

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.6
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.4
- **Animation**: [Framer Motion](https://www.framer.com/motion/) 11.5
- **Icons**: [Lucide React](https://lucide.dev/) 0.460

### Fonts
- **Body**: [Inter](https://fonts.google.com/specimen/Inter) - Clean, readable sans-serif
- **Headers**: [Orbitron](https://fonts.google.com/specimen/Orbitron) - Futuristic, tech-inspired display font

### API
- **Data Source**: [Ergast F1 API](http://ergast.com/mrd/) via [Jolpi Mirror](https://api.jolpi.ca/ergast/f1)
- **Caching**: Next.js built-in caching with 5-minute revalidation
- **Weather**: [Open-Meteo](https://open-meteo.com) (free, no API key)
- **Track geometry**: [bacinger/f1-circuits](https://github.com/bacinger/f1-circuits) (MIT)

## 📸 Screenshots

### Home Dashboard
The main dashboard features a hero with the next Grand Prix name and countdown over its track map, the top-8 driver standings, circuit details with track layout and live weather, and the last race podium.

### Standings Page
Driver cards with illustrated team-color helmets, plus a constructor table with team badges.

### Races Page
Full season calendar with track thumbnails, winners for completed races and a highlighted next race. Tap a race to open its circuit details.

### Teams Page
Team-colored cards with logo or monogram, points-vs-leader bar, wins and the team's drivers.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn** / **pnpm**)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OnurAkyuz61/F1--Dashboard.git
   cd F1--Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
f1-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts and metadata
│   ├── page.tsx                 # Home page (dashboard)
│   ├── globals.css              # Global styles and Tailwind directives
│   ├── icon.png                 # Favicon
│   ├── not-found.tsx            # Custom 404 page
│   ├── races/
│   │   └── page.tsx             # Race schedule page
│   ├── standings/
│   │   └── page.tsx             # Driver & constructor standings
│   ├── teams/
│   │   └── page.tsx             # Teams overview page
│   └── stats/
│       └── page.tsx             # Statistics dashboard
│
├── components/                   # React components
│   ├── Navbar.tsx               # Navigation bar with active states
│   ├── Footer.tsx               # Site footer
│   ├── HeroSection.tsx          # Next race countdown hero
│   ├── StandingsCard.tsx        # Top 3 drivers card
│   ├── DriverCard.tsx           # Individual driver card (F1.com style)
│   ├── DriverAvatar.tsx         # Driver photo, helmet or code avatar
│   ├── DriverHelmet.tsx         # Illustrated team-color helmet (SVG)
│   ├── TeamBadge.tsx            # Team logo or team-colored monogram
│   ├── CircuitInfo.tsx          # Circuit details widget + track map
│   ├── CircuitModal.tsx         # Race/circuit detail modal
│   ├── RecentResult.tsx         # Last race podium
│   ├── StandingsPageContent.tsx # Standings page layout
│   ├── RacesPageContent.tsx     # Races page layout
│   ├── TeamsPageContent.tsx     # Teams page layout
│   ├── StatsPageContent.tsx     # Stats page layout
│   └── Tabs.tsx                 # Custom tabs component
│
├── lib/                          # Utilities and configurations
│   ├── api.ts                   # API integration (Ergast F1)
│   ├── types.ts                 # TypeScript interfaces
│   ├── image-map.ts             # Driver images, team logos & colors
│   ├── circuit-data.ts          # Static circuit specs (length, laps, records)
│   ├── circuit-images.ts        # Local track-map lookup
│   ├── date-utils.ts            # Race date/time formatting
│   ├── use-mounted.ts           # Client-only rendering helper (local times)
│   ├── weather.ts               # Open-Meteo track weather
│   └── data.ts                  # Mock data (fallback)
│
├── public/                       # Static assets
│   ├── f1-logo.png              # F1 logo for navbar
│   ├── circuits/                # Generated track-layout SVGs (per circuitId)
│   └── teams/                   # Team logo SVGs
│
├── scripts/
│   └── generate-circuit-svgs.mjs # Rebuilds public/circuits from GeoJSON
│
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🔌 API Integration

The application uses the **Ergast F1 API** via the Jolpi HTTPS mirror for reliable data fetching.

### API Endpoints Used

- `GET /current/driverStandings.json` - Driver championship standings
- `GET /current/constructorStandings.json` - Constructor championship standings
- `GET /current.json` - Full race schedule (next race is derived from it)
- `GET /current/last/results.json` - Last race results
- `GET /current/results/1.json` - Winners of completed races

Each race also carries its `circuitId` and coordinates, which drive the track
maps and the weather lookup.

### Data Caching

All API requests are revalidated every **5 minutes** using Next.js's built-in caching mechanism (`revalidate: 300`). This ensures:
- Fast page loads
- Reduced API rate limiting
- Better user experience

### Error Handling

The application includes robust error handling:
- Automatic fallback to empty arrays/null values if API fails
- Graceful degradation without crashing
- Console warnings for debugging

### Season Logic

All data uses Jolpi's `current` endpoints, so standings, schedule and results
follow the live season automatically — no year needs to be changed in code.

## 🎨 Design System

### Color Palette

- **Background**: `#0A0A0A` - Deep black
- **Primary (F1 Red)**: `#FF1801` - Official Formula 1 red
- **Text Primary**: `#FFFFFF` - White
- **Text Secondary**: `rgba(255, 255, 255, 0.6)` - 60% opacity white
- **Glass Effect**: `rgba(255, 255, 255, 0.05)` - Subtle white overlay

### Team Colors

Each team has its color (2026 grid, keyed by constructorId in `lib/image-map.ts`):
- **Mercedes**: `#27F4D2`
- **Ferrari**: `#E8002D`
- **Red Bull**: `#3671C6`
- **McLaren**: `#FF8000`
- **Aston Martin**: `#229971`
- **Alpine**: `#0093CC`
- And more (RB, Haas, Audi, Williams, Cadillac)...

### Images

- **Track maps** live in `public/circuits/<circuitId>.svg` and are generated by
  `node scripts/generate-circuit-svgs.mjs` from
  [bacinger/f1-circuits](https://github.com/bacinger/f1-circuits) (MIT).
- **Driver visuals** are original illustrated helmets (`components/DriverHelmet.tsx`)
  in the team's color with the race number and driver code — a generic design,
  not any driver's real helmet livery.
- **Driver photos** are optional: add a licensed image to `public/drivers/` and
  register it in `DRIVER_IMAGES` (`lib/image-map.ts`); it then replaces the
  helmet. If it fails to load, the helmet is shown instead.
- **Team logos** missing from `public/teams/` fall back to a team-colored monogram.

### Typography

- **Display Font**: Orbitron (Headers, large numbers)
- **Body Font**: Inter (Body text, descriptions)

### Components

- **Glassmorphism**: `backdrop-blur-md` with semi-transparent backgrounds
- **Cards**: Rounded corners (`rounded-xl`, `rounded-2xl`) with borders
- **Animations**: Framer Motion for smooth transitions

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

### Other Platforms

The application can be deployed on any platform that supports Next.js:
- **Netlify**: Use the Next.js build preset (the live demo runs on Netlify)
- **AWS Amplify**: Configure for Next.js SSR
- **Docker**: Build and run in a container

### Environment Variables

No environment variables are required. The application uses public APIs.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Onur Akyuz**

- Website: [onurakyuz.com](https://onurakyuz.com)
- GitHub: [@OnurAkyuz61](https://github.com/OnurAkyuz61)
- Project Link: [https://github.com/OnurAkyuz61/F1--Dashboard](https://github.com/OnurAkyuz61/F1--Dashboard)

## 🙏 Acknowledgments

- [Ergast F1 API](http://ergast.com/mrd/) for providing comprehensive F1 data
- [Jolpi](https://api.jolpi.ca) for the HTTPS mirror service
- [bacinger/f1-circuits](https://github.com/bacinger/f1-circuits) (MIT, © Tomislav Bacinger) for circuit geometry
- [Open-Meteo](https://open-meteo.com) for track weather
- [Formula 1](https://www.formula1.com) for the official branding and inspiration
- All the open-source libraries that made this project possible

---

<div align="center">
  Made with ❤️ and ⚡ by <a href="https://onurakyuz.com">Onur Akyuz</a>
</div>
