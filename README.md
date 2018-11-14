## Lemonade
[![Build Status](https://travis-ci.org/xtreemze/Lemonade.svg?branch=master)](https://travis-ci.org/xtreemze/Lemonade)

![Dependency Status](https://david-dm.org/xtreemze/Lemonade/status.svg?branch=master)

![Dev Dependency Status](https://david-dm.org/xtreemze/Lemonade/dev-status.svg?branch=master)


# Startup
You'll need to at least run `npm install` to install dependencies and then do `npm run dev` to startup a dev server. Once the server starts, you can find the game by going to `localhost:8080/public/index.html`.

# Current method to change agent modes

If you open up the browser console (ctrl-shift-i on Chrome), you can type one of these commands to change the conditions (they're all independent):
```
lemonade.setLabel("This is the new label")

lemonade.toggleAgent()

lemonade.toggleExplanation()
```
