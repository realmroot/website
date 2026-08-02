---
title: Why your product needs an identity root
description: Authentication is only the front door. A product also needs one explicit boundary for users, applications, policy, APIs, and delegated agents.
publishedAt: 2026-07-30
author: Realmroot
language: en
featured: false
---

Most products begin identity work with a login screen. The first version needs
an email field, a password, and a session cookie. That framing works until the
product grows.

Soon there are multiple applications sharing accounts, administrators managing
security policy, APIs validating access tokens, and automated actors requesting
authority. At that point, identity is no longer a UI feature. It is part of the
product's security architecture.

For Realmroot, that identity root is the foundation rather than the final
outcome. Its purpose is to give useful API capabilities a trustworthy control
context: which Agent is acting, who controls it, and which exact authority was
delegated for a task.

## The boundary matters more than the screen

An identity root answers a set of questions that a sign-in component cannot:

- Which users belong to this product?
- Which applications intentionally share those users?
- Which issuer signs the tokens those applications trust?
- Who can change login, MFA, connector, and password policy?
- How is authority delegated to a non-human actor?

Realmroot makes one deployment the answer. A deployment owns one user pool,
one issuer, one administrator surface, and one security-policy boundary.
Applications can share the realm when they should share accounts and operators.
Products that require independent identity deploy a separate realm.

## Authentication, authorization, and delegation belong together

These concerns should remain distinct, but they should not be disconnected.

Authentication establishes who an actor is. Authorization describes what that
actor may do. Delegation lets one actor grant constrained authority to another.
The result is easier to reason about when every decision refers back to the same
issuer and the same realm boundary.

That is especially important for agents. An agent registration proves a host
key, but the key should not become the permanent identity. Enrollment should not
silently grant business authority. A controller should approve access to an
exact resource and scope set.

## A deployable root

Realmroot packages hosted authentication, an account center, an admin console,
OIDC integration, a resource-oriented management API, and delegated agent
access in one service.

The goal is not to invent another identity vocabulary. Product applications use
OIDC. Protected APIs validate OAuth access tokens. Delegated access is
short-lived, audience-bound, and explicit.

> Your product should be able to point to one place and say: this is where
> identity begins, and this is where authority becomes explicit.

That place is the realm.

## The foundation should lead somewhere

An identity platform can establish reliable principals and policy boundaries,
but identity alone does not complete an Agent's task. The Agent still needs to
discover a useful capability, understand its live contract, obtain the exact
authority needed, and invoke the original service.

Realmroot's Agent Tool Plane builds that result layer on the realm. Existing
OpenAPI services become discoverable capabilities; controllers approve narrow
resource grants; short-lived DPoP credentials express the delegation; and the
Agent calls the API directly.

This is why the identity root and tool plane belong together. Product identity
provides the people, organizations, applications, and policy context. Existing
APIs provide the useful actions. Realmroot connects them without creating a
separate identity silo or moving business authorization out of the resource
server.

Continue with [The Agent Tool Plane](/docs/concepts/agent-tool-plane/) or
[How Realmroot works](/docs/getting-started/how-it-works/).
