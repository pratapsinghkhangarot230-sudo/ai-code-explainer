export async function POST(req: Request) {
  const { code } = await req.json();

  let explanation = "### Code Analysis\n\n";

  // Function detection
  if (code.includes("function") || code.includes("=>")) {
    explanation += "• This code defines a function.\n";
  }

  // Parameters
  if (code.includes("(") && code.includes(")")) {
    explanation += "• It accepts input parameters.\n";
  }

  // Return
  if (code.includes("return")) {
    explanation += "• It returns a value after processing.\n";
  }

  // Loop detection
  if (code.includes("for") || code.includes("while")) {
    explanation += "• It contains a loop for repeated execution.\n";
  }

  // Conditional logic
  if (code.includes("if") || code.includes("else")) {
    explanation += "• It uses conditional logic for decision making.\n";
  }

  // DOM / UI hints
  if (
    code.includes("<") &&
    code.includes(">") &&
    (code.includes("div") || code.includes("className"))
  ) {
    explanation += "• This appears to be UI/JSX code defining components.\n";
  }

  // Math operations
  if (code.includes("+")) explanation += "• Performs addition.\n";
  if (code.includes("*")) explanation += "• Performs multiplication.\n";

  // Fallback
  if (explanation === "### Code Analysis\n\n") {
    explanation += "• This code processes input and produces an output.\n";
  }

  explanation += "\n### Summary\n";
  explanation +=
    "This code follows a structured logic to process input and generate output based on defined operations.";

  return Response.json({ explanation });
}