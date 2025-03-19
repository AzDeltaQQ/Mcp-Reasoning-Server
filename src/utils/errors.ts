/**
 * Custom error types for MCP server
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class PermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PermissionError";
  }
}

export class ReasoningError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReasoningError";
  }
}

/**
 * Handle errors from tool execution
 */
export function handleToolError(error: any): string {
  if (error instanceof ValidationError) {
    return `Validation error: ${error.message}`;
  } else if (error instanceof PermissionError) {
    return `Permission denied: ${error.message}`;
  } else if (error instanceof ReasoningError) {
    return `Reasoning error: ${error.message}`;
  } else {
    return `Error: ${error?.message || "Unknown error"}`;
  }
} 