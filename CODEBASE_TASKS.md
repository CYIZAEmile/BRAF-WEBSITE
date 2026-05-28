# Proposed Codebase Tasks

## 1) Typo fix task
**Issue:** The hero copy currently says `BRAF Ltd detects youths' talents...`, where `youths'` reads as an awkward possessive/plural typo in this context.

**Task:** Update the sentence in `src/components/HeroSection.tsx` to use clearer wording such as `BRAF Ltd detects youth talent...` (or `young people's talents`) and keep copy style consistent across the site.

## 2) Bug fix task
**Issue:** CSV export in admin currently builds rows with simple comma-joining and only wraps the `answers` field in quotes. Names/emails/results containing commas or quotes can produce malformed CSV.

**Task:** Add a dedicated CSV-escaping helper in `src/pages/Admin.tsx` and apply it to every field before joining. Ensure embedded quotes are doubled and all fields are safely serialized.

## 3) Comment/documentation discrepancy task
**Issue:** `README.md` still contains placeholder text (`TODO: Document your project here`) that does not describe the actual app setup, scripts, or environment.

**Task:** Replace placeholder README content with accurate project documentation (purpose, local setup, required env vars, test/lint commands, and Supabase notes).

## 4) Test improvement task
**Issue:** The only test (`src/test/example.test.ts`) is a trivial `expect(true).toBe(true)` and provides no meaningful coverage.

**Task:** Replace it with behavior-focused tests (for example, unit tests for CSV serialization logic from Admin export or auth hook state transitions), and assert realistic input/output cases.
