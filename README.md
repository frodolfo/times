## Interview

**Context:** You're working on a countdown timer component for a gaming application. The component needs to display time remaining in a human-readable format, showing only the most significant time units.

**Task:** Implement a function called `getSignificantTimeParts` that takes an elapsed time object and returns an array of the most significant time parts, skipping leading zeros.

### Requirements:

1. **Input:** An object with time values: `{ days: number, hours: number, minutes: number, seconds: number }`
2. **Input:** A `significant` parameter (number) indicating how many time units to show
3. **Output:** An array of objects with `{ label: string, value: number }` format
4. **Logic:**
   - Skip leading zero values (except for seconds - always show seconds if it's the only significant unit)
   - Return only up to the specified number of significant parts
   - Follow the order: days → hours → minutes → seconds
   - Use labels: "days", "hours", "minutes", "seconds"

### Examples:

```javascript
// Example 1: 2 days, 3 hours, 0 minutes, 45 seconds, show 2 significant parts
getSignificantTimeParts({ days: 2, hours: 3, minutes: 0, seconds: 45 }, 2);
// Expected: [{ label: "days", value: 2 }, { label: "hours", value: 3 }]

// Example 2: 0 days, 0 hours, 5 minutes, 30 seconds, show 2 significant parts
getSignificantTimeParts({ days: 0, hours: 0, minutes: 5, seconds: 30 }, 2);
// Expected: [{ label: "minutes", value: 5 }, { label: "seconds", value: 30 }]

// Example 3: 0 days, 0 hours, 0 minutes, 15 seconds, show 1 significant part
getSignificantTimeParts({ days: 0, hours: 0, minutes: 0, seconds: 15 }, 1);
// Expected: [{ label: "seconds", value: 15 }]

// Example 4: 1 day, 0 hours, 0 minutes, 0 seconds, show 3 significant parts
getSignificantTimeParts({ days: 1, hours: 0, minutes: 0, seconds: 0 }, 3);
// Expected: [{ label: "days", value: 1 }, { label: "hours", value: 0 }, { label: "minutes", value: 0 }]
```
