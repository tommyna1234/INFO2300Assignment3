const GameState = Object.freeze(
    {
        GAMESTART: Symbol("gamestart"),
        HEAVYRAIN: Symbol("heavyrain"),
        STRANGER: Symbol("stranger"),
        MANSION: Symbol("mansion"),
        HOST: Symbol("host"),
        WINE: Symbol("wine"),
        FOOD: Symbol("food"),
        SLEEPY: Symbol("sleepy"),
        SECRETROOM: Symbol("secretroom"),
        LOCK: Symbol("lock"),
        BUTCHER: Symbol("butcher"),
        ESCAPING: Symbol("escaping"),
        ENDING: Symbol("ending")
    });

module.exports = class Game {
    constructor() {
        this.stateCur = GameState.GAMESTART;
        this.numberOfAttempts = 1;
        this.maxAttempts = 10;
    }

    makeAMove(sInput) {
        let sReply = "";
        switch (this.stateCur) {
            case GameState.GAMESTART:
                this.numberOfAttempts = 1;
                this.maxAttempts = 10;
                sReply = "It is a dark and rainy Halloween, you are walking home alone; Suddenly, it starts to rain heavily with thunder. You are all wet and feel cold. You find a mansion. You remember that there was no such mansion before. Do you want to GO to the mansion or just IGNORE; ";
                this.stateCur = GameState.HEAVYRAIN;
                break;

            case GameState.HEAVYRAIN:
                if (sInput.toLowerCase().match("ignore")) {
                    sReply = "It rains heavily with thunder. You are all wet and feel cold. Do you still IGNORE the mansion or HEAD to the mansion?";
                    this.stateCur = GameState.HEAVYRAIN;
                } else {
                    sReply = "You arrive before the front door. The number 346 is on the door, which is probably the house number. Do you want to KNOCK on the door or LEAVE?";
                    this.stateCur = GameState.MANSION;
                }
                break;

            case GameState.MANSION:
                if (sInput.toLowerCase().match("knock")) {
                    sReply = "The door opens with a creak. An old lady who is around 80 years old, invites you to come in and see the host. She also mentions that the host knew you were coming. Do you ACCEPT or REFUSE the invitation?";
                    this.stateCur = GameState.STRANGER;
                } else {
                    sReply = "It rains heavily with thunder. You are all wet and feel cold. Do you still IGNORE the mansion or HEAD to the mansion?";
                    this.stateCur = GameState.HEAVYRAIN;
                }
                break;

            case GameState.STRANGER:
                if (sInput.toLowerCase().match("refuse")) {
                    sReply = "It rains heavily with thunder. You are all wet and feel cold. Do you still IGNORE the mansion or HEAD to the mansion?";
                    this.stateCur = GameState.HEAVYRAIN;
                } else {
                    sReply = "You follow the housekeeper. It is so classic inside the house. You feel like you have traveled to the Victorian age. An old gentlemen is sitting beside a long dinning table. It is a feast. He smiles at you and asks you if you would like some wine. Do you WANT some wine or NOT?";
                    this.stateCur = GameState.HOST;
                }
                break;

            case GameState.HOST:
                if (sInput.toLowerCase().match("want")) {
                    sReply = "The host offers you some wine. You feel nervous as it is the same color as blood. The host feels that you are nervous and asks you to have a drink of the expensive wine. You choose to DRINK or NOT drink? ";
                    this.stateCur = GameState.WINE;
                } else {
                    sReply = "The host seems a bit disappointed but says it is ok and offers you food. Do you want to EAT or NOT eat";
                    this.stateCur = GameState.FOOD;
                }
                break;

            case GameState.WINE:
                if (sInput.toLowerCase().match("drink")) {
                    sReply = "You taste the wine, and feel that you never before have tasted such a great wine. You want more, though you are not good at drinking. Do you want to drink MORE or STOP drinking";
                    this.stateCur = GameState.FOOD;
                } else {
                    sReply = "You feel so hungry, and you you want to eat some delicious food. Do you EAT or NOT?";
                    this.stateCur = GameState.FOOD;
                }
                break;

            case GameState.FOOD:
                if (sInput.toLowerCase().match("eat")) {
                    sReply = "The food is so delicious you keep eating. However, you do notice that you have a headache, and gradually, you fall asleep...... Do you want to CONTINUE or NOT"
                    this.stateCur = GameState.SLEEPY;
                } else if (sInput.toLowerCase().match("stop")) {
                    sReply = "You do not want drink more wine and start to eat food. However, it seems that you are drugged by the food and you feel a headache, and soon, you lose consciousness......Do you want to CONTINUE or NOT"
                    this.stateCur = GameState.SLEEPY;
                } else if (sInput.toLowerCase().match("more")) {
                    sReply = "You are not sure if you are drunk or drugged by the wine. You feel a headache, and soon, you lost your consciousness......Do you want to CONTINUE or NOT"
                    this.stateCur = GameState.SLEEPY;
                } else {
                    sReply = "The host feels that you do not care about his hospitality. He politely asks you to leave his house......game over."
                    this.stateCur = GameState.GAMESTART;
                }
                break;

            case GameState.SLEEPY:
                if (sInput.toLowerCase().match("continue")) {
                    sReply = "You wake up and find yourself in a secret room. You find you are locked in this room. Do you want to find a way to ESCAPE or just STAY";
                    this.stateCur = GameState.SECRETROOM;
                } else {
                    sReply = "You do not choose to continue the adventure. Game is over."
                    this.stateCur = GameState.GAMESTART;
                }
                break;

            case GameState.SECRETROOM:
                if (sInput.toLowerCase().match("escape")) {
                    sReply = "You are trying to find a clue to escape the room. Suddenly, you find a key padlock on the door which requires you to input three digital numbers. Please type three numbers";
                    
                    this.stateCur = GameState.LOCK;
                } else {
                    sReply = "You give up any hope to escape. You stay in the room for a long time. Later a butcher comes in with a big knife. He grabs you and takes you to the kitchen. Do you want to CONTINUE the adventure or NOT"
                    this.stateCur = GameState.BUTCHER;
                }
                break;

            case GameState.LOCK:
                if (sInput.match("346")) {
                    sReply = "The code is correct. You successfully unlock the door. Do you want escape SNEAKILY or NOT?";
                    this.stateCur = GameState.ESCAPING;
                } else {
                    if (this.numberOfAttempts == 10) {
                        sReply = "You take too much time on the lock. The butcher comes and pushes you to the kitchen. Do you want to CONTINUE the game or QUIT?"
                        this.stateCur = GameState.BUTCHER;
                    }
                    else {
                        let remaining = this.maxAttempts - this.numberOfAttempts;
                        console.log(remaining);
                        sReply = "Your code is wrong. You have " + remaining + " attempts.";
                        this.numberOfAttempts++;
                        this.stateCur = GameState.LOCK;
                    }
                }
                break;

            case GameState.ESCAPING:
                if (sInput.toLowerCase().match("sneakily")) {
                    sReply = "You sliently leave the room. You hear someone is walking close to the room. However, as your steps are quiet, he does not notice it. Do you want to go BACK to the room or keep LEAVING?";
                    this.stateCur = GameState.ENDING;
                } else {
                    sReply = "Your steps are too loud. The butcher finds you and grabs you to the kitchener. Do you want to CONTINUE the adventure or NOT";
                    this.stateCur = GameState.BUTCHER;
                }
                break;

            case GameState.BUTCHER:
                if (sInput.toLowerCase().match("continue")) {
                    sReply = "The butcher ties you in a rope, and prepare cooking the soup You have a very bad feeling and start to struggle. You quicly find that there is a knife not far away from you. Do you want to PICK it to cut the rope or NOT?";
                    this.stateCur = GameState.ENDING;
                } else {
                    sReply = "You do not choose to continue the adventure. Game is over."
                    this.stateCur = GameState.GAMESTART;
                }
                break;

            case GameState.ENDING:
                if (sInput.toLowerCase().match("leaving")) {
                    sReply = "You successfully escape from the mansion. However, you will never forget this experience. Game is over. A new adventure starts.";
                    this.stateCur = GameState.GAMESTART;
                } else if (sInput.toLowerCase().match("pick")) {
                    sReply = "You quickly pick up the knife and cut off the rope. You find a time when the butcher is taking a nap and quickly leave the manision quietly. You escape the mansion successfully. Game is over. A new adventure starts."
                    this.stateCur = GameState.GAMESTART;
                } else {
                    sReply = "You try your best to escape the house. However, no matter what you do, you are finally grabbed by the butcher and become one of dishes in the feast. Game is over. A new adventure starts.";
                    this.stateCur = GameState.GAMESTART;
                }
                break;
        }
        return ([sReply]);
    }

}