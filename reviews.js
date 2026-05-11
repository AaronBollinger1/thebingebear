// ═══════════════════════════════════════════════════════
//  THE BINGE BEAR — ADD ALL REVIEWS HERE
//  Newest date shows first automatically.
//  For a coming-soon card: set status to "coming-soon"
//  and leave excerpt/rating as shown.
// ═══════════════════════════════════════════════════════

const REVIEWS = [

  {
    slug:    "michael-2026",
    title:   "Michael",
    year:    2026,
    type:    "Film",
    genre:   "Biopic · Dir. Antoine Fuqua",
    rating:  9,                    // out of 10
    date:    "2026-05-01",         // YYYY-MM-DD — sets the order
    status:  "published",          // "published" or "coming-soon"
    audio:   false,                // true once /audio/michael-2026.mp3 is added
    excerpt: "The purpose behind this entire production, as it is for many, was the money. We must accept that this is not a film selflessly produced and created by Michael Jackson post-success.",
  },

  {
    slug:    "companion-2025",
    title:   "Companion",
    year:    2025,
    type:    "Film",
    genre:   "Sci-Fi Thriller",
    rating:  7,
    date:    "2025-12-01",
    status:  "published",
    audio:   false,
    excerpt: "This movie tries to cross over the line between fun and serious far too much. Nonetheless it is a fun ride, with excellent actors playing in these boxes the writers have etched for them to abide in.",
  },

  // ── HOW TO ADD A COMING SOON CARD ──────────────────
  // Copy the block below, uncomment it, fill it in.
  // No review page needed until it's published.
  //
  // {
  //   slug:    "euphoria-s3-2026",
  //   title:   "Euphoria",
  //   year:    2026,
  //   type:    "Television",
  //   genre:   "Season 3 · Finale",
  //   rating:  0,
  //   date:    "2026-06-01",
  //   status:  "coming-soon",
  //   audio:   false,
  //   excerpt: "",
  // },

  // ── HOW TO ADD A NEW PUBLISHED REVIEW ──────────────
  // 1. Copy and fill in a block like above (status: "published")
  // 2. Duplicate reviews/_template.html → reviews/your-slug.html
  // 3. Fill in the 7 variables at the top of the script block
  // 4. Paste your review text into the review-text div
  // 5. Done — homepage updates automatically

];
