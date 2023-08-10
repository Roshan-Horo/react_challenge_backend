// create user Schema

export const createUserSchema = {
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "email": {"type": "string", "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"},
    "isAdmin": {"type": "boolean"},
  },
  "required": ["name", "email"]
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