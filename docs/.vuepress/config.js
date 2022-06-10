const { defaultTheme } = require('@vuepress/theme-default');

module.exports = {
    base: '/bedrock-addon-tutorial/',
    lang: 'zh-CN',
    title: '附加包教程',
    description: 'Minecraft基岩版附加包教程',
    head: [['link', { rel: 'icon', href: '/bedrock-addon-tutorial/images/logo.png' }]],
    
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
              children: [
                /*
                {
                  text: 'VuePress',
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
                  text: '打包工具',
                  children: [
                    '/zh/reference/bundler/vite.md',
                    '/zh/reference/bundler/webpack.md',
                  ],
                },
                {
                  text: '默认主题',
                  children: [
                    '/zh/reference/default-theme/config.md',
                    '/zh/reference/default-theme/frontmatter.md',
                    '/zh/reference/default-theme/components.md',
                    '/zh/reference/default-theme/markdown.md',
                    '/zh/reference/default-theme/styles.md',
                    '/zh/reference/default-theme/extending.md',
                  ],
                },
              */
              ],
            },
            {
              text: '进阶教程',
              children: [
                /*
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
              */
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
              /*{
                text: '指南',
                children: [
                  '/zh/guide/README.md',
                  '/zh/guide/getting-started.md',
                  '/zh/guide/configuration.md',
                  '/zh/guide/page.md',
                  '/zh/guide/markdown.md',
                  '/zh/guide/assets.md',
                  '/zh/guide/i18n.md',
                  '/zh/guide/deployment.md',
                  '/zh/guide/theme.md',
                  '/zh/guide/plugin.md',
                  '/zh/guide/bundler.md',
                  '/zh/guide/migration.md',
                ],
              },*/
            ],
            '/advanced/': [
              /*{
                text: '深入',
                children: [
                  '/zh/advanced/architecture.md',
                  '/zh/advanced/plugin.md',
                  '/zh/advanced/theme.md',
                ],
              },
              {
                text: 'Cookbook',
                children: [
                  '/zh/advanced/cookbook/README.md',
                  '/zh/advanced/cookbook/usage-of-client-config.md',
                  '/zh/advanced/cookbook/adding-extra-pages.md',
                  '/zh/advanced/cookbook/making-a-theme-extendable.md',
                  '/zh/advanced/cookbook/passing-data-to-client-code.md',
                  '/zh/advanced/cookbook/markdown-and-vue-sfc.md',
                ],
              },*/
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