---
title: Discover broadly. Authorize precisely. Call directly.
description: The three-part operating model that lets an Agent find useful APIs without turning discovery into ambient authority or Realmroot into a proxy.
publishedAt: 2026-07-31
author: Realmroot
language: en
---

An Agent needs room to discover what is possible. It should not receive broad
authority merely because a capability exists.

Those two requirements can look contradictory. Static tool lists solve the
problem by limiting what the Agent can see. Personal API keys solve it by giving
the Agent whatever their owner can do. A central proxy can hide credentials but
often becomes another place where business permissions have to be copied.

Realmroot uses a different operating model:

> **Discover broadly. Authorize precisely. Call directly.**

Each phrase defines a separate boundary.

## Discover broadly

Discovery answers what resources and operations exist. It does not answer what
the Agent is currently allowed to execute.

A resource team registers a protected resource URL. That URL advertises its
live OpenAPI contract. At task time, the Agent can inspect the catalog, connect
to candidate resources, and read the actual operation definitions and security
requirements.

This matters for two reasons.

First, the Agent does not need an ever-growing tool list embedded in its runtime
or prompt. Its available capability network can grow as resources join.

Second, the catalog does not become a permission grant. An Agent can learn that
a Projects API supports `listProjects` and requires `projects:read` without
already possessing that scope.

If a resource contract is unavailable or stops declaring a scope, new access
requests and token issuance fail closed.

## Authorize precisely

Once the Agent selects an operation, it can describe the minimum authority
required by the task.

A Realmroot access request binds together:

- the stable Agent identity;
- its controlling person or organization;
- one API Resource;
- one connected external account, when applicable;
- an exact scope set;
- a reason and requested lifetime.

The controller sees that boundary in a hosted approval flow and can approve a
one-time, limited, or persistent grant. Changing the resource, account, or
scope set requires another decision.

Enrollment remains separate. Approving a Host binding establishes which stable
Agent is acting; it does not grant that Agent access to every API its controller
can use.

Realmroot roles remain separate too. They can group resource-owned scopes and
constrain what an Agent may request, but a role assignment alone does not issue
a token. The controller-approved grant determines the exact scopes.

## Issue without exposing the owner's credential

After approval, the Restish adapter creates a separate DPoP key for the
resource grant.

For a native API Resource, Realmroot signs a short-lived, audience-bound token.
The controlling user or organization is the subject, the stable Agent appears
as the RFC 8693 actor, and the token contains only the approved scopes.

For an external API Resource, the target platform keeps its own users,
authorization server, and token lifecycle. Realmroot protects the connected
user's refresh credential, presents the user subject and stable Agent actor
through standard OAuth flows, and lets the target issue the final DPoP token.

In neither mode does the Agent receive the user's refresh credential.

## Call directly

The Agent presents the short-lived token and a fresh DPoP proof to the original
resource URL. Business traffic does not pass through Realmroot.

The resource server validates the issuer, signature, audience, expiry, exact
operation scopes, proof key binding, request method and URL, access-token hash,
and replay state. It then applies the business rules only it can know: tenant,
ownership, object state, account status, spending boundary, or any other local
condition.

A valid token does not force an allow decision. It gives the API trustworthy
inputs for making one.

## Why the split matters

The three phases keep different kinds of knowledge where they belong:

| Phase | Knows | Does not imply |
| --- | --- | --- |
| Discovery | Which resources and operations exist | Business access |
| Delegated authorization | Which Agent, resource, account, scopes, and lifetime were approved | Access to a specific object |
| Resource enforcement | Token validity plus local code and data | That Realmroot made the business decision |

This avoids two dangerous shortcuts: turning visibility into ambient authority,
and moving business policy into a central system that lacks the resource's data
and context.

## Revocation stays explicit

Revoking an Agent, Host, grant, account connection, or credential stops new
issuance. External active token leases are also sent to the target's revocation
endpoint. Short token lifetimes limit residual exposure.

Audit records preserve the principal, controller authority, Agent, Host,
resource, account, scopes, and outcome without storing raw access tokens or
credentials.

The result is not merely authenticated tool use. It is an explainable chain
from user intent to delegated authority to a direct business request—one that
can be reviewed, denied, revoked, and audited without putting Realmroot in the
data path.

Explore the complete sequence in [How Realmroot works](/docs/getting-started/how-it-works/)
and the ownership model in [Authorization boundary](/docs/concepts/authorization-boundary/).
