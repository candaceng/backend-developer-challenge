# Shopify Backend Developer Challenge

This is the repository for a web application that allows users to create an account to add/delete images from their inventory. The images are saved in an SQL database that stores user account information and the images that they've added. The Flask python framework was used for the backend and JavaScript/HTML/CSS was used for the front end. 

You can view the app [here](https://backend-developer-challenge.herokuapp.com/). If you don't want to create an account and simply want to test functionality, there is an option to sign in as a guest. 

## Test Cases 
|    Function    |              Steps                |                 Expected                    |   
| -------------- | --------------------------------- | ------------------------------------------- |
|    Sign Up     |  Fill in fields and click submit  |   Account is created and user is logged in  |
|     Login      | Enter information and click login |  User is logged in with an existing account |
| Login as Guest |       Click Login as Guest        |    User is logged into the Guest account    |
|    Add Image   |  Click an item from the dropdown  |      The selected image appears below       |
|  Delete Image  |         Click the x icon          | The selected image is removed from the list |


![Sign In](https://github.com/candaceng/backend-developer-challenge/blob/main/website/demo/sign_up.JPG)
![Login](https://github.com/candaceng/backend-developer-challenge/blob/main/website/demo/login.JPG)
![Choose Category](https://github.com/candaceng/backend-developer-challenge/blob/main/website/demo/choose_category.png)
![Inventory](https://github.com/candaceng/backend-developer-challenge/blob/main/website/demo/inventory.JPG)
