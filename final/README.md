Name: Maria Vo\
Email: mvo1@hawk.iit.edu\
Class: ITMD542\
Assignment: Final\
Github Repository: https://github.com/mariavo1/ITMD542Lab2

**Project Desciption**
This Employee Database will allow users to create a list of employees needing further evaluation. The users are able to view, edit, and delete. 

**Development Environment**\
Operating System: macOS\
NodeJS Version: v19.4.0\
Editor: Visual Studio Code

**Installation/Running Instruction**
1. Open project in Github Desktop (You can also clone the project in terminal)
<img width="407" alt="Screen Shot 2023-02-19 at 7 08 29 PM" src="https://user-images.githubusercontent.com/38661852/219987530-817f9817-08e6-468a-aa96-38ad4b574dae.png">

2. From there, click on open project in Visual Studio Code
<img width="596" alt="Screen Shot 2023-02-19 at 7 08 07 PM" src="https://user-images.githubusercontent.com/38661852/219987508-13c8e93a-02db-40d3-a96f-1695adec1ebf.png">

3. In Visual Studio Code's terminal, type in *cd final* then *npm i*
<img width="420" alt="Screen Shot 2023-05-01 at 3 55 17 PM" src="https://user-images.githubusercontent.com/38661852/235529666-0ce1f38e-999b-4e5a-b0e8-0792d45ea8ae.png">


4. Install all dependencies *brew install node*, *npm i express-validator*, *npm i express-session*, *npm i nodemon*, *npm i mongodb*, *npm i dotenv*, *npm i passport*, *npm i passport-google-oidc*, *npm i passport-local*, *npm i mongoose*, and *npm i bcryptjs*

5. Then type *npm run dev* to start up the project
<img width="386" alt="Screen Shot 2023-05-01 at 4 00 57 PM" src="https://user-images.githubusercontent.com/38661852/235530564-7f555bd1-1764-4802-bd02-dd345602ee87.png">


6. Go to a browser and open http://localhost:3000/login
<img width="882" alt="Screen Shot 2023-05-01 at 3 54 10 PM" src="https://user-images.githubusercontent.com/38661852/235529447-b37e53b3-6e07-49f4-98c2-11586b23b044.png">


**Insights and Results**
This project is fully working without any errors. I had an issue with the view page not opening due to a typo error. I was able to reference old labs to complete this project and there were still errors within the old code. There were many minor errors such as typos and not downloading/updating dependencies which caused issue when i tried to connect to the server. I spent majority of my time figuring out the login/sign up page. I kept having issues not being able to connect to the Mongodb database. I had gotten the wrong password for my user hence not being able to login. I also had the wrong formatting in my .env file. The user, password, google client id and secret did not need quotes or semi-colons. I also had an issue with Google cloud client failing to load. The page would not load correct and everything on the webpage overlapped. I wasn't able to create an OAuth and had to use another computer to get the client id and secret and the page continued to give me a fail loading error. In the end, everything worked without any errors. 
