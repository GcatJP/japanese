import{w}from"./app.js";
const s=(en,a,b)=>`<small>${en}</small><br>${a}＿${b}`;
const wa=w("私","わたし"),gk=w("学生","がくせい"),ky=w("今日","きょう"),am=w("雨","あめ"),kn=w("昨日","きのう"),ys=w("休み","やすみ"),inu=w("犬","いぬ");
export const items=[
{q:s("I am a student. (plain)",`${wa}は${gk}`,"。"),a:"だ",c:["だ","です","じゃない","だった"]},
{q:s("It's rainy today. (polite)",`${ky}は${am}`,"。"),a:"です",c:["です","だ","だった","じゃない"]},
{q:s("Yesterday was a day off. (plain)",`${kn}は${ys}`,"。"),a:"だった",c:["だった","だ","でした","じゃない"]},
{q:s("This is not a dog. (plain)",`これは${inu}`,"。"),a:"じゃない",c:["じゃない","だ","だった","です"]},
{q:"<small>Which one is wrong?</small>",a:"高いだ",c:["高いだ","元気だ","先生だ","静かだ"]},
{q:s("Yesterday was a day off. (polite)",`${kn}は${ys}`,"。"),a:"でした",c:["でした","です","だった","じゃない"]}
];