# GD Yellow account Comments
 A save injector which allows you to have yellow account comments

## How To Use

Place your CCGameManager file next to the `run.bat` file and then run, a folder called `build` will be generated which then has your new CCGameManager file. You then replace all instances of CCGameManager from appdata with this and then your account comments will be yellow!

**Dont forget to backup before trying this incase something happens**

 ## What does this do?

 Generally, account comments in geometry dash are hard-coded to not change colour at all however, due to an incredibly dumb oversight by mister topala, it is possible to give yourself yellow account comments. An example is shown below

![example](https://pbs.twimg.com/media/ExFChY9WYAI1mDw?format=jpg&name=medium)

## What is this oversight?

In regards to comments, there are `3` main checks that determine colour

- isRobtop
- hasRatePower
- isLevelOwner

The `isLevelOwner` check is what allows this to happen. The condition is `if(commentAuthorUid == levelAuthorUid)` however, since account comments don't return a Uid, the check is essentially `if(undefined == levelAuthorUid)`. By injecting a level which allows this condition to be true, you can then get yellow account comments.

### Credits

- [Cvolton](https://github.com/Cvolton/) - Providing a sample of save data with this bug

- [ZMX](https://github.com/kyurime) - Help with research

- [Shira](https://github.com/shirasyu) - Help with research