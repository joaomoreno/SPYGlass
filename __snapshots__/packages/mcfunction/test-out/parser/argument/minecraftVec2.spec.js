exports['mcfunction argument minecraft:vec2 Parse "0 0" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:vec2",
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
      }
    ],
    "dimension": 2,
    "system": 0,
    "name": "test",
    "hover": "<test: vec2>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:vec2 Parse "0.1 -0.5" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:vec2",
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
          "end": 3
        },
        "value": 0.1
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "",
        "range": {
          "start": 4,
          "end": 8
        },
        "value": -0.5
      }
    ],
    "dimension": 2,
    "system": 0,
    "name": "test",
    "hover": "<test: vec2>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:vec2 Parse "~ ~" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:vec2",
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
      }
    ],
    "dimension": 2,
    "system": 0,
    "name": "test",
    "hover": "<test: vec2>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:vec2 Parse "~1 ~-2" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:vec2",
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
          "end": 2
        },
        "value": 1
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "~",
        "range": {
          "start": 3,
          "end": 6
        },
        "value": -2
      }
    ],
    "dimension": 2,
    "system": 0,
    "name": "test",
    "hover": "<test: vec2>"
  },
  "errors": []
}
