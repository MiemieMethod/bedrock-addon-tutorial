import { register } from "@minecraft/server-gametest";

register("tutorial", "place_gold_block", (test) => {
    const position = { x: 1, y: 1, z: 1 };
    test.setBlockType("minecraft:gold_block", position);
    test.assertBlockPresent("minecraft:gold_block", position, true);
    test.succeed();
})
    .structureName("tutorial:empty")
    .maxTicks(20);
