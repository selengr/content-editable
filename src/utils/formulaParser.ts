import { Element } from "@/types/formulaEditor";


export function parseFormula(formula: string): Element[] {
  const elements: Element[] = [];
  let avgParenthesisCount = 0;

  const regex = /{#[qv]_(\d+)}|#avgNumber$$|[+\-*/()]|$$\(|[)](?={)/g;
  let match;

  while ((match = regex.exec(formula)) !== null) {
    const token = match[0];

    if (token.startsWith('{#')) {
      const type = token.includes('#q_') ? 'NEW_FIELD' : 'NUMBER';
      const content = token.match(/\d+/)![0];
      const element: Element = {
        type: type as 'NEW_FIELD' | 'NUMBER',
        content,
        ...(type === 'NEW_FIELD' && { id: `select_${Date.now()}` })
      };
      elements.push(element);
    } else if (token === '#avgNumber(') {
      elements.push({
        type: 'NEW_FnFx',
        content: 'میانگین()',
        id: `select_${Date.now()}`
      });
      avgParenthesisCount++;
    } else if (['+', '-', '*', '/'].includes(token)) {
      elements.push({ type: 'OPERATOR', content: token });
    } else if (token === '(' || token === ')') {
      if (avgParenthesisCount > 0) {
        elements.push({ type: 'AVG_PARENTHESIS', content: token });
        if (token === ')') avgParenthesisCount--;
      } else {
        elements.push({ type: 'PARENTHESIS', content: token });
      }
    } else if (token === ')(') {
      elements.push({ type: 'PARENTHESIS', content: ')' });
      elements.push({ type: 'OPERATOR', content: '*' });
      elements.push({ type: 'PARENTHESIS', content: '(' });
    } else if (token === ')' && formula[match.index + 1] === '{') {
      elements.push({ type: 'PARENTHESIS', content: ')' });
      elements.push({ type: 'OPERATOR', content: '*' });
    }
  }

  return elements;
}

