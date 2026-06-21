using Terraria;
using Terraria.ModLoader;
using BludtonianReactor.Systems;

namespace BludtonianReactor.Buffs;

// The buff granted while standing near a Bludtonian Reactor. All effects scale
// with the number of players in the world via ReactorSystem.ReactorScale().
public class BludtonianReactorBuff : ModBuff
{
    public override void SetStaticDefaults()
    {
        Main.buffNoTimeDisplay[Type] = true; // station buff — hide the countdown timer
        Main.buffNoSave[Type] = true;        // don't persist across save/exit
    }

    public override void Update(Player player, ref int buffIndex)
    {
        float scale = ReactorSystem.ReactorScale();

        // Movement speed.
        player.moveSpeed += 0.15f * scale;
        player.maxRunSpeed += 0.10f * scale;

        // Attack speed — Generic applies across all weapon classes.
        player.GetAttackSpeed(DamageClass.Generic) += 0.10f * scale;

        // Health — campfire-style regen plus a bonus to maximum life.
        player.lifeRegen += (int)(4 * scale);
        player.statLifeMax2 += (int)(20 * scale);
    }
}
