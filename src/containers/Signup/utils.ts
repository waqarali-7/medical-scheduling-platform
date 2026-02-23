/**
 * Password strength scoring and display for signup.
 * Domain util: encapsulates rules and presentation (score, color, label).
 */
export type PasswordStrengthLevel = "error" | "warning" | "success";

const WEAK_THRESHOLD = 40;
const MEDIUM_THRESHOLD = 70;

export class PasswordStrength {
  /**
   * Returns a score 0–100 from length, case, digits and symbols.
   *
   * @param password – raw password string
   * @returns score in [0, 100]
   */
  static score(password: string): number {
    let s = 0;
    if (password.length >= 8) s += 25;
    if (password.length >= 12) s += 25;
    if (this.hasMixedCase(password)) s += 25;
    if (/\d/.test(password)) s += 15;
    if (this.hasSpecialChar(password)) s += 10;
    return Math.min(s, 100);
  }

  /**
   * MUI color for the given score (error / warning / success).
   *
   * @param score – value from {@link PasswordStrength.score}
   */
  static color(score: number): PasswordStrengthLevel {
    return this.level(score);
  }

  /**
   * Human-readable label for the given score.
   *
   * @param score – value from {@link PasswordStrength.score}
   */
  static label(score: number): string {
    const level = this.level(score);
    switch (level) {
      case "error":
        return "Weak";
      case "warning":
        return "Medium";
      case "success":
        return "Strong";
    }
  }

  /** Internal: maps score to strength level. */
  private static level(score: number): PasswordStrengthLevel {
    if (score < WEAK_THRESHOLD) return "error";
    if (score < MEDIUM_THRESHOLD) return "warning";
    return "success";
  }

  private static hasMixedCase(password: string): boolean {
    return /[a-z]/.test(password) && /[A-Z]/.test(password);
  }

  private static hasSpecialChar(password: string): boolean {
    return /[^a-zA-Z0-9]/.test(password);
  }
}
