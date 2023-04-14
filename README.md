# Planning for connect four

## Analyze the app's functionality

As a user, I want a feature, because of reason

MVP
    What is the least amount of work that I need to do in order to release this item

As a user....
- I want to be able to have 2 players, because that is how connect four is played
- I want to be able to take turns, because that is how connect four is played
- I want to alternate dropping colored discs into 1 of 7 columns
- I want to be able to win if I get 4 in a row: horizontally, vertically, diagonally
- I want to know who won or if it was a tie
- I want to be able to play again after the game is over

If I have time these would be great

Bonus user stories
- choosing who goes first
- I want to keep track of how many time I won or lost
  - Score board
- I want to know how many moves it took to win
- I want to be able to give up!!!
- I want a timer on the game
- I want to choose the color of my disc

## Think about the overall design (look & feel) of the app

- clean/minimalists
- purple and orange for the discs
- Font Raleway
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">
```
```css
font-family: 'Raleway', sans-serif;
```

## Wireframe the UI

- High fidelity
  - Working demo (almost)
  - Button are clickable
  - hover effects happen on those button
  - tech demo than a drawing
- Low Fidelity
  - drawing of the app
  - layout of the page (pages)
  - Where is the header going?
  - Where are my messages to the user going
  - Where are my button going
  - Does this feel to crowded? Does this feel to empty?

## Pseudocode

1) Define required constants
   1) color constant - hold the values of my discs color, why should this be a constant? Colors are not going to change while we are playing the game

2) Define required variables used to track the state of the game
   1) game board - 1 array with 7 nested arrays
   2) turn - 1 || -1
   3) winner variables - null || 1 || -1 || 'T'

3) Cache DOM elements
   1) Message place
   2) Play again button
   3) Game board
   4) column buttons / markers

4) Upon loading the app should:
  4.1) Initialize the state variables
    - Create the 7 nested arrays
    - turn var should be set to 1 (player 1 turn)
    - Winner var should be null
  4.2) Render those values to the page
    - Render the board, should only render white circles, no players have gone yet
    - Render the message, "PURPLE'S Turn"
    - Do no render the Play again button on first view
  4.3) Wait for the user to interact

5) Handle a player clicking a column button
   1) update board array with player move
   2) Update the turn var
   3) Check for a winner
   4) Re-render the board with the player move

6) Handle a player clicking the replay button
   1) Reset the state vars
   2) Render the board

7) Check for a winner
   1) check for 4 in a row
   2) offsets vertical win I don't want to move the column 0, I want to move down in my rows -1

## Identify the application's state (data)

- Game board - 1 array with 7 nested arrays
```js
let board
```
- Turn var - undefined || 1 || -1
```js
let turn
```
- Winner var - null || 1 || -1 || 'T'
```js
let winner
```