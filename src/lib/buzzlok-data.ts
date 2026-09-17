export type DiscoveryKind =
  | "New"
  | "Event"
  | "Place"
  | "Deal"
  | "Trend"
  | "Product"
  | "Useful"
  | "Experience";

export type Discovery = {
  id: string;
  tag: string;
  kind: DiscoveryKind;
  title: string;
  summary: string;
  place: string;
  age: string;
  heat: number;
  lanes: string[];
};

export const lanes = [
  "Buzz Now",
  "Around You",
  "Trending",
  "Worth Doing",
  "Worth Buying",
  "Useful",
] as const;

export const discoveries: Discovery[] = [
  {
    id: "d1",
    tag: "🔥 NEW",
    kind: "New",
    title: "A listening-room café just opened in Indiranagar",
    summary:
      "Vinyl-only sessions, 40 seats, no laptops after 6pm. Free entry on weekdays, ticketed sets on Saturday.",
    place: "Bangalore",
    age: "42 sec",
    heat: 96,
    lanes: ["Buzz Now", "Around You", "Worth Doing"],
  },
  {
    id: "d2",
    tag: "📈 TRENDING",
    kind: "Trend",
    title: "Searches for 'monsoon treks near me' are up 320% this week",
    summary:
      "Three routes around the Western Ghats are absorbing most of the demand. Permits are filling by Thursday.",
    place: "India",
    age: "6 min",
    heat: 91,
    lanes: ["Buzz Now", "Trending"],
  },
  {
    id: "d3",
    tag: "🎟️ EVENT",
    kind: "Event",
    title: "Night food market returns to Church Street this weekend",
    summary:
      "70 stalls, 6pm to midnight, Friday through Sunday. Entry free, most plates under ₹200.",
    place: "Bangalore",
    age: "18 min",
    heat: 88,
    lanes: ["Around You", "Worth Doing", "Buzz Now"],
  },
  {
    id: "d4",
    tag: "🛍️ DEAL",
    kind: "Deal",
    title: "Noise-cancelling earbuds at their lowest price in 9 months",
    summary:
      "Price tracked across four retailers. Current drop looks like an inventory clear, not a festival sale.",
    place: "Online",
    age: "27 min",
    heat: 84,
    lanes: ["Worth Buying", "Trending"],
  },
  {
    id: "d5",
    tag: "🧭 USEFUL",
    kind: "Useful",
    title: "A free tool that shows which bus will actually arrive first",
    summary:
      "Crowd-verified arrival data for 14 Indian cities. Works offline once a route is saved.",
    place: "Web",
    age: "1 hr",
    heat: 79,
    lanes: ["Useful", "Buzz Now"],
  },
  {
    id: "d6",
    tag: "📍 PLACE",
    kind: "Place",
    title: "The lake walk locals use instead of the crowded one",
    summary:
      "2.4 km loop, open from 5am, quiet until 8. Parking is the only catch — go on two wheels.",
    place: "Bangalore",
    age: "2 hr",
    heat: 74,
    lanes: ["Around You", "Worth Doing"],
  },
  {
    id: "d7",
    tag: "🚀 LAUNCH",
    kind: "Product",
    title: "A neighbourhood repair service launched across 6 pin codes",
    summary:
      "Flat visit fee, parts at invoice price. Currently servicing appliances and cycles only.",
    place: "Bangalore",
    age: "3 hr",
    heat: 71,
    lanes: ["Around You", "Worth Buying"],
  },
  {
    id: "d8",
    tag: "✨ EXPERIENCE",
    kind: "Experience",
    title: "Pottery studio opens its kiln to first-timers on Sundays",
    summary:
      "Two-hour slot, everything included, you keep what survives the firing. Twelve seats a week.",
    place: "Bangalore",
    age: "5 hr",
    heat: 68,
    lanes: ["Worth Doing", "Around You"],
  },
];

export const pulseTicker = [
  "New coworking floor opened in Koramangala",
  "Flight fares to Goa dropped 18% overnight",
  "3 new weekend markets added near you",
  "AI note-taking tool made its pro tier free",
  "Late-night metro trial extended by 2 weeks",
  "A 1920s cinema reopens after restoration",
  "Street food festival announced for next Friday",
  "Local bakery now delivers before 7am",
];

export const sixtySecond = {
  title: "The city's new late-night transit trial",
  what: "Metro services on two lines now run until 1:30am on Fridays and Saturdays.",
  why: "It changes what a night out can look like without a cab fare surge at the end.",
  matters:
    "Restaurants, venues and small shops near the 11 affected stations expect longer trading hours.",
  action: "Check whether your usual station is on the trial list before Friday.",
};

export const aroundMe = [
  { icon: "📍", label: "New businesses", count: 12 },
  { icon: "🎟️", label: "Events", count: 34 },
  { icon: "🍽️", label: "Places", count: 87 },
  { icon: "🛍️", label: "Offers", count: 23 },
  { icon: "🎨", label: "Experiences", count: 9 },
  { icon: "🔥", label: "Trending spots", count: 16 },
];

export const interests = [
  "Business",
  "Travel",
  "Food",
  "Shopping",
  "Technology",
  "AI",
  "Finance",
  "Entertainment",
  "Sports",
  "Local events",
  "Lifestyle",
  "Education",
];

export const pipeline = [
  "Collect",
  "Clean",
  "Deduplicate",
  "Verify",
  "Categorize",
  "Score",
  "Personalize",
];

export const sources = [
  "Public APIs",
  "RSS & permitted sites",
  "Public datasets",
  "Business submissions",
  "Event sources",
  "Product & deal feeds",
  "User submissions",
  "Search & trend signals",
];

export const searchPrompts = [
  "What's happening in Bangalore today?",
  "What's trending in India?",
  "What can I do this weekend?",
  "What's new near me?",
  "Show me something interesting.",
  "What are people buying?",
  "What should I know today?",
];
