/**
 * Generates an array of significant time parts from the given elapsed time object.
 * The function skips leading zero values (except for seconds) and returns only up
 * to the specified number of significant parts in the order: days → hours → minutes → seconds.
 *
 * @param {Object} elapsed - The object containing elapsed time values
 * @param {number} elapsed.days - Number of days (0 or positive integer)
 * @param {number} elapsed.hours - Number of hours (0 or positive integer)
 * @param {number} elapsed.minutes - Number of minutes (0 or positive integer)
 * @param {number} elapsed.seconds - Number of seconds (0 or positive integer)
 * @param {number} significant - The number of significant time parts to include in the output (0 or positive integer)
 *
 * @returns {Array<{label: string, value: number}>} An array of objects containing the label and value of each significant time part
 *
 * @example
 * // Basic usage with 2 significant parts
 * getSignificantTimeParts({ days: 2, hours: 3, minutes: 0, seconds: 45 }, 2)
 * // Returns: [{ label: 'days', value: 2 }, { label: 'hours', value: 3 }]
 *
 * @example
 * // Skip leading zeros, show only minutes and seconds
 * getSignificantTimeParts({ days: 0, hours: 0, minutes: 5, seconds: 30 }, 2)
 * // Returns: [{ label: 'minutes', value: 5 }, { label: 'seconds', value: 30 }]
 *
 * @example
 * // Only seconds remaining
 * getSignificantTimeParts({ days: 0, hours: 0, minutes: 0, seconds: 15 }, 1)
 * // Returns: [{ label: 'seconds', value: 15 }]
 *
 * @example
 * // Include zero values after first non-zero value
 * getSignificantTimeParts({ days: 1, hours: 0, minutes: 0, seconds: 0 }, 3)
 * // Returns: [{ label: 'days', value: 1 }, { label: 'hours', value: 0 }, { label: 'minutes', value: 0 }]
 *
 * @example
 * // Handle edge cases
 * getSignificantTimeParts({ days: 1, hours: 2, minutes: 3, seconds: 4 }, 0)
 * // Returns: []
 *
 * @example
 * // Large values
 * getSignificantTimeParts({ days: 365, hours: 23, minutes: 59, seconds: 59 }, 3)
 * // Returns: [{ label: 'days', value: 365 }, { label: 'hours', value: 23 }, { label: 'minutes', value: 59 }]
 */
export const getSignificantTimeParts = (times, significant) => {
  const keys = Object.keys(times);
  let counter = significant;
  let nonZeroFound = false;
  const result = [];
  const customOrder = ["days", "hours", "minutes", "seconds"];

  if (!counter) return result;

  // Ensure we follow the correct order of time units
  const orderedTimes = {};

  for (const key of customOrder) {
    if (times.hasOwnProperty(key)) {
      orderedTimes[key] = times[key];
    }
  }

  for (const key of Object.keys(orderedTimes)) {
    if (counter === 0) {
      break;
    }

    if (orderedTimes[key] > 0 || key === "seconds" || nonZeroFound) {
      nonZeroFound = true;
      result.push({
        label: key,
        value: times[key],
      });
      --counter;
    }
  }

  // Debug
  console.log("times: ", times);
  console.log("result: ", result);

  return result;
};
