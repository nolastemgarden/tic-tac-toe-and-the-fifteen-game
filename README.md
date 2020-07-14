# Play two seemingly different Games, then learn how they are actually the same game below the surface.
A React app version of the classic game, get three in a row to win.
Play against the bot I programmed and turn hints on and off.
The /build folder will be deployed at GH_PAGES_URL


## Solved Bugs
#### doubleAttackCreatingMoves
The original version of this method only looke at the list of threatCratingMoves and returned any squareId that appeared on that list twice.  
This catches moves that create a double attack by creating two new threats at once but ignored the possibility of a move being a winning doubleAttack
in situations where there was an immediate win available.  According to "rational" play, there is no reason to opt to create a double attack if 
you could simply win immediately.  In the new version of the hints every empty square gets a color, not just the key attacking and defending squares.
When the getBoardHints method called doubleAttackCreatingMoves it was missing double attack when there was a faster way to win, causing squares to be marked "lose" even though they in fact were winning, just not in the fastest way. 
To correct this issue doubleAttackCreatingMoves was rewritten to make use of a different definition of a double attack.  DEFINITION: a DoubleAttack is a board position where one player has two threats and the other player has none.  In other words, a double attack can only exist if it is winning and it is not called a 'double attack' if it is trumped by an immediate win for the opponent.  With this definition there is no longer any need for the method 
winningDoubleAttacks because there is no such thing as a doubleAttack that ignores an urgent defensive move, as there was in the old definition. 
    


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts from Create-React-App

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.







### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
