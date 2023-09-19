# ConvConv
Super simple, zero dependency naming ***conv***ention ***conv***erter and validator library.

# Examples
```typescript
import convconv from 'convconv';

// examples:
//   camelCase
//   kebab-case
//   PascalCase
//   snake_case
//   SCREAMING_KEBAB_CASE

// converts camelCase to kebab-case
// camelCase -> camel-case
convconv.fromCamel('camelCase').toKebab().toString();

// converts kebab-case to snake_case
// kebab-case -> kebak_case
convconv.fromType('kebab', 'kebab-case').toSnake().toString();

// returns true
convconv.isPascal('PascalCase');

// throws ConventionViolationError
convconv.fromKebab('NotKebab');

// throws ConventionViolationError
convconv.fromCamel('123startingWithNumber')
```
# Errors
All errors extend from `ConvConvError`.
