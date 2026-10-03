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
