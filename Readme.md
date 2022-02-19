## CICD Demo for k8s deployment

This is for Backend API part exposing the following APIs without Security enforcement:
- POST '/api/cicd/user' to createUser
- PUT '/api/cicd/user/:id' to updateUser
- DELETE '/api/cicd/user/:id' to deleteUser
- GET '/api/cicd/user/:id' to getUserById
- GET '/api/cicd/users' to get all Users

APIs with Security enforcement (using APIkey in Http Header):

- POST '/api/cicd/apikey/user' to createUser
- PUT '/api/cicd/apikey/user/:id' to updateUser
- DELETE '/api/cicd/apikey/user/:id' to deleteUser
- GET '/api/cicd/apikey/user/:id' to getUserById
- GET '/api/cicd/apikey/users' to get all Users

The backend database is MongoDB Atlas.

[Add Microservices pattern description]

This project also supports CICD process.
Particularily this project is to focus on CI part as follows:
1. Develop code by integrating with Github @ https://github.com/simhead/soynet-mern-backend
2. Test and validate locally
3. Push to Jenkins:
   1. build docker image
   2. push image to Dockerhub
   3. initiate CD flow.

Jenkins is to trigger CD flow by notifying the change in Github source @ https://github.com/simhead/cicd-demo-gitops-argocd
