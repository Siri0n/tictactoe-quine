function quine(input){/*



            |1|2|3|
            |4|x|6|
            |7|8|9|



  Привет! Я - квайн, который умеет играть в крестики-нолики. Правда, только за крестики.
  Если выполнить меня без аргументов, я верну собственный текст, поэтому я и называюсь квайном. 
  А если в качестве аргумента передать мне номер свободной клетки на игровом поле, вы сделаете свой ход.

    Статистика:
  Ваших побед - 0
  Ваших поражений - 0
  Ничьих - 0

*/
  const messages = {
    undefined: "",
    w: "В этой игре я победил. Чтобы начать новую игру, передайте мне 0 в качестве аргумента",
    d: "В этой игре победила дружба. Чтобы начать новую игру, передайте мне 0 в качестве аргумента",
    error: "В прошлый раз вы передали мне неправильный аргумент. Не надо так"
  }

  const magicHash = {
    w: 0,
    d: 0,
    backtick: "`",
    field: "____x____",
    magicString: String.raw`function quine(input){/*



$fieldPrint$



  Привет! Я - квайн, который умеет играть в крестики-нолики. Правда, только за крестики.
  Если выполнить меня без аргументов, я верну собственный текст, поэтому я и называюсь квайном. 
  А если в качестве аргумента передать мне номер свободной клетки на игровом поле, вы сделаете свой ход.
  $message$

    Статистика:
  Ваших побед - 0
  Ваших поражений - $w$
  Ничьих - $d$
*/
  const messages = {
    undefined: "",
    w: "В этой игре я победил. Чтобы начать новую игру, передайте мне 0 в качестве аргумента",
    d: "В этой игре победила дружба. Чтобы начать новую игру, передайте мне 0 в качестве аргумента",
    error: "В прошлый раз вы передали мне неправильный аргумент. Не надо так"
  }

  const magicHash = {
    w: $w$,
    d: $d$,
    backtick: "$backtick$",
    field: "$field$",
    magicString: String.raw$backtick$$magicString$$backtick$
  }

  const rules = {
    "o___x____": "ox__x__!_",
    "ox__x__o_": "ox!_x_xo_",
    "oxo_x_xo_": "oxo!xxxo_",
    "oxooxxxo_": "oxooxxxoxd",
    "_o__x____": "xo__x___!",
    "xo__x___o": "xo_xx!!_o"
  };

  const next = (field, move) => {
    if(!~"!_".indexOf(field[--move])){
      return null;
    }
    field[move] = "o";
    const win = field.indexOf("!");
    if(~win){
      field[win] = "x";
      return [...field, "w"];
    }
    for(let n = 0; n < 4; n++){
      field = field.map((_, i) => field[[2, 5, 8, 1, 4, 7, 0, 3, 6][i]]);
      rules[field.join("")] && (field = rules[field.join("")].split(""));
    }
    return field;
  }

  const printField = field => [0, 1, 2].map(
    row => "            |" + field.split("").slice(3 * row, 3 * row + 3).map(
      (c, i) => ~"_!".indexOf(c) ? 3 * row + i + 1 : c 
    ).join("|") + "|"
  ).join("\n");

  const getSelf = () => {
    magicHash.fieldPrint = printField(magicHash.field);
    magicHash.message || (magicHash.message = messages[magicHash.field[9]]) 
    let result = magicHash.magicString;
    for(let [key, value] of Object.entries(magicHash)){
      if(key == "magicString") continue;
      result = result.split("$" + key + "$").join(value);
    }
    return result.split("$" + "magicString" + "$").join(magicHash.magicString);
  }

  if(input === void 0){
    return getSelf();
  }
  if(magicHash.field[9]){
    if(input === 0){
      magicHash[magicHash.field[9]]++;
      magicHash.field = "____x____";
    }
    return getSelf();
  }
  const newField = next(magicHash.field.split(""), input);
  if(!newField){
    magicHash.message = messages.error;
    return getSelf();
  }
  magicHash.field = newField.join("");
  return getSelf();
}`
  }

  const rules = {
    "o___x____": "ox__x__!_",
    "ox__x__o_": "ox!_x_xo_",
    "oxo_x_xo_": "oxo!xxxo_",
    "oxooxxxo_": "oxooxxxoxd",
    "_o__x____": "xo__x___!",
    "xo__x___o": "xo_xx!!_o"
  };

  const next = (field, move) => {
    if(!~"!_".indexOf(field[--move])){
      return null;
    }
    field[move] = "o";
    const win = field.indexOf("!");
    if(~win){
      field[win] = "x";
      return [...field, "w"];
    }
    for(let n = 0; n < 4; n++){
      field = field.map((_, i) => field[[2, 5, 8, 1, 4, 7, 0, 3, 6][i]]);
      rules[field.join("")] && (field = rules[field.join("")].split(""));
    }
    return field;
  }

  const printField = field => [0, 1, 2].map(
    row => "            |" + field.split("").slice(3 * row, 3 * row + 3).map(
      (c, i) => ~"_!".indexOf(c) ? 3 * row + i + 1 : c 
    ).join("|") + "|"
  ).join("\n");

  const getSelf = () => {
    magicHash.fieldPrint = printField(magicHash.field);
    magicHash.message || (magicHash.message = messages[magicHash.field[9]]) 
    let result = magicHash.magicString;
    for(let [key, value] of Object.entries(magicHash)){
      if(key == "magicString") continue;
      result = result.split("$" + key + "$").join(value);
    }
    return result.split("$" + "magicString" + "$").join(magicHash.magicString);
  }

  if(input === void 0){
    return getSelf();
  }
  if(magicHash.field[9]){
    if(input === 0){
      magicHash[magicHash.field[9]]++;
      magicHash.field = "____x____";
    }
    return getSelf();
  }
  const newField = next(magicHash.field.split(""), input);
  if(!newField){
    magicHash.message = messages.error;
    return getSelf();
  }
  magicHash.field = newField.join("");
  return getSelf();
}


function evalAndCall(quineText, arg){
  return eval("(" + quineText + ")")(arg);
}


class Game{
  constructor(){
    this.text = quine();
  }
  logField(){
    const field = this.text.split("\n").slice(4, 19).join("\n");
    console.log(field);
    return this;
  }
  move(input){
    this.text = evalAndCall(this.text, input);
    this.logField();
    return this;
  }
  check(){
    if(this.text != evalAndCall(this.text)){
      throw new Error("Quine is not quine");
    }
    return this;
  }
}