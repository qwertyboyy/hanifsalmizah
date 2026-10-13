# DESIGN.md — Developer Portfolio

## 1. Design Direction

Build a dark, minimal developer portfolio inspired by the provided reference image.

**Visual keywords:** developer-focused, understated, editorial, technical, minimal, structured, slightly experimental.

The interface should feel like a developer's personal workspace: restrained dark surfaces, monospaced typography, thin outlines, small geometric decorations, and purple accents used with intention.

### Core principles
- Prioritize readable content and clear hierarchy over decoration.
- Use whitespace to create structure; do not fill every empty area.
- Keep borders thin and mostly low-contrast.
- Use purple for emphasis, active states, links, and small highlights—not for every component.
- Use real project screenshots and authentic profile imagery where available.
- Avoid generic gradients, glassmorphism, excessive shadows, oversized rounded cards, and unnecessary animation.
- The reference is inspiration, not a requirement to copy its exact content or layout.

## 2. Color Tokens

Use these exact colors as the base palette.

| Token | Hex | Intended use |
|---|---|---|
| `--color-bg` | `#282C33` | Main page background |
| `--color-surface` | `#282C33` | Default surface; keep the interface visually unified |
| `--color-accent` | `#C778DD` | Links, highlighted words, active navigation, primary outline accents |
| `--color-text-secondary` | `#ABB2BF` | Supporting text, metadata, muted labels, icons |
| `--color-text-primary` | `#FFFFFF` | Main headings and high-priority text |
| `--color-border` | `#ABB2BF` | Thin outlines; use reduced opacity where possible |
| `--color-accent-soft` | `rgba(199, 120, 221, 0.12)` | Subtle hover or selected backgrounds |
| `--color-overlay` | `rgba(40, 44, 51, 0.85)` | Image overlays when needed |

### Color rules
- The background should remain predominantly `#282C33`.
- Use `#FFFFFF` selectively for primary content, not for every paragraph.
- Use `#ABB2BF` for secondary copy and subdued interface elements.
- Reserve `#C778DD` for deliberate emphasis and interaction.
- Do not introduce extra accent colors unless a project screenshot or technology logo requires its original colors.
- Ensure text remains readable against its background. Do not reduce opacity on small text to the point that it becomes difficult to read.

## 3. Typography

### Font family
Use **Fira Code** throughout the interface.

Load it from a local font package or a reliable font provider. Include sensible fallbacks:

```css
font-family: "Fira Code", "SFMono-Regular", Consolas, monospace;
```

### Type scale
| Element | Desktop guideline | Weight | Color |
|---|---:|---|---|
| Hero heading | `32–40px` | 600–700 | `#FFFFFF`, with selected words in accent |
| Section heading | `24–30px` | 600 | `#FFFFFF` |
| Project title | `18–22px` | 600 | `#FFFFFF` |
| Body copy | `14–16px` | 400 | `#ABB2BF` |
| Navigation | `12–14px` | 400–500 | `#ABB2BF` |
| Metadata / tags | `12–13px` | 400 | `#ABB2BF` |
| Code-like labels | `12–14px` | 400–500 | `#C778DD` or `#ABB2BF` |

### Typography rules
- Use short, clear headings and concise paragraphs.
- Highlight selected phrases in purple rather than coloring the entire heading.
- Keep body text line-height around `1.5–1.7`.
- Avoid long lines; aim for roughly 55–75 characters per line for readable paragraphs.
- Do not use more than three distinct font sizes within a single small component unless there is a clear hierarchy.
- Preserve consistent letter spacing. Avoid excessive tracking on monospaced text.

## 4. Layout and Spacing

- Use a centered content container with a maximum width of approximately `1100–1200px`.
- On desktop, keep horizontal page padding around `32–48px`; on mobile, use `20–24px`.
- Use a spacing scale based on multiples of `4px`: `4, 8, 12, 16, 24, 32, 48, 64, 80px`.
- Maintain generous vertical separation between major sections (`72–112px` on desktop).
- Align section headings, project grids, and content edges consistently.
- Prefer asymmetrical hero compositions when useful: text on one side, portrait or visual on the other.
- Decorative geometry may overlap empty space, but must never obscure text or controls.
- Avoid horizontal overflow at every supported viewport width.

## 5. Page Structure

Recommended portfolio sections:

1. **Header / Navigation**
   - Personal logo or name on the left.
   - Section links on the right.
   - Optional language selector only if the site genuinely supports multiple languages.
   - Active navigation item may use a purple `#` prefix or accent underline.

2. **Hero**
   - A concise headline explaining role and value.
   - One or two short lines of supporting copy.
   - A clear contact CTA.
   - Optional portrait, abstract geometric mark, or project visual.
   - Optional compact availability/status strip.

3. **Projects / Works**
   - Show the strongest, most relevant projects first.
   - Each project should communicate its purpose, role, stack, and outcome.
   - Use project screenshots instead of generic decorative thumbnails when possible.
   - Provide a clear link to a live demo or repository when available.

4. **Skills / Tech Stack**
   - Group technologies by purpose, such as Frontend, Backend, Database, and Tools.
   - Keep this section compact; avoid a wall of logos or progress bars that imply arbitrary skill percentages.

5. **About**
   - Briefly explain background, working style, and interests.
   - Use concrete information rather than generic claims.

6. **Contact**
   - Include a direct email link and relevant professional profiles.
   - Make the next action obvious.

7. **Footer**
   - Minimal copyright and a small set of relevant links.

Only include sections that contain useful information. Do not add sections merely to make the page longer.

## 6. Components

### Navigation
- Background matches the page.
- Use small, monospaced labels.
- Default links use `#ABB2BF`; hover and active states use `#C778DD`.
- Keep spacing consistent and provide a visible keyboard-focus state.
- Mobile navigation must remain easy to use without horizontal overflow.

### Buttons and links
- Primary CTA: transparent or background-matched fill with a thin `#C778DD` border and readable text.
- Use modest corner rounding (`0–4px`); square corners are acceptable and closer to the reference.
- Hover: subtle accent-tinted background or stronger border.
- Provide visible `:focus-visible` styling.
- Buttons and links must have real, working destinations or actions. Do not use placeholder `href="#"` for finished features.

### Project cards
- Use thin borders and restrained styling.
- Keep image aspect ratios consistent within a project grid.
- Present title, short description, technologies, and available links in a predictable order.
- Do not rely on color alone to distinguish interactive elements.
- Cards may use a slightly lighter or darker surface only if it remains within the restrained palette.

### Status strip
- Use a thin outline, small square accent indicator, and concise status text.
- Do not communicate availability as current unless the information is accurate and maintained.

### Decorative elements
- Optional elements include outlined rectangles, bracket-like shapes, dotted patterns, and small `#` symbols.
- Keep decorations low contrast and behind the content.
- Hide or simplify decorations on small screens if they reduce clarity or performance.

## 7. Borders, Radius, and Shadows

- Default border: `1px solid rgba(171, 178, 191, 0.65)`.
- Accent border: `1px solid #C778DD`.
- Standard radius: `0–4px`.
- Avoid large pill-shaped buttons and heavily rounded cards unless there is a clear usability reason.
- Use little to no box shadow. Prefer outlines and spacing to define component boundaries.

## 8. Motion and Interaction

- Keep motion subtle and purposeful.
- Use short transitions around `150–220ms`.
- Suitable effects: accent-color transitions, a slight border-color change, or a small image movement.
- Avoid scroll hijacking, excessive parallax, constant floating animations, and distracting cursor effects.
- Respect `prefers-reduced-motion`.
- All interactions must work with a keyboard as well as a pointer.

## 9. Responsive Behavior

### Desktop (`1200px` and wider)
- Use the full two-column hero composition where appropriate.
- Project grid may use two or three columns depending on content width.
- Keep decorative elements secondary to content.

### Tablet (`768px–1199px`)
- Reduce outer padding and hero gaps.
- Use two project columns if cards remain readable.
- Simplify overlapping decorations.

### Mobile (below `768px`)
- Stack the hero vertically; place the main text before the portrait or visual.
- Use a hero heading around `26–32px`.
- Use one project column.
- Reduce section gaps to around `48–72px`.
- Keep buttons comfortably tappable (target at least `44px` high).
- Prevent decorative elements from causing horizontal scrolling.
- Keep navigation usable; use a compact menu if necessary.

## 10. Accessibility and Quality

- Use semantic landmarks and a logical heading order.
- Ensure sufficient color contrast, especially for small secondary text.
- Give meaningful images descriptive alt text; use empty alt text for purely decorative images.
- Never encode important information only through color.
- Add visible keyboard focus indicators.
- Ensure all controls have accessible names.
- Test layouts at narrow widths and with browser zoom.
- Optimize images and avoid unnecessary animation or large assets.

## 11. Implementation Tokens

```css
:root {
  --color-bg: #282C33;
  --color-surface: #282C33;
  --color-accent: #C778DD;
  --color-text-secondary: #ABB2BF;
  --color-text-primary: #FFFFFF;
  --color-border: rgba(171, 178, 191, 0.65);
  --color-accent-soft: rgba(199, 120, 221, 0.12);

  --font-mono: "Fira Code", "SFMono-Regular", Consolas, monospace;

  --radius-sm: 2px;
  --border-width: 1px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  --container-width: 1200px;
}
```

## 12. Example Base Styles

```css
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
}

a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 180ms ease, border-color 180ms ease;
}

a:hover {
  color: var(--color-accent);
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

::selection {
  background: var(--color-accent);
  color: var(--color-bg);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 13. Definition of Done

Before considering the portfolio complete, verify:

- [ ] Fira Code is loaded and applied consistently.
- [ ] The base palette matches the specified hex values.
- [ ] Accent purple is used selectively and consistently.
- [ ] Layout spacing and alignment are consistent across sections.
- [ ] Desktop, tablet, and mobile layouts work without horizontal overflow.
- [ ] Navigation, contact links, project links, and buttons work.
- [ ] Keyboard navigation and visible focus states work.
- [ ] Text and controls remain readable.
- [ ] Images are optimized and have appropriate alt text.
- [ ] No decorative element competes with the content.
- [ ] Project descriptions are accurate and do not claim unverified results.

## 14. Instruction for AI Coding Tools

Treat this file as the source of truth for visual decisions.

When creating or modifying the portfolio:
1. Follow the color, typography, spacing, and component rules in this document.
2. Reuse existing components and design tokens instead of introducing inconsistent one-off styles.
3. Do not add new colors, fonts, gradients, or major visual effects without a clear reason.
4. Prioritize responsive behavior, accessibility, and working functionality over decorative polish.
5. If a design choice is unspecified, choose the simplest option consistent with this guide.
