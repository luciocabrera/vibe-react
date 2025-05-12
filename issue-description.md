# Convert interfaces to types throughout the codebase

## Description

Currently, our codebase uses a mix of TypeScript interfaces and types. For better consistency, we should standardize on using types instead of interfaces across the entire codebase.

## Tasks

- [ ] Convert all `interface` declarations to `type` declarations
- [ ] Ensure the application still builds and runs properly after conversion
- [ ] Update any related documentation if necessary

## Why?

Types are more flexible in TypeScript and can do everything interfaces can do, plus more. Types can represent unions, intersections, and mapped types more easily. Using types consistently will make our codebase more predictable and easier to maintain.

## Acceptance Criteria

- All interface declarations are converted to type declarations
- No functionality changes or regressions
- Code compiles and passes all tests
