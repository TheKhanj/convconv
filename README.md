# ConvConv

Super simple, zero dependency naming **_conv_**ention **_conv_**erter and validator library.

# Examples

```typescript
import convconv from "convconv";

// examples:
//   camelCase
//   kebab-case
//   PascalCase
//   snake_case
//   SCREAMING-KEBAB-CASE
//   SCREAMING_SNAKE_CASE

// converts camelCase to kebab-case
// camelCase -> camel-case
convconv.fromCamel("camelCase").toKebab();

// converts kebab-case to snake_case
// kebab-case -> kebab_case
convconv.fromConvention("kebab", "kebab-case").toSnake();

// converts any case to PascalCase
convconv
  .autoFrom("your-input-in-one-of-available-naming-conventions")
  .toPascal();

// throws ConventionNotFoundError
convconv.autoFrom("Random_sTring-with_nOConvention");

// returns 'kebab'
convconv.getConvention("some-kebab-case-string");

// throws ConventionNotFoundError
convconv.getConvention("Random_sTring-with_nOConvention");

// returns true
convconv.isPascal("PascalCase");

// returns true
convconv.isConvention("pascal", "PascalCase");

// throws ConventionViolationError
convconv.fromKebab("NotKebab");

// throws ConventionViolationError
convconv.fromCamel("123startingWithNumber");
```

# Errors

All errors extend from `ConvConvError`.
