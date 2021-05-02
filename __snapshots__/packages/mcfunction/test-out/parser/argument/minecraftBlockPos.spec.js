exports['mcfunction argument minecraft:block_pos Parse "0 0 0" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:block_pos",
    "range": {
      "start": 0,
      "end": 0
    },
    "children": [
      {
        "type": "mcfunction:coordinate",
        "notation": "",
        "range": {
          "start": 0,
          "end": 1
        },
        "value": 0
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "",
        "range": {
          "start": 2,
          "end": 3
        },
        "value": 0
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "",
        "range": {
          "start": 4,
          "end": 5
        },
        "value": 0
      }
    ],
    "dimension": 3,
    "system": 0,
    "name": "test",
    "hover": "<test: block_pos>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:block_pos Parse "0.5 0 0.5" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:block_pos",
    "range": {
      "start": 0,
      "end": 0
    },
    "children": [
      {
        "type": "mcfunction:coordinate",
        "notation": "",
        "range": {
          "start": 0,
          "end": 1
        },
        "value": 0
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "",
        "range": {
          "start": 1,
          "end": 1
        },
        "value": 0
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "",
        "range": {
          "start": 1,
          "end": 1
        },
        "value": 0
      }
    ],
    "dimension": 3,
    "system": 0,
    "name": "test",
    "hover": "<test: block_pos>"
  },
  "errors": [
    {
      "range": {
        "start": 1,
        "end": 1
      },
      "message": "Expected a space (“ ”)",
      "severity": 3
    },
    {
      "range": {
        "start": 1,
        "end": 1
      },
      "message": "Expected an integer",
      "severity": 3
    },
    {
      "range": {
        "start": 1,
        "end": 1
      },
      "message": "Expected a space (“ ”)",
      "severity": 3
    },
    {
      "range": {
        "start": 1,
        "end": 1
      },
      "message": "Expected an integer",
      "severity": 3
    }
  ]
}

exports['mcfunction argument minecraft:block_pos Parse "^ ^ ^" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:block_pos",
    "range": {
      "start": 0,
      "end": 0
    },
    "children": [
      {
        "type": "mcfunction:coordinate",
        "notation": "^",
        "range": {
          "start": 0,
          "end": 1
        },
        "value": 0
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "^",
        "range": {
          "start": 2,
          "end": 3
        },
        "value": 0
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "^",
        "range": {
          "start": 4,
          "end": 5
        },
        "value": 0
      }
    ],
    "dimension": 3,
    "system": 1,
    "name": "test",
    "hover": "<test: block_pos>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:block_pos Parse "^1 ^ ^-5" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:block_pos",
    "range": {
      "start": 0,
      "end": 0
    },
    "children": [
      {
        "type": "mcfunction:coordinate",
        "notation": "^",
        "range": {
          "start": 0,
          "end": 2
        },
        "value": 1
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "^",
        "range": {
          "start": 3,
          "end": 4
        },
        "value": 0
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "^",
        "range": {
          "start": 5,
          "end": 8
        },
        "value": -5
      }
    ],
    "dimension": 3,
    "system": 1,
    "name": "test",
    "hover": "<test: block_pos>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:block_pos Parse "~ ~ ~" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:block_pos",
    "range": {
      "start": 0,
      "end": 0
    },
    "children": [
      {
        "type": "mcfunction:coordinate",
        "notation": "~",
        "range": {
          "start": 0,
          "end": 1
        },
        "value": 0
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "~",
        "range": {
          "start": 2,
          "end": 3
        },
        "value": 0
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "~",
        "range": {
          "start": 4,
          "end": 5
        },
        "value": 0
      }
    ],
    "dimension": 3,
    "system": 0,
    "name": "test",
    "hover": "<test: block_pos>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:block_pos Parse "~0.5 ~1 ~-5" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:block_pos",
    "range": {
      "start": 0,
      "end": 0
    },
    "children": [
      {
        "type": "mcfunction:coordinate",
        "notation": "~",
        "range": {
          "start": 0,
          "end": 4
        },
        "value": 0.5
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "~",
        "range": {
          "start": 5,
          "end": 7
        },
        "value": 1
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "~",
        "range": {
          "start": 8,
          "end": 11
        },
        "value": -5
      }
    ],
    "dimension": 3,
    "system": 0,
    "name": "test",
    "hover": "<test: block_pos>"
  },
  "errors": []
}
