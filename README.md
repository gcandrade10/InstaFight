# InstaFight
## Project Information:
InstaFight is a simple web app that lets you query two usernames of Instagram and see who has more likes in their last 13 pictures,
This project was developed as part of   
[web-development-course](http://johnguerra.co/classes/webDevelopment_spring_2018/)

## Author:
[Germán Andrade](https://gcandrade10.github.io/)

## Exam's "Secret Sauce":
You can check the top searched users.
You can see the profile pic of the user and if you click it it will let you go to see their profile

## Implementation Bonus:
Previous api query results that were done in the same session are cached.

## Building locally:
You must execute npm install in both /frontend and /backend folders.  

You must set the MONGODB_URI env variable in the shell where you are going to execute the backend.
You must set the env.DB_NAME env variable in the shell where you are going to execute the backend.

You must create a mongodb collection named figths
db.createCollection("top") 

You must create a mongodb collection named top  
db.createCollection("figths")

run npm start in the /backend folder  
run npm start in the /frontend folder  