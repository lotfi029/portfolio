// Generate a bcrypt hash for ADMIN_PASSWORD_HASH.
// Usage: node hash-password.js 'your-password'
import bcrypt from 'bcryptjs'

const password = process.argv[2]
if (!password) {
  console.error("Usage: node hash-password.js 'your-password'")
  process.exit(1)
}
console.log(bcrypt.hashSync(password, 10))
