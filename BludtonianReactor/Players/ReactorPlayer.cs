using Terraria;
using Terraria.ModLoader;
using BludtonianReactor.Buffs;
using BludtonianReactor.Systems;

namespace BludtonianReactor.Players;

// Applies the Reactor buff to the local player whenever they are near a placed
// Bludtonian Reactor tile. The short duration (6 frames) is continuously refreshed
// while in range, so the buff falls off almost immediately after walking away.
public class ReactorPlayer : ModPlayer
{
    public override void PostUpdateMiscEffects()
    {
        if (ModContent.GetInstance<ReactorSystem>().NearReactor)
            Player.AddBuff(ModContent.BuffType<BludtonianReactorBuff>(), 6);
    }
}
