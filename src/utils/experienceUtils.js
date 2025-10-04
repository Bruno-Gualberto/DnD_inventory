// D&D 5e Experience Point thresholds for each level
// These are CUMULATIVE totals - the total XP needed to reach each level
const XP_THRESHOLDS = [
  0,      // Level 1
  300,    // Level 2
  900,    // Level 3
  2700,   // Level 4
  6500,   // Level 5
  14000,  // Level 6
  23000,  // Level 7
  34000,  // Level 8
  48000,  // Level 9
  64000,  // Level 10
  85000,  // Level 11
  100000, // Level 12
  120000, // Level 13
  140000, // Level 14
  165000, // Level 15
  195000, // Level 16
  225000, // Level 17
  265000, // Level 18
  305000, // Level 19
  355000, // Level 20
];

/**
 * Get the total XP required to reach a specific level
 * @param {number} level - The target level (1-20)
 * @returns {number} Total XP needed to reach that level
 */
export function getXPForLevel(level) {
  if (level < 1) return 0;
  if (level > 20) return XP_THRESHOLDS[19];
  return XP_THRESHOLDS[level - 1];
}

/**
 * Get the total XP required to reach the next level
 * @param {number} currentLevel - The current level (1-20)
 * @returns {number} Total XP needed to reach the next level
 */
export function getXPForNextLevel(currentLevel) {
  if (currentLevel >= 20) return XP_THRESHOLDS[19]; // Max level
  return XP_THRESHOLDS[currentLevel];
}

/**
 * Calculate what level a character should be based on their total XP
 * @param {number} xp - The character's total experience points
 * @returns {number} The character's actual level (1-20)
 */
export function calculateLevel(xp) {
  if (xp < 0) return 1;

  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) {
      return i + 1;
    }
  }

  return 1;
}

/**
 * Calculate progress toward the next level
 * @param {number} currentXP - The character's total experience points
 * @param {number} storedLevel - The level stored in the database (may be outdated)
 * @returns {object} Object containing progress information
 *   - actualLevel: The correct level based on XP
 *   - nextLevelXP: Total XP threshold for next level
 *   - percentage: Progress percentage (0-100)
 */
export function getProgressToNextLevel(currentXP, storedLevel) {
  const actualLevel = calculateLevel(currentXP);
  const nextLevelXP = getXPForNextLevel(actualLevel);

  // Calculate percentage: current XP out of total XP needed for next level
  const percentage = actualLevel >= 20 ? 100 : (currentXP / nextLevelXP) * 100;

  return {
    actualLevel,
    nextLevelXP,
    percentage: Math.min(percentage, 100),
  };
}
