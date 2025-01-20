const HomeCard = ({ img, text }) => {
  return (
    <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 p-3 rounded-md flex flex-row justify-around items-center m-2 w-[310px] text-white hover:bg-red-600 max-md:w-full">
      <img className="h-[33px] w-[50px] pr-2" src={img} />
      <p className="text-start">{text}</p>
    </section>
  );
};

export default HomeCard;
