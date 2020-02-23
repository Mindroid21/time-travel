# Time Travel

<div style="width:100; text-align:center">
    <img width="200px" height="200px" style="border-radius: 10px" src="./design/logo.png" title="time-travel-logo"></a>
</div>

This is an online **Progressive Web Application**. 
Users can login using Google / Facebook / Gtihub. They can create Checklist / Todo list for perhaps travel / study / grocery...etc.,

It also will have a `Days-Hours-Minutes-Seconds` timer. Users can switch between `Count-up` / `Count-down` timers.

![Time Travel Data Model v1.0](./design/data-model.png)


## Tech Stack

- **MEAN** / **MERN** stack. Typescript must.
- Heroku Hosting
- Mongo Lab / Mongo Atlas
- Node + Express / Nest JS
- Jest Unit Testing
- Swagger
- Yarn Package Manager (Both `create-react-app` adn )
- GSAP Animation library
- Font Family [Satisfy](https://fonts.google.com/?selection.family=Satisfy)

## Features

- Users can use the `Todo List/Checklist` independently
- Users can drag the checklist around
- Users can use the `Timer` independently
- Or they can map a `Countdown` timer to a checklist 
- The application will notify them of the checklist / task once the countdown timer reaches zero

---

## Scope

### In Scope

- Todo list
- OAuth 2.0
- Countdown Timer
- User Profile
- Provide description of checklist, timer..etc.,

### Out of Scope

- Any File Upload
- Image Upload

---

## References

![Time Travel Data Model v1.0](./design/references/momentum-reference.png)

- [Online Countdown timer](https://tech-card.herokuapp.com/admin/#/timer)
- [Online Todo list / Checklist](https://kanban-chi.appspot.com/dashboard/5722649325731840/d-5722649325731840)
- [Complete OAuth 2.0 Auth Module using Nest JS](https://github.com/bojidaryovchev/nest-angular/tree/master/)
    - Auth Module located in `src/server/modules/auth/`
    - Support for Strategies - `Google OAuth 2.0, Facebook, Twitter, Local`

---

## Installing using Yarn

You need the latest version of Yarn installed, for more details. Please check the following links.

- [Travery Media Youtube link](https://www.youtube.com/watch?v=g9_6KmiBISk)
- [YARN official Documentation site](https://yarnpkg.com/)
- [Travery Media Website](https://www.traversymedia.com/)
- [YARN Windows Installer](https://classic.yarnpkg.com/en/docs/install#windows-stable)

### For Nest JS

```bash
# Setup yarn from the cli that Nest JS provides
C:\> nest new backend
Which package manager will you require ?
- yarn
```

### For Create-react-app

- [For more info](https://create-react-app.dev/docs/getting-started/)

```bash
# setup using yarn
yarn create react-app frontend
```

# Font family

## Satisfy

[Google Fonts Link](https://fonts.google.com/?selection.family=Satisfy)

```html
<link href="https://fonts.googleapis.com/css?family=Satisfy&display=swap" rel="stylesheet">
```

```css
<style>
@import url('https://fonts.googleapis.com/css?family=Satisfy&display=swap');
</style>
```

```css
font-family: 'Satisfy', cursive, sans-serif;
```

