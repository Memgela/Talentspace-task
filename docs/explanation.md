# Explanation

## Registration

### Case 1. User registration.

Here is a simple implementation just putting user data into the registration form and waiting for the Dashboard to be loaded.

Sign-up logic moved to function to be able to use it in both cases.

### Case 2. Register existing user.

I wrote the `createUser` command to be able quickly createUser instead of going through interactions with the interface twice. Ideally, we should have the same kind of function for `signIn` to use it in cases where we interact with the interface after authentication.

## Reading list

### Adding a book to the reading list

First of all, we want to be sure that there are no books on the reading list for a new user.

Then we go to the Discover tab and add the book from there. After being sure that book was added(I've met a bug here when the buttons on the book card didn't change ) we go back to Reading List and check if the book is available there.

As we often use the `aria-label` attribute to locate the elements on the page I'd added something like the `getByLabel` command for such cases to have concise code.