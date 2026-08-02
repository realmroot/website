---
title: 为什么你的产品需要一个身份根
description: 认证只是入口。产品还需要一个覆盖用户、应用、策略、API 与受委托 Agent 的明确安全边界。
publishedAt: 2026-07-30
author: Realmroot
language: zh-CN
featured: false
---

多数产品都从登录页开始做身份系统：邮箱、密码，再加一个 Session。
在产品早期，这个视角够用；随着产品演进，它很快就会失效。

当多个应用开始共享账户，管理员需要配置安全策略，API 需要验证访问令牌，
自动化行动者开始请求权限时，身份就不再只是一个 UI 功能，而是产品安全架构的一部分。

对 Realmroot 而言，身份根是基础，不是最终结果。它的作用是为有用的 API 能力提供可信
控制上下文：哪个 Agent 正在行动、谁控制它，以及当前任务明确委托了哪些权限。

## 边界比登录页面更重要

一个身份根需要回答登录组件无法回答的问题：

- 哪些用户属于这个产品？
- 哪些应用应该共享这些用户？
- 哪个 Issuer 签发应用信任的令牌？
- 谁可以修改登录、MFA、Connector 与密码策略？
- 非人类行动者如何获得受约束的委托权限？

Realmroot 用一个部署回答这些问题。一个部署拥有一个用户池、一个 Issuer、
一个管理员界面与一套安全策略边界。应该共享用户和管理员的应用可以共享这个 Realm；
需要独立身份的产品则部署新的 Realm。

## 认证、授权与委托应该一起设计

这三类关注点应当保持清晰区分，但不应该彼此割裂。

认证建立行动者是谁；授权描述它可以做什么；委托则允许一个行动者把受约束的权限
授予另一个行动者。当所有决策都指向同一个 Issuer 与 Realm 边界时，
整套模型会更容易理解和审计。

这对 Agent 尤其重要。Agent 注册只能证明某个主机密钥，密钥不应该成为持久身份；
Enrollment 也不应该静默授予业务权限。控制者必须批准精确的资源与 scope 集合。

## 一个可部署的身份根

Realmroot 把托管认证、账户中心、管理 Console、OIDC 集成、资源化管理 API
与 Agent 委托访问打包成一个服务。

目标不是发明新的身份词汇。产品应用使用 OIDC，受保护 API 验证 OAuth 访问令牌，
委托访问则保持短期、受众受限与显式授权。

> 产品应该能够指向一个地方说：身份从这里开始，权限在这里变得明确。

这个地方就是 Realm。

## 基础必须通向实际结果

身份平台可以建立可靠 Principal 与策略边界，但身份本身无法完成 Agent 的任务。Agent 仍需
发现有用能力、理解实时契约、获得精确权限，并调用原始服务。

Realmroot 的 Agent Tool Plane 在 Realm 之上增加了这层结果。现有 OpenAPI 服务成为可发现
能力；控制者批准窄范围 Resource Grant；短期 DPoP Credential 表达委托关系；Agent
随后直接调用 API。

这就是身份根与工具平面必须结合的原因。产品身份提供用户、Organization、Application 与
策略上下文，现有 API 提供真正有用的操作。Realmroot 将二者连接起来，而不会创建新的
身份孤岛，也不会把业务授权搬出资源服务器。

继续阅读 [Agent Tool Plane](/zh-cn/docs/concepts/agent-tool-plane/)或
[Realmroot 如何工作](/zh-cn/docs/getting-started/how-it-works/)。
