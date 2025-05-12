# MultiSelectDropdown Fixes for Overflow Issues

## Problem Summary

The MultiSelectDropdown component is overflowing its parent containers, especially when used inside Accordion components.

## Root Cause

The overflow happens because:

1. The component wasn't respecting its parent width constraints
2. Text content wasn't being properly truncated with ellipsis
3. The width calculation wasn't respecting the DOM hierarchy

## Solution

### 1. Add proper attributes to identify components in the DOM hierarchy:

```tsx
<div
  ref={containerRef}
  id="multi-select-dropdown"
  data-test-id="multi-select-dropdown"
  style={{
    maxWidth: "100%", // Ensure it doesn't exceed parent width
    overflow: "hidden", // Prevent content from overflowing
    position: "relative",
    width: "100%",
  }}
>
```

### 2. Ensure all content containers have proper overflow handling:

```tsx
<div
  ref={ref}
  data-test-id="multi-select-label"
  style={{
    display: "flex",
    maxWidth: "100%",
    overflow: "hidden",
  }}
>
```

### 3. Make the button shrink properly with flex:

```tsx
<button
  data-test-id="multi-select-trigger"
  style={{
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: 4,
    cursor: "pointer",
    flex: "1 1 auto", // Allow button to shrink
    marginRight: "8px",
    maxWidth: "calc(100% - 30px)", // Leave space for reset button
    minWidth: 0, // Critical for allowing shrinking
    overflow: "hidden",
    padding: "6px 10px",
    textAlign: "left",
    width: "100%",
  }}
  type="button"
  onClick={handleDropdownClick}
>
```

### 4. Ensure text content is properly truncated:

```tsx
<div
  data-test-id="selected-items-display"
  style={{
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
  }}
>
  {/* Text content */}
</div>
```

### 5. Make dropdown options list respect container width:

```tsx
<div
  ref={dropdownRef}
  data-test-id="multi-select-dropdown-list"
  style={{
    background: "#fff",
    // other styles...
    maxWidth: "100%", // Ensure it doesn't exceed its container
    overflow: "hidden",
    position: "absolute",
    width: "100%", // Use full width of parent
    zIndex: 10,
  }}
>
```

### Key CSS Properties for Handling Overflow

- `maxWidth: "100%"` - Ensure elements don't exceed their containers
- `overflow: "hidden"` - Hide any overflowing content
- `textOverflow: "ellipsis"` - Show ellipsis for truncated text
- `whiteSpace: "nowrap"` - Prevent text wrapping
- `minWidth: 0` - Allow flex items to shrink below content size
- `flex: "1 1 auto"` - Allow elements to grow and shrink as needed

Apply these changes to ensure the MultiSelectDropdown component and its text respect their parent containers, particularly when inside an Accordion.
