## Sign-User-Web-Project

This is one User Authentication Web App based on the following front-end development techniques, including [React.js](https://reactjs.org), 
[typescript.js](https://www.typescriptlang.org), [Firebase](https://firebase.google.com) and [tailwind.css](https://tailwindcss.com). 

Firstly, I create one project in firebase and set the user login and register method as email/password by 
authentication, and then get the 'firebaseConfig' containing the project information, used to connect the React project.

Secondly, the whole project is created by 'create-react-app typescript' framework. It will include all the user 
authentication functions, including 'register', 'login', 'logout', 'reset password' and 'update user info'. Because 
this is one typescript based project, I must consider add 'types' on the firebase api, I use [@firebase/auth-types](https://www.npmjs.com/package/@firebase/auth-types) framework to combine the firebase api with my React app. Certainly, this is 
project will use the newest hooks features to deal with my components.

Thirdly, I like to introduce the tailwind.css to my project, which is styled in more original way, so I will create 
the whole project under the rules: [install Tailwind CSS with Create React App](https://tailwindcss.
com/docs/guides/create-react-app). 

Finally, I deploy the project in firebase through `firebase deploy --project=default`, and anyone can operate my 
project by clicking the website: [https://sign-user-web-project.web.app/login](https://sign-user-web-project.web.
app/login). Enjoy it!




