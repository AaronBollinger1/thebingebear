# thebingebear.com

Earthy, dark, A24-aesthetic film & TV review site.

## File Structure

```
/
├── index.html              ← Homepage
├── style.css               ← Shared styles (don't duplicate these)
├── audio/
│   ├── michael-2026.mp3    ← Drop audio files here
│   └── companion-2025.mp3
└── reviews/
    ├── _template.html      ← DUPLICATE THIS for every new review
    ├── michael-2026.html
    └── companion-2025.html
```

---

## Adding a New Review (5 steps, ~5 minutes)

1. **Duplicate** `reviews/_template.html`  
   Rename it: `reviews/show-name-year.html` (lowercase, hyphens, no spaces)

2. **Fill in the 6 marked sections** (all labelled `STEP 1` through `STEP 6`):
   - Page title
   - Hero: type, year, title, genre, cast, score
   - Audio slug (if you have it)
   - Lede, review paragraphs, pullquotes
   - Verdict score + summary
   - Next review link

3. **Add a card on index.html** — copy an existing `.review-card` block and update the title, year, excerpt, score, and `href`.

4. **Drop your mp3** into `/audio/` named to match the slug.  
   Then uncomment the `<source>` line in the review page.

5. **Commit and push** — Vercel auto-deploys.

---

## Naming Convention

| File | Slug format |
|---|---|
| `reviews/euphoria-s3-2026.html` | `euphoria-s3-2026` |
| `audio/euphoria-s3-2026.mp3` | matches exactly |

---

## Hosting

- **GitHub** → push all files to main branch  
- **Vercel** → connect GitHub repo, framework = "Other", root = `/`  
- **Porkbun** → point nameservers to Vercel's (ns1.vercel-dns.com / ns2.vercel-dns.com)  
- DNS propagation: 5–30 minutes

---

## Audio Tips

- Record in any voice memo or DAW, export as mp3 (128kbps is fine)
- Trim silence at start and end
- File size: a 10-minute review at 128kbps ≈ 9MB (well within Vercel's limits)
- No audio yet? The player bar shows "Audio coming soon" automatically — no broken UI
