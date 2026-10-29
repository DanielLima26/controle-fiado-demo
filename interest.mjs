// Calendar dates only: month-end is clamped without drifting the original anchor.
export const businessDay=(value=Date.now())=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo'}).format(new Date(value));
export function addDays(day,n){const d=new Date(day+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}
export function monthDate(anchor,n){const [y,m,d]=anchor.split('-').map(Number);const first=new Date(Date.UTC(y,m-1+n,1,12));const last=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0,12)).getUTCDate();first.setUTCDate(Math.min(d,last));return first.toISOString().slice(0,10)}
export const unitFee=cents=>cents<800?300:500;
export const remainingUnits=(principal,unit)=>principal>0?Math.ceil(principal/unit):0;
export function creditUnits(item){if(item.units_json)return JSON.parse(item.units_json);const units=[];let principal=item.principal_left;while(principal>0){const p=Math.min(principal,item.unit_cents);units.push([p,0]);principal-=p}if(item.fee_left){if(!units.length)units.push([0,item.fee_left]);else units[0][1]=item.fee_left}return units}
// Oldest sale and unit first: its principal, then its accrued fees, then the next unit.
export function allocatePayment(items,cents){const allocations=[];let left=cents;for(const item of items){const units=creditUnits(item),parts=[];let principal=0,fee=0;for(let index=0;index<units.length&&left;index++){const u=units[index],p=Math.min(left,u[0]);left-=p;u[0]-=p;const f=Math.min(left,u[1]);left-=f;u[1]-=f;principal+=p;fee+=f;if(p||f)parts.push({index,principal:p,fee:f})}if(principal||fee)allocations.push({sale_id:item.sale_id,principal,fee,parts,units});if(!left)break}if(left)throw Error('Pagamento sem saldo correspondente');return allocations}
