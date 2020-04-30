export function debounce(fn, wait=200){
	let timer = null;
	return function(...args){
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(()=>{
			fn.apply(this,args)
		},wait)
	}
}