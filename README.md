# Welcome to Thunk-todo 👋

### Description

Thunk-todo is a react native application built with the expo framework that enables a user to be able to create, read, update and delete their todos.

## Functional requirements implemented

- ✅ The Home screen displays a list of tasks
- ✅ There is an input field where users can add a new task to the list.
- ✅ Each task has a title, and status (completed or not).
- ✅ Users are able to mark tasks as completed or uncompleted by tapping on them.
- ✅ There is a mechanism to delete tasks from the list.
- ✅ React's Context API was use for global state management
- ✅ Data persistence was implemented to ensure that tasks are saved even if the app is closed or restarted.
- ✅ Filtering options were implemented to allow users to view different subsets of tasks based on their status (completed or uncompleted) via filter radio buttons to switch between different views.
- ✅ Implemented a feature that allows users to edit task details directly from the task list.
- ✅ Added some animated modal for when the user updates a task's status to enhance the visual appeal.
- ✅ Added Unit tests to cover all the files.
- ✅ A beautiful User Interface.

### Other things that can be done to make this more production ready.

1. Integration of tools to help capture exceptions using tools like sentry.
2. Implement UI-automation tests using detox that would run on the CI/CD pipelines. e.t.c
3. pre-commit hooks to run linting and prettier formatting before being able to commit the code.
4. Implement jobs to ensure 100% test coverage on new code on the CI/CD pipelines before they pass. (this should be required alongside two approvals from other team members after review before the developer is able to merge a feature to the main branch).