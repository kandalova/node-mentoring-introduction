export const hateoasify = (arr, hateoas)=>{
	return arr.map(item=>{
		return {
			rel: hateoas.rel, 
			href: `/${hateoas.path}/${item}`,
			method: hateoas.method
		}
	})
}
