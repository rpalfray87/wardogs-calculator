# Wardogs Calculator

Azimuth and range calculator for playing mortar or artillery in Wardogs.
Type your own position and the target's, and the app tells you where to point the
tube. Nothing else: no map, no account, no network.

One codebase, two ways to use it:

- **Desktop overlay** (Electron): a window that stays above the game, summoned by a global hotkey.
- **Mobile PWA**: installable from GitHub Pages, works offline.

**Live at [rpalfray87.github.io/Wardogs-calculator](https://rpalfray87.github.io/Wardogs-calculator/)**

## The maths

```
dx = Xtarget - Xme
dy = Ytarget - Yme          (flipped if the game's Y axis grows towards the South)

range   = sqrt(dx² + dy²) × metres_per_point
azimuth = atan2(dx, dy)     0° = North, clockwise
```

The game was not out when this was written, so **three parameters are assumptions**.
They live in the settings rather than in the code:

| Setting | Default | Change it when… |
|---|---|---|
| Metres per point | 100 (10 points = 1000 m) | the range is proportionally wrong |
| Y axis direction | Y grows towards the North | the azimuth is off by 180° |
| Azimuth unit | Degrees | the in-game compass turns out to be graduated in mils (then pick 6400 or 6000) |

### Calibration procedure

1. Set the mortar down, note its coordinates, and aim at a point whose coordinates you know.
2. Compare the app's azimuth with the in-game compass.
   - Off by 180° → flip **Y axis direction**.
   - Not graduated in degrees → change **Azimuth unit**.
3. Compare the announced range with the real one → adjust **Metres per point**.

No rebuild required: everything is persisted in the browser and in the app.

## Entering coordinates

Fields accept exactly what the game displays: `1234`, `131.33`, `131,33`.
**No separator is ever inserted or moved automatically** — coordinates vary in length,
so any automatic formatting would produce wrong coordinates.

Pasting `131.33 45.6` (or `131.33;45.6`, `131.33/45.6`) into the X field fills X **and** Y at once.

| Key | Effect |
|---|---|
| `Tab` | next field |
| `Enter` | saves the target from anywhere in the app, no need for the caret to be in a field; hammering it creates no duplicate |
| `Esc` | hides the overlay and gives focus back to the game (desktop) |
| click a number | copies it |

## Reading numbers

Results always group thousands with a narrow no-break space and always use a dot for
decimals, in every language. Locale-aware grouping would be a trap here: English writes
1000 as `1,000` and German as `1.000`, while the azimuth legitimately uses a dot for its
decimal (`90.0`). On a screen where misreading a number drops a shell in the wrong place,
a separator that cannot be mistaken for a decimal mark is worth more than local
typographic habits. It is also what ISO 80000-1 recommends.

## Mils and elevation

The in-game sight carries two coupled scales: **range in metres** on the left and
**elevation in mils** on the right (110 M facing 900 mil, for instance). Mils therefore
describe the tube's inclination, not its direction.

The app gives the range in metres, which reads straight off the sight's left-hand scale:
the sight itself does the conversion to mils. The azimuth unit stays configurable in case
the compass turns out to be graduated in mils too.

## Languages

The interface ships in the 20 most widely spoken languages and follows the browser's
language on first run, overridable in the settings. Arabic and Urdu switch the layout to
right-to-left. Every translation is bundled so the app keeps working offline.

## Development

```bash
npm install
npm run dev            # web only, http://localhost:5173
npm run dev:electron   # Electron overlay plus the Vite server
npm test               # calculation, parsing and dictionary tests
npm run typecheck
```

## Build

```bash
npm run build      # PWA -> dist/
npm run build:win  # overlay installer -> release/WardogsCalculator-Setup-1.0.0.exe
npm run icons      # regenerates the PNGs from scripts/gen-icons.mjs
```

## Desktop overlay

- Default hotkey **`Alt+M`**: show / hide. Configurable in the settings.
- **`Esc`** hides it and gives focus back to the game.
- Drag the title bar to move the window; its position is remembered.
- The app lives in the tray: click the icon to show it, use the context menu to quit.
- Opacity is adjustable.

> **The game must run in borderless windowed mode** (the default for most recent games),
> not exclusive fullscreen: no overlay can draw over an exclusive fullscreen surface.

The app only draws a window. No hooks, no reading the game's memory, no synthetic input.

## Mobile PWA

`.github/workflows/deploy.yml` publishes the site on every push to `main`.

On a phone: open the URL, then "Add to home screen". The app then launches fullscreen and
works with no connection.

## Layout

```
src/core/        calculation, parsing, settings — pure, tested logic
src/i18n/        dictionaries and the translation provider
src/components/  UI
electron/        overlay: window, global hotkey, tray
scripts/         PNG icon generator (dependency-free)
```
