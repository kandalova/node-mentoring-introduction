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

Some results

![2023-10-02_22h13_46](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/ed8fc1c6-3d02-40ea-8a77-785bad6810eb)

![2023-10-02_22h14_52](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/f6da5e4b-2959-4842-ab9f-ea330a4b2ccf)

![image](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/93449270-ee27-4240-9bcb-a445a78f75e7)

![2023-10-02_22h16_36](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/e06107a0-ef9f-4f0a-aa70-e0c62239b0a3)

![2023-10-02_22h17_37](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/4e38d9ee-40a7-4666-b08b-781d289ac0b4)

![2023-10-02_22h22_12](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/b60d27dd-51d2-48ed-a257-5c18b4b1cc8a)

![image](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/77c2f0d6-e214-4f97-a2f4-84c12b0a622d)

![image](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/7feecf9f-c953-42e5-a22f-fbc2db1fdc9c)

![image](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/562c1e4a-090a-4a21-8c93-a85b28a117af)

![image](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/15371933-5a6c-4645-981b-cb43810297fb)

![2023-10-02_22h33_47](https://github.com/kandalova/node-mentoring-introduction/assets/26093763/75d7d896-e499-4bb5-aad4-3eb97963bd3e)





