import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3';

const customElements = [
  'mjx-container', 'mjx-assistive-mml', 'math', 'maction', 'maligngroup',
  'malignmark', 'menclose', 'merror', 'mfenced', 'mfrac', 'mi', 'mlongdiv',
  'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow',
  'ms', 'mscarries', 'mscarry', 'mscarries', 'msgroup', 'mstack', 'mlongdiv',
  'msline', 'mstack', 'mspace', 'msqrt', 'msrow', 'mstack', 'mstack', 'mstyle',
  'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder',
  'munderover', 'semantics', 'math', 'mi', 'mn', 'mo', 'ms', 'mspace', 'mtext',
  'menclose', 'merror', 'mfenced', 'mfrac', 'mpadded', 'mphantom', 'mroot',
  'mrow', 'msqrt', 'mstyle', 'mmultiscripts', 'mover', 'mprescripts', 'msub',
  'msubsup', 'msup', 'munder', 'munderover', 'none', 'maligngroup',
  'malignmark', 'mtable', 'mtd', 'mtr', 'mlongdiv', 'mscarries', 'mscarry',
  'msgroup', 'msline', 'msrow', 'mstack', 'maction', 'semantics', 'annotation',
  'annotation-xml',
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hyperdrive",
  description: "Hyperdrive是基于零知识证明的跨链方案，亦可称为区块链的互操作协议，允许将代币(Token)或信息从一条区块链，转移到另外一条链上",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: '首页', link: '/' },
    // ],

    sidebar: [
      {
        text: '技术白皮书',
        items: [
          { text: '介绍', link: '/hyperdrive/introduction' },
          { text: '系统结构', link: '/hyperdrive/architecture' },
          { text: 'zkHyperspace', link: '/hyperdrive/zkhyperspace' },
          { text: '互操作性组件', link: '/hyperdrive/contracts' },
          { text: '安全设计', link: '/hyperdrive/security' },
          { text: '应用场景', link: '/hyperdrive/usecase' },
          { text: '总结', link: '/hyperdrive/conclusion' },
          { text: '未来', link: '/hyperdrive/future' },
        ]
      },
      {
        text: '生态白皮书',
        items: [
          { text: '市场情况', link: '/business/introduction' },
          { text: '代币经济学', link: '/business/tokenomic' },
          { text: '治理框架', link: '/business/governance' },
          { text: '未来发展', link: '/business/future' },
          // { text: 'FAQ', link: '/business/faq' },
        ]
      },
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },

  markdown: {
    config: (md) => {
      md.use(mathjax3);
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },
})
