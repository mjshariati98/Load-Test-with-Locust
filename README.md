# Load Test with Locust
This project consists of the following components:
- A simple frontend
- A minimal web backed by GoLang
- A minimal web backend by Node.js
- A Nginx as a load balancer

We will perform four load-testing scenarios by [Locust](https://locust.io/). Its results are provided below.

## Load Tests
Four scenarios are tested:
1. One Go backend and One NodeJS backend
2. Two Go backends and Two NodeJS backend
3. Three Go backends and Two NodeJS backend
4. Two Go backends and Three NodeJS backend

In all tests, there are 1000 users (50 user/second Spawn rate), and each test is run for 2 minutes.

### 1. One Go backend and One NodeJS backend
#### Stats of the containers before starting the test
![stats-before](https://github.com/web-14001/hw1/blob/master/load-test-results/stats-before-one-one.png)
#### Stats of the containers during the test
![stats-middle](https://github.com/web-14001/hw1/blob/master/load-test-results/stats-middle-one-one.png)
#### Statistics of the endpoints
![statistics](https://github.com/web-14001/hw1/blob/master/load-test-results/statistics-one-one.png)
#### Charts
![charts](https://github.com/web-14001/hw1/blob/master/load-test-results/charts-one-one.png)


### 2. Two Go backend and Two NodeJS backend
#### Stats of the containers before starting the test
![stats-before](https://github.com/web-14001/hw1/blob/master/load-test-results/stats-before-two-two.png)
#### Stats of the containers during the test
![stats-middle](https://github.com/web-14001/hw1/blob/master/load-test-results/stats-middle-two-two.png)
#### Statistics of the endpoints
![statistics](https://github.com/web-14001/hw1/blob/master/load-test-results/statistics-two-two.png)
#### Charts
![charts](https://github.com/web-14001/hw1/blob/master/load-test-results/charts-two-two.png)

### 3. Three Go backend and Two NodeJS backend
#### Stats of the containers before starting the test
![stats-before](https://github.com/web-14001/hw1/blob/master/load-test-results/stats-before-three-two.png)
#### Stats of the containers during the test
![stats-middle](https://github.com/web-14001/hw1/blob/master/load-test-results/stats-middle-three-two.png)
#### Statistics of the endpoints
![statistics](https://github.com/web-14001/hw1/blob/master/load-test-results/statistics-three-two.png)
#### Charts
![charts](https://github.com/web-14001/hw1/blob/master/load-test-results/charts-three-two.png)

### 4. Two Go backend and Three NodeJS backend
#### Stats of the containers before starting the test
![stats-before](https://github.com/web-14001/hw1/blob/master/load-test-results/stats-before-two-three.png)
#### Stats of the containers during the test
![stats-middle](https://github.com/web-14001/hw1/blob/master/load-test-results/stats-middle-two-three.png)
#### Statistics of the endpoints
![statistics](https://github.com/web-14001/hw1/blob/master/load-test-results/statistics-two-three.png)
#### Charts
![charts](https://github.com/web-14001/hw1/blob/master/load-test-results/charts-two-three.png)

## Run
In the root directory, just run the below command
```
docker-compose up
```
And the project will be available at localhost:80.