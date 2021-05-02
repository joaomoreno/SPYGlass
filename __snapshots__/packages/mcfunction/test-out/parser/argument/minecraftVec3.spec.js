exports['mcfunction argument minecraft:vec3 Parse "0 0 0" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:vec3",
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
    "hover": "<test: vec3>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:vec3 Parse "0.1 -0.5 .9" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:vec3",
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
      },
      {
        "type": "mcfunction:coordinate",
        "notation": "",
        "range": {
          "start": 9,
          "end": 11
        },
        "value": 0.9
      }
    ],
    "dimension": 3,
    "system": 0,
    "name": "test",
    "hover": "<test: vec3>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:vec3 Parse "^ ^ ^" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:vec3",
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
    "hover": "<test: vec3>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:vec3 Parse "^1 ^ ^-5" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:vec3",
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
    "hover": "<test: vec3>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:vec3 Parse "~ ~ ~" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:vec3",
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
    "hover": "<test: vec3>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:vec3 Parse "~0.5 ~1 ~-5" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:vec3",
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
    "hover": "<test: vec3>"
  },
  "errors": []
}
