# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
BasicaMylly, I focused on trying to separate the concerns a little bit. I split the logic to read a candidate key into a new function (`getCandidatePartitionKey`), so it becomes easier to access, read and maintain.

I tried to improve the functions readability a little bit by trying removing nested ifs/elses. Now, whenever a return criteria is met, I return the value in a more "direct" way, instead of reasigning the variables a new value whenever needed to return it at the end.