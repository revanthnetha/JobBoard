
const Button = ({handleSubmit,value}:{
    handleSubmit:(e: React.FormEvent) => void,
    value:string
}) => {
  return (
    <div>
      <button
        onClick={handleSubmit}
        className="w-[200px] md:w-[542px] h-[43px] rounded-[7px] bg-[#0B66EF] text-white mt-4"
      >
       {value}
      </button>
    </div>
  );
};

export default Button;
