using System;
using Microsoft.Xna.Framework;
using Terraria;
using Terraria.DataStructures;
using Terraria.Enums;
using Terraria.ID;
using Terraria.ModLoader;
using Terraria.ObjectData;
using BludtonianReactor.Systems;

namespace BludtonianReactor.Tiles;

// The placeable Bludtonian Reactor: a 4-wide x 5-high alien energy reactor.
// While the local player is near it, NearbyEffects flips the ReactorSystem flag,
// which causes ReactorPlayer to apply the scaling buff.
public class BludtonianReactorTile : ModTile
{
    // Number of frames in the "pulsing" animation loop. The texture stacks these
    // vertically, each one AnimationFrameHeight (90px = 5 tiles * 18px) tall.
    public const int FrameCount = 6;

    public override void SetStaticDefaults()
    {
        Main.tileFrameImportant[Type] = true;
        Main.tileNoAttach[Type] = true;
        Main.tileLavaDeath[Type] = true;
        Main.tileLighting[Type] = true; // allow ModifyLight to tint the area

        // Build a 4-wide x 5-high multitile anchored to the ground.
        TileObjectData.newTile.CopyFrom(TileObjectData.Style3x4);
        TileObjectData.newTile.Width = 4;
        TileObjectData.newTile.Height = 5;
        TileObjectData.newTile.CoordinateWidth = 16;
        TileObjectData.newTile.CoordinateHeights = new[] { 16, 16, 16, 16, 16 };
        TileObjectData.newTile.CoordinatePadding = 2;
        TileObjectData.newTile.Origin = new Point16(1, 4);
        TileObjectData.newTile.AnchorBottom =
            new AnchorData(AnchorType.SolidTile | AnchorType.SolidWithTop, 4, 0);
        TileObjectData.newTile.LavaDeath = true;
        TileObjectData.addTile(Type);

        AddMapEntry(new Color(150, 60, 200), CreateMapEntryName());

        DustType = DustID.PurpleTorch;
        AdjTiles = new int[] { TileID.Campfire };

        // Each animation frame is one full multitile tall (5 * 18 = 90px).
        AnimationFrameHeight = 90;
    }

    public override void AnimateTile(ref int frame, ref int frameCounter)
    {
        // Advance the pulse roughly every 7 ticks, looping through all frames.
        if (++frameCounter >= 7)
        {
            frameCounter = 0;
            frame = (frame + 1) % FrameCount;
        }
    }

    public override void NearbyEffects(int i, int j, bool closer)
    {
        // "closer" is true within the tighter campfire-style radius around the tile.
        if (closer)
            ModContent.GetInstance<ReactorSystem>().NearReactor = true;
    }

    public override void ModifyLight(int i, int j, ref float r, ref float g, ref float b)
    {
        // Pulsing purple "exotic energy" glow, synced loosely to the animation.
        float pulse = 0.85f + 0.15f * (float)Math.Sin(Main.GlobalTimeWrappedHourly * 4f);
        r = 0.55f * pulse;
        g = 0.20f * pulse;
        b = 0.85f * pulse;
    }
}
