<div align="center">
  <img src="app/icon.png" alt="F1 Dashboard Logo" width="120" height="120">
  
  # 🏎️ F1 Dashboard
  
  A modern, high-performance Formula 1 dashboard website built with Next.js 14, featuring real-time race data, driver standings, and beautiful glassmorphism UI.
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
  
  [Live Demo](#) • [Documentation](#documentation) • [Report Bug](#) • [Request Feature](#)
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

The application fetches live data from the [Ergast F1 API](http://ergast.com/mrd/) via the [Jolpi mirror](https://api.jolpi.ca/ergast/f1), ensuring up-to-date information about the current and previous Formula 1 seasons.

## ✨ Features

### 🏁 Core Functionality
- **Real-time Race Countdown**: Live countdown timer for the next Grand Prix
- **Driver Standings**: Complete driver rankings with points, wins, and team information
- **Constructor Standings**: Team rankings and statistics
- **Race Schedule**: Full season calendar with past and upcoming races
- **Race Results**: Detailed results from the most recent Grand Prix
- **Statistics Dashboard**: Comprehensive season statistics and insights

### 🎨 User Experience
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Eye-friendly dark mode with F1 Red accents
- **Glassmorphism UI**: Modern frosted glass effects throughout the interface
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Fast Performance**: Server-side rendering with 1-hour data caching

### 📊 Data Visualization
- **Driver Cards**: Beautiful card-based layout inspired by formula1.com
- **Team Colors**: Dynamic color coding based on team branding
- **Podium Highlights**: Special styling for top 3 positions
- **Interactive Tables**: Sortable and filterable data tables

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
- **Caching**: Next.js built-in caching with 1-hour revalidation

## 📸 Screenshots

### Home Dashboard
The main dashboard features a hero section with the next race countdown, top driver standings, circuit information, and recent race results.

### Standings Page
Comprehensive driver and constructor standings with beautiful card-based layouts and detailed statistics.

### Races Page
Complete race schedule showing past races with winners and upcoming races with countdown timers.

### Teams Page
Grid layout showcasing all Formula 1 teams with their points, wins, and positions.

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
│   ├── CircuitInfo.tsx          # Circuit details widget
│   ├── RecentResult.tsx         # Last race winner
│   ├── StandingsPageContent.tsx # Standings page layout
│   ├── RacesPageContent.tsx     # Races page layout
│   ├── TeamsPageContent.tsx     # Teams page layout
│   ├── StatsPageContent.tsx     # Stats page layout
│   └── Tabs.tsx                 # Custom tabs component
│
├── lib/                          # Utilities and configurations
│   ├── api.ts                   # API integration (Ergast F1)
│   ├── types.ts                 # TypeScript interfaces
│   ├── image-map.ts             # Driver images & team logos mapping
│   └── data.ts                  # Mock data (fallback)
│
├── public/                       # Static assets
│   └── f1-logo.png              # F1 logo for navbar
│
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🔌 API Integration

The application uses the **Ergast F1 API** via the Jolpi HTTPS mirror for reliable data fetching.

### API Endpoints Used

- `GET /{season}/driverStandings.json` - Driver championship standings
- `GET /{season}/constructorStandings.json` - Constructor championship standings
- `GET /{season}/next.json` - Next upcoming race
- `GET /{season}.json` - Full race schedule
- `GET /{season}/last/results.json` - Last race results

### Data Caching

All API requests are cached for **1 hour** using Next.js's built-in caching mechanism (`revalidate: 3600`). This ensures:
- Fast page loads
- Reduced API rate limiting
- Better user experience

### Error Handling

The application includes robust error handling:
- Automatic fallback to empty arrays/null values if API fails
- Graceful degradation without crashing
- Console warnings for debugging

### Season Logic

- **Standings**: Uses 2025 season (last completed season)
- **Next Race**: Uses 2026 season (current/upcoming season)
- **Race Schedule**: Uses 2026 season

## 🎨 Design System

### Color Palette

- **Background**: `#0A0A0A` - Deep black
- **Primary (F1 Red)**: `#FF1801` - Official Formula 1 red
- **Text Primary**: `#FFFFFF` - White
- **Text Secondary**: `rgba(255, 255, 255, 0.6)` - 60% opacity white
- **Glass Effect**: `rgba(255, 255, 255, 0.05)` - Subtle white overlay

### Team Colors

Each team has its official color:
- **Red Bull**: `#0600EF`
- **Ferrari**: `#FF1801`
- **Mercedes**: `#00D2BE`
- **McLaren**: `#FF8700`
- **Alpine**: `#0090FF`
- **Aston Martin**: `#00665E`
- And more...

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
- **Netlify**: Use the Next.js build preset
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
- [Formula 1](https://www.formula1.com) for the official branding and inspiration
- All the open-source libraries that made this project possible

---

<div align="center">
  Made with ❤️ and ⚡ by <a href="https://onurakyuz.com">Onur Akyuz</a>
</div>
