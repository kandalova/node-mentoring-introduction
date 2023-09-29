# node-mentoring-introduction
Task 5

https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/network/task

We have been asked to develop a REST API for users and their hobbies. The API should have the following functionality:

- Create/delete user.
- Partially update user properties.
- Retrieve user by id, list of users. Returns only user data, no hobbies are returned.
- Add/delete hobby for a specific user.
- Get a list of user hobbies.

Data can be stored in memory as an array. Check the structure of User below:

![2023-09-29_21h02_22](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/299626bb-6d98-431f-af68-13c2acfd7459)


- No frameworks are used. Server is created using http module.
- API is designed based on REST API principles. Constraints are not violated.
- The functionality mentioned above is implemented. Proper status codes are used for responses (not only 200, but also e.g 201, 404). Input validation and authentication can be skipped.
- Note: Try to think of modular structure for the task. Please do not have all the implementation in one file.

Additional (optional tasks):
- Caching headers are added (hint: hobbies do not change so often).
- Hypermedia links (HATEOAS) are included (for each user to retrieve a list of hobbies).
