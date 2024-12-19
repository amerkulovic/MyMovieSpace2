const HomeCard = ({ img, text }) => {
  return (
    <section className="bg-green-400 p-3 rounded-md flex flex-row justify-around items-center m-2 w-[310px]">
      <img className="h-[33px] w-[50px] pr-2" src={img} />
      <p className="text-start">{text}</p>
    </section>
  );
};

export default HomeCard;
