"use strict";
/**
 * Custom error types for MCP server
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReasoningError = exports.PermissionError = exports.ValidationError = void 0;
exports.handleToolError = handleToolError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class PermissionError extends Error {
    constructor(message) {
        super(message);
        this.name = "PermissionError";
    }
}
exports.PermissionError = PermissionError;
class ReasoningError extends Error {
    constructor(message) {
        super(message);
        this.name = "ReasoningError";
    }
}
exports.ReasoningError = ReasoningError;
/**
 * Handle errors from tool execution
 */
function handleToolError(error) {
    if (error instanceof ValidationError) {
        return `Validation error: ${error.message}`;
    }
    else if (error instanceof PermissionError) {
        return `Permission denied: ${error.message}`;
    }
    else if (error instanceof ReasoningError) {
        return `Reasoning error: ${error.message}`;
    }
    else {
        return `Error: ${error?.message || "Unknown error"}`;
    }
}
