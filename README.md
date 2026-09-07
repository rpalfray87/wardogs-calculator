# Wardogs Calculator

Calculateur d'**azimut** et de **distance** pour jouer mortier / artillerie dans Wardogs.
On entre sa position et celle de la cible, l'app donne où pointer le tube. Rien d'autre :
pas de carte, pas de compte, pas de réseau.

Une seule base de code, deux usages :

- **Overlay PC** (Electron) : une fenêtre toujours au-dessus du jeu, appelée par un raccourci global.
- **PWA mobile** : installable sur le téléphone depuis GitHub Pages, fonctionne hors connexion.

## Le calcul

```
dx = Xcible - Xmoi
dy = Ycible - Ymoi          (inversé si l'axe Y du jeu descend vers le Nord)

distance = racine(dx² + dy²) × mètres_par_point
azimut   = atan2(dx, dy)     0° = Nord, rotation horaire
```

Le jeu n'étant pas sorti au moment de l'écriture, **trois paramètres sont des hypothèses**
et vivent dans les réglages, pas dans le code :

| Réglage | Défaut | À corriger si… |
|---|---|---|
| Mètres par point | 100 (10 points = 1000 m) | la distance est proportionnellement fausse |
| Sens de l'axe Y | Y augmente vers le Nord | l'azimut est décalé de 180° |
| Unité de l'azimut | Degrés | la boussole du jeu s'avère graduée en millièmes (choisir alors 6400 ou 6000) |

### Procédure de calibration, le jour de la sortie

1. Poser le mortier, relever ses coordonnées, viser un point dont on connaît les coordonnées.
2. Comparer l'azimut de l'app à celui de la boussole en jeu.
   - Écart de 180° → basculer **Sens de l'axe Y**.
   - La boussole n'est pas graduée en degrés → changer **Unité de l'azimut**.
3. Comparer la distance annoncée à la portée réelle → ajuster **Mètres par point**.

Aucune recompilation n'est nécessaire : tout est persisté dans le navigateur / l'app.

## Saisie

Les champs acceptent exactement ce que le jeu affiche : `1234`, `131.33`, `131,33`.
**Aucune virgule n'est insérée ni déplacée automatiquement** — le nombre de chiffres est variable,
tout formatage automatique produirait des coordonnées fausses.

Coller `131.33 45.6` (ou `131.33;45.6`, `131.33/45.6`) dans le champ X remplit X **et** Y d'un coup.

| Touche | Effet |
|---|---|
| `Tab` | champ suivant |
| `Entrée` | mémorise la cible depuis n'importe où dans l'app, sans avoir le curseur dans un champ ; marteler la touche ne crée pas de doublon |
| `Échap` | masque l'overlay et rend le focus au jeu (PC) |
| clic sur un chiffre | copie la valeur |

## Millièmes et élévation

Le viseur du jeu porte deux échelles couplées : la **portée en mètres** à gauche et
l'**élévation en millièmes** à droite (par exemple 110 M en face de 900 mil). Les millièmes
concernent donc l'inclinaison du tube, pas la direction.

L'app donne la portée en mètres, qui se lit directement sur l'échelle de gauche du viseur :
c'est le viseur lui-même qui fait la correspondance vers les millièmes. L'unité de l'azimut
reste réglable au cas où la boussole du jeu serait, elle aussi, graduée en millièmes.

## Développement

```bash
npm install
npm run dev            # web seul, http://localhost:5173
npm run dev:electron   # overlay Electron + serveur Vite
npm test               # tests du module de calcul
npm run typecheck
```

## Build

```bash
npm run build      # PWA -> dist/
npm run build:win  # overlay portable -> release/WardogsCalculator-1.0.0.exe
npm run icons      # régénère les PNG depuis scripts/gen-icons.mjs
```

## Overlay PC

- Raccourci par défaut **`Alt+M`** : affiche / masque. Modifiable dans les réglages.
- **`Échap`** masque et rend la main au jeu.
- La fenêtre se déplace en attrapant la barre de titre ; sa position est mémorisée.
- L'app vit dans la zone de notification : clic sur l'icône pour l'afficher, menu contextuel pour quitter.
- L'opacité est réglable.

> **Le jeu doit tourner en fenêtré sans bordure** (le mode par défaut de la plupart des jeux
> récents), pas en plein écran exclusif : aucun overlay ne peut s'afficher par-dessus un
> plein écran exclusif.

L'app se contente d'afficher une fenêtre : pas de hook, pas de lecture mémoire du jeu,
aucune simulation d'entrées.

## PWA mobile

Une fois le dépôt poussé sur GitHub avec Pages activé (source : *GitHub Actions*), le workflow
`.github/workflows/deploy.yml` publie le site à chaque push sur `main`.

Sur le téléphone : ouvrir l'URL, puis « Ajouter à l'écran d'accueil ». L'app se lance ensuite
en plein écran et fonctionne sans connexion.

## Structure

```
src/core/        calcul, parsing, réglages — logique pure et testée
src/components/  UI
electron/        overlay : fenêtre, raccourci global, zone de notification
scripts/         générateur d'icônes PNG (sans dépendance)
```
