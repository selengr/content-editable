import { Element } from "@/types/formulaEditor";

export function parseFormula(formula: string): Element[] {
    const elements: Element[] = [];
    let avgParenthesisDepth = 0;
  
    // const regex = /{#[qv]_(\d+)}|#avgNumber$${{|}}$$|[+\-*/()]|\)$$|\({|$$}|[)](?={)/g;
const regex = /({#v_\d+})|({#q_\d+})|({#calc_\d+})|([+\-*/])|(#avgNumber)|(\(\{\{)|(\(\{)|(\}\)\})|(\)\})/g;

    let match;
  
    while ((match = regex.exec(formula)) !== null) {
      const token = match[0];
       console.log('token :>> ', token);
      if (token.startsWith('{#')) {
        const type = token.includes('#q_') ? 'NEW_FIELD' : 'NUMBER';
        const content = token.match(/\d+/)![0];
        const element: Element = {
          type: type as 'NEW_FIELD' | 'NUMBER',
          content,
          ...(type === 'NEW_FIELD' && { id: `select_${Date.now()}` })
        };
        elements.push(element);
      } else if (token === '#avgNumber') {
        elements.push({
          type: 'NEW_FnFx',
          content: 'میانگین()',
          id: `select_${Date.now()}`
        });
        elements.push({ type: 'AVG_PARENTHESIS', content: '(' });
        // avgParenthesisDepth++;
      } else if (token === '}})') {
        elements.push({ type: 'AVG_PARENTHESIS', content: ')' });
        // avgParenthesisDepth--;
      } else if (['+', '-', '*', '/'].includes(token)) {
        elements.push({ type: 'OPERATOR', content: token });
      } else if (token === '}})') {
          elements.push({ type: 'AVG_PARENTHESIS', content: token });
       
      } else if (token === ')(') {
        // elements.push({ type: 'PARENTHESIS', content: ')' });
        // elements.push({ type: 'OPERATOR', content: '*' });
        // elements.push({ type: 'PARENTHESIS', content: '(' });
      } else if (token === '({' || token === ')}') {
        elements.push({ type: 'PARENTHESIS', content: token[0] });
      }
    }
  
    return elements;
  }