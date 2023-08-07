// create user Schema

export const createUserSchema = {
  "type": "object",
  "properties": {
    "name": {
      "type": "object",
      "properties": {
        "first": {"type": "string", "minLength": 1},
        "middle": {"type": "string"},
        "last": {"type": "string", "minLength": 1}
      },
      "required": ["first", "last"]
    },
    "email": {"type": "string", "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"},
    "isAdmin": {"type": "boolean"},
    "passcode": {"type": "string", "minLength": 6, "maxLength": 6 }

  },
  "required": ["name", "mobile", "email", "passcode"]
}

export const createChallengeSchema = {
  "type": "object",
  "properties": {
    "title": {"type": "string"},
    "challenge_categories": {"type": "string"},
    "description": {"type": "string"},
    "files": {"type": "string"},
  },
  "required": ["title", "challenge_categories", "description", "files"]
}