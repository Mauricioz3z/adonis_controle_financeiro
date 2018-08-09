'use strict'

class Authenticated {
  async handle ({ request, auth, response }, next) {
    try {
      await auth.check()
      await next()
    } catch (error) {
      // await next()
      return response.redirect('/login')
    }
  }
}

module.exports = Authenticated
