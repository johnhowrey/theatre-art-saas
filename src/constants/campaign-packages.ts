export const CAMPAIGN_FORMATS = {
  DIGITAL: [
    { name: "Instagram Post", width: 1080, height: 1080, unit: "px" },
    { name: "Instagram Story", width: 1080, height: 1920, unit: "px" },
    { name: "Facebook Cover", width: 1640, height: 856, unit: "px" },
    { name: "TikTok Cover", width: 1080, height: 1920, unit: "px" },
    { name: "Email Header", width: 600, height: 200, unit: "px" },
    { name: "Website Banner", width: 1920, height: 600, unit: "px" },
  ],
  PRINT: [
    { name: "Poster (11x17)", width: 11, height: 17, unit: "in" },
    { name: "Playbill Cover", width: 5.5, height: 8.5, unit: "in" },
    { name: "Postcard (4x6)", width: 4, height: 6, unit: "in" },
    { name: "Poster (24x36)", width: 24, height: 36, unit: "in" },
  ],
} as const;

export const CAMPAIGN_TYPES = [
  { value: "DIGITAL", label: "Digital Only", description: "Social media, email, and web assets" },
  { value: "PRINT", label: "Print Only", description: "Posters, playbills, and postcards" },
  { value: "DIGITAL_PRINT", label: "Digital + Print", description: "Full toolkit for all channels" },
  { value: "ADDON", label: "Add-on", description: "Extra variations and merchandise" },
] as const;
