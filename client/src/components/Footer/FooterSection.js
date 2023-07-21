const FooterSection = (props) => {
  return (
    <div className="flex flex-col text-white mx-3">
      <h1 className="text-4xl">{props.header}</h1>
      <ul className="font-extralight ml-3 mt-3">
        <li className="py-0.5">{props.item1}</li>
        <li className="py-0.5">{props.item2}</li>
        <li className="py-0.5">{props.item3}</li>
        <li className="py-0.5">{props.item4}</li>
        <li className="py-0.5">{props.item5}</li>
      </ul>
    </div>
  );
};

export default FooterSection;
