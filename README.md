# My Giga Pet

**Fizza Baig · CIT 384 · Project 2**

https://baigfizza.github.io/CIT-Project2/

My Giga Pet is a browser game inspired by my cat Muffin. Players can name their pet, give it treats, play, exercise, take a walk, nap, and try on outfits. The game starts with Muffin. Use **Add a friend** to choose and name up to four brown tabby cats or dogs. The pet changes poses and reacts to each activity.

## Controls

| Button | What it does |
| --- | --- |
| Treat | Alternates between a crunchy snack and a squeeze treat. Adds 1 lb and 3 happiness points. |
| Play | Starts a butterfly chase. When a tabby is active, the cats face each other as they play. When a dog is active, Play starts a playful tussle with Muffin. Subtracts 1 lb and adds 4 happiness points to the active pet. Catch the butterfly for 1 extra point. |
| Exercise | Shows the pet stretching. Subtracts 2 lb and 2 happiness points. |
| Walk | Shows the pet walking in the garden. Subtracts 2 lb and 2 happiness points. |
| Nap | Shows the pet sleeping and adds 2 happiness points to the active pet. When a friend is active, it naps beside Muffin. |
| Dress Up | Cycles through five illustrated outfits for the active cat or dog and adds 2 happiness points. |
| Reset game | Removes added friends and restarts with Muffin at 8 lb and 12 happiness points. Restarts the treat and outfit rotations and keeps the sound setting. |

Use the **Sound** checkbox to turn audio on or off. Weight and happiness stop at zero.

## Code and jQuery

The project builds on the professor’s starter code. The `Pet` constructor creates a separate object for each animal, with its own name, weight, happiness, and rotation counters. The `pets` array stores those objects, and `pet_info` points to the active pet. Button handlers update that pet’s values and refresh the stats on the page.

In `showReaction()` in `script.js`, **`.hide()`** hides the previous pose and welcome message. **`.show()`** displays the new pose and the pet’s reaction. The treat and outfit arrays store the poses and messages for each rotation.

| Project file | Purpose |
| --- | --- |
| `index.html` | Pet screen, stats, controls, and name form |
| `style.css` | Handheld layout, colors, and chase and walk animations |
| `script.js` | Game rules, button handlers, and jQuery interactions |
| `images/` and `sounds/` | Illustrated scenes, pet poses, and sound effects |

## Credits

The game is based on the course starter files and inspired by my cat Muffin. I used AI assistance for revising code, and creating the illustrations.
