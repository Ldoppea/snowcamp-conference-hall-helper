# Snowcamp - ConferenceHall helper

A helper project allowing to list ConferenceHall submissions in different ways

## Getting Started

Retrieve your API key from your ConferenceHall event : `https://conference-hall.io/organizer/event/<eventID>/edit/integrations`
Retrieve your Bearer token from ConferenceHall : get the Authorisation header using your browser dev tools, should be something like `Bearer xxxxxx`

Run the server

```
cd server

yarn

yarn start
```
Run the client

```
cd client

yarn

yarn serve
```

Then open a browser at : http://localhost:8080/ , set the API key in the displayed input and then click on `load data`

## Build for node server

Retrieve the project on the server

Start the node server

```
cd server

yarn start
```

If needed, update the served website by building the client's project

```
cd client

yarn build
```

## Build for standalone app

In order to build a standalone binary

Build the client

```
cd client

yarn build
```

Build the server

```
cd server

node .\pack-for-windows.js
```
or
```
cd server

node .\pack-for-macos.js
```

Run the resulting executable

```
.\cfp-helper-win.exe --token  <YOUR_API_TOKEN>
```
or
```
.\cfp-helper-mac --token  <YOUR_API_TOKEN>
```
## Built With

* [ConferenceHall](https://conference-hall.io)
* [Vue](https://vuejs.org/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

