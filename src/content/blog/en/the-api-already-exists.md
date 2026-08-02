---
title: The API already exists. Do not rebuild it for Agents.
description: OpenAPI can remain the tool contract while Realmroot adds discovery, stable Agent identity, and precise delegated authority.
publishedAt: 2026-08-01
author: Realmroot
language: en
featured: true
---

The internet does not have a capability shortage. It has decades of useful
capabilities behind HTTP APIs: files, projects, support systems, payments,
infrastructure, analytics, and internal operations.

Agents cannot safely use most of them. The common response is to build another
integration surface for each service: a custom tool definition, a bespoke CLI,
or a purpose-built MCP server. Sometimes that is exactly the right design. As a
default for every existing API, it creates a multiplication problem.

The API already exists. Why should the team have to build it again?

## The second surface has a long tail

The first adapter often looks inexpensive. It exposes a handful of popular
operations, reshapes their arguments, and gives an Agent a friendly interface.
The hidden cost begins after launch.

The API evolves. Request and response schemas change. New operations appear.
Scopes become narrower. Error behavior improves. A security fix changes how an
endpoint must be called. The Agent surface now has to evolve in lockstep—or it
slowly becomes an inaccurate copy of the service.

That creates several recurring costs:

- two contracts to design, release, secure, and document;
- duplicated mapping between operations and authority;
- runtime-specific adapters and packaging;
- copied tool definitions that drift from production behavior;
- ambiguity about which surface is authoritative.

The initial build is visible. The synchronization cost is permanent.

## OpenAPI is already a tool contract

A good OpenAPI document already describes the information an Agent needs to
invoke an HTTP API:

- where the service lives;
- which operations exist;
- the arguments and request bodies they accept;
- the responses and errors they return;
- the OAuth or OIDC scopes each protected operation requires.

Realmroot treats that live document as the operation and scope contract. A
resource team registers the protected API URL, and that URL advertises its
OpenAPI document with a standard `service-desc` link.

At task time, an Agent discovers candidate resources, reads the current
contract, and selects the exact operation. Restish provides a generic CLI over
the contract. The Realmroot Skill teaches the Agent the discovery, approval,
and invocation procedure.

The contract stays with the service that owns it.

## A tool needs more than an operation schema

OpenAPI answers how to call an operation. It does not, by itself, answer the
trust questions around an autonomous actor:

1. Which stable Agent is acting?
2. Which person or organization controls it?
3. Which resource, account, and scopes are approved for this task?
4. How can the authority be limited, revoked, and audited?

This is Realmroot's other layer. It provides the identity and trust foundation
under the tool plane: stable Agent identity, Host bindings, controller
relationships, explicit access requests, grants, short-lived DPoP-bound
credentials, revocation, and audit context.

Identity is necessary, but it is not the product outcome. The outcome is a real
operation completed against the original API.

## One reusable path

Realmroot divides the work according to who has the right context.

The resource server keeps:

- API behavior and data;
- OpenAPI operation and scope definitions;
- object-level, tenant, ownership, and state rules;
- token validation and the final allow-or-deny decision.

Realmroot supplies:

- resource registration and live discovery;
- stable Agent identity and controller context;
- exact delegated-grant approval and lifecycle;
- native token issuance or external issuance coordination;
- a common operating procedure for Agents.

After approval, the Agent calls the resource directly. Realmroot is not an HTTP
proxy and does not see the business payload.

This boundary matters because a central platform cannot correctly decide which
document, wallet, project, or customer record may be accessed without copying
the resource server's business model. Realmroot provides trustworthy identity
and authority claims; the API keeps the decision beside the code and data it
protects.

## The capability network compounds

With a bespoke integration model, every new pairing creates work: another API
times another Agent runtime times another adapter lifecycle.

With a shared tool plane, the scaling unit changes. An API team publishes one
compatible contract. Agent runtimes learn one operating procedure. Every new
registered resource expands the toolbox available to every authorized Agent.

The useful property is not a fixed catalog of tools. It is that the catalog can
grow without requiring Agent-specific backend code for every addition.

## Purpose-built tools still matter

Not every interaction should be exposed as a generic API operation. A
specialized protocol, a highly curated workflow, or an experience that
intentionally hides backend complexity may deserve a purpose-built MCP server
or tool.

The mistake is turning that exception into a requirement for every ordinary
HTTP API. When a stable API and OpenAPI contract already exist, reuse should be
the default question.

## A simple product test

The approach is working when adding one resource server expands what an Agent
can do without requiring a new Agent-specific backend, while every protected
request still carries enough identity and authority for the original service
to make its own correct decision.

That is what **Every API, Agent-ready** means: not replacing the existing
internet, but making its capabilities safely available to Agents.

Read [How Realmroot works](/docs/getting-started/how-it-works/) or follow the
[API integration guide](/docs/guides/make-an-api-agent-ready/) to see the model
in concrete steps.
