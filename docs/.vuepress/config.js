const { defaultTheme } = require('@vuepress/theme-default');

module.exports = {
    base: '/bedrock-addon-tutorial/',
    lang: 'zh-CN',
    title: '附加包教程',
    description: 'Minecraft基岩版附加包教程',
    head: [['link', { rel: 'icon', href: '/bedrock-addon-tutorial/images/favicon.png' }]],
    
    theme: defaultTheme({
        logo: '/images/logo.png',
        repo: 'MiemieMethod/bedrock-addon-tutorial',
        // navbar
        navbar: [
            {
              text: '首页',
              link: '/',
            },
            {
              text: '入门教程',
              activeMatch: '^/primer/',
              children: [
                {
                  text: '第0章 认识JSON',
                  children: [
                    '/primer/sec0.1.md',
                  ],
                },
                {
                  text: '第1章 制作第一个附加包',
                  children: [
                    '/primer/sec1.1.md',
                    '/primer/sec1.2.md',
                    '/primer/sec1.3.md',
                    '/primer/sec1.4.md',
                  ],
                },
                {
                  text: '第2章 附加包的基本功能',
                  children: [
                    '/primer/sec2.1.md',
                    '/primer/sec2.2.md',
                    '/primer/sec2.3.md',
                    '/primer/sec2.4.md',
                  ],
                },
                {
                  text: '第3章 修改原版',
                  children: [
                    '/primer/sec3.1.md',
                    '/primer/sec3.2.md',
                    '/primer/sec3.3.md',
                  ],
                },
                {
                  text: '第4章 自定义物品',
                  children: [
                    '/primer/sec4.1.md',
                    '/primer/sec4.2.md',
                    '/primer/sec4.3.md',
                  ],
                },
                {
                  text: '第5章 自定义方块',
                  children: [
                    '/primer/sec5.1.md',
                    '/primer/sec5.2.md',
                    '/primer/sec5.3.md',
                  ],
                },
                {
                  text: '第6章 自定义实体',
                  children: [
                    '/primer/sec6.1.md',
                    '/primer/sec6.2.md',
                    '/primer/sec6.3.md',
                    '/primer/sec6.4.md',
                    '/primer/sec6.5.md',
                    '/primer/sec6.6.md',
                    '/primer/sec6.7.md',
                  ],
                },
                {
                  text: '第7章 自定义粒子',
                  children: [
                    '/primer/sec7.1.md',
                    '/primer/sec7.2.md',
                    '/primer/sec7.3.md',
                  ],
                },
                {
                  text: '第8章 自定义世界生成',
                  children: [
                    '/primer/sec8.1.md',
                    '/primer/sec8.2.md',
                    '/primer/sec8.3.md',
                  ],
                },
                {
                  text: '第9章 命令系统',
                  children: [
                    '/primer/sec9.1.md',
                    '/primer/sec9.2.md',
                    '/primer/sec9.3.md',
                  ],
                },
                {
                  text: '第10章 着色器',
                  children: [
                    '/primer/sec10.1.md',
                    '/primer/sec10.2.md',
                    '/primer/sec10.3.md',
                  ],
                },
                {
                  text: '第11章 UI',
                  children: [
                    '/primer/sec11.1.md',
                    '/primer/sec11.2.md',
                    '/primer/sec11.3.md',
                  ],
                },
                {
                  text: '第12章 自定义皮肤',
                  children: [
                    '/primer/sec12.1.md',
                    '/primer/sec12.2.md',
                  ],
                },
                {
                  text: '第13章 编辑世界',
                  children: [
                    '/primer/sec13.1.md',
                    '/primer/sec13.2.md',
                    '/primer/sec13.3.md',
                  ],
                },
                {
                  text: '第14章 发布作品',
                  children: [
                    '/primer/sec14.1.md',
                    '/primer/sec14.2.md',
                    '/primer/sec14.3.md',
                  ],
                },
              ],
            },
            {
              text: '进阶教程',
              children: [
                {
                  text: '第0章 认识JS',
                  children: [
                    '/advanced/sec0.1.md',
                    '/advanced/sec0.2.md',
                    '/advanced/sec0.3.md',
                    '/advanced/sec0.4.md',
                    '/advanced/sec0.5.md',
                    '/advanced/sec0.6.md',
                    '/advanced/sec0.7.md',
                    '/advanced/sec0.8.md',
                    '/advanced/sec0.9.md',
                    '/advanced/sec0.10.md',
                    '/advanced/sec0.11.md',
                    '/advanced/sec0.12.md',
                    '/advanced/sec0.13.md',
                    '/advanced/sec0.14.md',
                    '/advanced/sec0.15.md',
                  ],
                },
                {
                  text: '第1章 脚本使能的附加包',
                  children: [
                    '/advanced/sec1.1.md',
                    '/advanced/sec1.2.md',
                    '/advanced/sec1.3.md',
                    '/advanced/sec1.4.md',
                    '/advanced/sec1.5.md',
                  ],
                },
                {
                  text: '第2章 进阶的数据驱动的附加包',
                  children: [
                    '/advanced/sec2.1.md',
                    '/advanced/sec2.2.md',
                    '/advanced/sec2.3.md',
                    '/advanced/sec2.4.md',
                  ],
                },
                {
                  text: '第3章 数据与脚本的联动',
                  children: [
                    '/advanced/sec3.1.md',
                  ],
                },
              ],
            },
            {
              text: '登峰教程',
              children: [
                /*
                {
                  text: '深入',
                  children: [
                    '/zh/advanced/architecture.md',
                    '/zh/advanced/plugin.md',
                    '/zh/advanced/theme.md',
                    {
                      text: 'Cookbook',
                      link: '/zh/advanced/cookbook/',
                    },
                  ],
                },
                {
                  text: '其他资源',
                  children: [
                    '/zh/contributing.md',
                  ],
                },
              */
              ],
            },
            {
              text: '开发Wiki',
              link: 'https://wiki.bedev.cn/',
            },
        ],
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        // sidebar
        sidebar: {
            '/primer/': [
                {
                  text: '第0章 认识JSON',
                  children: [
                    '/primer/sec0.1.md',
                  ],
                },
                {
                  text: '第1章 制作第一个附加包',
                  children: [
                    '/primer/sec1.1.md',
                    '/primer/sec1.2.md',
                    '/primer/sec1.3.md',
                    '/primer/sec1.4.md',
                  ],
                },
                {
                  text: '第2章 附加包的基本功能',
                  children: [
                    '/primer/sec2.1.md',
                    '/primer/sec2.2.md',
                    '/primer/sec2.3.md',
                    '/primer/sec2.4.md',
                  ],
                },
                {
                  text: '第3章 修改原版',
                  children: [
                    '/primer/sec3.1.md',
                    '/primer/sec3.2.md',
                    '/primer/sec3.3.md',
                  ],
                },
                {
                  text: '第4章 自定义物品',
                  children: [
                    '/primer/sec4.1.md',
                    '/primer/sec4.2.md',
                    '/primer/sec4.3.md',
                  ],
                },
                {
                  text: '第5章 自定义方块',
                  children: [
                    '/primer/sec5.1.md',
                    '/primer/sec5.2.md',
                    '/primer/sec5.3.md',
                  ],
                },
                {
                  text: '第6章 自定义实体',
                  children: [
                    '/primer/sec6.1.md',
                    '/primer/sec6.2.md',
                    '/primer/sec6.3.md',
                    '/primer/sec6.4.md',
                    '/primer/sec6.5.md',
                    '/primer/sec6.6.md',
                    '/primer/sec6.7.md',
                  ],
                },
                {
                  text: '第7章 自定义粒子',
                  children: [
                    '/primer/sec7.1.md',
                    '/primer/sec7.2.md',
                    '/primer/sec7.3.md',
                  ],
                },
                {
                  text: '第8章 自定义世界生成',
                  children: [
                    '/primer/sec8.1.md',
                    '/primer/sec8.2.md',
                    '/primer/sec8.3.md',
                  ],
                },
                {
                  text: '第9章 命令系统',
                  children: [
                    '/primer/sec9.1.md',
                    '/primer/sec9.2.md',
                    '/primer/sec9.3.md',
                  ],
                },
                {
                  text: '第10章 着色器',
                  children: [
                    '/primer/sec10.1.md',
                    '/primer/sec10.2.md',
                    '/primer/sec10.3.md',
                  ],
                },
                {
                  text: '第11章 UI',
                  children: [
                    '/primer/sec11.1.md',
                    '/primer/sec11.2.md',
                    '/primer/sec11.3.md',
                  ],
                },
                {
                  text: '第12章 自定义皮肤',
                  children: [
                    '/primer/sec12.1.md',
                    '/primer/sec12.2.md',
                  ],
                },
                {
                  text: '第13章 编辑世界',
                  children: [
                    '/primer/sec13.1.md',
                    '/primer/sec13.2.md',
                    '/primer/sec13.3.md',
                  ],
                },
                {
                  text: '第14章 发布作品',
                  children: [
                    '/primer/sec14.1.md',
                    '/primer/sec14.2.md',
                    '/primer/sec14.3.md',
                  ],
                },
            ],
            '/advanced/': [
                {
                  text: '第0章 认识JS',
                  children: [
                    '/advanced/sec0.1.md',
                    '/advanced/sec0.2.md',
                    '/advanced/sec0.3.md',
                    '/advanced/sec0.4.md',
                    '/advanced/sec0.5.md',
                    '/advanced/sec0.6.md',
                    '/advanced/sec0.7.md',
                    '/advanced/sec0.8.md',
                    '/advanced/sec0.9.md',
                    '/advanced/sec0.10.md',
                    '/advanced/sec0.11.md',
                    '/advanced/sec0.12.md',
                    '/advanced/sec0.13.md',
                    '/advanced/sec0.14.md',
                    '/advanced/sec0.15.md',
                  ],
                },
                {
                  text: '第1章 脚本使能的附加包',
                  children: [
                    '/advanced/sec1.1.md',
                    '/advanced/sec1.2.md',
                    '/advanced/sec1.3.md',
                    '/advanced/sec1.4.md',
                    '/advanced/sec1.5.md',
                  ],
                },
                {
                  text: '第2章 进阶的数据驱动的附加包',
                  children: [
                    '/advanced/sec2.1.md',
                    '/advanced/sec2.2.md',
                    '/advanced/sec2.3.md',
                    '/advanced/sec2.4.md',
                  ],
                },
                {
                  text: '第3章 数据与脚本的联动',
                  children: [
                    '/advanced/sec3.1.md',
                  ],
                },
            ],
            '/peak/': [
              /*{
                text: 'VuePress 参考',
                collapsible: true,
                children: [
                  '/zh/reference/cli.md',
                  '/zh/reference/config.md',
                  '/zh/reference/frontmatter.md',
                  '/zh/reference/components.md',
                  '/zh/reference/plugin-api.md',
                  '/zh/reference/theme-api.md',
                  '/zh/reference/client-api.md',
                  '/zh/reference/node-api.md',
                ],
              },
              {
                text: '打包工具参考',
                collapsible: true,
                children: [
                  '/zh/reference/bundler/vite.md',
                  '/zh/reference/bundler/webpack.md',
                ],
              },
              {
                text: '默认主题参考',
                collapsible: true,
                children: [
                  '/zh/reference/default-theme/config.md',
                  '/zh/reference/default-theme/frontmatter.md',
                  '/zh/reference/default-theme/components.md',
                  '/zh/reference/default-theme/markdown.md',
                  '/zh/reference/default-theme/styles.md',
                  '/zh/reference/default-theme/extending.md',
                ],
              },
              {
                text: '官方插件参考',
                collapsible: true,
                children: [
                  {
                    text: '常用功能',
                    children: [
                      '/zh/reference/plugin/back-to-top.md',
                      '/zh/reference/plugin/container.md',
                      '/zh/reference/plugin/external-link-icon.md',
                      '/zh/reference/plugin/google-analytics.md',
                      '/zh/reference/plugin/medium-zoom.md',
                      '/zh/reference/plugin/nprogress.md',
                      '/zh/reference/plugin/register-components.md',
                    ],
                  },
                  {
                    text: '内容搜索',
                    children: [
                      '/zh/reference/plugin/docsearch.md',
                      '/zh/reference/plugin/search.md',
                    ],
                  },
                  {
                    text: 'PWA',
                    children: [
                      '/zh/reference/plugin/pwa.md',
                      '/zh/reference/plugin/pwa-popup.md',
                    ],
                  },
                  {
                    text: '语法高亮',
                    children: [
                      '/zh/reference/plugin/prismjs.md',
                      '/zh/reference/plugin/shiki.md',
                    ],
                  },
                  {
                    text: '主题开发',
                    children: [
                      '/zh/reference/plugin/active-header-links.md',
                      '/zh/reference/plugin/git.md',
                      '/zh/reference/plugin/palette.md',
                      '/zh/reference/plugin/theme-data.md',
                      '/zh/reference/plugin/toc.md',
                    ],
                  },
                ],
              },*/
            ],
        },
        // page meta
        editLinkText: '在GitHub上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个404页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleDarkMode: '切换夜间模式',
        toggleSidebar: '切换侧边栏',
    }),
};