# NuxtFlow

A dashboard demo project, built with Nuxt 4, Tailwind 4, and Reka UI.

## Project overview

### Description

NuxtFlow is a dashboard web-application, created for portfolio and learning purposes, with the goal of supporting my career development. Its name (NuxtFlow) is a combination of the framework used: Nuxt, and the design reference adopted: Flowbite.

### Design Reference

This project implements a design from a public Figma document, created by [Flowbite](https://flowbite.com/), available in the link below (as of May, 2026):

- [Flowbite Pro Figma v2.10.0 - Homepage](https://www.figma.com/design/BwJpLnMEFPsqLDaSgylB0V/flowbite-pro-figma-v2.10.0?node-id=2465-181397&p=f)

Note: Permission was kindly granted for using the design linked above, for the present use case. I am not affiliated with Flowbite by any means and I remain thankful for the consent given for relying on their work for my portfolio.

### Scope

The current implementation focuses on the dark theme version of the Homepage (Overview) page of the design reference.

Please note that some adaptations, simplifications and omissions were made to better suit the present project goal and due to time constraints.

## Period

The project took around 5 months to be completed, starting in January, 2026, and lasting until May, 2026.

## Tools and Technologies

### Tech Stack

Below are some of the main open source libraries used for creating the project:

- [Nuxt](https://nuxt.com/) (Vue.js), as the main project framework.
- [TailwindCSS](https://tailwindcss.com/) for convenient responsive styling.
- [Reka UI](https://reka-ui.com/) (via [@nuxt/reka-ui](https://nuxt.com/modules/reka-ui)), for accessible UI components.
- [Unovis](https://unovis.com/) (D3.js), for chart rendering.
- [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/), for testing components, composables and utility functions.
- [Iconify](https://iconify.design/) (via [@nuxt/icon](https://nuxt.com/modules/icon)), for importing and displaying icons.
- [date-fns](https://date-fns.org/), for date manipulation.
- [Vue Use](https://vueuse.org/) (via [@nuxt/vueuse](https://nuxt.com/modules/vueuse)), for utility composables.
- [Vue I18n](https://vue-i18n.intlify.dev/) (via [@nuxt/i18n](https://nuxt.com/modules/i18n)), for internationalization compatibility.

### Code Editor

I started the project in Visual Studio Code and at some point migrated to Zed.

### Artificial Intelligence (AI)

AI tools were used for optimizing the development process, as well as for experimenting and exploring the available options and its capabilities. The AI providers, models and tools used include:

- Copilot
- Gemini
- ChatGPT
- Codex
- Claude

Besides helping with decision making in general, AI basically assisted with the following tasks:

- Code review and suggestions
- Inline prediction and scoped code generation
- API mocking creation
- Test suite creation
- Debugging
- Commit message composition

## Getting started

### Setup

Install dependencies:

```bash
pnpm install
```

### Development

Start the development server at `http://localhost:3000`:

```bash
pnpm dev
```

### Testing

Run all tests:

```bash
pnpm test
```

### Production

Build for production:

```bash
pnpm build
```

Preview production build:

```bash
pnpm preview
```

## License

This project was created for portfolio and learning purposes and was not intended for distribution. The licenses of its third-party dependencies are listed in the [LICENSES](LICENSES.txt) file. As for the design work, it remains the property of its original creator, mentioned in the [Design Reference](#design-reference) section.
