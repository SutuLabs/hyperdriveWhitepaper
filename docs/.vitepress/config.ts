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
  title: "Chia 重铸计划白皮书",
  description: "Fertilize Chia Blockchain to reborn, 重铸Chia经济模型，激活社区，再创辉煌",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: '首页', link: '/' },
    // ],

    sidebar: [
      {
        text: '白皮书',
        items: [
          { text: '介绍', link: '/introduction' },
          { text: '区块链网络', link: '/network' },
          { text: '智能合约', link: '/contract' },
          { text: '代币经济学', link: '/tokenomic' },
          { text: '未来发展', link: '/future' },
          { text: 'FAQ', link: '/faq' },
        ]
      }
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
