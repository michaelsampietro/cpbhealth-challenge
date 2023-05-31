# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
Basically, I focused on trying to separate the concerns a little bit. I split the logic to read a candidate key into a new function (`getCandidatePartitionKey`), so the main function becomes easier to read and maintain.

I worked on two things:
- Created a new function (getCandidatePartitionKey) to read the value of the candidate key
- The main function now deals only with returning the candidate key, making it easier to read.

I also tried to improve the function readability a little bit by trying to remove nested ifs and elses statements. Now, whenever a return criteria is met, the function returns the value, instead of reasigning the value to a variable to return it at the end.

I tried to avoid "obvious" comments in the function and I think my test suits cover all the scenarios.
