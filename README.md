# Guest Book
This is a one pager small app for visitors to post greeting messages. Even users can respond to other's messages as well. I have used a combination of bootstrap and jquery here.
Some key features of app are below

   Visitors can post greeting messages.
   
   Home screen displays the greeting messages posted in a word cloud. 
   
   Visitors can post greeting messages using modal web form. 
   
   Used Ajax to display posted greeting messages immediately without the need of a browser refresh. 
   
   Displayed the thread of messages between visitors.

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Prerequisistes: 
PHP 7

mysqli should be enabled

# Installing
 
First download the project folder and keep it in the root folder.

Create a database.

Run the sql file(messages.sql) in the database

GO to the server folder.

In server folder, open the file config.php.

Change the database connections according to yours 
and try to run this file eg. http://yourdomain/server/config.php
(Please enter your domainurl in lieu of yourdomain)

Also open the following file

includes/js/main.js

In this file, on line 2, change the 

var domainurl = "Enter your server URL reaching webservices";

eg var domainurl = "http://yourdomain/server/";

Once all is set up, try to access the index file using server



