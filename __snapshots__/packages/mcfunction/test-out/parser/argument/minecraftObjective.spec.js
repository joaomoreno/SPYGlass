exports['mcfunction argument minecraft:objective Parse "*" 1'] = {
  "node": "FAILURE",
  "errors": []
}

exports['mcfunction argument minecraft:objective Parse "012" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:objective",
    "range": {
      "start": 0,
      "end": 3
    },
    "options": {
      "category": "objective"
    },
    "value": "012",
    "symbol": {
      "category": "objective",
      "identifier": "012",
      "reference": [
        {
          "uri": ""
        }
      ]
    },
    "name": "test",
    "hover": "<test: objective>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:objective Parse "foo" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:objective",
    "range": {
      "start": 0,
      "end": 3
    },
    "options": {
      "category": "objective"
    },
    "value": "foo",
    "symbol": {
      "category": "objective",
      "identifier": "foo",
      "reference": [
        {
          "uri": ""
        }
      ]
    },
    "name": "test",
    "hover": "<test: objective>"
  },
  "errors": []
}
