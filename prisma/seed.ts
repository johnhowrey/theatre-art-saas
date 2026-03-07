import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Licensing Houses
  const mti = await prisma.licensingHouse.upsert({
    where: { name: "Music Theatre International (MTI)" },
    update: {},
    create: {
      name: "Music Theatre International (MTI)",
      website: "https://www.mtishows.com",
      creditTemplate:
        '[SHOW TITLE] is presented through special arrangement with Music Theatre International (MTI). All authorized performance materials are also supplied by MTI. www.mtishows.com',
      artworkPolicy:
        "All advertising and promotional materials must include the MTI credit line. Custom artwork is permitted but must be approved by the licensor. Logo usage may be required for certain titles.",
    },
  });

  const trw = await prisma.licensingHouse.upsert({
    where: { name: "Theatrical Rights Worldwide / Concord Theatricals" },
    update: {},
    create: {
      name: "Theatrical Rights Worldwide / Concord Theatricals",
      website: "https://www.concordtheatricals.com",
      creditTemplate:
        '[SHOW TITLE] is presented by arrangement with Concord Theatricals on behalf of Theatrical Rights Worldwide. www.concordtheatricals.com',
      artworkPolicy:
        "Licensees must use approved artwork or submit custom artwork for approval. The Concord Theatricals logo must appear on all printed materials.",
    },
  });

  const sf = await prisma.licensingHouse.upsert({
    where: { name: "Samuel French / Concord Theatricals" },
    update: {},
    create: {
      name: "Samuel French / Concord Theatricals",
      website: "https://www.concordtheatricals.com",
      creditTemplate:
        '[SHOW TITLE] is presented by arrangement with Concord Theatricals on behalf of Samuel French, Inc. www.concordtheatricals.com',
      artworkPolicy:
        "Custom artwork permitted with credit line. No alterations to the script or title are allowed in promotional materials.",
    },
  });

  const dps = await prisma.licensingHouse.upsert({
    where: { name: "Dramatists Play Service" },
    update: {},
    create: {
      name: "Dramatists Play Service",
      website: "https://www.dramatists.com",
      creditTemplate:
        '[SHOW TITLE] is produced by special arrangement with Dramatists Play Service, Inc., New York. www.dramatists.com',
      artworkPolicy:
        "Custom artwork is generally permitted. Credit line must appear on all advertising. Author billing must follow contract specifications.",
    },
  });

  // Licensed Titles
  const licensedTitles = [
    { title: "The Music Man", licensingHouseId: mti.id, creditText: "THE MUSIC MAN is presented through special arrangement with Music Theatre International (MTI).", artworkRestrictions: false, requiredLogo: true },
    { title: "Matilda The Musical", licensingHouseId: mti.id, creditText: "MATILDA THE MUSICAL is presented through special arrangement with Music Theatre International (MTI).", artworkRestrictions: true, requiredLogo: true },
    { title: "Les Misérables", licensingHouseId: mti.id, creditText: "LES MISÉRABLES is presented through special arrangement with Music Theatre International (MTI).", artworkRestrictions: true, requiredLogo: true },
    { title: "Oklahoma!", licensingHouseId: trw.id, creditText: "OKLAHOMA! is presented by arrangement with Concord Theatricals on behalf of Theatrical Rights Worldwide.", artworkRestrictions: false, requiredLogo: true },
    { title: "Grease", licensingHouseId: trw.id, creditText: "GREASE is presented by arrangement with Concord Theatricals on behalf of Theatrical Rights Worldwide.", artworkRestrictions: false, requiredLogo: false },
    { title: "Noises Off", licensingHouseId: sf.id, creditText: "NOISES OFF is presented by arrangement with Concord Theatricals on behalf of Samuel French, Inc.", artworkRestrictions: false, requiredLogo: false },
    { title: "The Crucible", licensingHouseId: sf.id, creditText: "THE CRUCIBLE is presented by arrangement with Concord Theatricals on behalf of Samuel French, Inc.", artworkRestrictions: false, requiredLogo: false },
    { title: "August: Osage County", licensingHouseId: dps.id, creditText: "AUGUST: OSAGE COUNTY is produced by special arrangement with Dramatists Play Service, Inc.", artworkRestrictions: false, requiredLogo: false },
    { title: "Doubt: A Parable", licensingHouseId: dps.id, creditText: "DOUBT: A PARABLE is produced by special arrangement with Dramatists Play Service, Inc.", artworkRestrictions: false, requiredLogo: false },
    { title: "The Curious Incident of the Dog in the Night-Time", licensingHouseId: dps.id, creditText: "THE CURIOUS INCIDENT OF THE DOG IN THE NIGHT-TIME is produced by special arrangement with Dramatists Play Service, Inc.", artworkRestrictions: true, requiredLogo: false },
  ];

  for (const lt of licensedTitles) {
    await prisma.licensedTitle.upsert({
      where: { id: `seed-${lt.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}` },
      update: {},
      create: {
        id: `seed-${lt.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        ...lt,
      },
    });
  }

  // Typographic Templates
  const templates = [
    {
      id: "tpl-bold-modern",
      name: "Bold Modern",
      description: "Clean geometric layout with bold sans-serif typography",
      fontFamily: "Montserrat",
      colorScheme: { primary: "#1a1a1a", secondary: "#ff4444", accent: "#ffffff" },
      layoutData: { type: "centered", titleSize: "xl", subtitlePosition: "below" },
      showTypes: ["MUSICAL", "PLAY"] as const,
      tones: ["Energetic", "Contemporary"],
      eras: ["Contemporary", "1990s"],
      styles: ["minimal", "bold"],
    },
    {
      id: "tpl-classic-elegance",
      name: "Classic Elegance",
      description: "Refined serif typography with ornamental details",
      fontFamily: "Playfair Display",
      colorScheme: { primary: "#2c1810", secondary: "#c49b66", accent: "#f5f0eb" },
      layoutData: { type: "centered", titleSize: "lg", subtitlePosition: "below", ornaments: true },
      showTypes: ["OPERA", "BALLET", "PLAY"] as const,
      tones: ["Romantic", "Dramatic"],
      eras: ["Victorian", "Renaissance"],
      styles: ["elegant", "ornate"],
    },
    {
      id: "tpl-noir-thriller",
      name: "Noir Thriller",
      description: "High-contrast dark layout with dramatic lighting effects",
      fontFamily: "Bebas Neue",
      colorScheme: { primary: "#ffffff", secondary: "#cc0000", accent: "#000000" },
      layoutData: { type: "asymmetric", titleSize: "xl", overlay: "dark-gradient" },
      showTypes: ["PLAY", "MUSICAL"] as const,
      tones: ["Dark", "Suspenseful"],
      eras: ["1940s", "1950s", "Contemporary"],
      styles: ["dramatic", "dark"],
    },
    {
      id: "tpl-whimsical-garden",
      name: "Whimsical Garden",
      description: "Playful layout with organic shapes and handwritten elements",
      fontFamily: "Caveat",
      colorScheme: { primary: "#2d5a27", secondary: "#f4a261", accent: "#fefae0" },
      layoutData: { type: "organic", titleSize: "lg", decorativeElements: "botanical" },
      showTypes: ["MUSICAL", "PLAY"] as const,
      tones: ["Whimsical", "Comic", "Uplifting"],
      eras: ["Fantasy/Timeless", "Contemporary"],
      styles: ["playful", "organic"],
    },
    {
      id: "tpl-retro-broadway",
      name: "Retro Broadway",
      description: "Vintage marquee-inspired layout with art deco elements",
      fontFamily: "Abril Fatface",
      colorScheme: { primary: "#ffd700", secondary: "#8b0000", accent: "#1a0a00" },
      layoutData: { type: "marquee", titleSize: "xl", border: "art-deco", lights: true },
      showTypes: ["MUSICAL", "REVUE"] as const,
      tones: ["Nostalgic", "Energetic"],
      eras: ["1920s", "1930s", "1940s"],
      styles: ["vintage", "glamorous"],
    },
    {
      id: "tpl-minimalist-text",
      name: "Minimalist Text",
      description: "Typography-only layout with careful spacing and hierarchy",
      fontFamily: "Inter",
      colorScheme: { primary: "#111111", secondary: "#666666", accent: "#ffffff" },
      layoutData: { type: "text-only", titleSize: "xxl", alignment: "left" },
      showTypes: ["PLAY", "MUSICAL", "OTHER"] as const,
      tones: ["Intimate", "Dramatic"],
      eras: ["Contemporary"],
      styles: ["minimal", "typographic"],
    },
    {
      id: "tpl-vibrant-pop",
      name: "Vibrant Pop",
      description: "Colorful, energetic layout with bold gradients",
      fontFamily: "Poppins",
      colorScheme: { primary: "#ff006e", secondary: "#3a86ff", accent: "#ffbe0b" },
      layoutData: { type: "diagonal", titleSize: "xl", gradient: "multi-color" },
      showTypes: ["MUSICAL", "REVUE"] as const,
      tones: ["Energetic", "Comic", "Uplifting"],
      eras: ["Contemporary", "1980s"],
      styles: ["bold", "colorful"],
    },
    {
      id: "tpl-haunting-shadow",
      name: "Haunting Shadow",
      description: "Atmospheric layout with fog and shadow effects",
      fontFamily: "Cinzel",
      colorScheme: { primary: "#e0e0e0", secondary: "#4a4a4a", accent: "#0d0d0d" },
      layoutData: { type: "full-bleed", titleSize: "lg", effect: "fog-overlay" },
      showTypes: ["PLAY", "MUSICAL"] as const,
      tones: ["Dark", "Melancholic", "Suspenseful"],
      eras: ["Medieval", "Victorian", "Fantasy/Timeless"],
      styles: ["atmospheric", "dark"],
    },
  ];

  for (const tpl of templates) {
    const { id, showTypes, ...rest } = tpl;
    await prisma.typographicTemplate.upsert({
      where: { id },
      update: {},
      create: {
        id,
        ...rest,
        showTypes: showTypes as unknown as string[],
        previewUrl: `/templates/preview/${id}.png`,
        thumbnailUrl: `/templates/thumb/${id}.png`,
      },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
