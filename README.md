# Systead website — unapproved test preview

This is a **work-in-progress design preview**, not an accepted final company website or a live product. The owner requested a separate repository and hosted link for testing. It must not replace the existing company site or domain.

The project contains36 full-company page routes: home, four products and overview, architecture/topics, solutions, resources/drafts, demo, company/deployment/security, an unsent local brief and utilities. Interfaces and work records are illustrative. The historical film is explicitly sample/prototype footage, not current customer or execution proof. No inquiry receiver, analytics, subscription or vendor action endpoint is connected.

## Local build

Use the pinned existing Node/npm toolchain:

```sh
npm ci
npm run verify
npm start
```

`verify` runs TypeScript, ESLint and an optimized Next.js static export. `start` serves only loopback at127.0.0.1:4332. No account or hosting configuration is changed by these commands.

For a static host beneath a project path, build with `SITE_BASE_PATH=/systead-website-preview npm run build`. The build preserves the source's page-level body styling and adjusts native script/asset destinations. Hosting remains a separate operation.

## Implementation

Next.js App Router pre-renders the local, authored marketing documents. A typed page manifest and ordered same-origin native scripts retain the reviewed interactions. Navigation uses normal anchors and full documents. The HTML is local build input, never user-provided or remote content. Tailwind, Motion and MDX are not claimed as implemented engines.

`PUBLIC_ASSET_MANIFEST.json` lists the actual referenced fonts, brand symbol, original conceptual art, historical sample and native surface resources. Original source investigations, credentials, dialogue, user records, recovery/history folders and test exports are excluded from this repository.

## Review boundaries

Design acceptance is pending. Functional/visual fidelity tests do not prove reference-grade aesthetics or accessibility certification. Actual macOS Safari was blocked by a locked Mac; actual iOS and screen-reader checks remain open. Production legal content, a real receiving service, final multilingual/SEO/performance work and any live-domain release require separate resolution.

The new repository is private. Do not make source public or enable a paid service merely to obtain a preview URL.

## Assets and notices

Manrope is distributed under the SIL Open Font License in `licenses/Manrope-OFL.txt`. The Systead identity is the owner's supplied brand asset. The runtime material artwork is original conceptual illustration and is labelled as such; it is not hardware evidence. Product scenes are code-native fictional illustrations. No reference-site customer logos, claims or product images are imported as Systead proof.
