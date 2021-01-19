# React Token Auth

This is a boilerplate to set up auth within a react project using express as a backend.

### Features

The features of this boilerplate include:

-   JSON Web Tokens
-   Sign up page (pre-styled)
-   Log in page (pre-styled)
-   User permissions via backend (admin user included)
-   Profiles for user
-   Profile page (non-styled, default value includes an image for database)

### Get Started

To use this boilerplate simply run the following command, then follow the next steps:

-   `git clone https://github.com/sky8the2flies/react-user-boilerplate`

#### Configuration

##### .env file requirements.

-   DATABASE_URL
    -   Database url used for MongoDB.
-   JWT_SECRET
    -   Secret token used to sign user information from backend to frontend.
-   REACT_APP_GOOGLE_CLIENT_ID, GOOGLE_SECRET, GOOGLE_CALLBACK
    -   Used for Google Auth.

### Database

For the database, this boilerplate uses Mongoose. For the mongoose Scheme there are user schema and profile schema.

##### Database - User Schema

The following is what the User Schema stores:

-   Username: Used as a required display name for the client.
-   Email: Used as the required login for the client.
-   Permissions: Optional permissions to use / add / remove.
-   Password: Hashed by bcrypt.

##### Database - Profile Schema

The profile is created once the client signs up usign token auth OR google auth.
The following is what the Profile Schema stores:

-   Image: Default to gender neutral avatar.
-   User: Reference to user.

### Ice Box

The ice box features listed are going to be implemented as soon as possible.

-   [x] Other user profile viewing
-   [ ] Forgot password button
-   [ ] Change password button

### Third party

As of now I am completed with what I wanted to be done for this boilerplate, however I am still taking suggestions. Please feel free to make pull requests and update certain parts that can be improved or just brand new ideas! I will be reviewing all pull requests, yay!

### Author

-   Yours truly, Skyler
