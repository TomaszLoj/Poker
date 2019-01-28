const { readFileSync } = require("fs");
const _ = require("lodash");

const deck = JSON.parse(readFileSync("Deck.json"));

const getrandomNumber = max => {
    return Math.floor(Math.random() * max);
};

const RandomHand = cards => {
    let hand = [];
    let tmp = cards.slice();

    for (let i = 0; i < 5; i++) {
        hand.push(tmp.splice(getrandomNumber(tmp.length), 1)[0]);
    }

    return hand;
};

const sortBySuit = arr => {  
    let tmp = arr.slice();

    tmp.sort(function(a, b) {
        if (a.suit > b.suit) {
            return 1;
        } else if (b.suit > a.suit) {
            return -1;
        } else {
            return 0;
        }
    });
    return tmp;
};

const sortByValue = arr => {
    let tmp = arr.slice();
    tmp.sort(function(a, b) {
        if (a.value > b.value) {
            return 1;
        } else if (b.value > a.value) {
            return -1;
        } else {
            return 0;
        }
    });
    return tmp;
};

const sortByWeight = arr => {
    let tmp = arr.slice();
    tmp.sort(function(a, b) {
        if (a.weight > b.weight) {
            return 1;
        } else if (b.weight > a.weight) {
            return -1;
        } else {
            return 0;
        }
    });
    return tmp;
};

const addWeight = function(arr) {
    tmp = arr.slice();

    for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].value === "J") {
            tmp[i].weight = 11;
        } else if (tmp[i].value === "Q") {
            tmp[i].weight = 12;
        } else if (tmp[i].value === "K") {
            tmp[i].weight = 13;
        } else if (tmp[i].value === "A") {
            tmp[i].weight = 14;
        } else {
            tmp[i].weight = tmp[i].value;
        }
    }

    return tmp;
};

function CheckHand(arr) {
    let ss = sortBySuit(arr);
    let ws = sortByWeight(arr);
    //console.log("ss");
    // console.log(ss);
    console.log("ws");
    console.log(ws);

    // Royal Flush
    if (
        ss[0].suit === ss[4].suit &&
        ws[4].weight === 14 &&
        (ws[4].weight === ws[3].weight + 1 &&
            ws[3].weight === ws[2].weight + 1 &&
            ws[2].weight === ws[1].weight + 1 &&
            ws[1].weight === ws[2].weight + 1)
    ) {
        console.log("You have ROYAL FLUSH ");
    }

    // Straight Flush
    else if (
        ss[0].suit === ss[4].suit &&
        (ws[4].weight === ws[3].weight + 1 &&
            ws[3].weight === ws[2].weight + 1 &&
            ws[2].weight === ws[1].weight + 1 &&
            ws[1].weight === ws[2].weight + 1)
    ) {
        console.log("You have STRAIGHT FLUSH ");
    }

    // Four Of A Kind
    else if (ws[0].weight === ws[3].weight || ws[1].weight === ws[4].weight) {
        console.log("You have Four Of A Kind ");
    }
    // Full House
    else if (
        (ws[0].weight === ws[2].weight && ws[3].weight === ws[4].weight) ||
        (ws[0].weight === ws[1].weight && ws[2].weight === ws[4].weight)
    ) {
        console.log("You have Full House");
    }
    // Flush
    else if (ss[0].suit === ss[4].suit) {
        console.log("You have FLUSH ");
    }
    // Straight
    else if (
        ws[4].weight === ws[3].weight + 1 &&
        ws[3].weight === ws[2].weight + 1 &&
        ws[2].weight === ws[1].weight + 1 &&
        ws[1].weight === ws[2].weight + 1
    ) {
        console.log("You have STRAIGHT ");
    }
    // Three Of A Kind
    else if (
        ws[2].weight === ws[0].weight ||
        ws[3].weight === ws[1].weight ||
        ws[4].weight === ws[2].weight
    ) {
        console.log("You THREE OF A KING ");
    }
    // Two Pair
    else if (
        (ws[1].weight === ws[0].weight && ws[3].weight === ws[2].weight) ||
        (ws[1].weight === ws[0].weight && ws[4].weight === ws[3].weight) ||
        (ws[2].weight === ws[1].weight && ws[4].weight === ws[3].weight)
    ) {
        console.log("You have TWO PAIR ");
    }
    // One Pair
    else if (
        ws[4].weight === ws[3].weight ||
        ws[3].weight === ws[2].weight ||
        ws[2].weight === ws[1].weight ||
        ws[1].weight === ws[0].weight
    ) {
        console.log("You have ONE PAIR ");
    } else {
        // High Card
        console.log("You have NOTHING ");
    }
}

//let x = RandomHand(deck);
//  console.log(x);

// console.log("addweiht");
//let g = addWeight(x);
//console.log(g);

for (let index = 0; index < 10000; index++) {
    let x = RandomHand(deck);
    let g = addWeight(x);
    // console.log(g);
    CheckHand(g);
}
