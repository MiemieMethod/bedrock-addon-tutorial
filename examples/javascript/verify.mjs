import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

// 这些独立预期值对应教程正文描述的输出，而非从示例执行结果生成。
const expected = [
    ["小明\n5"],
    ["3\n9", "4 5\n5 5", "1\n6\n20\n8\n-2", "15\ntrue\nfalse"],
    [
        "number\nstring\nboolean\nundefined\nobject\nobject\nobject\nfunction",
        "true\ntrue\ntrue\ntrue\ntrue\ntrue",
        "3 5\n5 5\ntrue\nfalse"
    ],
    ["14\n12\n11", "数量无效\n数量为4\n开始检查\nundefined", "12"],
    ["小明\n3\n绿宝石\nundefined", "2\n5", "2 5\n9 9\nfalse\ntrue"],
    ["可以领取", "true\nfalse\nfalse\nfalse", "false\n已有结果\n5\n0"],
    ["1 2\n2 6\n3 12\n总计 12", "10", "累计 2\n累计 6\n结束 6", "3 0"],
    ["5 3\n1\n7\n6", "true\nfalse\n5\ntrue", "8\n2\n-1\n2147483647\n-2147483648\n1"],
    ["本轮分数 9\n9\n5", "大厅", "4\n3", "ReferenceError"],
    ["小明\n小红\ntrue", "true\ntrue", "3\n6\n10\n10 100"],
    ["12\n5\n小明", "12, 20\n2, 6, 10", "4\n4\n4\n8", "9\n0", "TypeError\n100\n200"],
    [
        "小明完成了3轮挑战，获得9分。\n${name}完成了挑战。",
        "分数：2\n分数：8",
        '"挑战结果\\n玩家：小明\\n分数：9"\n这里显示${score}和一个反引号`',
        "对象：[object Object]\n位置：1.3, 64, -2.5\n玩家：小明、小红"
    ],
    ["小明 5\n小红 0\ntrue", "true\ntrue\nfalse\ntrue", "5\ntrue", "6\ntrue\n带倍率的计数器"],
    ["1\n3\n11\n4", "8\n2", "0, 1, 2\n3, 3, 3", "1\n1\nundefined"],
    ["甲：开始\n乙：执行器运行\n丙：当前代码结束\n丁：取得结果 3", "奖励 6\n示例校验失败\n最终结果 0", "6\n轮数必须是非负整数", "4, 7"]
];

let total = 0;
for (let chapter = 1; chapter <= expected.length; chapter += 1) {
    const url = new URL(`../../docs/advanced/sec0.${chapter}.md`, import.meta.url);
    const source = readFileSync(url, "utf8");
    const examples = [...source.matchAll(/```js\n([\s\S]*?)```/g)];
    assert.equal(examples.length, expected[chapter - 1].length, `第${chapter}节示例数量`);
    examples.forEach((match, index) => {
        const label = `sec0.${chapter}.md / 示例${index + 1}`;
        const result = spawnSync(process.execPath, ["--input-type=module", "-e", match[1]], {
            encoding: "utf8",
            timeout: 3000
        });
        assert.equal(result.error, undefined, `${label}：${result.error}`);
        assert.equal(result.status, 0, `${label}退出码：${result.stderr}`);
        assert.equal(result.stderr.trim(), "", `${label}产生错误输出`);
        assert.equal(result.stdout.trim(), expected[chapter - 1][index], `${label}输出`);
        total += 1;
    });
}
console.log(`通过：${expected.length}篇教程，${total}个独立JavaScript示例。`);
