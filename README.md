# NepLoom Faces

![](https://i.postimg.cc/xjt87BTg/Screenshot-2025-06-28-180324.png)

A beautiful and intuitive avatar builder that allows users to create unique face portraits by combining different facial features. Part of the NepLoom ecosystem.

## Features

- 🎨 **Interactive Face Builder**: Combine skin tones, eyes, brows, eyewear, nose, mouth, hair, and accessories
- 📱 **Responsive Design**: Optimized for both desktop and mobile experiences
- 🎲 **Smart Randomization**: Generate great combinations or randomize individual categories
- 🔗 **URL State Management**: Share your creations via URL parameters
- 💾 **Multiple Export Options**:
  - Download with custom background colors
  - Download with transparent background
  - Generate NepLoom-compatible strings for use in the ecosystem
- 🌈 **Custom Background Colors**: Choose from presets or pick any custom color
- 📸 **Real-time Preview**: See your changes instantly as you build

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1. **Select Categories**: Click on any facial feature category in the sidebar
2. **Choose Options**: Pick from available options for each category
3. **Randomize**: Use the shuffle button to generate random combinations
4. **Customize**: Mix and match features to create your perfect avatar
5. **Save**: Export your creation as an image or NepLoom string

## Export Formats

### NepLoom String
Generate a text string in the format `!skin-[id],eyes-[id],...,color-[hex]` that can be used throughout the NepLoom ecosystem.

### Image Downloads
- **With Background**: PNG with your chosen background color
- **Transparent**: PNG with transparent background for overlays

## Project Structure

- `src/components/` - React components (FaceCanvas, Sidebar, SaveDialog)
- `src/data/` - Face data and category definitions
- `src/utils/` - Utility functions for downloads and canvas operations
- `public/loomingface/` - Face feature images organized by category

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Canvas API** - Image composition and download

## Author

Created by **Sambhav Aryal** ([@echoinbyte](https://github.com/echoinbyte))

## NepLoom Ecosystem

This project is part of the NepLoom ecosystem, providing avatar generation capabilities that integrate seamlessly with other NepLoom applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is part of the NepLoom ecosystem. Please refer to the main NepLoom repository for licensing information.
