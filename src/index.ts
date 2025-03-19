#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerReasoningTools } from "./tools/reasoning-tools";
import { registerCommandWrappers } from "./tools/reasoning-wrapper";
import { handleToolError } from "./utils/errors";

/**
 * Main function to start the MCP server
 */
async function main() {
  try {
    // Create server with stdio transport
    console.error("Initializing MCP Reasoning Server...");
    const server = new McpServer({
      name: "MCP-Reasoning-Server",
      version: "1.0.0"
    });
    
    // Register tools
    registerReasoningTools(server);
    registerCommandWrappers(server);
    
    // Start the server
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    console.error("MCP Reasoning Server started successfully");
  } catch (error) {
    console.error("Failed to start MCP server:", handleToolError(error));
    process.exit(1);
  }
}

// Run the server
main(); 