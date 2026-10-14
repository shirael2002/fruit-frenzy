export const CONFIG={cols:8,rows:10,types:5,duration:60,maxCascades:4};
export const points=(n,m=1)=>n>=3?10*n*n*m:0;
export function cluster(b,start,cols=CONFIG.cols){if(b[start]==null)return [];const found=new Set([start]),stack=[start];while(stack.length){const i=stack.pop();for(const n of [i%cols?i-1:-1,i%cols<cols-1?i+1:-1,i-cols,i+cols])if(n>=0&&n<b.length&&!found.has(n)&&b[n]===b[start]){found.add(n);stack.push(n)}}return [...found]}
export function groups(b){const seen=new Set(),out=[];b.forEach((_,i)=>{if(!seen.has(i)){const g=cluster(b,i);g.forEach(n=>seen.add(n));if(g.length>=3)out.push(g)}});return out}
export const randomFruit=()=>Math.floor(Math.random()*CONFIG.types);
export function ensureMove(b){if(groups(b).length)return false;b[0]=b[1]=b[2]=randomFruit();return true}
export function createBoard(){const b=Array.from({length:CONFIG.cols*CONFIG.rows},randomFruit);ensureMove(b);return b}
export function settle(b,removed){const gone=new Set(removed),next=[...b],falls=[];for(let c=0;c<CONFIG.cols;c++){let row=CONFIG.rows-1;for(let r=CONFIG.rows-1;r>=0;r--){const from=r*CONFIG.cols+c;if(!gone.has(from)){const to=row--*CONFIG.cols+c;next[to]=b[from];if(from!==to)falls.push({to,distance:(to-from)/CONFIG.cols})}}while(row>=0){const to=row*CONFIG.cols+c;next[to]=randomFruit();falls.push({to,distance:row+2});row--}}return {board:next,falls}}
export function cascadeGroups(before,after){const key=(b,g)=>[...g].sort((a,b)=>a-b).map(i=>i+':'+b[i]).join(',');const old=new Set(groups(before).map(g=>key(before,g)));return groups(after).filter(g=>!old.has(key(after,g)))}
