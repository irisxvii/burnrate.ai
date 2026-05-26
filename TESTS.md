## TESTS

The project uses Vitest for automated audit engine testing.

Run tests with:

```bash
npm test
```
# Automated Tests

## File

```txt
src/lib/audit.test.ts
```

## 1. returns valid recommendations structure

Verifies that the audit engine returns a valid recommendations structure after processing audit input.

Checks that:

- `result.recommendations` is an array
- Recommendation objects contain a `reason` property
- Recommendation reasons are strings


## 2. calculates annual savings correctly

Ensures yearly savings calculations remain consistent with monthly savings output.


Checks that:

- `totalAnnualSavings === totalMonthlySavings * 12`
- Monthly savings values are finite numbers


## 3. handles empty tool selections


Verifies that the audit engine safely handles audits with no selected tools.


Checks that:

- The engine does not crash on empty input
- Recommendations return as an empty array
- Monthly savings return `0`
- Annual savings return `0`


## 4. returns numeric savings values

Ensures the audit engine consistently returns valid numeric savings outputs.

Checks that:

- `totalMonthlySavings` is a finite number
- Savings values are returned as numeric types


## 5. generates recommendation reasons

Verifies that generated recommendations contain meaningful human-readable reasoning text.

Checks that:

- Recommendation reasons are strings
- Recommendation reasons are non-empty and descriptive