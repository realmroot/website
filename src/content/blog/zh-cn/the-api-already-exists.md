---
title: API 已经存在，别再为 Agent 重做一遍
description: 让 OpenAPI 继续作为工具契约，由 Realmroot 增加发现、稳定 Agent 身份与精确委托权限。
publishedAt: 2026-08-01
author: Realmroot
language: zh-CN
featured: true
---

互联网并不缺少能力。数十年来，大量有价值的能力已经存在于 HTTP API 之后：文件、项目、
客服系统、支付、基础设施、分析与内部运营。

大多数 Agent 还无法安全使用它们。常见做法是为每个服务再开发一套集成：自定义 Tool
Definition、专用 CLI，或专门的 MCP Server。有些场景确实应该这样做；但如果把它当作
每个现有 API 的默认要求，就会产生一个不断相乘的问题。

API 已经存在。为什么团队还要再做一遍？

## 第二套接口有很长的维护尾巴

第一个 Adapter 往往看起来成本不高：暴露几个常用操作、重新组织参数，再为 Agent 提供
一个友好接口。真正隐藏的成本从发布以后才开始。

API 会演进。请求与响应 Schema 会变化，新操作会出现，Scope 会变得更精细，错误行为会
改进，一项安全修复还可能改变 Endpoint 的调用方式。Agent 接口必须始终同步，否则它就会
逐渐变成服务的一份不准确副本。

这会带来持续成本：

- 两套需要设计、发布、加固与记录的契约；
- Operation 与 Authority 之间的重复映射；
- 针对不同 Runtime 的 Adapter 与分发方式；
- 与生产行为逐渐漂移的工具定义；
- 到底哪一个接口才是权威来源的歧义。

初次开发容易看见，长期同步成本却永远存在。

## OpenAPI 本来就是工具契约

一份良好的 OpenAPI 文档已经描述了 Agent 调用 HTTP API 所需的信息：

- 服务位于哪里；
- 存在哪些 Operation；
- 接受哪些参数与 Request Body；
- 返回哪些 Response 与 Error；
- 每个受保护 Operation 需要哪些 OAuth 或 OIDC Scope。

Realmroot 将这份实时文档作为 Operation 与 Scope 契约。资源团队注册受保护 API URL，
该 URL 再通过标准 `service-desc` Link 暴露 OpenAPI 文档。

任务发生时，Agent 发现候选资源、读取当前契约并选择精确 Operation。Restish 基于契约提供
通用 CLI，Realmroot Skill 则教会 Agent 发现、审批与调用方法。

契约始终留在拥有它的服务中。

## 工具不只有 Operation Schema

OpenAPI 回答如何调用，却不能单独回答自主行动者周围的信任问题：

1. 正在行动的是哪个稳定 Agent？
2. 哪个人或 Organization 控制它？
3. 当前任务批准了哪个资源、账户与 Scope？
4. 这项权限如何被限制、撤销与审计？

这是 Realmroot 的另一层：工具平面下面的身份与信任基础，包括稳定 Agent 身份、Host
Binding、控制者关系、明确 Access Request、Grant、短期 DPoP 绑定 Credential、撤销与
审计上下文。

身份不可或缺，但不是产品结果。产品结果是 Agent 在原始 API 上完成一次真实操作。

## 一条可复用的路径

Realmroot 根据谁掌握正确上下文来划分职责。

资源服务器保留：

- API 行为与数据；
- OpenAPI Operation 与 Scope 定义；
- 对象级、租户、所有权与状态规则；
- Token 验证和最终 Allow / Deny 决定。

Realmroot 提供：

- 资源注册与实时发现；
- 稳定 Agent 身份与控制者上下文；
- 精确委托 Grant 的审批与生命周期；
- Native Token 签发或 External 签发协调；
- 一套面向 Agent 的通用操作方法。

批准后，Agent 直接调用资源。Realmroot 不是 HTTP 代理，也看不到业务 Payload。

这个边界很重要。一个中心平台如果不复制资源服务器的业务模型，就无法正确决定哪个文档、
钱包、项目或客户记录可以访问。Realmroot 提供可信身份与权限 Claim，API 则把最终决定
留在它所保护的代码与数据旁边。

## 能力网络会持续复利

在专用集成模型中，每个新组合都会产生工作：另一个 API × 另一个 Agent Runtime × 另一个
Adapter 生命周期。

共享工具平面改变了扩展单位。API 团队发布一份兼容契约，Agent Runtime 学习一套操作方法，
每个新注册资源都会扩展所有已授权 Agent 的工具箱。

真正重要的属性不是一份固定工具目录，而是目录可以持续增长，无需每次都为 Agent 开发
专用后端。

## 专用工具依然重要

并非所有交互都应该暴露成通用 API Operation。特殊协议、高度策划的工作流，或刻意隐藏
后端复杂度的体验，依然值得使用专用 MCP Server 或 Tool。

错误在于把这种例外变成每个普通 HTTP API 的硬性要求。当稳定 API 与 OpenAPI 契约已经
存在时，默认问题应该是：能否复用？

## 一个简单的产品检验标准

当接入一个资源服务器就能扩展 Agent 可完成的任务，而无需新增 Agent 专用后端，同时每个
受保护请求仍携带足够的身份与权限，让原始服务自行作出正确决定，这条路径就真正有效。

这就是**让每个 API，都能为 Agent 所用**：不是替换现有互联网，而是让其中已经存在的
能力被 Agent 安全使用。

阅读 [Realmroot 如何工作](/zh-cn/docs/getting-started/how-it-works/)，或按照
[API 接入指南](/zh-cn/docs/guides/make-an-api-agent-ready/)查看具体步骤。
