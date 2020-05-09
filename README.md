# ecoreps-backend-challenge
## Ecoreps Backend Challenge (MEAN Stack)

This is a challenge dedicated to backend developers aiming to join our team helping students by providing them a fun and sustainable learning environment. 

## Set up
Make sure you have docker and docker-compose installed.

Docker-compose should be version 1.6 or higher.

### Clone the repo
```bash
$ git clone https://gitlab.com/huckIT/ecorepsBackendChallenge
```
 ### Run docker
 ```bash
 $ docker-compose up
 ```

 App should be running in `localhost:8181`
 
 ## Challenge
 
 This playground is a simplified version of the ecoreps learning platform. Using the MEAN stack, our app includes: 
 - A MongoDB with the Lesson and Student Schema
 - An Express Server with routes needed to manage students and lessons
 - An Angular-Frontend (localhost:8181) 
 
 Currently the app has the following features:
  
  1. Basic creation, view and deletion of students and lessons (Backend and Frontend existing)
  2. Completed lessons for students (only frontend so far, backend is missing) 
  3. Show progress for each student including (only frontend so far, backend is missing):
        - total number of lessons
        - number of completed lessons by student
        - percentage of lessons completed by student
        - percentile relative to all students. How to calculate percentile in 3d):
             -  rank of the user: y (student with most completed lessons has rank 1, next student has rank 2, and so on.)
             -  Number of students: n
             -  percentile: x = (n-y)/(n-1)*100 
             - -> "You completed more lessons than x% of the other students"
             - Example: 3 Students (n=3). Student 1 has 10 lessons completed, Student 2 has 5 lessons completed and Student 3 has 7 lessons completed.
                 - -> ranks: Student 1: 1, Student 2: 3, Student 3: 2
                 - -> percentiles: 
                 -  Student 1: (3-1)/(3-1)*100=100
                 -  Student 2: (3-3)/(3-1)*100= 0
                 -  Student 3: (3-2)/(3-1)*100= 50
                                 
                                 
## Requirements

1. Implement the missing backend part for the features  2. and 3. extending the provided express server. 
This will also include to **extend the MongoDB data models**. 
2. Make sure that the data displayed in the Angular App is retrieved from the backend
3. Ensure that the data for all students is always up to date when showing the list. 
Think of a scalable approach that guarantees eventual consistency. 
4. If you decide to **not** do the bonus task, make sure that the data model is prepared for it  


## Bonus-Task

Additionally to the progress for each student, we want to see the last three completed lesson names. Please extend the
app to display the last three ( if available, otherwise less) completed lesson names. This will also include manipulations
on the Angular app. 

## Submission

The solution must be in form of a git repository based on this one and can be hosted on your account
or transferred via E-Mail or any other service in a .git file but including the full .git history.

## Contact and Questions:

If you have any questions rearding the task, please contact chris@huck-it.de or skype christian.huck :)
 