import{_ as n,o as s,c as a,a as e}from"./app.f314ddae.js";const i={},t=e(`<h1 id="\u7269\u54C1-\u65B9\u5757\u6570\u636E\u9A71\u52A8\u5347\u7EA7\u7248\u672C\u63A7\u5236" tabindex="-1"><a class="header-anchor" href="#\u7269\u54C1-\u65B9\u5757\u6570\u636E\u9A71\u52A8\u5347\u7EA7\u7248\u672C\u63A7\u5236" aria-hidden="true">#</a> \u7269\u54C1/\u65B9\u5757\u6570\u636E\u9A71\u52A8\u5347\u7EA7\u7248\u672C\u63A7\u5236</h1><p><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0;" src="https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg"></a></p><h2 id="item" tabindex="-1"><a class="header-anchor" href="#item" aria-hidden="true">#</a> item</h2><p><code>format_version</code>\u4E0D\u652F\u6301<code>[1, 16, 100]</code>\u7684\u5199\u6CD5</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>item<span class="token operator">:</span><span class="token number">1.16</span>.<span class="token number">100</span><span class="token operator">:</span><span class="token punctuation">{</span>
    string <span class="token string">&quot;format_version&quot;</span>
    itemSchema <span class="token string">&quot;minecraft:item&quot;</span>
    <span class="token punctuation">{</span>
        item_components <span class="token string">&quot;components&quot;</span>
        <span class="token punctuation">{</span>
            
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="block" tabindex="-1"><a class="header-anchor" href="#block" aria-hidden="true">#</a> block</h2><p><code>format_version</code>\u4E0D\u652F\u6301<code>[1, 16, 100]</code>\u7684\u5199\u6CD5</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block<span class="token operator">:</span><span class="token number">1.16</span>.<span class="token number">100</span><span class="token operator">:</span><span class="token punctuation">{</span>
    string <span class="token string">&quot;format_version&quot;</span>
    blockSchema <span class="token string">&quot;minecraft:item&quot;</span>
    <span class="token punctuation">{</span>
        block_components <span class="token string">&quot;components&quot;</span>
        <span class="token punctuation">{</span>
            
        <span class="token punctuation">}</span>
        block_permutation <span class="token string">&quot;permutations&quot;</span>
        <span class="token punctuation">{</span>
            object <span class="token string">&quot;&lt;any array element&gt;&quot;</span>
            <span class="token punctuation">{</span>
                block_components <span class="token string">&quot;components&quot;</span>
                <span class="token punctuation">{</span>
                    
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-durability-1-18-item" tabindex="-1"><a class="header-anchor" href="#minecraft-durability-1-18-item" aria-hidden="true">#</a> minecraft:durability 1.18 item</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.17.99</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>minecraft<span class="token operator">:</span>durability <span class="token string">&quot;minecraft:durability&quot;</span>
<span class="token punctuation">{</span>
    int <span class="token property">&quot;max_durability&quot;</span> <span class="token operator">:</span> opt
    int <span class="token property">&quot;max_damage&quot;</span> <span class="token operator">:</span> opt
    int_range <span class="token property">&quot;damage_chance&quot;</span> <span class="token operator">:</span> opt
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>int_range<span class="token operator">:</span>
    object
    <span class="token punctuation">{</span>
        int <span class="token string">&quot;min&quot;</span>
        int <span class="token string">&quot;max&quot;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-18-0" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-18-0" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.18.0..</h3><p><code>max_damage</code>\u88AB\u89E3\u6790\u4E3A<code>max_durability</code>\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>minecraft<span class="token operator">:</span>durability <span class="token string">&quot;minecraft:durability&quot;</span>
<span class="token punctuation">{</span>
    int <span class="token property">&quot;max_durability&quot;</span> <span class="token operator">:</span> opt
    int_range <span class="token property">&quot;damage_chance&quot;</span> <span class="token operator">:</span> opt
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-food-1-18-item" tabindex="-1"><a class="header-anchor" href="#minecraft-food-1-18-item" aria-hidden="true">#</a> minecraft:food 1.18 item</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-1" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-1" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.17.99</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>minecraft<span class="token operator">:</span>food <span class="token string">&quot;minecraft:food&quot;</span>
<span class="token punctuation">{</span>
    int <span class="token property">&quot;nutrition&quot;</span> <span class="token operator">:</span> opt
    bool <span class="token property">&quot;can_always_eat&quot;</span> <span class="token operator">:</span> opt
    enumerated_value <span class="token string">&quot;saturation_modifier&quot;</span>&lt;<span class="token string">&quot;poor&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;low&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;normal&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;good&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;max&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;supernatural&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;high&quot;</span>&gt; <span class="token operator">:</span> opt
    item_descriptor <span class="token property">&quot;using_converts_to&quot;</span> <span class="token operator">:</span> opt
    trigger <span class="token property">&quot;on_consume&quot;</span> <span class="token operator">:</span> opt
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>item_descriptor<span class="token operator">:</span>
    string
    object
    <span class="token punctuation">{</span>
        string <span class="token string">&quot;item&quot;</span>
        expression_node <span class="token string">&quot;tags&quot;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>trigger<span class="token operator">:</span>
    string
    object
    <span class="token punctuation">{</span>
        string <span class="token string">&quot;event&quot;</span>
        enumerated_value <span class="token string">&quot;target&quot;</span>&lt;<span class="token string">&quot;self&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;other&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;player&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;target&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;parent&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;baby&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;block&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;damager&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;holder&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;item&quot;</span>&gt;
        expression_node <span class="token string">&quot;condition&quot;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-18-0-1" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-18-0-1" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.18.0..</h3><p>\u5C06\u5B57\u7B26\u4E32\u683C\u5F0F\u7684\u9971\u548C\u5EA6\u4FEE\u9970\u7B26\u5168\u90E8\u89E3\u6790\u4E3A\u6570\u5B57\uFF0C\u5E76\u5220\u53BB\u5B57\u7B26\u4E32\u683C\u5F0F\u3002\uFF08<code>high</code>\u7B49\u4EF7\u4E8E<code>normal</code>\uFF09</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>minecraft<span class="token operator">:</span>food <span class="token string">&quot;minecraft:food&quot;</span>
<span class="token punctuation">{</span>
    int <span class="token property">&quot;nutrition&quot;</span> <span class="token operator">:</span> opt
    bool <span class="token property">&quot;can_always_eat&quot;</span> <span class="token operator">:</span> opt
    float <span class="token property">&quot;saturation_modifier&quot;</span> <span class="token operator">:</span> opt
    item_descriptor <span class="token property">&quot;using_converts_to&quot;</span> <span class="token operator">:</span> opt
    trigger <span class="token property">&quot;on_consume&quot;</span> <span class="token operator">:</span> opt
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-repairable-1-18-item" tabindex="-1"><a class="header-anchor" href="#minecraft-repairable-1-18-item" aria-hidden="true">#</a> minecraft:repairable 1.18 item</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-2" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-2" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.17.99</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>minecraft<span class="token operator">:</span>repairable <span class="token string">&quot;minecraft:repairable&quot;</span>
<span class="token punctuation">{</span>
    array <span class="token property">&quot;repair_items&quot;</span> <span class="token operator">:</span> opt
    <span class="token punctuation">{</span>
        repair_item_entry <span class="token string">&quot;&lt;any array element&gt;&quot;</span>
        string <span class="token string">&quot;&lt;any array element&gt;&quot;</span>
    <span class="token punctuation">}</span>
    trigger <span class="token property">&quot;on_repaired&quot;</span> <span class="token operator">:</span> opt
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>repair_item_entry<span class="token operator">:</span>
object
    <span class="token punctuation">{</span>
        array <span class="token string">&quot;items&quot;</span>
        <span class="token punctuation">{</span>
            item_descriptor <span class="token string">&quot;&lt;any array element&gt;&quot;</span>
        <span class="token punctuation">}</span>
        expression_node <span class="token string">&quot;repair_amount&quot;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-18-0-2" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-18-0-2" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.18.0..</h3><p>\u5220\u53BB<code>repair_items</code>\u7684\u5B57\u7B26\u4E32\u6570\u7EC4\u683C\u5F0F\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>minecraft<span class="token operator">:</span>repairable <span class="token string">&quot;minecraft:repairable&quot;</span>
<span class="token punctuation">{</span>
    array <span class="token property">&quot;repair_items&quot;</span> <span class="token operator">:</span> opt
    <span class="token punctuation">{</span>
        repair_item_entry <span class="token string">&quot;&lt;any array element&gt;&quot;</span>
    <span class="token punctuation">}</span>
    trigger <span class="token property">&quot;on_repaired&quot;</span> <span class="token operator">:</span> opt
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="description-1-19-40-block" tabindex="-1"><a class="header-anchor" href="#description-1-19-40-block" aria-hidden="true">#</a> description 1.19.40 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-39" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-39" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.39</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>blockDescription <span class="token string">&quot;description&quot;</span>
<span class="token punctuation">{</span>
    object <span class="token string">&quot;menu_category&quot;</span>
    <span class="token punctuation">{</span>
        LocIdString <span class="token string">&quot;group&quot;</span>
        enumerated_value <span class="token string">&quot;category&quot;</span>&lt;<span class="token string">&quot;all&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;construction&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;nature&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;equipment&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;items&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;commands&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;none&quot;</span>&gt;
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-40" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-40" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.40..</h3><p>\u5982\u679C<code>category</code>\u4E0D\u5B58\u5728\uFF0C\u52A0\u5165<code>is_hidden_in_commands</code>\u503C\u4E3A<code>false</code>\uFF1B\u5982\u679C<code>category</code>\u4E3A\u7A7A\u6216\u89E3\u6790\u5931\u8D25\uFF0C\u52A0\u5165<code>is_hidden_in_commands</code>\u503C\u4E3A<code>true</code>\uFF0C\u5E76\u5728\u52A0\u5165<code>is_hidden_in_commands</code>\u540E\u5C06<code>category</code>\u7684\u503C\u91CD\u7F6E\u4E3A<code>none</code>\uFF1B\u5982\u679C<code>category</code>\u4E3A<code>all</code>\u6216<code>none</code>\uFF0C\u52A0\u5165<code>is_hidden_in_commands</code>\u503C\u4E3A<code>true</code>\uFF0C\u5176\u4F59\u60C5\u51B5\u503C\u4E3A<code>false</code>\uFF1B\u5982\u679C<code>category</code>\u4E3A<code>all</code>\u3001<code>commands</code>\u6216<code>none</code>\uFF0C\u5728\u52A0\u5165<code>is_hidden_in_commands</code>\u540E\u5C06<code>category</code>\u7684\u503C\u91CD\u7F6E\u4E3A<code>none</code></p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>blockDescription <span class="token string">&quot;description&quot;</span>
<span class="token punctuation">{</span>
    object <span class="token string">&quot;menu_category&quot;</span>
    <span class="token punctuation">{</span>
        LocIdString <span class="token string">&quot;group&quot;</span>
        enumerated_value <span class="token string">&quot;category&quot;</span>&lt;<span class="token string">&quot;construction&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;nature&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;equipment&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;items&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;none&quot;</span>&gt;
        bool <span class="token string">&quot;is_hidden_in_commands&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-loot-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-loot-1-19-10-block" aria-hidden="true">#</a> minecraft:loot 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>loot <span class="token property">&quot;minecraft:loot&quot;</span><span class="token operator">:</span>
IdentifierString
object
<span class="token punctuation">{</span>
    IdentifierString <span class="token string">&quot;loot_table&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u7528<code>loot_table</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>loot <span class="token property">&quot;minecraft:loot&quot;</span><span class="token operator">:</span>
IdentifierString
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-flammable-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-flammable-1-19-10-block" aria-hidden="true">#</a> minecraft:flammable 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-1" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-1" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>flammable <span class="token string">&quot;minecraft:flammable&quot;</span>
<span class="token punctuation">{</span>
    int <span class="token string">&quot;flame_odds&quot;</span>&lt;<span class="token number">0</span>-*&gt;
    int <span class="token string">&quot;burn_odds&quot;</span>&lt;<span class="token number">0</span>-*&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-1" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-1" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u7528<code>catch_chance_modifier</code>\u7684\u503C\u66FF\u6362<code>flame_odds</code>\uFF0C\u7528<code>destroy_chance_modifier</code>\u7684\u503C\u66FF\u6362<code>burn_odds</code>\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>flammable <span class="token string">&quot;minecraft:flammable&quot;</span>
<span class="token punctuation">{</span>
    int <span class="token string">&quot;catch_chance_modifier&quot;</span>&lt;<span class="token number">0</span>-*&gt;
    int <span class="token string">&quot;destroy_chance_modifier&quot;</span>&lt;<span class="token number">0</span>-*&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-pick-collision-1-18-block" tabindex="-1"><a class="header-anchor" href="#minecraft-pick-collision-1-18-block" aria-hidden="true">#</a> minecraft:pick_collision 1.18 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-3" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-3" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.17.99</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_aim_collision <span class="token string">&quot;minecraft:pick_collision&quot;</span>
bool
object
<span class="token punctuation">{</span>
    bool <span class="token string">&quot;enabled&quot;</span>
    vec3 <span class="token string">&quot;size&quot;</span>
    vec3 <span class="token string">&quot;origin&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>vec3<span class="token operator">:</span>
array<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>
<span class="token punctuation">{</span>
    float <span class="token string">&quot;&lt;any array element&gt;&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-18-0-1-19-9" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-18-0-1-19-9" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.18.0..1.19.9</h3><p>\u91CD\u547D\u540D\u4E3A<code>minecraft:aim_collision</code></p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_aim_collision <span class="token string">&quot;minecraft:aim_collision&quot;</span>
bool
object
<span class="token punctuation">{</span>
    bool <span class="token string">&quot;enabled&quot;</span>
    vec3 <span class="token string">&quot;size&quot;</span>
    vec3 <span class="token string">&quot;origin&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-aim-collision-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-aim-collision-1-19-10-block" aria-hidden="true">#</a> minecraft:aim_collision 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-18-0-1-19-9" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-18-0-1-19-9" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.18.0..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_aim_collision <span class="token string">&quot;minecraft:aim_collision&quot;</span>
bool
object
<span class="token punctuation">{</span>
    bool <span class="token string">&quot;enabled&quot;</span>
    vec3 <span class="token string">&quot;size&quot;</span>
    vec3 <span class="token string">&quot;origin&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-2" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-2" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u5982\u679C\u5B58\u5728<code>enabled</code>\uFF0C\u7528<code>enabled</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_aim_collision <span class="token string">&quot;minecraft:aim_collision&quot;</span>
bool
object
<span class="token punctuation">{</span>
    vec3 <span class="token string">&quot;size&quot;</span>
    vec3 <span class="token string">&quot;origin&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-aim-collision-1-19-20-block" tabindex="-1"><a class="header-anchor" href="#minecraft-aim-collision-1-19-20-block" aria-hidden="true">#</a> minecraft:aim_collision 1.19.20 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-19" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-19" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.19.10..1.19.19</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_aim_collision <span class="token string">&quot;minecraft:aim_collision&quot;</span>
bool
object
<span class="token punctuation">{</span>
    vec3 <span class="token string">&quot;size&quot;</span>
    vec3 <span class="token string">&quot;origin&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-20" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-20" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.20..</h3><p>\u91CD\u547D\u540D\u4E3A<code>minecraft:selection_box</code>\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>selection_box <span class="token string">&quot;minecraft:selection_box&quot;</span>
bool
object
<span class="token punctuation">{</span>
    vec3 <span class="token string">&quot;size&quot;</span>
    vec3 <span class="token string">&quot;origin&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-entity-collision-1-18-block" tabindex="-1"><a class="header-anchor" href="#minecraft-entity-collision-1-18-block" aria-hidden="true">#</a> minecraft:entity_collision 1.18 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-4" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-4" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.17.99</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_collision <span class="token string">&quot;minecraft:entity_collision&quot;</span>
bool
object
<span class="token punctuation">{</span>
    bool <span class="token string">&quot;enabled&quot;</span>
    vec3 <span class="token string">&quot;size&quot;</span>
    vec3 <span class="token string">&quot;origin&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-18-0-1-19-9-1" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-18-0-1-19-9-1" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.18.0..1.19.9</h3><p>\u91CD\u547D\u540D\u4E3A<code>minecraft:block_collision</code></p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_collision <span class="token string">&quot;minecraft:block_collision&quot;</span>
bool
object
<span class="token punctuation">{</span>
    bool <span class="token string">&quot;enabled&quot;</span>
    vec3 <span class="token string">&quot;size&quot;</span>
    vec3 <span class="token string">&quot;origin&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-block-collision-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-block-collision-1-19-10-block" aria-hidden="true">#</a> minecraft:block_collision 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-18-0-1-19-9-1" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-18-0-1-19-9-1" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.18.0..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_collision <span class="token string">&quot;minecraft:block_collision&quot;</span>
bool
object
<span class="token punctuation">{</span>
    bool <span class="token string">&quot;enabled&quot;</span>
    vec3 <span class="token string">&quot;size&quot;</span>
    vec3 <span class="token string">&quot;origin&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-3" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-3" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u5982\u679C\u5B58\u5728<code>enabled</code>\uFF0C\u7528<code>enabled</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\uFF0C\u5E76\u91CD\u547D\u540D\u4E3A<code>minecraft:collision_box</code>\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_collision <span class="token string">&quot;minecraft:collision_box&quot;</span>
bool
object
<span class="token punctuation">{</span>
    vec3 <span class="token string">&quot;size&quot;</span>
    vec3 <span class="token string">&quot;origin&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-breathability-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-breathability-1-19-10-block" aria-hidden="true">#</a> minecraft:breathability 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-2" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-2" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_breathability <span class="token property">&quot;minecraft:breathability&quot;</span><span class="token operator">:</span>
enumerated_value&lt;<span class="token string">&quot;solid&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;air&quot;</span>&gt;
object
<span class="token punctuation">{</span>
    enumerated_value <span class="token string">&quot;breathing_type&quot;</span>&lt;<span class="token string">&quot;solid&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;air&quot;</span>&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-4" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-4" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u7528<code>breathing_type</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_breathability <span class="token property">&quot;minecraft:breathability&quot;</span><span class="token operator">:</span>
enumerated_value&lt;<span class="token string">&quot;solid&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;air&quot;</span>&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-creative-category-1-19-20-block" tabindex="-1"><a class="header-anchor" href="#minecraft-creative-category-1-19-20-block" aria-hidden="true">#</a> minecraft:creative_category 1.19.20 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-19" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-19" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.19</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>creativeGroup <span class="token property">&quot;minecraft:creative_category&quot;</span><span class="token operator">:</span>
object
<span class="token punctuation">{</span>
    LocIdString <span class="token string">&quot;group&quot;</span>
    enumerated_value <span class="token string">&quot;category&quot;</span>&lt;<span class="token string">&quot;all&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;construction&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;nature&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;equipment&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;items&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;commands&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;none&quot;</span>&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-20-1" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-20-1" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.20..</h3><p>\u5220\u9664\u6574\u4E2A\u5BF9\u8C61\uFF0C\u5E76\u5C06<code>group</code>\u548C<code>category</code>\u7684\u503C\u8D4B\u7ED9\u65B9\u5757\u63CF\u8FF0\u7EC4\u4EF6\u4E0B\u7684<code>menu_category</code>\u4E0B\u7684<code>group</code>\u548C<code>category</code>\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>blockDescription <span class="token string">&quot;description&quot;</span>
<span class="token punctuation">{</span>
    object <span class="token string">&quot;menu_category&quot;</span>
    <span class="token punctuation">{</span>
        LocIdString <span class="token string">&quot;group&quot;</span>
        enumerated_value <span class="token string">&quot;category&quot;</span>&lt;<span class="token string">&quot;all&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;construction&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;nature&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;equipment&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;items&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;commands&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;none&quot;</span>&gt;
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-destroy-time-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-destroy-time-1-19-10-block" aria-hidden="true">#</a> minecraft:destroy_time 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-3" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-3" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_destroy_time <span class="token property">&quot;minecraft:destroy_time&quot;</span><span class="token operator">:</span>
float&lt;<span class="token number">0.0</span>-*&gt;
object
<span class="token punctuation">{</span>
    float <span class="token string">&quot;destroy_time&quot;</span>&lt;<span class="token number">0.0</span>-*&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-5" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-5" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u7528<code>destroy_time</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_destroy_time <span class="token property">&quot;minecraft:destroy_time&quot;</span><span class="token operator">:</span>
float&lt;<span class="token number">0.0</span>-*&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-destroy-time-1-19-20-block" tabindex="-1"><a class="header-anchor" href="#minecraft-destroy-time-1-19-20-block" aria-hidden="true">#</a> minecraft:destroy_time 1.19.20 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-19-1" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-19-1" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.19.10..1.19.19</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_destroy_time <span class="token property">&quot;minecraft:destroy_time&quot;</span><span class="token operator">:</span>
float&lt;<span class="token number">0.0</span>-*&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-20-2" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-20-2" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.20..</h3><p>\u7528\u6574\u4E2A\u5BF9\u8C61\u7684\u503C\u66FF\u6362<code>seconds_to_destroy</code>\u5B57\u6BB5\uFF0C\u91CD\u547D\u540D\u4E3A<code>minecraft:destructible_by_mining</code>\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_destructible_by_mining <span class="token property">&quot;minecraft:destructible_by_mining&quot;</span><span class="token operator">:</span>
bool
object
<span class="token punctuation">{</span>
    float <span class="token string">&quot;seconds_to_destroy&quot;</span>&lt;<span class="token number">0.0</span>-*&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-explosion-resistance-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-explosion-resistance-1-19-10-block" aria-hidden="true">#</a> minecraft:explosion_resistance 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-4" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-4" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>minecraft<span class="token operator">:</span>explosion_resistance <span class="token property">&quot;minecraft:explosion_resistance&quot;</span><span class="token operator">:</span>
float&lt;<span class="token number">0.0</span>-*&gt;
object
<span class="token punctuation">{</span>
    float <span class="token string">&quot;resistance&quot;</span>&lt;<span class="token number">0.0</span>-*&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-6" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-6" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u7528<code>resistance</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>minecraft<span class="token operator">:</span>explosion_resistance <span class="token property">&quot;minecraft:explosion_resistance&quot;</span><span class="token operator">:</span>
float&lt;<span class="token number">0.0</span>-*&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-explosion-resistance-1-19-20-block" tabindex="-1"><a class="header-anchor" href="#minecraft-explosion-resistance-1-19-20-block" aria-hidden="true">#</a> minecraft:explosion_resistance 1.19.20 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-19-2" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-19-2" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.19.10..1.19.19</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>minecraft<span class="token operator">:</span>explosion_resistance <span class="token property">&quot;minecraft:explosion_resistance&quot;</span><span class="token operator">:</span>
float&lt;<span class="token number">0.0</span>-*&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-20-3" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-20-3" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.20..</h3><p>\u7528\u6574\u4E2A\u5BF9\u8C61\u7684\u503C\u66FF\u6362<code>explosion_resistance</code>\u5B57\u6BB5\uFF0C\u91CD\u547D\u540D\u4E3A<code>minecraft:destructible_by_explosion</code>\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_destructible_by_explosion <span class="token property">&quot;minecraft:destructible_by_explosion&quot;</span><span class="token operator">:</span>
bool
object
<span class="token punctuation">{</span>
    float <span class="token string">&quot;explosion_resistance&quot;</span>&lt;<span class="token number">0.0</span>-*&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-display-name-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-display-name-1-19-10-block" aria-hidden="true">#</a> minecraft:display_name 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-5" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-5" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_display_name <span class="token property">&quot;minecraft:display_name&quot;</span><span class="token operator">:</span>
LocIdString
object
<span class="token punctuation">{</span>
    LocIdString <span class="token string">&quot;display_name&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-7" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-7" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u7528<code>display_name</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_display_name <span class="token property">&quot;minecraft:display_name&quot;</span><span class="token operator">:</span>
LocIdString
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-display-name-1-19-20-block" tabindex="-1"><a class="header-anchor" href="#minecraft-display-name-1-19-20-block" aria-hidden="true">#</a> minecraft:display_name 1.19.20 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-19-3" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-19-3" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.19.10..1.19.19</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_display_name <span class="token property">&quot;minecraft:display_name&quot;</span><span class="token operator">:</span>
LocIdString
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-20-4" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-20-4" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.20..</h3><p>\u5C06\u5BF9\u8C61\u7684\u503C\u4EE3\u5165<code>tile.%s.name</code>\u540E\u8D4B\u7ED9\u81EA\u5DF1\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_display_name <span class="token property">&quot;minecraft:display_name&quot;</span><span class="token operator">:</span>
LocIdString
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-friction-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-friction-1-19-10-block" aria-hidden="true">#</a> minecraft:friction 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-6" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-6" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_friction <span class="token string">&quot;minecraft:friction&quot;</span>
float&lt;<span class="token number">0.1000000014901161</span><span class="token number">-1.0</span>&gt;
object
<span class="token punctuation">{</span>
    float <span class="token string">&quot;friction&quot;</span>&lt;<span class="token number">0.1000000014901161</span><span class="token number">-1.0</span>&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-8" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-8" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u7528<code>friction</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_friction <span class="token string">&quot;minecraft:friction&quot;</span>
float&lt;<span class="token number">0.1000000014901161</span><span class="token number">-1.0</span>&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-friction-1-19-20-block" tabindex="-1"><a class="header-anchor" href="#minecraft-friction-1-19-20-block" aria-hidden="true">#</a> minecraft:friction 1.19.20 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-20" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-20" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.19.10..1.19.20</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_friction <span class="token string">&quot;minecraft:friction&quot;</span>
float&lt;<span class="token number">0.1000000014901161</span><span class="token number">-1.0</span>&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-20-5" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-20-5" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.20..</h3><p>\u53D6\u75281\u51CF\u7684\u5DEE\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_friction <span class="token string">&quot;minecraft:friction&quot;</span>
float&lt;<span class="token number">0.0</span><span class="token number">-0.8999999761581421</span>&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-geometry-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-geometry-1-19-10-block" aria-hidden="true">#</a> minecraft:geometry 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-7" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-7" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_geometry <span class="token string">&quot;minecraft:geometry&quot;</span>
IdentifierString
object
<span class="token punctuation">{</span>
    IdentifierString <span class="token string">&quot;geometry&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-9" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-9" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u7528<code>geometry</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_geometry <span class="token string">&quot;minecraft:geometry&quot;</span>
IdentifierString
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-block-light-absorption-1-18-block" tabindex="-1"><a class="header-anchor" href="#minecraft-block-light-absorption-1-18-block" aria-hidden="true">#</a> minecraft:block_light_absorption 1.18 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-5" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-5" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.17.99</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_light_filter <span class="token string">&quot;minecraft:block_light_absorption&quot;</span>
float&lt;<span class="token number">0.0</span><span class="token number">-16.0</span>&gt;
object
<span class="token punctuation">{</span>
    float <span class="token string">&quot;filter_level&quot;</span>&lt;<span class="token number">0.0</span><span class="token number">-16.0</span>&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-18-0-1-19-9-2" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-18-0-1-19-9-2" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.18.0..1.19.9</h3><p>\u66F4\u6539<code>filter_level</code>\u7684\u503C\uFF0C\u91CD\u547D\u540D\u7EC4\u4EF6\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_light_filter <span class="token string">&quot;minecraft:block_light_filter&quot;</span>
brightness
object
<span class="token punctuation">{</span>
    brightness <span class="token string">&quot;filter_level&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>brightness<span class="token operator">:</span>
int&lt;<span class="token number">0</span><span class="token number">-15</span>&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-block-light-filter-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-block-light-filter-1-19-10-block" aria-hidden="true">#</a> minecraft:block_light_filter 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-18-0-1-19-9-2" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-18-0-1-19-9-2" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.18.0..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_light_filter <span class="token string">&quot;minecraft:block_light_filter&quot;</span>
brightness
object
<span class="token punctuation">{</span>
    brightness <span class="token string">&quot;filter_level&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-10" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-10" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u7528<code>filter_level</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_light_filter <span class="token string">&quot;minecraft:block_light_filter&quot;</span>
brightness
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-block-light-filter-1-19-40-block" tabindex="-1"><a class="header-anchor" href="#minecraft-block-light-filter-1-19-40-block" aria-hidden="true">#</a> minecraft:block_light_filter 1.19.40 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-39" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-19-10-1-19-39" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.19.10..1.19.39</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_light_filter <span class="token string">&quot;minecraft:block_light_filter&quot;</span>
brightness
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-40-1" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-40-1" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.40..</h3><p>\u91CD\u547D\u540D\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>light_dampening <span class="token string">&quot;minecraft:light_dampening&quot;</span>
brightness
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-block-light-emission-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-block-light-emission-1-19-10-block" aria-hidden="true">#</a> minecraft:block_light_emission 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-8" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-8" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_light_emission <span class="token string">&quot;minecraft:block_light_emission&quot;</span>
float&lt;<span class="token number">0.0</span><span class="token number">-1.0</span>&gt;
object
<span class="token punctuation">{</span>
    float <span class="token string">&quot;emission&quot;</span>&lt;<span class="token number">0.0</span><span class="token number">-1.0</span>&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-11" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-11" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u7528<code>emission</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_light_emission <span class="token string">&quot;minecraft:block_light_emission&quot;</span>
float&lt;<span class="token number">0.0</span><span class="token number">-1.0</span>&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-map-color-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-map-color-1-19-10-block" aria-hidden="true">#</a> minecraft:map_color 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-9" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-9" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_map_color <span class="token string">&quot;minecraft:map_color&quot;</span>
Color255RGB
object
<span class="token punctuation">{</span>
    Color255RGB <span class="token string">&quot;map_color&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>Color255RGB<span class="token operator">:</span>
string&lt;^#<span class="token punctuation">[</span>a-fA-F0<span class="token number">-9</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">}</span>$&gt;
array&lt;<span class="token number">3</span>&gt;
<span class="token punctuation">{</span>
    int <span class="token string">&quot;&lt;any array element&gt;&quot;</span>&lt;<span class="token number">0</span><span class="token number">-255</span>&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-12" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-12" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u7528<code>map_color</code>\u7684\u503C\u66FF\u6362\u6574\u4E2A\u5BF9\u8C61\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>block_map_color <span class="token string">&quot;minecraft:map_color&quot;</span>
Color255RGB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-part-visibility-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-part-visibility-1-19-10-block" aria-hidden="true">#</a> minecraft:part_visibility 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-10" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-10" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>part_visibility <span class="token string">&quot;minecraft:part_visibility&quot;</span>
<span class="token punctuation">{</span>
    object <span class="token string">&quot;rules&quot;</span>
    <span class="token punctuation">{</span>
        expression_node <span class="token string">&quot;&lt;identifier&gt;&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-13" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-13" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u5C06<code>rules</code>\u91CD\u547D\u540D\u4E3A<code>conditions</code>\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>part_visibility <span class="token string">&quot;minecraft:part_visibility&quot;</span>
<span class="token punctuation">{</span>
    object <span class="token string">&quot;conditions&quot;</span>
    <span class="token punctuation">{</span>
        expression_node <span class="token string">&quot;&lt;identifier&gt;&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-ticking-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-ticking-1-19-10-block" aria-hidden="true">#</a> minecraft:ticking 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-11" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-19-9-11" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>queued_ticking <span class="token string">&quot;minecraft:ticking&quot;</span>
<span class="token punctuation">{</span>
    trigger <span class="token string">&quot;on_tick&quot;</span>
    array <span class="token string">&quot;range&quot;</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        float <span class="token string">&quot;&lt;any array element&gt;&quot;</span>
    <span class="token punctuation">}</span>
    bool <span class="token string">&quot;looping&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-14" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-14" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u5C06<code>range</code>\u4ECE\u4EE5\u79D2\u4E3A\u5355\u4F4D\u53D8\u4E3A\u4EE5\u523B\u4E3A\u5355\u4F4D\uFF0C\u7136\u540E\u91CD\u547D\u540D\u4E3A<code>interval_range</code>\uFF0C\u5E76\u6DFB\u52A0\u6570\u5B57\u9650\u5236\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>queued_ticking <span class="token string">&quot;minecraft:ticking&quot;</span>
<span class="token punctuation">{</span>
    trigger <span class="token string">&quot;on_tick&quot;</span>
    array <span class="token string">&quot;interval_range&quot;</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        float <span class="token string">&quot;&lt;any array element&gt;&quot;</span>&lt;<span class="token number">0.0</span>-*&gt;
    <span class="token punctuation">}</span>
    bool <span class="token string">&quot;looping&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-crafting-table-1-18-0-block" tabindex="-1"><a class="header-anchor" href="#minecraft-crafting-table-1-18-0-block" aria-hidden="true">#</a> minecraft:crafting_table 1.18.0 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-6" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-16-100-1-17-99-6" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.16.100..1.17.99</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>crafting_table <span class="token string">&quot;minecraft:crafting_table&quot;</span>
<span class="token punctuation">{</span>
    string <span class="token string">&quot;custom_description&quot;</span>
    array <span class="token string">&quot;crafting_tags&quot;</span><span class="token punctuation">[</span><span class="token number">64</span><span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        string <span class="token string">&quot;&lt;any array element&gt;&quot;</span>
    <span class="token punctuation">}</span>
    int <span class="token string">&quot;grid_size&quot;</span>&lt;<span class="token number">3</span>&gt;
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-18-0-1-19-9-3" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-18-0-1-19-9-3" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.18.0..1.19.9</h3><p>\u5220\u9664<code>grid_size</code>\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>crafting_table <span class="token string">&quot;minecraft:crafting_table&quot;</span>
<span class="token punctuation">{</span>
    string <span class="token string">&quot;custom_description&quot;</span>
    array <span class="token string">&quot;crafting_tags&quot;</span><span class="token punctuation">[</span><span class="token number">64</span><span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        string <span class="token string">&quot;&lt;any array element&gt;&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minecraft-crafting-table-1-19-10-block" tabindex="-1"><a class="header-anchor" href="#minecraft-crafting-table-1-19-10-block" aria-hidden="true">#</a> minecraft:crafting_table 1.19.10 block</h2><h3 id="\u5148\u524D\u6A21\u5F0F-1-18-0-1-19-9-3" tabindex="-1"><a class="header-anchor" href="#\u5148\u524D\u6A21\u5F0F-1-18-0-1-19-9-3" aria-hidden="true">#</a> \u5148\u524D\u6A21\u5F0F 1.18.0..1.19.9</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>crafting_table <span class="token string">&quot;minecraft:crafting_table&quot;</span>
<span class="token punctuation">{</span>
    string <span class="token string">&quot;custom_description&quot;</span>
    array <span class="token string">&quot;crafting_tags&quot;</span><span class="token punctuation">[</span><span class="token number">64</span><span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        string <span class="token string">&quot;&lt;any array element&gt;&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5347\u7EA7\u6210\u4E3A-1-19-10-15" tabindex="-1"><a class="header-anchor" href="#\u5347\u7EA7\u6210\u4E3A-1-19-10-15" aria-hidden="true">#</a> \u5347\u7EA7\u6210\u4E3A 1.19.10..</h3><p>\u5C06<code>custom_description</code>\u91CD\u547D\u540D\u4E3A<code>table_name</code>\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>crafting_table <span class="token string">&quot;minecraft:crafting_table&quot;</span>
<span class="token punctuation">{</span>
    string <span class="token string">&quot;table_name&quot;</span>
    array <span class="token string">&quot;crafting_tags&quot;</span><span class="token punctuation">[</span><span class="token number">64</span><span class="token punctuation">]</span>
    <span class="token punctuation">{</span>
        string <span class="token string">&quot;&lt;any array element&gt;&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,201),o=[t];function l(c,r){return s(),a("div",null,o)}var u=n(i,[["render",l],["__file","cereal_upgrade.html.vue"]]);export{u as default};
