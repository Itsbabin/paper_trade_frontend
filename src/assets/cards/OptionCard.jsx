
export default function OptionCard({name}) {
  return (
    <>
        <div id="optionContainer" className=" h-24 w-full text-black text-2xl rounded-lg flex justify-center items-center py-10 hover:opacity-75 cursor-pointer duration-200 bg-white">
            {name}
        </div>
    </>
  )
}
