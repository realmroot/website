// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://realmroot.dev',
  integrations: [
    sitemap(),
    starlight({
      title: 'Realmroot',
      description: 'Turn existing OpenAPI services into secure, discoverable tools for AI agents.',
      favicon: '/assets/logo.png',
      logo: {
        src: './src/assets/logo.png',
        alt: 'Realmroot',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/realmroot/realmroot',
        },
      ],
      locales: {
        root: { label: 'English', lang: 'en' },
        'zh-cn': { label: '简体中文', lang: 'zh-CN' },
      },
      defaultLocale: 'root',
      customCss: ['./src/styles/starlight.css'],
      sidebar: [
        {
          label: 'Get started',
          translations: { 'zh-CN': '开始使用' },
          items: [
            {
              label: 'What is Realmroot?',
              translations: { 'zh-CN': 'Realmroot 是什么？' },
              slug: 'docs',
            },
            {
              label: 'How Realmroot works',
              translations: { 'zh-CN': 'Realmroot 如何工作' },
              slug: 'docs/getting-started/how-it-works',
            },
            {
              label: 'Quick start',
              translations: { 'zh-CN': '快速开始' },
              slug: 'docs/getting-started/quick-start',
            },
          ],
        },
        {
          label: 'Concepts',
          translations: { 'zh-CN': '核心概念' },
          items: [
            {
              label: 'The Agent Tool Plane',
              translations: { 'zh-CN': 'Agent Tool Plane' },
              slug: 'docs/concepts/agent-tool-plane',
            },
            {
              label: 'Agent identity and authority',
              translations: { 'zh-CN': 'Agent 身份与权限' },
              slug: 'docs/concepts/agent-authority',
            },
            {
              label: 'Authorization boundary',
              translations: { 'zh-CN': '授权边界' },
              slug: 'docs/concepts/authorization-boundary',
            },
            {
              label: 'The realm boundary',
              translations: { 'zh-CN': 'Realm 边界' },
              slug: 'docs/concepts/realm-boundary',
            },
          ],
        },
        {
          label: 'Guides',
          translations: { 'zh-CN': '接入指南' },
          items: [
            {
              label: 'Make an API Agent-ready',
              translations: { 'zh-CN': '让 API 可被 Agent 使用' },
              slug: 'docs/guides/make-an-api-agent-ready',
            },
            {
              label: 'Product identity foundation',
              translations: { 'zh-CN': '产品身份与信任基础' },
              slug: 'docs/guides/product-identity-root',
            },
            {
              label: 'Kubernetes and OIDC',
              translations: { 'zh-CN': 'Kubernetes 与 OIDC' },
              slug: 'docs/guides/kubernetes-oidc',
            },
            {
              label: 'Kubernetes kubeconfig and RBAC',
              translations: { 'zh-CN': 'Kubernetes kubeconfig 与 RBAC' },
              slug: 'docs/guides/kubernetes-kubeconfig-rbac',
            },
            {
              label: 'Managed Kubernetes',
              translations: { 'zh-CN': '托管 Kubernetes' },
              slug: 'docs/guides/managed-kubernetes',
            },
            {
              label: 'Argo CD',
              translations: { 'zh-CN': 'Argo CD' },
              slug: 'docs/guides/argocd',
            },
          ],
        },
      ],
    }),
  ],
});
