exports['mcfunction argument minecraft:block_predicate Parse "#stone" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:block_predicate",
    "range": {
      "start": 0,
      "end": 6
    },
    "children": [
      {
        "type": "resource_location",
        "range": {
          "start": 0,
          "end": 6
        },
        "options": {
          "category": "block",
          "allowTag": true
        },
        "isTag": true,
        "path": [
          "stone"
        ]
      }
    ],
    "name": "test",
    "id": {
      "type": "resource_location",
      "range": {
        "start": 0,
        "end": 6
      },
      "options": {
        "category": "block",
        "allowTag": true
      },
      "isTag": true,
      "path": [
        "stone"
      ]
    },
    "hover": "<test: block_predicate>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:block_predicate Parse "#stone[foo=bar]{baz:nbt}" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:block_predicate",
    "range": {
      "start": 0,
      "end": 24
    },
    "children": [
      {
        "type": "resource_location",
        "range": {
          "start": 0,
          "end": 6
        },
        "options": {
          "category": "block",
          "allowTag": true
        },
        "isTag": true,
        "path": [
          "stone"
        ]
      },
      {
        "type": "mcfunction:block/states",
        "range": {
          "start": 6,
          "end": 15
        },
        "children": [
          {
            "type": "pair",
            "range": {
              "start": 7,
              "end": 14
            },
            "children": [
              {
                "type": "string",
                "range": {
                  "start": 7,
                  "end": 10
                },
                "options": {
                  "escapable": {},
                  "quotes": [
                    "\"",
                    "'"
                  ],
                  "unquotable": {},
                  "colorTokenType": "property"
                },
                "value": "foo",
                "valueMap": {
                  "outerRange": {
                    "start": 7,
                    "end": 10
                  },
                  "innerRange": {
                    "start": 0,
                    "end": 3
                  },
                  "pairs": []
                }
              },
              {
                "type": "string",
                "range": {
                  "start": 11,
                  "end": 14
                },
                "options": {
                  "escapable": {},
                  "quotes": [
                    "\"",
                    "'"
                  ],
                  "unquotable": {}
                },
                "value": "bar",
                "valueMap": {
                  "outerRange": {
                    "start": 11,
                    "end": 14
                  },
                  "innerRange": {
                    "start": 0,
                    "end": 3
                  },
                  "pairs": []
                }
              }
            ],
            "key": {
              "type": "string",
              "range": {
                "start": 7,
                "end": 10
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {},
                "colorTokenType": "property"
              },
              "value": "foo",
              "valueMap": {
                "outerRange": {
                  "start": 7,
                  "end": 10
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            },
            "sep": {
              "start": 10,
              "end": 11
            },
            "value": {
              "type": "string",
              "range": {
                "start": 11,
                "end": 14
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {}
              },
              "value": "bar",
              "valueMap": {
                "outerRange": {
                  "start": 11,
                  "end": 14
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            }
          }
        ]
      },
      {
        "type": "nbt:compound",
        "range": {
          "start": 15,
          "end": 24
        },
        "children": [
          {
            "type": "pair",
            "range": {
              "start": 16,
              "end": 23
            },
            "children": [
              {
                "type": "string",
                "range": {
                  "start": 16,
                  "end": 19
                },
                "options": {
                  "escapable": {},
                  "quotes": [
                    "\"",
                    "'"
                  ],
                  "unquotable": {}
                },
                "value": "baz",
                "valueMap": {
                  "outerRange": {
                    "start": 16,
                    "end": 19
                  },
                  "innerRange": {
                    "start": 0,
                    "end": 3
                  },
                  "pairs": []
                }
              },
              {
                "type": "string",
                "range": {
                  "start": 20,
                  "end": 23
                },
                "options": {
                  "escapable": {},
                  "quotes": [
                    "\"",
                    "'"
                  ],
                  "unquotable": {}
                },
                "value": "nbt",
                "valueMap": {
                  "outerRange": {
                    "start": 20,
                    "end": 23
                  },
                  "innerRange": {
                    "start": 0,
                    "end": 3
                  },
                  "pairs": []
                }
              }
            ],
            "key": {
              "type": "string",
              "range": {
                "start": 16,
                "end": 19
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {}
              },
              "value": "baz",
              "valueMap": {
                "outerRange": {
                  "start": 16,
                  "end": 19
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            },
            "sep": {
              "start": 19,
              "end": 20
            },
            "value": {
              "type": "string",
              "range": {
                "start": 20,
                "end": 23
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {}
              },
              "value": "nbt",
              "valueMap": {
                "outerRange": {
                  "start": 20,
                  "end": 23
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            }
          }
        ]
      }
    ],
    "name": "test",
    "id": {
      "type": "resource_location",
      "range": {
        "start": 0,
        "end": 6
      },
      "options": {
        "category": "block",
        "allowTag": true
      },
      "isTag": true,
      "path": [
        "stone"
      ]
    },
    "states": {
      "type": "mcfunction:block/states",
      "range": {
        "start": 6,
        "end": 15
      },
      "children": [
        {
          "type": "pair",
          "range": {
            "start": 7,
            "end": 14
          },
          "children": [
            {
              "type": "string",
              "range": {
                "start": 7,
                "end": 10
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {},
                "colorTokenType": "property"
              },
              "value": "foo",
              "valueMap": {
                "outerRange": {
                  "start": 7,
                  "end": 10
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            },
            {
              "type": "string",
              "range": {
                "start": 11,
                "end": 14
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {}
              },
              "value": "bar",
              "valueMap": {
                "outerRange": {
                  "start": 11,
                  "end": 14
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            }
          ],
          "key": {
            "type": "string",
            "range": {
              "start": 7,
              "end": 10
            },
            "options": {
              "escapable": {},
              "quotes": [
                "\"",
                "'"
              ],
              "unquotable": {},
              "colorTokenType": "property"
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 7,
                "end": 10
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          "sep": {
            "start": 10,
            "end": 11
          },
          "value": {
            "type": "string",
            "range": {
              "start": 11,
              "end": 14
            },
            "options": {
              "escapable": {},
              "quotes": [
                "\"",
                "'"
              ],
              "unquotable": {}
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 11,
                "end": 14
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        }
      ]
    },
    "nbt": {
      "type": "nbt:compound",
      "range": {
        "start": 15,
        "end": 24
      },
      "children": [
        {
          "type": "pair",
          "range": {
            "start": 16,
            "end": 23
          },
          "children": [
            {
              "type": "string",
              "range": {
                "start": 16,
                "end": 19
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {}
              },
              "value": "baz",
              "valueMap": {
                "outerRange": {
                  "start": 16,
                  "end": 19
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            },
            {
              "type": "string",
              "range": {
                "start": 20,
                "end": 23
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {}
              },
              "value": "nbt",
              "valueMap": {
                "outerRange": {
                  "start": 20,
                  "end": 23
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            }
          ],
          "key": {
            "type": "string",
            "range": {
              "start": 16,
              "end": 19
            },
            "options": {
              "escapable": {},
              "quotes": [
                "\"",
                "'"
              ],
              "unquotable": {}
            },
            "value": "baz",
            "valueMap": {
              "outerRange": {
                "start": 16,
                "end": 19
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          "sep": {
            "start": 19,
            "end": 20
          },
          "value": {
            "type": "string",
            "range": {
              "start": 20,
              "end": 23
            },
            "options": {
              "escapable": {},
              "quotes": [
                "\"",
                "'"
              ],
              "unquotable": {}
            },
            "value": "nbt",
            "valueMap": {
              "outerRange": {
                "start": 20,
                "end": 23
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        }
      ]
    },
    "hover": "<test: block_predicate>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:block_predicate Parse "minecraft:stone" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:block_predicate",
    "range": {
      "start": 0,
      "end": 15
    },
    "children": [
      {
        "type": "resource_location",
        "range": {
          "start": 0,
          "end": 15
        },
        "options": {
          "category": "block",
          "allowTag": true
        },
        "namespace": "minecraft",
        "path": [
          "stone"
        ]
      }
    ],
    "name": "test",
    "id": {
      "type": "resource_location",
      "range": {
        "start": 0,
        "end": 15
      },
      "options": {
        "category": "block",
        "allowTag": true
      },
      "namespace": "minecraft",
      "path": [
        "stone"
      ]
    },
    "hover": "<test: block_predicate>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:block_predicate Parse "stone" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:block_predicate",
    "range": {
      "start": 0,
      "end": 5
    },
    "children": [
      {
        "type": "resource_location",
        "range": {
          "start": 0,
          "end": 5
        },
        "options": {
          "category": "block",
          "allowTag": true
        },
        "path": [
          "stone"
        ]
      }
    ],
    "name": "test",
    "id": {
      "type": "resource_location",
      "range": {
        "start": 0,
        "end": 5
      },
      "options": {
        "category": "block",
        "allowTag": true
      },
      "path": [
        "stone"
      ]
    },
    "hover": "<test: block_predicate>"
  },
  "errors": []
}

exports['mcfunction argument minecraft:block_predicate Parse "stone[foo=bar]" 1'] = {
  "node": {
    "type": "mcfunction:argument/minecraft:block_predicate",
    "range": {
      "start": 0,
      "end": 14
    },
    "children": [
      {
        "type": "resource_location",
        "range": {
          "start": 0,
          "end": 5
        },
        "options": {
          "category": "block",
          "allowTag": true
        },
        "path": [
          "stone"
        ]
      },
      {
        "type": "mcfunction:block/states",
        "range": {
          "start": 5,
          "end": 14
        },
        "children": [
          {
            "type": "pair",
            "range": {
              "start": 6,
              "end": 13
            },
            "children": [
              {
                "type": "string",
                "range": {
                  "start": 6,
                  "end": 9
                },
                "options": {
                  "escapable": {},
                  "quotes": [
                    "\"",
                    "'"
                  ],
                  "unquotable": {},
                  "colorTokenType": "property"
                },
                "value": "foo",
                "valueMap": {
                  "outerRange": {
                    "start": 6,
                    "end": 9
                  },
                  "innerRange": {
                    "start": 0,
                    "end": 3
                  },
                  "pairs": []
                }
              },
              {
                "type": "string",
                "range": {
                  "start": 10,
                  "end": 13
                },
                "options": {
                  "escapable": {},
                  "quotes": [
                    "\"",
                    "'"
                  ],
                  "unquotable": {}
                },
                "value": "bar",
                "valueMap": {
                  "outerRange": {
                    "start": 10,
                    "end": 13
                  },
                  "innerRange": {
                    "start": 0,
                    "end": 3
                  },
                  "pairs": []
                }
              }
            ],
            "key": {
              "type": "string",
              "range": {
                "start": 6,
                "end": 9
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {},
                "colorTokenType": "property"
              },
              "value": "foo",
              "valueMap": {
                "outerRange": {
                  "start": 6,
                  "end": 9
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            },
            "sep": {
              "start": 9,
              "end": 10
            },
            "value": {
              "type": "string",
              "range": {
                "start": 10,
                "end": 13
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {}
              },
              "value": "bar",
              "valueMap": {
                "outerRange": {
                  "start": 10,
                  "end": 13
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            }
          }
        ]
      }
    ],
    "name": "test",
    "id": {
      "type": "resource_location",
      "range": {
        "start": 0,
        "end": 5
      },
      "options": {
        "category": "block",
        "allowTag": true
      },
      "path": [
        "stone"
      ]
    },
    "states": {
      "type": "mcfunction:block/states",
      "range": {
        "start": 5,
        "end": 14
      },
      "children": [
        {
          "type": "pair",
          "range": {
            "start": 6,
            "end": 13
          },
          "children": [
            {
              "type": "string",
              "range": {
                "start": 6,
                "end": 9
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {},
                "colorTokenType": "property"
              },
              "value": "foo",
              "valueMap": {
                "outerRange": {
                  "start": 6,
                  "end": 9
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            },
            {
              "type": "string",
              "range": {
                "start": 10,
                "end": 13
              },
              "options": {
                "escapable": {},
                "quotes": [
                  "\"",
                  "'"
                ],
                "unquotable": {}
              },
              "value": "bar",
              "valueMap": {
                "outerRange": {
                  "start": 10,
                  "end": 13
                },
                "innerRange": {
                  "start": 0,
                  "end": 3
                },
                "pairs": []
              }
            }
          ],
          "key": {
            "type": "string",
            "range": {
              "start": 6,
              "end": 9
            },
            "options": {
              "escapable": {},
              "quotes": [
                "\"",
                "'"
              ],
              "unquotable": {},
              "colorTokenType": "property"
            },
            "value": "foo",
            "valueMap": {
              "outerRange": {
                "start": 6,
                "end": 9
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          },
          "sep": {
            "start": 9,
            "end": 10
          },
          "value": {
            "type": "string",
            "range": {
              "start": 10,
              "end": 13
            },
            "options": {
              "escapable": {},
              "quotes": [
                "\"",
                "'"
              ],
              "unquotable": {}
            },
            "value": "bar",
            "valueMap": {
              "outerRange": {
                "start": 10,
                "end": 13
              },
              "innerRange": {
                "start": 0,
                "end": 3
              },
              "pairs": []
            }
          }
        }
      ]
    },
    "hover": "<test: block_predicate>"
  },
  "errors": []
}
