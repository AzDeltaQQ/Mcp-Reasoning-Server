#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const reasoning_tools_1 = require("./tools/reasoning-tools");
const reasoning_wrapper_1 = require("./tools/reasoning-wrapper");
const errors_1 = require("./utils/errors");
/**
 * Main function to start the MCP server
 */
async function main() {
    try {
        // Create server with stdio transport
        console.error("Initializing MCP Reasoning Server...");
        const server = new mcp_js_1.McpServer({
            name: "MCP-Reasoning-Server",
            version: "1.0.0"
        });
        // Register tools
        (0, reasoning_tools_1.registerReasoningTools)(server);
        (0, reasoning_wrapper_1.registerCommandWrappers)(server);
        // Start the server
        const transport = new stdio_js_1.StdioServerTransport();
        await server.connect(transport);
        console.error("MCP Reasoning Server started successfully");
    }
    catch (error) {
        console.error("Failed to start MCP server:", (0, errors_1.handleToolError)(error));
        process.exit(1);
    }
}
// Run the server
main();
