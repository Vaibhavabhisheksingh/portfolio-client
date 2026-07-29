

import { skillIconList } from "../../utils/skillIcons";


const IconPicker=({
    value,
    onChange
})=>{

return(

<div>

<label className="block mb-3 text-sm text-zinc-300">

Skill Icon

</label>

<div className="grid grid-cols-4 gap-3">

{skillIconList.map(({name,icon:Icon})=>(

<button
key={name}
type="button"
onClick={()=>onChange(name)}
className={`
h-16
rounded-2xl
border
transition
flex
items-center
justify-center
text-2xl

${
value===name
?
"border-blue-500 bg-blue-500/20 text-blue-400"
:
"border-zinc-800 bg-zinc-900 hover:border-blue-500"
}
`}
>

<Icon/>

</button>

))}

</div>

</div>

);

};

export default IconPicker;