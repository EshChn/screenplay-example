const { Given, When, Then } = require('cucumber')
const { is, not, matchesPattern, hasItem, isEmpty } = require('hamjest')
const { CreateAccount, ActivateAccount, CreateProject, SignIn } = require('../support/actions')
const { SignUp } = require('../support/tasks')
const { ProjectsVisible, IsAuthenticated, AuthenticationError } = require('../support/questions')
const { checkThat } = require('../support/screenplay')

Given('{actor} has created an account', function (actor) {
  actor.attemptsTo(CreateAccount.forThemselves)
})

When('{actor} tries to sign in', function (actor) {
  actor.attemptsTo(SignIn)
})

When('{actor} activates his/her account', function (actor) {
  actor.attemptsTo(ActivateAccount)
})

When('{actor} (tries to )create(s) a project', function (actor) {
  actor.attemptsTo(CreateProject.named('a-project'))
})

Given('{actor} has signed up', function (actor) {
  actor.attemptsTo(SignUp)
})

Then('{actor} should see the project', function (actor) {
  actor.attemptsTo(
    checkThat(
      ProjectsVisible,
      hasItem({ name: 'a-project' })
    )
  )
})

Then('{actor} should not see any projects', function (actor) {
  actor.attemptsTo(
    checkThat(
      ProjectsVisible,
      isEmpty()
    )
  )
})

Then('{actor} should not be authenticated', function (actor) {
  actor.attemptsTo(
    checkThat(
      IsAuthenticated,
      is(not(true))
    )
  )
})

Then('{actor} should be authenticated', function (actor) {
  actor.attemptsTo(
    checkThat(
      IsAuthenticated,
      is(true)
    )
  )
})

Then('{actor} should see an error telling him/her to activate the account', function (actor) {
  actor.attemptsTo(
    checkThat(
      AuthenticationError,
      matchesPattern(/activate your account/)
    )
  )
})

