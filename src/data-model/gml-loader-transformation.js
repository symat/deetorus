import { initialDataModel } from "./data-model-reducer";

export default function gml_loader_transformator(currentState, action) {
  // TODO: load the actual GML file from public files

  let gmlDict = gml_parser(filter_lines(action.gmlData));
  let globalAttributes = {};
  for (let key of Object.keys(gmlDict)) {
    if (key !== "graph") globalAttributes[key] = gmlDict[key];
  }

  return Object.assign({}, currentState, {
    nodes: gmlDict.graph.node,
    links: gmlDict.graph.edge,
    globalAttributes: globalAttributes,
    table: initialDataModel.table,
    selectedNode: initialDataModel.selectedNode,
    transformations: [...currentState.transformations, action]
  });
}

function filter_lines(gml_text) {
  return gml_text
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith("#"));
}

// https://networkx.github.io/documentation/stable/_modules/networkx/readwrite/gml.html#parse_gml

const tokenType = {
  KEY: "KEY",
  REAL: "REAL",
  INT: "INT",
  STRING: "STRING",
  DICT_START: "DICT_START",
  DICT_END: "DICT_END",
  COMMENT_OR_WHITESPACE: "COMMENT_OR_WHITESPACE"
};

let patterns = {};
patterns[tokenType.KEY] = /^[A-Za-z][0-9A-Za-z_]*\b/;
patterns[tokenType.REAL] = /^[+-]?(?:[0-9]*\.[0-9]+|[0-9]+\.[0-9]*)(?:[Ee][+-]?[0-9]+)?/;
patterns[tokenType.INT] = /^[+-]?[0-9]+/;
patterns[tokenType.STRING] = /^".*?"/;
patterns[tokenType.DICT_START] = /^\[/;
patterns[tokenType.DICT_END] = /^\]/;
patterns[tokenType.COMMENT_OR_WHITESPACE] = /^#.*$|^\s+/;

function next_token_type(string) {
  return Object.values(tokenType).find(type => patterns[type].test(string));
}

function tokenize(lines) {
  let tokens = [];

  for (let line of lines) {
    let remainingString = line;
    while (remainingString.length > 0) {
      let currentTokenType = next_token_type(remainingString);
      if (currentTokenType) {
        let currentTokenValue = remainingString.match(patterns[currentTokenType])[0];
        remainingString = remainingString.substring(currentTokenValue.length);
        if (currentTokenType === tokenType.INT)
          tokens.push({
            type: currentTokenType,
            value: parseInt(currentTokenValue, 10)
          });
        else if (currentTokenType === tokenType.REAL)
          tokens.push({
            type: currentTokenType,
            value: parseFloat(currentTokenValue, 10)
          });
        else if (currentTokenType === tokenType.STRING)
          tokens.push({
            type: currentTokenType,
            value: currentTokenValue.substring(1, currentTokenValue.length - 1)
          });
        else if (
          currentTokenType === tokenType.DICT_START ||
          currentTokenType === tokenType.DICT_END ||
          currentTokenType === tokenType.KEY
        )
          tokens.push({ type: currentTokenType, value: currentTokenValue });
      } else throw new Error(`[GML parser] error during tokenize string : ${line}`);
    }
  }
  return tokens;
}

function parse_dict(tokens, startTokenId) {
  let currentTokenId = startTokenId;
  let currentToken = tokens[currentTokenId];
  let dict = {};
  while (currentTokenId < tokens.length && currentToken.type === tokenType.KEY) {
    let key = currentToken.value;
    if (!dict[key]) dict[key] = [];
    currentToken = tokens[++currentTokenId];
    if ([tokenType.INT, tokenType.REAL, tokenType.STRING].includes(currentToken.type)) {
      dict[key].push(currentToken.value);
    } else if (currentToken.type === tokenType.DICT_START) {
      currentTokenId++;
      let { resultDict, tokenId } = parse_dict(tokens, currentTokenId);
      dict[key].push(resultDict);
      currentTokenId = tokenId;
      if (tokens[currentTokenId].type !== tokenType.DICT_END)
        throw new Error(`[GML parser] missing DICT_END token! tokenID: ${currentTokenId}`);
    } else
      throw new Error(
        `[GML parser] unexpected token type ${currentToken.type}! tokenID: ${currentTokenId}` + currentTokenId
      );
    currentToken = tokens[++currentTokenId];
  }
  let resultDict = {};
  for (let key of Object.keys(dict)) {
    resultDict[key] = dict[key].length === 1 ? dict[key][0] : dict[key];
  }
  return { resultDict, tokenId: currentTokenId };
}

function gml_parser(lines) {
  let tokens = tokenize(lines);
  let { resultDict, tokenId } = parse_dict(tokens, 0);
  if (tokenId !== tokens.length) throw new Error(`[GML parser] did not process all the tokens! tokenId: ${tokenId}`);
  return resultDict;
}
