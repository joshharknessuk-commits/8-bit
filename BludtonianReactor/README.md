# Bludtonian Reactor

A hyper-advanced alien reactor that converts exotic energy into immense power,
pulsing with otherworldly might.

A [tModLoader](https://github.com/tModLoader/tModLoader) mod for Terraria that
adds a craftable **buff station** (4 wide × 5 high, Lime rarity, animated purple
pulse). Place it down and stand near it to gain:

- **Attack speed** (all weapon classes)
- **Movement speed** (walk/run speed)
- **Health** (life regeneration + bonus maximum life)

…just like a campfire's heart-regen aura, but stronger and multi-stat.

## The twist: it scales with players

The Reactor's power **grows with every player in the world**. Each additional
player past the first increases all of its bonuses by **+25%**, up to **+200%**
(8 extra players). A solo base gives a modest boost; a packed multiplayer base
turns the Reactor into a serious power node.

| Players in world | Buff strength |
| ---------------- | ------------- |
| 1                | 1.00x         |
| 2                | 1.25x         |
| 4                | 1.75x         |
| 9 or more        | 3.00x (cap)   |

At base (1.00x) the Reactor grants roughly +0.15 move speed, +10% attack speed,
+4 life regen and +20 max life; all of these scale by the multiplier above.

## Crafting

At an **Anvil**, from either evil biome's materials:

- **Crimson:** 3 Torch + 5 Crimtane Bar + 8 Vertebrae
- **Corruption:** 3 Torch + 5 Demonite Bar + 8 Rotten Chunk

## Project layout

```
BludtonianReactor/
├── build.txt                 # mod metadata (author/version/displayName)
├── description.txt           # in-launcher description
├── icon.png                  # mod browser icon
├── BludtonianReactor.cs      # Mod entry point
├── Items/
│   └── BludtonianReactorItem.cs   # placeable item + recipes (+ .png sprite)
├── Tiles/
│   └── BludtonianReactorTile.cs   # the placed reactor block (+ .png sprite)
├── Buffs/
│   └── BludtonianReactorBuff.cs   # the scaling buff applied while near it
├── Players/
│   └── ReactorPlayer.cs           # applies the buff when in range
├── Systems/
│   └── ReactorSystem.cs           # "near reactor" flag + player-count scaling
└── Localization/
    └── en-US_Mods.BludtonianReactor.hjson
```

## How the "near tile" buff works

1. `ReactorSystem.NearReactor` is reset to `false` every frame
   (`ResetNearbyTileEffects`).
2. While the player is within range of a placed Reactor, the tile's
   `NearbyEffects(closer: true)` flips that flag back on — the same mechanism
   vanilla uses for campfires (`HasCampfire`).
3. `ReactorPlayer.PostUpdateMiscEffects` sees the flag and applies
   `BludtonianReactorBuff` for a few frames, refreshing it continuously while in
   range so it drops off right after you walk away.
4. The buff reads `ReactorSystem.ReactorScale()` (driven by the active player
   count) and scales every stat bonus accordingly.

## Building / installing

This is tModLoader **source**, not a compiled `.tmod`. To build it:

1. Install **tModLoader** (free on Steam).
2. Copy/symlink the `BludtonianReactor/` folder into your tModLoader
   `ModSources` directory:
   - Windows: `Documents/My Games/Terraria/tModLoader/ModSources/`
   - Linux: `~/.local/share/Terraria/tModLoader/ModSources/`
3. Launch tModLoader → **Workshop → Develop Mods → Build + Reload**.

> **Note on sprites:** the included `.png` files are themed placeholders so the
> mod builds immediately. Swap them for the real pixel art (see the design
> reference sheet) when you're ready — keep the layout the tile code expects:
>
> | Texture | Dimensions | Notes |
> | ------- | ---------- | ----- |
> | `Tiles/BludtonianReactorTile.png` | `72 × 540` | 4×5 multitile (72×90 per frame), **6 pulsing frames stacked vertically** |
> | `Items/BludtonianReactorItem.png` | `32 × 40` | placement / inventory icon |
> | `icon.png` | `80 × 80` | mod browser icon |
>
> The tile animation is driven by `AnimationFrameHeight = 90` and a 6-frame loop
> in `AnimateTile`. If you want a different number of animation frames, update
> `BludtonianReactorTile.FrameCount` and stack that many `72×90` frames.
