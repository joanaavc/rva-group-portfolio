# Five Different Stories

> Five students, different talents, one shared journey.

A responsive student portfolio created by Group 2 for the RVA Summative Assessment 2 digital interface design project. The site introduces our team, explains our project roles and design ideas, and brings our group projects and individual artworks together.

## Preview

Open `index.html` in a browser to explore the site. It uses plain HTML, CSS, and JavaScript and does not need a package install or build step. The Canva and Figma previews need an internet connection; each section also includes a link to open its project directly.

## Pages

- **Home** (`index.html`): Introduces the team and links to the main sections.
- **Members** (`Members.html`): Shows each member's project role and portfolio link.
- **Skills** (`Skills.html`): Summarizes team contributions and provides an interactive glossary of art elements and design principles.
- **Works** (`works.html`): Embeds the group presentation and website prototype, then displays individual artwork galleries.
- **About** (`AboutUs.html`): Explains the idea behind the team name and summarizes the project journey.
- **Contact** (`ContactUs.html`): Includes a required-field message form with a local confirmation modal, plus the members' public social profiles and email links. The static form does not send or store submissions.

## Project files

- `global.css` contains the shared visual styles, page layouts, and responsive rules.
- `script.js` controls the mobile navigation, interactive glossary, and current-year footer text.
- `Assets/` contains the member portraits, individual artwork, and supporting project documents.

Keep the capitalization and spelling of file and asset paths unchanged, especially when publishing on a case-sensitive host.

## Deploy to GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes the site from the repository root whenever changes are pushed to `main`. In the repository's **Settings → Pages**, set the build and deployment source to **GitHub Actions**. The first deployment can then be started by pushing this workflow to `main` or running it manually from the **Actions** tab.

## Design direction

The visual identity combines navy, cream, and soft orange with a clean, editorial layout. The pages use space, contrast, balance, and repetition to keep the portfolio cohesive while giving each member's work room to stand out.

## Team roles

| Member | Project role |
| :--- | :--- |
| **Joana Crisha Ayop** | Group coordination and homepage |
| **Whendelyn Bangis** | Website layout and design |
| **Julie Lian Rubio** | Research and content |
| **Kate Nicole De Vera** | About Us and documentation |
| **Ryan Harold Tabios** | Our Works and presentation preparation |
