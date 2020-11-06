# Project Overview


## Project Description

This application was designed to help users find good strategies for staying positive and healthy during the Pandemic. The application is intended to function as a hub for finding new Self Care Tips and posting some of your favorite tips for other users to find.

## Project Links

- [github repo](https://github.com/GDS83192/project-2)
- [deployment](https://graham-project-2.herokuapp.com/)

## Wireframes



- [wireframe 1](https://res.cloudinary.com/gds83192/image/upload/v1604621535/Project-2/Covid_Self_Care_Tips_App_Main_Login_1_yjg0gf.png)
* This wireframe shows initial planning of the login screen for the Pandemic Self Care Tips App
- [wireframe 2](https://res.cloudinary.com/gds83192/image/upload/v1604621535/Project-2/Covid_Self_Care_Tips_Post_Login_Page_1_iwomzh.png)
* This wireframe shows initial planning of the logged in user home screen for the Pandemic Self Care Tips App.




### MVP/PostMVP 

## MVP
* This is a functioning full stack application built by me, using Node.js, MongoDB, Express and EJS.
* This application adheres to the MVC file structure: Models, Views, Controllers.
* This application containts one model, Care Tip Categories, with all 7 RESTful routes and full CRUD.
* This application containts at least 2 models that are associated in some way. Model 1 is Care Tip Categories and Model 2 is Care Tips. These models are associated with a many to many relationship where a category can contain many tips, and a tip can belong to many categories depending on what category the user thinks it belongs in.
* While creating this application over 10 days at least one GitHub commit was made per day
* In preparation for creating this app the following 11 user stories were created 


## PostMVP
* Improve authentication scheme so that logged in users can only update content they have posted.
* Add a flash message to partials to alert user on successful creation of a new tip. 
* Add a show page for all tips and add pagination to account for a growing number of tips as the app matures.
* Allow users to like and comment on other users tips.
* Utilize maps to allow users to associate tips with specific locations.
* Implement multer and gridFS to allow users to upload content.

### User Stories

1. As a prospective user I want to be able to visit the application's home page so that I can read a description of the application and decide if I want to become a user.

2. As a new user, I want to sign up with a username and password so that I can view other user's posts and create posts myself.

3. As a new user I want to be able to select a unique username and profile image to add personal style

4. As a new user I want to be able to read a description of the application functionality so that I am aware of how I can interact with the application. 

5. As a registered user I want to be able to persist my posts to a database so that I can view historical posts.

6. As a registered user I want to be able to "like" others posts so that other users will be aware if I support their content.

7. As a registered user I want to be able to determine how many likes my posts and which users have liked my posts so that I can use this information to guide how I interact with other applicatoin users.

8. As a registered user I want to be able to view how many clicks my posts have but without being able to see which users have clicked due to privacy concerns. 

9. As a registered user I want to be able to select an avatar or upload a profile picture and create a short bio or page description to personalize my postings.

10. As a registered user I want to be able to update my posts so that I can improve on them with new information/ideas or images.

11. As a registered user I want to be able to delete my posts so that if I determine I want to take down an idea, this will be a straightforward process.



The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

## Technologies Used

* This application uses HTML and CSS for the UI. The html is contained in EJS files and the CSS is Bootstrap with some customizations.

* The back-end of this application is Express.

* The Database used for this application is MongoDB.

## Time Frames

1. Planning -- 1 day

2. Creating initial 7 routes -- 0.5 days

3. Testing initial 7 routes -- 0.5days

4. Creating views after routes are confirmed working -- 1 day

5. Testing MVP functionality -- 0.5 days

6. Styling MVP -- 0.75 days

7. Planning PostMVP goals -- 0.25 days

8. Implementing PostMVP functionality -- 2 days

9. Creating views and styling for PostMVP final product -- 0.5 days

## Additional Libraries
 * This application makes use of mongoose to simplify MongoDB queries, insertions, updates, and deletions. 
 * This application uses Bootstrap to create consistent styling across pages to ensure a smooth user experience.

## Code Snippet

This code snippet was debugged close to the project deadline. An issue was discovered that the req.body was a string object if only one Tip was selected for removal. Review of mongo doc https://docs.mongodb.com/manual/reference/operator/update/pullAll/ pointed in the right direction of needing to convert string to array.

```
// 9. UPDATE ROUTE TO REMOVE TIPS FROM CATEGORY
router.put('/:careId/tips/remove', async(req, res) => {
    console.log(typeof(req.body.tips));
    console.log("testString", req.body);
    let removeTips = req.body.tips;
    if (typeof(removeTips) == "string") {
        removeTips = [req.body.tips];
    }
    let foundCare = await Care.findByIdAndUpdate(
        req.params.careId, {
            $pullAll: {
                tips: removeTips,

            },
        }, { multi: true, new: true, upsert: true }
    );
    console.log(foundCare);
    res.redirect(`/cares/${foundCare.id}`);
});
```

## Issues and Resolutions
1. Inconsistent styling. Resolved by using Bootstrap Themes taken from FreeLancer.com and review of Traversy Udemy bootstrap course.
2. Unable to delete a single element from a Care Tips array. Resolved by converting the single issue string to an array and using the $pullAll method.

#### Issue Examples
**ERROR**: node:13883) UnhandledPromiseRejectionWarning: MongoError: $pullAll requires an array argument but was given a objectId
    at MessageStream.messageHandler (/Users                               
**RESOLUTION**: Convert string object to array

