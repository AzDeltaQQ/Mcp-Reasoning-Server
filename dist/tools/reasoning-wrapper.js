"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommandWrappers = registerCommandWrappers;
const zod_1 = require("zod");
const errors_1 = require("../utils/errors");
/**
 * Register command wrapper tools for easier usage in Cursor AI
 * @param server MCP server instance
 */
function registerCommandWrappers(server) {
    // MCTS reasoning command wrapper with automatic iteration
    server.tool("reason_mcts", {
        query: zod_1.z.string().describe("The problem or task to reason about using MCTS")
    }, async ({ query }) => {
        try {
            // Initialize first thought
            const totalThoughts = 3;
            let currentThought = `MCTS Reasoning (Step 1/${totalThoughts}): Initial analysis of the problem "${query}":\n\n` +
                `First, let me understand what we're trying to solve here. ${query}\n\n` +
                `[This would be the initial MCTS-based reasoning]`;
            let thoughtNumber = 1;
            let complete = false;
            let allThoughts = [currentThought];
            // Automatically iterate through all thoughts
            while (!complete && thoughtNumber < totalThoughts) {
                // Simulate next thought generation
                thoughtNumber++;
                const nextThought = `MCTS Reasoning (Step ${thoughtNumber}/${totalThoughts}): ` +
                    `Based on previous analysis "${currentThought.slice(0, 50)}...", ` +
                    `further exploration with 50 simulations suggests...\n\n` +
                    `[This would be the next step of MCTS-based reasoning for: ${query}]`;
                allThoughts.push(nextThought);
                currentThought = nextThought;
                // Check if we've reached the final thought
                if (thoughtNumber >= totalThoughts) {
                    complete = true;
                }
            }
            // Final result with all thoughts
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            strategy: "mcts",
                            originalPrompt: query,
                            allThoughts: allThoughts,
                            thoughtNumber: thoughtNumber,
                            totalThoughts: totalThoughts,
                            complete: true
                        }, null, 2)
                    }
                ]
            };
        }
        catch (error) {
            throw new errors_1.ReasoningError(`MCTS reasoning command failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    });
    // Beam Search reasoning command wrapper with automatic iteration
    server.tool("reason_beam", {
        query: zod_1.z.string().describe("The problem or task to reason about using Beam Search")
    }, async ({ query }) => {
        try {
            // Initialize first thought
            const totalThoughts = 3;
            let currentThought = `Beam Search Reasoning (Step 1/${totalThoughts}): Initial analysis of the problem "${query}":\n\n` +
                `Let me explore multiple approaches to this problem. ${query}\n\n` +
                `[This would be the initial Beam Search-based reasoning]`;
            let thoughtNumber = 1;
            let complete = false;
            let allThoughts = [currentThought];
            // Automatically iterate through all thoughts
            while (!complete && thoughtNumber < totalThoughts) {
                // Simulate next thought generation
                thoughtNumber++;
                const nextThought = `Beam Search Reasoning (Step ${thoughtNumber}/${totalThoughts}): ` +
                    `Considering 3 alternative paths from "${currentThought.slice(0, 50)}...", ` +
                    `the most promising direction is...\n\n` +
                    `[This would be the next step of Beam Search reasoning for: ${query}]`;
                allThoughts.push(nextThought);
                currentThought = nextThought;
                // Check if we've reached the final thought
                if (thoughtNumber >= totalThoughts) {
                    complete = true;
                }
            }
            // Final result with all thoughts
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            strategy: "beam_search",
                            originalPrompt: query,
                            allThoughts: allThoughts,
                            thoughtNumber: thoughtNumber,
                            totalThoughts: totalThoughts,
                            complete: true
                        }, null, 2)
                    }
                ]
            };
        }
        catch (error) {
            throw new errors_1.ReasoningError(`Beam Search reasoning command failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    });
    // R1 reasoning command wrapper (already complete in one step)
    server.tool("reason_r1", {
        query: zod_1.z.string().describe("The problem or task to reason about using R1 Transformer")
    }, async ({ query }) => {
        try {
            // Generate R1 reasoning response
            const reasoning = `R1 Reasoning Analysis:\n\n` +
                `For the problem: "${query}", my analysis is:\n\n` +
                `1. Initial problem understanding: [Simulated R1 analysis]\n` +
                `2. Key aspects to consider: [Simulated R1 analysis]\n` +
                `3. Potential solutions: [Simulated R1 analysis]\n` +
                `4. Recommended approach: [Simulated R1 analysis]\n` +
                `5. Implementation considerations: [Simulated R1 analysis]\n\n` +
                `[This would be actual R1 Transformer-based reasoning content]`;
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            strategy: "r1_transformer",
                            originalPrompt: query,
                            reasoning: reasoning,
                            complete: true
                        }, null, 2)
                    }
                ]
            };
        }
        catch (error) {
            throw new errors_1.ReasoningError(`R1 reasoning command failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    });
    // Hybrid reasoning command wrapper with automatic iteration
    server.tool("reason_hybrid", {
        query: zod_1.z.string().describe("The problem or task to reason about using Hybrid reasoning")
    }, async ({ query }) => {
        try {
            // Initialize first thought
            const totalThoughts = 3;
            let currentThought = `Hybrid Reasoning (Step 1/${totalThoughts}): Initial analysis of the problem "${query}":\n\n` +
                `Using a combination of transformer analysis and MCTS simulation to tackle this problem. ${query}\n\n` +
                `[This would be the initial Hybrid Transformer+MCTS reasoning]`;
            let thoughtNumber = 1;
            let complete = false;
            let allThoughts = [currentThought];
            // Automatically iterate through all thoughts
            while (!complete && thoughtNumber < totalThoughts) {
                // Simulate next thought generation
                thoughtNumber++;
                const nextThought = `Hybrid Reasoning (Step ${thoughtNumber}/${totalThoughts}): ` +
                    `Combining transformer analysis with 50 MCTS simulations on "${currentThought.slice(0, 50)}...", ` +
                    `the enhanced analysis suggests...\n\n` +
                    `[This would be the next step of Hybrid reasoning for: ${query}]`;
                allThoughts.push(nextThought);
                currentThought = nextThought;
                // Check if we've reached the final thought
                if (thoughtNumber >= totalThoughts) {
                    complete = true;
                }
            }
            // Final result with all thoughts
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            strategy: "hybrid_transformer_mcts",
                            originalPrompt: query,
                            allThoughts: allThoughts,
                            thoughtNumber: thoughtNumber,
                            totalThoughts: totalThoughts,
                            complete: true
                        }, null, 2)
                    }
                ]
            };
        }
        catch (error) {
            throw new errors_1.ReasoningError(`Hybrid reasoning command failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    });
}
