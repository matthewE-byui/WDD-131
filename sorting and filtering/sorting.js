// sorting.js — Solutions for Sorting & Filtering activities

const outputEl = document.getElementById('output');
function write(...args) {
  const text = args.map(a => (typeof a === 'string' ? a : JSON.stringify(a, null, 2))).join(' ');
  console.log(...args);
  outputEl.textContent += text + '\n\n';
}

// Data
const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Easy", "Yellowstone", "Waterfall"],
    description:
      "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Easy", "Tetons"],
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "7 miles",
    tags: ["Moderate", "Yellowstone", "Waterfall"],
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "2.2 miles",
    tags: ["Easy"],
    description:
      "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions:
      "Take Highway 20 north to Island Park. Continue almost to Mack's in. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Moderate", "View"],
    description:
      "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
    directions:
      "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, the right onto Twin Butte road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
    trailhead: [43.78555, -111.98996]
  }
];

const simpleList = [
  "oranges",
  "grapes",
  "lemons",
  "apples",
  "Bananas",
  "watermelons",
  "coconuts",
  "broccoli",
  "mango"
];

// -------------------------
// Activity 1: Sorting strings
// -------------------------
write('Activity 1 — Sorting strings (case-sensitive): original simpleList:', simpleList.slice());

// simple sort (in-place) — case sensitive
const simpleSort = simpleList.slice().sort(); // clone first to preserve original
write('simpleSort (default .sort()):', simpleSort);

// Demonstrate case-insensitive sort (ascending)
const caseInsensitiveAsc = simpleList.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
write('case-insensitive ascending:', caseInsensitiveAsc);

// Demonstrate descending (case-insensitive)
const caseInsensitiveDesc = simpleList.slice().sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
write('case-insensitive descending:', caseInsensitiveDesc);

// -------------------------
// Activity 2: Filtering strings
// -------------------------
function searchList(list, query) {
  if (!query) return [];
  const q = query.toLowerCase();
  return list.filter(s => s.toLowerCase().includes(q));
}

write('Activity 2 — Filtering strings');
write('searchList(simpleList, "b"):', searchList(simpleList, 'b'));
write('searchList(simpleList, "an"):', searchList(simpleList, 'an'));

// -------------------------
// Activity 3: Searching & sorting list of objects
// -------------------------
function searchHikes(list, q) {
  const query = (q || '').toLowerCase();
  function matches(item) {
    if (item.name.toLowerCase().includes(query)) return true;
    if (item.description && item.description.toLowerCase().includes(query)) return true;
    // check tags array (find any tag that includes query)
    if (item.tags && item.tags.find(t => t.toLowerCase().includes(query))) return true;
    return false;
  }
  const filtered = list.filter(matches);

  // Sort by numeric distance ascending. distance is like "3 miles" so parseFloat works.
  const sorted = filtered.slice().sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  return sorted;
}

write('Activity 3 — Search & Sort objects (hikes)');
write('searchHikes(hikes, "yellowstone") =>', searchHikes(hikes, 'yellowstone'));
write('searchHikes(hikes, "moderate") =>', searchHikes(hikes, 'moderate'));
write('searchHikes(hikes, "al") =>', searchHikes(hikes, 'al'));

// Additional demonstration: show that the original hikes array order is preserved
write('Original hikes array (unchanged order):', hikes.map(h => h.name));

// End
write('Done — check the console for the same logs.')
