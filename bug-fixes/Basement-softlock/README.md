# Demon Softlock Fix

In Geometry Dash there is a game breaking bug involving freeing the demon locked in the basement which makes it impossible to challenge the demon gauntlet. This program is intended to fix the softlock by correcting the flag for the event inside your save data

## Requirements

The only requirement you will need to get this running is [node.js](https://nodejs.org/en/download/)

## How to Use?

- go to `C:\Users\{user}\AppData\Local\GeometryDash` and copy the `CCGameManager.dat` file and paste it with `run.bat`

- run `run.bat`

- go to the `build` directory and copy the `CCGameManager.dat` from there and return to `C:\Users\{user}\AppData\Local\GeometryDash`.

- replace the old `CCGameManager.dat` with the fixed one (dont forget to backup in case of any mistakes) and delete `CCGameManager2.dat`

open Geometry dash and then it *should* be fixed

### Credits

Special thanks to [NeverKills](https://twitter.com/NeverKills_) for testing and giving me the idea to make this