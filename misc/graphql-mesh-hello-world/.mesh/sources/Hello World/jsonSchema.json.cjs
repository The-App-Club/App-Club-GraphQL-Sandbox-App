module.exports = {
  "$ref": "#/definitions/_schema",
  "definitions": {
    "query_greeting": {
      "type": "string",
      "title": "query_greeting"
    },
    "Query": {
      "type": "object",
      "title": "Query",
      "properties": {
        "greeting": {
          "$ref": "#/definitions/query_greeting"
        }
      }
    },
    "QueryInput": {
      "type": "object",
      "title": "QueryInput",
      "properties": {}
    },
    "_schema": {
      "type": "object",
      "title": "_schema",
      "properties": {
        "query": {
          "$ref": "#/definitions/Query"
        },
        "queryInput": {
          "$ref": "#/definitions/QueryInput"
        }
      },
      "required": [
        "query"
      ]
    }
  }
}