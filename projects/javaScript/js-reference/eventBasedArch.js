//This is not event based, but communication through methods like receiver.receive(giver.give(2));
class Giver {
  amount = 17;
  give(n) {
    if (!n) n = 0;
    this.amount -= n;
    return n;
  }
}
class Receiver {
  amount = 5;
  receive(n) {
    if (!n) n = 0;
    this.amount += n;
  }
}

const giver = new Giver();
const receiver = new Receiver();
const receiver2 = new Receiver();
const receiver3 = new Receiver();

receiver.receive(giver.give(2));
console.log("giver");
console.log(giver);
console.log("receiver");
console.log(receiver);

receiver2.receive(giver.give(3));
console.log("giver");
console.log(giver);
console.log("receiver2");
console.log(receiver2);

receiver3.receive(giver.give(4));

console.log("giver");
console.log(giver);
console.log("receiver3");
console.log(receiver3);

//how do i give to each receiver amount x in equal parts?
// we may need to introduce
// static receivers = [];
//for the Giver class itself and keep track there of how
// many receivers now exist
