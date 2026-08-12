# tamash-playwright-typescript-cucumber

Example usage of [`tamash-playwright`](https://www.npmjs.com/package/tamash-playwright) with **Cucumber BDD** (TypeScript), driving raw `playwright` (not `@playwright/test`) — with and without the Page Object Model.

Since Cucumber manages its own browser lifecycle via hooks rather than `@playwright/test`'s `test` fixture, this example uses `tamash-playwright`'s lower-level `bindPageActions()` export to wrap a plain Playwright `Page` with the same self-healing behavior.

## Structure

- `features/login_nopom.feature` + `step_definitions/login_nopom.steps.ts` — no page objects; locators declared directly in step definitions.
- `features/create_employee_pom.feature` + `step_definitions/create_employee_pom.steps.ts` — Page Object Model; steps only call methods on page objects.
- `src/pages/` — page object classes.
- `src/support/world.ts` — Cucumber `World` holding the browser/context/page and page objects.
- `src/support/hooks.ts` — `Before`/`After` hooks: launches the browser, wraps the page with `bindPageActions()`, tears down after each scenario.

## Setup

```bash
npm install
cp .env.example .env
# fill in an AI provider key in .env (Ollama/OpenAI/Anthropic/Gemini)
npx playwright install chromium
```

## Run

```bash
npm test
```

## How self-healing shows up

When a selector fails, `tamash-playwright` captures an ARIA snapshot, asks the configured AI provider for a replacement, retries the action once, and prints a line like:

```
[self-healer] Recovered using ollama:gpt-oss:120b (placeholder "Username").
```
