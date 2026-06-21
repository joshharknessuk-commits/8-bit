using Terraria;
using Terraria.ID;
using Terraria.ModLoader;
using BludtonianReactor.Tiles;

namespace BludtonianReactor.Items;

// The inventory item that places the Bludtonian Reactor tile.
public class BludtonianReactorItem : ModItem
{
    public override void SetDefaults()
    {
        Item.DefaultToPlaceableTile(ModContent.TileType<BludtonianReactorTile>());
        Item.width = 24;
        Item.height = 24;
        Item.value = Item.buyPrice(0, 2); // 2 gold
        Item.rare = ItemRarityID.Green;
    }

    public override void AddRecipes()
    {
        // Crimson-world recipe.
        CreateRecipe()
            .AddIngredient(ItemID.Torch, 3)
            .AddIngredient(ItemID.CrimtaneBar, 5)
            .AddIngredient(ItemID.Vertebrae, 8)
            .AddTile(TileID.Anvils)
            .Register();

        // Corruption-world alternative so both world types can craft it.
        CreateRecipe()
            .AddIngredient(ItemID.Torch, 3)
            .AddIngredient(ItemID.DemoniteBar, 5)
            .AddIngredient(ItemID.RottenChunk, 8)
            .AddTile(TileID.Anvils)
            .Register();
    }
}
