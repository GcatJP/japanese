import{initializeApp}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import{getAuth,GoogleAuthProvider,signInWithPopup,onAuthStateChanged}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{getFirestore,doc,getDoc,setDoc}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const app=initializeApp({apiKey:"AIzaSyDjs1ewDTv-3H7C22DipsDWBj1bMTuP5jQ",authDomain:"japanese-18664.firebaseapp.com",projectId:"japanese-18664",storageBucket:"japanese-18664.firebasestorage.app",messagingSenderId:"208278160949",appId:"1:208278160949:web:154d500421ea2a1792137c"});
const auth=getAuth(app),db=getFirestore(app);
export const S={hidden:[],mine:[],onHide(){}};
export const $=id=>document.getElementById(id);
export const w=(k,r,id)=>`<ruby class="w"${id?` data-id="${id}"`:""}>${k}<rt>${r}</rt></ruby>`;
let ref;
export const save=(f,v)=>setDoc(ref,{[f]:v},{merge:true});
export const hide=id=>{if(!S.hidden.includes(id)){S.hidden.push(id);save("hidden",S.hidden)}};
export const unhide=id=>{S.hidden=S.hidden.filter(x=>x!==id);return save("hidden",S.hidden)};
export function start(ready){
 document.body.insertAdjacentHTML("beforeend",'<div id="login" style="position:fixed;inset:0;background:var(--bg);display:flex;align-items:center;padding:24px"><button id="lg">Sign in with Google</button></div>');
 $("lg").onclick=()=>signInWithPopup(auth,new GoogleAuthProvider()).catch(e=>alert(e.message));
 onAuthStateChanged(auth,async u=>{
  if(!u)return;
  ref=doc(db,"users",u.uid);
  const s=await getDoc(ref);
  if(s.exists()){S.hidden=s.data().hidden||[];S.mine=s.data().mine||[]}
  $("login").remove();ready();
 });
}
let last=0,lastEl;
document.addEventListener("click",e=>{
 const r=e.target.closest("ruby.w");if(!r)return;
 const t=Date.now();
 if(r===lastEl&&t-last<400&&r.dataset.id){lastEl=null;hide(r.dataset.id);S.onHide();return}
 lastEl=r;last=t;r.classList.toggle("show");
});
export function quiz(el,items,seq){
 let i=0,score=0;
 const next=()=>{
  const p=seq?items:items.filter(x=>!S.hidden.includes(x.id));
  if(!p.length||(seq&&i>=p.length)){el.innerHTML=`<div class="card">${p.length?`Score ${score}/${i}`:"No words left. You know them all."}</div>`;return}
  const it=seq?p[i]:p[Math.random()*p.length|0];
  el.innerHTML=`<div class="card"><div class="top">Score ${score}/${i}</div><div class="jp">${it.q}</div></div>`+[...it.c].sort(()=>Math.random()-.5).map(c=>`<button class="alt">${c}</button>`).join("");
  let done=0;
  el.querySelectorAll("button").forEach(b=>b.onclick=()=>{
   if(done)return;done=1;i++;
   if(b.textContent===it.a)score++;
   el.querySelectorAll("button").forEach(x=>{if(x.textContent===it.a)x.classList.add("ok");else if(x===b)x.classList.add("no")});
   el.insertAdjacentHTML("beforeend",'<button id="nx">Next</button>');
   $("nx").onclick=next;
  });
 };
 S.onHide=next;next();
}
