# ByteLabs project signature

Preview the kit at `/brand-kit.html` while the website is running.

## Files

- `bytelabs-icon.svg`: compact mark, also used by the website and favicon.
- `bytelabs-logo-light.svg`: full logo for light backgrounds.
- `bytelabs-logo-dark.svg`: full logo for dark backgrounds.
- `bytelabs-credit-light.svg`: Developed by ByteLabs signature for light footers.
- `bytelabs-credit-dark.svg`: Developed by ByteLabs signature for dark footers.

All SVGs have transparent backgrounds. The full logo and credits use standard Arial/Helvetica typography, with no external font request. Wordmarks remain SVG text rather than outlined paths. The icon is pure vector geometry.

## Placement

Let the client/product brand lead. Put one compact developer credit on the opposite side of the footer; stack below on mobile. Avoid showing the full ByteLabs logo and a separate duplicate credit next to it. Keep the project signature approximately 200–240px wide with a minimum 32px icon height and at least 12px clear space around it.

Use `Developed by ByteLabs` for projects you developed. The optional tagline is `Crafted for impact.` No heavy text underline, unnecessary glow, or constant animation is needed on client sites.

The kit's clinic footer is a local demonstration only; it does not modify the live VedCare website.

## HTML

Copy the desired SVG into the destination project's assets. Wrap the image in an anchor with the confirmed ByteLabs website URL. No official studio URL has been supplied yet: replace the placeholder before deployment.

```html
<a href="YOUR_CONFIRMED_BYTELABS_URL" target="_blank" rel="noopener noreferrer">
  <img src="/brand/bytelabs-credit-dark.svg" width="238" height="54"
       alt="Developed by ByteLabs. Crafted for impact." />
</a>
```

## React

Copy `src/ProjectCredit.jsx`, `src/ProjectCredit.css`, and `src/assets/bytelabs-mark.svg` into your project, preserving or updating relative imports.

```jsx
<ProjectCredit theme="dark" href={studioWebsiteUrl} />
<ProjectCredit theme="light" href={studioWebsiteUrl} showTagline={false} />
```

Omit href to render a non-link credit until your official website address is ready.

## Colors

Forest #203E31; Ivory #F3EEE4; Sage #647950; light accent #B5CC8E.
