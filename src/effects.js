import {fruit,colors} from './art.js';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let uid=0;
export class Effects{
 constructor(layer){this.layer=layer;this.animations=new Set()}
 animate(el,frames,options){this.layer.append(el);const a=el.animate(frames,options);this.animations.add(a);a.finished.catch(()=>{}).finally(()=>{el.remove();this.animations.delete(a)});return a}
 clear(){for(const a of this.animations)a.cancel();this.animations.clear();this.layer.replaceChildren()}
 text(message,x,y,combo=false){const e=document.createElement('div');e.className=combo?'announcement':'floating';e.textContent=message;if(!combo){e.style.left=x+'px';e.style.top=y+'px'}this.animate(e,[{opacity:0,transform:'translateY(10px) scale(.8)'},{opacity:1,offset:.2,transform:'translateY(0) scale(1)'},{opacity:0,transform:`translateY(${reduced?-5:-55}px) scale(1.05)`}],{duration:1000,easing:'ease-out'})}
 slice(cells,board,total,multiplier){const base=this.layer.getBoundingClientRect();let x=0,y=0;for(const i of cells){const r=document.querySelector(`[data-index="${i}"]`).getBoundingClientRect(),left=r.left-base.left,top=r.top-base.top;x+=left+r.width/2;y+=top+r.height/2;
 for(let side=0;side<2;side++){const e=document.createElement('div');e.className='piece';Object.assign(e.style,{left:left+'px',top:top+'px',width:r.width+'px',height:r.height+'px',clipPath:side?'polygon(45% 0,100% 0,100% 100%,55% 100%)':'polygon(0 0,45% 0,55% 100%,0 100%)'});e.innerHTML=fruit(board[i],'piece'+uid++);const dx=(side?1:-1)*(20+Math.random()*35),dy=35+Math.random()*40;this.animate(e,[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${dx*.5}px,-25px) rotate(${side?25:-25}deg)`,opacity:1,offset:.4},{transform:`translate(${dx}px,${dy}px) rotate(${side?75:-75}deg)`,opacity:0}],{duration:reduced?180:650,easing:'ease-out'})}
 for(let p=0;p<(reduced?2:Math.min(10,4+multiplier));p++){const e=document.createElement('div');e.className='particle';const size=3+Math.random()*5;Object.assign(e.style,{left:left+r.width/2+'px',top:top+r.height/2+'px',width:size+'px',height:size*1.4+'px',background:p%4===0?'#fff5ad':colors[board[i]]});const angle=Math.random()*Math.PI*2,d=20+Math.random()*55;this.animate(e,[{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${Math.cos(angle)*d}px,${Math.sin(angle)*d+20}px) scale(.2)`,opacity:0}],{duration:reduced?150:550+Math.random()*150,easing:'ease-out'})}
 }
 this.text('+'+total.toLocaleString()+(multiplier>1?' ×'+multiplier:''),x/cells.length-25,y/cells.length);
 if(cells.length>=8&&!reduced){const area=document.querySelector('.game-area');area.classList.remove('shake');void area.offsetWidth;area.classList.add('shake')}
 }
 fall(falls){const size=document.querySelector('.cell').getBoundingClientRect().height+3;return Promise.all(falls.map(({to,distance})=>{const e=document.querySelector(`[data-index="${to}"]`);return e.animate([{transform:`translateY(-${reduced?5:distance*size}px)`,opacity:.4},{transform:'translateY(0)',opacity:1}],{duration:reduced?100:380,easing:'cubic-bezier(.25,.75,.3,1)'}).finished.catch(()=>{})}))}
}
