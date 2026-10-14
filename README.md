# Fruit Frenzy
A polished, browser-only 60-second fruit puzzle. Five original SVG illustrations, juicy sliced fruit effects, gravity, bounded automatic combos, synthesized sound, pause and persistent personal bests. No dependencies, external assets, API keys or backend.

## Play
Press **Let’s play**. Press a fruit to highlight its entire orthogonally connected bunch; release on the highlighted bunch to clear it. At least 3 fruits are required. Drag away or press Escape to cancel. Touch uses the same controls and the board prevents scrolling while dragging. Keyboard: arrow keys navigate; Enter or Space clears a bunch; Escape pauses. Larger bunches earn `10 × size²`. Newly formed groups cascade with multipliers 2–4, limited to four clearing rounds per turn. Existing untouched groups do not automatically clear. Any dead board gets a guaranteed fresh bunch.

## Local development
Requires Node.js 22 or newer. No installation needed.

```sh
npm run dev
npm test
npm run build
```
Open http://localhost:5173. The build is in `dist/`. If Node is unavailable, `python3 scripts/build.py` packages the same static output. To serve production: `SERVE_DIR=dist npm run dev`.

## GitHub Pages
Create or use a GitHub repository, add these files, and push to its `main` branch. In **Settings → Pages → Build and deployment**, select **GitHub Actions**. The included `.github/workflows/pages.yml` runs tests, builds and deploys with the official Pages actions. The workflow also supports manual dispatch. All asset references are relative, so both `https://ACCOUNT.github.io/REPOSITORY/` and custom domains work without changing a base path. No secrets are needed.

This workspace does not itself establish a successful deployment; verify the Actions deployment and its returned Pages URL after pushing.

## Architecture
- `src/board.js`: board generation, flood-fill, scoring, gravity, new-group detection and bounded playable-board repair.
- `src/main.js`: state transitions, pointer/keyboard controls, serialized resolution and restart cancellation tokens.
- `src/timer.js`: elapsed-time timer independent of rendering.
- `src/art.js`, `src/effects.js`: locally generated SVG artwork, split-fruit pieces, particles and falling animations.
- `src/audio.js`: interaction-unlocked Web Audio and storage fallbacks.

Adjust duration, size and maximum combo depth in `CONFIG` in `src/board.js` (the current layout and keyboard navigation target the default 8 × 10 board). Hidden tabs automatically pause. Resolving animations may safely finish behind the pause overlay; further clears wait for resume. Time expiry lets the current clearing round settle before results. Reduced motion limits displacement and particles, and disables shake and ambient animation.

## Quality checks
`npm test` covers orthogonal connectivity, row boundaries, scoring, complete gravity and survivor order, playable-board guarantees over hundreds of boards/turns, cascade bounds, elapsed timer behavior and storage fallback/persistence. See `QA.md` for the checks actually completed in this environment and verification limits. Browser interaction QA is still required for device-specific touch and audio behavior.
