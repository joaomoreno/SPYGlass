exports['integer() integer() integer() Parse "" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 0
    },
    "value": 0
  },
  "errors": [
    {
      "range": {
        "start": 0,
        "end": 0
      },
      "message": "Expected an integer",
      "severity": 3
    }
  ]
}

exports['integer() integer() integer() Parse "+" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 1
    },
    "value": null
  },
  "errors": [
    {
      "range": {
        "start": 0,
        "end": 1
      },
      "message": "Illegal integer that doesn't follow /^[+-]?(?:0|[1-9][0-9]*)$/",
      "severity": 3
    }
  ]
}

exports['integer() integer() integer() Parse "+1" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 2
    },
    "value": 1
  },
  "errors": []
}

exports['integer() integer() integer() Parse "-1" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 2
    },
    "value": -1
  },
  "errors": []
}

exports['integer() integer() integer() Parse "-123" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 4
    },
    "value": -123
  },
  "errors": []
}

exports['integer() integer() integer() Parse "0123" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 4
    },
    "value": 123
  },
  "errors": [
    {
      "range": {
        "start": 0,
        "end": 4
      },
      "message": "Illegal integer that doesn't follow /^[+-]?(?:0|[1-9][0-9]*)$/",
      "severity": 3
    }
  ]
}

exports['integer() integer() integer() Parse "123" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 3
    },
    "value": 123
  },
  "errors": []
}

exports['integer() integer() integer() Parse "foo" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 0
    },
    "value": 0
  },
  "errors": [
    {
      "range": {
        "start": 0,
        "end": 0
      },
      "message": "Expected an integer",
      "severity": 3
    }
  ]
}

exports['integer() integer(failsOnEmpty) integer(failsOnEmpty=true) Parse "" 1'] = {
  "node": "FAILURE",
  "errors": []
}

exports['integer() integer(min, max, onOutOfRange) integer(1, 6, true) Parse "0" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 1
    },
    "value": 0
  },
  "errors": [
    {
      "range": {
        "start": 0,
        "end": 1
      },
      "message": "Test message!",
      "severity": 3
    }
  ]
}

exports['integer() integer(min, max, onOutOfRange) integer(1, 6, true) Parse "3" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 1
    },
    "value": 3
  },
  "errors": []
}

exports['integer() integer(min, max, onOutOfRange) integer(1, 6, true) Parse "9" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 1
    },
    "value": 9
  },
  "errors": [
    {
      "range": {
        "start": 0,
        "end": 1
      },
      "message": "Test message!",
      "severity": 3
    }
  ]
}

exports['integer() integer(min, max, onOutOfRange) integer(1, undefined, false) Parse "0" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 1
    },
    "value": 0
  },
  "errors": [
    {
      "range": {
        "start": 0,
        "end": 1
      },
      "message": "Expected an integer between 1 and +∞",
      "severity": 3
    }
  ]
}

exports['integer() integer(min, max, onOutOfRange) integer(1, undefined, false) Parse "3" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 1
    },
    "value": 3
  },
  "errors": []
}

exports['integer() integer(min, max, onOutOfRange) integer(1, undefined, false) Parse "9" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 1
    },
    "value": 9
  },
  "errors": []
}

exports['integer() integer(min, max, onOutOfRange) integer(undefined, 6, false) Parse "0" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 1
    },
    "value": 0
  },
  "errors": []
}

exports['integer() integer(min, max, onOutOfRange) integer(undefined, 6, false) Parse "3" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 1
    },
    "value": 3
  },
  "errors": []
}

exports['integer() integer(min, max, onOutOfRange) integer(undefined, 6, false) Parse "9" 1'] = {
  "node": {
    "type": "integer",
    "range": {
      "start": 0,
      "end": 1
    },
    "value": 9
  },
  "errors": [
    {
      "range": {
        "start": 0,
        "end": 1
      },
      "message": "Expected an integer between -∞ and 6",
      "severity": 3
    }
  ]
}
