import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

async function showTutorialMenu(player) {
  const form = new ActionFormData()
    .title("实验世界")
    .body("欢迎来到我们的附加包实验世界，请选择希望了解的内容。")
    .button("查看规则")
    .button("查看开发信息");

  try {
    const response = await form.show(player);
    if (response.canceled) return;

    if (response.selection === 0) {
      player.sendMessage("本世界用于功能测试，请在副本中进行破坏性实验。");
    } else if (response.selection === 1) {
      player.sendMessage("界面由公开的server-ui表单接口创建。");
    }
  } catch (error) {
    console.warn(`说明菜单未能显示：${error}`);
  }
}

world.afterEvents.playerSpawn.subscribe((event) => {
  if (!event.initialSpawn) return;
  system.runTimeout(() => {
    void showTutorialMenu(event.player);
  }, 40);
});
