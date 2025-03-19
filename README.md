# MCP Advanced Reasoning Server for Cursor AI

A Model Context Protocol (MCP) server that provides advanced reasoning capabilities for Claude in Cursor AI.

## Features

- **Monte Carlo Tree Search (MCTS)**: Use MCTS reasoning for complex problem-solving tasks.
- **Beam Search**: Explore multiple reasoning paths simultaneously.
- **R1 Transformer**: Leverage Transformer-based reasoning for complex problems.
- **Hybrid Reasoning**: Combine Transformer analysis with MCTS for enhanced reasoning.
- **Auto-Iterative Reasoning**: All multi-step reasoning methods automatically complete all reasoning steps in a single tool call.

## Installation

```bash
npm install
npm run build
```

## Usage

### Configuring with Cursor AI

1. Build the server first:
   ```bash
   cd mcp-reasoning-server
   npm run build
   ```

2. Open Cursor AI
3. Navigate to Settings > Features > MCP
4. Click the "+ Add new global MCP server" button
5. Enter the following details:
   - In the command field: `node C:\\Users\\[YourUsername]\\path\\to\\mcp-reasoning-server\\dist\\index.js`
   - Make sure to use the full path to your project's dist/index.js file
   - Use double backslashes for Windows paths
6. Click "Add"
7. Find your server in the list (it will initially show as "Disabled")
8. Click "Disabled" to toggle it to "Enabled"
9. Click the refresh button to load the available tools
10. A command prompt window will open automatically - this is your server running
11. As long as this command prompt window remains open, the reasoning tools will be available

Alternatively, you can manually edit your Cursor MCP configuration file at `C:\Users\[Username]\.cursor\mcp.json` (Windows):

```json
{
  "mcpServers": {
    "mcp-reasoner": {
      "command": "node",
      "args": ["C:\\Users\\[Username]\\path\\to\\mcp-reasoning-server\\dist\\index.js"]
    }
  }
}
```

### Important Notes

- **Server Running**: The tools are only available while the command prompt window is open and running
- **Making Changes**: If you make changes to the server code, you must rebuild it with `npm run build` before restarting
- **Restarting**: To restart the server, close the command prompt window and toggle the server off/on in Cursor Settings

### Using the Reasoning Tools

You can use the reasoning tools directly in your Cursor AI conversations with Claude:

#### MCTS Reasoning

Use the `/reason-mcts` command followed by your query to start a MCTS-based reasoning chain:

```
/reason-mcts How can I optimize the performance of this React component?
```

#### Beam Search Reasoning

Use the `/reason-beam` command for beam search-based reasoning:

```
/reason-beam What architecture would be best for this microservice system?
```

#### R1 Transformer Reasoning

Use the `/reason-r1` command for single-step Transformer-based reasoning:

```
/reason-r1 Analyze the complexity of this algorithm.
```

#### Hybrid Reasoning

Use the `/reason-hybrid` command to combine Transformer and MCTS reasoning:

```
/reason-hybrid How should we approach refactoring this legacy codebase?
```

### Claude Integration

To make it easier for Claude to work with these reasoning tools, you can add the following custom instructions:

```
When I use commands like /reason-mcts, /reason-beam, /reason-r1, or /reason-hybrid in chat, interpret them as requests to use the corresponding reasoning tools:

/reason-mcts: Use the reason_mcts tool with the text following the command as the query
Example: "/reason-mcts How do I solve this problem?" should call the reason_mcts tool

/reason-beam: Use the reason_beam tool with the text following the command as the query
Example: "/reason-beam What's the best approach for this complex problem?" should call the reason_beam tool

/reason-r1: Use the reason_r1 tool with the text following the command as the query
Example: "/reason-r1 Analyze this code for performance issues" should call the reason_r1 tool

/reason-hybrid: Use the reason_hybrid tool with the text following the command as the query
Example: "/reason-hybrid How should we restructure this architecture?" should call the reason_hybrid tool

When these commands are used, extract the text after the command as the query parameter and use the corresponding tool to perform advanced reasoning.
```

## Development

### Project Structure

- `src/index.ts`: Main server entry point
- `src/tools/reasoning-tools.ts`: Implementation of reasoning tools
- `src/tools/reasoning-wrapper.ts`: Command wrappers for easier use in Cursor
- `src/utils/errors.ts`: Error handling utilities

### Auto-Iterative Reasoning

The reasoning tools are implemented to automatically complete all reasoning steps internally during a single tool call. Each reasoning method follows this process:

1. Initialize the first thought/step
2. Automatically generate subsequent thoughts/steps
3. Return all thoughts along with the final result

This approach ensures that the reasoning process completes fully without requiring multiple manual tool calls.

### Adding New Reasoning Methods

To add a new reasoning method, follow these steps:

1. Add a new tool implementation in `src/tools/reasoning-tools.ts`
2. Add a corresponding command wrapper in `src/tools/reasoning-wrapper.ts`
3. Follow the pattern of existing tools, defining parameters and response format
4. Implement auto-iteration if it's a multi-step reasoning method
5. Rebuild the project with `npm run build`

## Limitations

This is a simulated reasoning server. In a production implementation, you would connect to actual reasoning algorithms instead of the placeholder responses currently used.

## License

ISC 