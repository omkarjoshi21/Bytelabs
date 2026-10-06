# ByteLabs

Responsive website for ByteLabs, an independent software studio founded by Omkar Joshi.

## Local development

Requires Node.js 22.12+ or 24 LTS.

```sh
npm ci
npm run dev
```

```sh
npm run test
npm run lint
npm run build
npm run preview
```

Deploy the generated `dist` folder to a static host. No server or secrets are required.

## Content and contact

- `src/ByteLabs.jsx`: services, projects, founder profile, social links, contact details and inquiry flow.
- `src/App.css`: layouts, animations and mobile breakpoints.
- `src/index.css`: global styles and reduced-motion support.
- `src/assets/omkar-joshi-enhanced.png`: enhanced founder portrait used on the website. The original `omkar-joshi.jpg` is preserved.
- `src/assets/yogesh-gawande.png`: supplied portrait for Yogesh Gawande, Chief Technology Officer (CTO).
- Add future team members to `teamMembers` in `src/ByteLabs.jsx` with their name, role and imported portrait. Both the dedicated Founder & CEO introduction and the expandable member grid belong to the same “Meet our team” section.
- `index.html`: search and sharing metadata.

The inquiry form validates input and opens a prefilled WhatsApp message or email draft. The visitor must send the message in that app. Email requires a configured email application; WhatsApp requires the service to be available. The website does not submit or store inquiries. Direct email, phone and WhatsApp links remain available.

VedCare is labeled live and links to the supplied website at https://shrirangayurved.com/. A separate demonstration request opens WhatsApp. PurohitSeva is labeled in development. Product visuals are clearly labeled illustrations/concepts and are not actual product screenshots. Founder social links point to Omkar's personal profiles.

Fonts load from Google Fonts with local system fallbacks. Navigation remains sticky without overflow clipping; mobile navigation supports Escape, outside clicks and closing after selection. FAQ uses native keyboard-accessible disclosures. Animations respect reduced-motion preferences; content stays readable without animation support.

## Suggested next steps

1. Add a custom domain and domain-based business email.
2. Supply actual VedCare screenshots.
3. Add company social profiles when available, distinct from founder profiles.
4. Add approved client testimonials or case studies with verified outcomes.
5. Connect a backend/email provider if direct form delivery is desired; add the corresponding privacy information when data collection begins.
6. Add an absolute social-preview image and canonical URL once the public domain is known.

## Project signature kit

Open `/brand-kit.html` for logo variants and project footer examples. SVG assets and integration guidance are in `public/brand/`. `src/ProjectCredit.jsx` and `src/ProjectCredit.css` provide a reusable React attribution component. Supply the confirmed public ByteLabs URL when integrating a linked credit into client projects. The clinic footer in the kit is a local visual example.
# Google Search identity

The canonical public URL is `https://bytelabs-1.onrender.com/`. The homepage includes
ByteLabs site-name metadata and linked WebSite, Organization (independent studio),
and Person information for Omkar Joshi. It does not claim legal incorporation or a
physical business address. Favicons and social sharing images are in `public/`.

After deploying these changes:

1. Confirm `/sitemap.xml`, `/robots.txt`, `/favicon-96.png`, and the Google
   verification file load on the public website.
2. Select the ByteLabs property in Search Console. Submit `sitemap.xml` under
   Sitemaps.
3. Inspect the homepage, test the live URL, and request indexing once.
4. Allow Google time to recrawl. A preferred site name, favicon, title, or ranking
   is not guaranteed. Connect the website from the founder's real public profiles.

If the public domain changes, update the canonical link, structured-data URLs,
Open Graph URLs, robots.txt, and sitemap.xml together. Brand preview HTML pages
are marked noindex so they do not compete with the public studio homepage.

