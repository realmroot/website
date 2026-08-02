---
title: 广泛发现，精确授权，直接调用
description: 让 Agent 自由发现有用 API，同时避免把发现变成隐式权限，也避免让 Realmroot 成为业务代理的三段式模型。
publishedAt: 2026-07-31
author: Realmroot
language: zh-CN
---

Agent 需要足够空间去发现当前可以做什么，但不能仅仅因为某项能力存在，就自动获得宽泛权限。

这两个要求看起来可能互相矛盾。静态 Tool List 通过限制 Agent 能看到什么来规避问题；
个人 API Key 则把所有者能够做的事一起交给 Agent；中心 Proxy 可以隐藏 Credential，却常常
成为另一个必须复制业务权限的地方。

Realmroot 使用另一种操作模型：

> **广泛发现。精确授权。直接调用。**

每句话都定义了一道独立边界。

## 广泛发现

发现回答有哪些资源与操作存在，不回答 Agent 当前可以执行什么。

资源团队注册受保护 Resource URL，该 URL 暴露实时 OpenAPI 契约。任务发生时，Agent 可以
检查目录、连接候选资源，并读取真正的 Operation Definition 与 Security Requirement。

这有两个重要结果。

第一，Agent 不需要把不断增长的 Tool List 固定写入 Runtime 或 Prompt，它的能力网络可以
随着资源加入而扩展。

第二，目录不会变成 Permission Grant。Agent 可以知道 Projects API 支持 `listProjects`
且要求 `projects:read`，但不会因此自动持有这个 Scope。

如果资源契约不可用，或不再声明某个 Scope，新 Access Request 与 Token 签发都会
Fail Closed。

## 精确授权

Agent 选中 Operation 后，就能描述当前任务所需的最小权限。

Realmroot Access Request 会绑定：

- 稳定 Agent 身份；
- 控制它的人或 Organization；
- 一个 API Resource；
- 适用时，一个已连接外部账户；
- 精确 Scope 集合；
- 用途与申请生命周期。

控制者在托管审批流程中看到这条边界，可以批准一次性、限时或长期 Grant。更换资源、
账户或 Scope 集合都需要新的决策。

Enrollment 与此保持独立。批准 Host Binding 只建立哪个稳定 Agent 正在行动，不会允许它
使用控制者能够访问的所有 API。

Realmroot Role 也保持独立。它可以组织资源自有 Scope，并约束 Agent 可以申请什么，但
Role Assignment 本身不会签发 Token。精确 Scope 仍由控制者批准的 Grant 决定。

## 签发凭证，但不暴露所有者 Credential

批准后，Restish Adapter 为 Resource Grant 创建独立 DPoP Key。

对于 Native API Resource，Realmroot 签发短期、Audience 受限 Token。控制用户或
Organization 是 Subject，稳定 Agent 作为 RFC 8693 Actor，Token 只包含已批准 Scope。

对于 External API Resource，目标平台保留用户、Authorization Server 与 Token 生命周期。
Realmroot 保护已连接用户的 Refresh Credential，通过标准 OAuth Flow 提交用户与 Agent
权限，由目标平台签发最终 DPoP Token。

两种模式都不会把用户 Refresh Credential 交给 Agent。

## 直接调用

Agent 将短期 Token 与新的 DPoP Proof 提交给原始 Resource URL。业务流量不经过 Realmroot。

资源服务器验证 Issuer、签名、Audience、有效期、精确 Operation Scope、Proof Key Binding、
请求 Method 与 URL、Access Token Hash 及重放状态，然后执行只有它才掌握的业务规则：
租户、所有权、对象状态、账户状态、消费边界或其他本地条件。

有效 Token 不会强迫 API 允许请求，它只是为 API 提供可信的决定输入。

## 为什么必须分成三段

三个阶段让不同知识留在正确位置：

| 阶段 | 知道什么 | 不代表什么 |
| --- | --- | --- |
| 发现 | 哪些资源与 Operation 存在 | 拥有业务权限 |
| 委托授权 | 哪个 Agent、资源、账户、Scope 与生命周期获批 | 可以访问某个具体对象 |
| 资源执行 | Token 有效性以及本地代码与数据 | Realmroot 替 API 作出了业务决定 |

这样可以避免两条危险捷径：把可见性变成环境权限，以及把业务策略搬到一个缺少资源数据和
上下文的中心系统中。

## 撤销保持明确

撤销 Agent、Host、Grant、Account Connection 或 Credential 会阻止后续签发。有效的
External Token Lease 也会发送给目标 Revocation Endpoint。短 Token 生命周期限制残余风险。

审计记录保留 Principal、Controller Authority、Agent、Host、Resource、Account、Scope 与
结果，但不会存储原始 Access Token 或 Credential。

最终结果不只是“工具完成了认证”，而是一条从用户意图到委托权限再到直接业务请求的可解释
链路：它可以被检查、拒绝、撤销与审计，同时 Realmroot 不进入数据路径。

在 [Realmroot 如何工作](/zh-cn/docs/getting-started/how-it-works/)中查看完整顺序，在
[授权边界](/zh-cn/docs/concepts/authorization-boundary/)中查看职责模型。
