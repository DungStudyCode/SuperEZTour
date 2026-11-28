# Previous audit reconciliation

Prior hash comparison was not present in the active tree or at HEAD. The relocated Phase 0 report in docs/audits records the comparison totals. Git HEAD and current filesystem inventory provide the independent comparison used below.

| Four previously changed paths under old src/ | Current state |
|---|---|
| constants/brand.config.js | Present under apps/web/src |
| features/destinations/DestinationPage.jsx | Present under apps/web/src |
| features/destinations/components/Hanoi/HanoiExperiencePage.jsx | Present under apps/web/src |
| features/destinations/components/Hanoi/HanoiOldQuarterWalk/oldQuarterScenes.js | Present under apps/web/src |

The twelve previously removed paths remain absent at their old paths. Their mapped locations under apps/web are absent as well.

- public/assets/destinations/hanoi/old-quarter/cafe_giang.webp
- public/assets/destinations/hanoi/old-quarter/xe_hoa.webp
- public/assets/destinations/hanoi/thap_rua_pbr.glb
- src/assets/logo.png
- src/components/common/Button/Button.css
- src/components/common/Button/Button.jsx
- src/components/common/SectionHeading/SectionHeading.css
- src/components/common/SectionHeading/SectionHeading.jsx
- src/data/quotes.js
- src/data/reviews.js
- src/features/destinations/components/Hanoi/HanoiYourStory/HanoiYourStory.css
- src/features/destinations/components/Hanoi/HanoiYourStory/HanoiYourStory.jsx

Additional changes include the web/API/contracts workspace move, root workspace manifest and lockfile revisions, and relocation of deployment configuration. The old API README and three required prior implementation/audit reports (03.0, 03.1, 03.2) plus Hanoi 02 V1.1 are missing from the active tree. Their HEAD paths are historical snapshots. The previous evidence folder is absent. The staged deletion was preserved; its file content is excluded from evidence.

The SQL migration and V1 consultation files match the original HEAD blobs by Git content hash. The mapped API environment configuration, contract loader, validation, Dockerfile and some test files differ and should be treated as the new baseline. The conflicting directory requirement is an A0 stop under sections 3 and 8. No application source was edited for Task 03.3A.
