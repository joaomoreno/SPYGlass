exports['mcfunction literal() Parse "" 1'] = {
  "node": "FAILURE",
  "errors": []
}

exports['mcfunction literal() Parse "advancement grant @s everything" 1'] = {
  "node": {
    "type": "mcfunction:literal",
    "range": {
      "start": 0,
      "end": 11
    },
    "options": {
      "pool": [
        "advancement",
        "tellraw",
        "tell"
      ]
    },
    "value": "advancement",
    "name": "advancement",
    "isRoot": false
  },
  "errors": []
}

exports['mcfunction literal() Parse "tell @p Hello!" 1'] = {
  "node": {
    "type": "mcfunction:literal",
    "range": {
      "start": 0,
      "end": 4
    },
    "options": {
      "pool": [
        "advancement",
        "tellraw",
        "tell"
      ]
    },
    "value": "tell",
    "name": "tell",
    "isRoot": false
  },
  "errors": []
}

exports['mcfunction literal() Parse "tellraw @a "World!"" 1'] = {
  "node": {
    "type": "mcfunction:literal",
    "range": {
      "start": 0,
      "end": 7
    },
    "options": {
      "pool": [
        "advancement",
        "tellraw",
        "tell"
      ]
    },
    "value": "tellraw",
    "name": "tellraw",
    "isRoot": false
  },
  "errors": []
}
