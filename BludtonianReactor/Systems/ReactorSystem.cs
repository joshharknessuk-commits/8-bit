using Terraria;
using Terraria.ModLoader;

namespace BludtonianReactor.Systems;

// Tracks whether the local player is currently standing near a Bludtonian Reactor.
// This mirrors how vanilla flags Main.SceneMetrics.HasCampfire: the flag is reset
// every frame and switched back on by the tile's NearbyEffects hook while in range.
public class ReactorSystem : ModSystem
{
    public bool NearReactor;

    public override void ResetNearbyTileEffects()
    {
        NearReactor = false;
    }

    // How many extra players (beyond the first) the Reactor scaling should count.
    // Capped so the buff cannot grow without bound on very large servers.
    public const int MaxBonusPlayers = 8;

    // Per-extra-player multiplier applied on top of the base buff values.
    public const float PerPlayerBonus = 0.25f;

    // Counts the players currently active in the world (minimum of 1).
    public static int ActivePlayerCount()
    {
        int count = 0;
        for (int i = 0; i < Main.maxPlayers; i++)
        {
            if (Main.player[i].active)
                count++;
        }

        return count < 1 ? 1 : count;
    }

    // The strength multiplier for the buff given the current player count.
    // 1 player -> 1.0x, each extra player -> +25%, capped at MaxBonusPlayers.
    public static float ReactorScale()
    {
        int extra = ActivePlayerCount() - 1;
        if (extra > MaxBonusPlayers)
            extra = MaxBonusPlayers;

        return 1f + extra * PerPlayerBonus;
    }
}
