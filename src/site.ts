export const site = {
  name: 'Realmroot',
  github: 'https://github.com/realmroot/realmroot',
  wallet: 'https://wallet.realmroot.dev',
  description: 'Turn existing OpenAPI services into secure, discoverable tools for AI agents.',
};

export type Locale = 'en' | 'zh-CN';

export const copy = {
  en: {
    lang: 'en',
    home: '/',
    nav: {
      product: 'Product',
      toolPlane: 'Tool plane',
      trust: 'Trust foundation',
      blog: 'Blog',
      docs: 'Docs',
      wallet: 'Wallet',
      github: 'View on GitHub',
    },
    footer: {
      statement: 'Every API, Agent-ready.',
      product: 'Products',
      resources: 'Resources',
      legal: 'Open source under Apache-2.0.',
    },
  },
  'zh-CN': {
    lang: 'zh-CN',
    home: '/zh-cn/',
    nav: {
      product: '产品',
      toolPlane: '工具平面',
      trust: '信任基础',
      blog: '博客',
      docs: '文档',
      wallet: '钱包',
      github: '在 GitHub 查看',
    },
    footer: {
      statement: '让每个 API，都能为 Agent 所用。',
      product: '产品',
      resources: '资源',
      legal: '基于 Apache-2.0 开源。',
    },
  },
} satisfies Record<Locale, unknown>;
