using Microsoft.Xna.Framework;
using Terraria;
using Terraria.ID;
using Terraria.ModLoader;
using Terraria.ObjectData;
using BludtonianReactor.Systems;

namespace BludtonianReactor.Tiles;

// The placeable Bludtonian Reactor. While the local player is near it, NearbyEffects
// flips the ReactorSystem flag, which causes ReactorPlayer to apply the scaling buff.
public class BludtonianReactorTile : ModTile
{
    public override void SetStaticDefaults()
    {
        Main.tileFrameImportant[Type] = true;
        Main.tileNoAttach[Type] = true;
        Main.tileLavaDeath[Type] = true;
        Main.tileLighting[Type] = true; // allow ModifyLight to tint the area

        TileObjectData.newTile.CopyFrom(TileObjectData.Style3x2);
        TileObjectData.newTile.LavaDeath = true;
        TileObjectData.addTile(Type);

        AddMapEntry(new Color(180, 40, 60), CreateMapEntryName());

        DustType = DustID.Blood;
        AdjTiles = new int[] { TileID.Campfire };
    }

    public override void NearbyEffects(int i, int j, bool closer)
    {
        // "closer" is true within the tighter campfire-style radius around the tile.
        if (closer)
            ModContent.GetInstance<ReactorSystem>().NearReactor = true;
    }

    public override void ModifyLight(int i, int j, ref float r, ref float g, ref float b)
    {
        // Reddish "blood reactor" glow.
        r = 0.7f;
        g = 0.15f;
        b = 0.2f;
    }
}
