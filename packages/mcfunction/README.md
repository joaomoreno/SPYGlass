# `@spyglassmc/mcfunction`

![banner](https://raw.githubusercontent.com/SPYGlassMC/logo/main/banner.png)

[![npm](https://img.shields.io/npm/v/@spyglassmc/mcfunction.svg?logo=npm&style=flat-square)](https://npmjs.com/package/@spyglassmc/mcfunction)

This package contains parsers and processors for [mcfunction][mcfunction].

# Usage

1. Register vanilla command trees and command tree patches to `CommandTreeRegistry`.
```typescript
CommandTreeRegistry.instance.register('1.15', vanillaCommandTreeFor1_15)
CommandTreeRegistry.instance.register('1.16', vanillaCommandTreeFor1_16)
CommandTreeRegistry.instance.register('1.17', vanillaCommandTreeFor1_17)

CommandTreeRegistry.instance.register('1.17-tdn', vanillaCommandTreeFor1_17, tridentCommandTreePatchFor1_17)
```
2. // TODO

# Supported Parsers

| Identifier                     | Camel Case                   |
| ------------------------------ | ---------------------------- |
| `brigadier:bool`               | `BrigadierBool`              |
| `brigadier:double`             | `BrigadierDouble`            |
| `brigadier:float`              | `BrigadierFloat`             |
| `brigadier:integer`            | `BrigadierInteger`           |
| `brigadier:long`               | `BrigadierLong`              |
| `brigadier:string`             | `BrigadierString`            |
| `minecraft:angle`              | `MinecraftAngle`             |
| `minecraft:block_pos`          | `MinecraftBlockPos`          |
| `minecraft:block_predicate`    | `MinecraftBlockPredicate`    |
| `minecraft:block_state`        | `MinecraftBlockState`        |
| `minecraft:color`              | `MinecraftColor`             |
| `minecraft:column_pos`         | `MinecraftColumnPos`         |
| `minecraft:component`          | `MinecraftComponent`         |
| `minecraft:dimension`          | `MinecraftDimension`         |
| `minecraft:entity`             | `MinecraftEntity`            |
| `minecraft:entity_anchor`      | `MinecraftEntityAnchor`      |
| `minecraft:entity_summon`      | `MinecraftEntitySummon`      |
| `minecraft:float_range`        | `MinecraftFloatRange`        |
| `minecraft:function`           | `MinecraftFunction`          |
| `minecraft:game_profile`       | `MinecraftGameProfile`       |
| `minecraft:int_range`          | `MinecraftIntRange`          |
| `minecraft:item_enchantment`   | `MinecraftItemEnchantment`   |
| `minecraft:item_predicate`     | `MinecraftItemPredicate`     |
| `minecraft:item_slot`          | `MinecraftItemSlot`          |
| `minecraft:item_stack`         | `MinecraftItemStack`         |
| `minecraft:message`            | `MinecraftMessage`           |
| `minecraft:mob_effect`         | `MinecraftMobEffect`         |
| `minecraft:nbt_compound_tag`   | `MinecraftNbtCompoundTag`    |
| `minecraft:nbt_path`           | `MinecraftNbtPath`           |
| `minecraft:nbt_tag`            | `MinecraftNbtTag`            |
| `minecraft:objective`          | `MinecraftObjective`         |
| `minecraft:objective_criteria` | `MinecraftObjectiveCriteria` |
| `minecraft:operation`          | `MinecraftOperation`         |
| `minecraft:particle`           | `MinecraftParticle`          |
| `minecraft:resource_location`  | `MinecraftResourceLocation`  |
| `minecraft:rotation`           | `MinecraftRotation`          |
| `minecraft:score_holder`       | `MinecraftScoreHolder`       |
| `minecraft:scoreboard_slot`    | `MinecraftScoreboardSlot`    |
| `minecraft:swizzle`            | `MinecraftSwizzle`           |
| `minecraft:team`               | `MinecraftTeam`              |
| `minecraft:time`               | `MinecraftTime`              |
| `minecraft:uuid`               | `MinecraftUuid`              |
| `minecraft:vec2`               | `MinecraftVec2`              |
| `minecraft:vec3`               | `MinecraftVec3`              |
| `spyglassmc:symbol`            | `SpyglassmcSymbol`           |
| `spyglassmc:trailing`\*        | `SpyglassmcTrailing`         |
| `spyglassmc:unknown`\*\*       | `SpyglassmcUnknown`          |

\* This parser is responsible for parsing trailing string after a command.  \
\*\* All parsers that are not listed in the table will be treated as `spyglassmc:unknown`.

# Contributions

## Languages

- `mcfunction` language that is associated with the `.mcfunction` file extension.

## AST Nodes

## Processors

[mcfunction]: https://minecraft.fandom.com/Function_(Java_Edition)
