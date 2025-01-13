import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const FooterSection = (props) => {
  let { isLoggedIn } = useAuth();
  return (
    <div className="flex flex-col text-white mx-3">
      <h1 className="text-4xl">{props.header}</h1>
      <ul className="font-extralight ml-3 mt-3">
        <Link to={props.item1link}>
          <li className="py-0.5 flex flex-wrap">{props.item1}</li>
        </Link>
        <Link to={props.item2link}>
          <li className="py-0.5">{props.item2}</li>
        </Link>
        {isLoggedIn && (
          <>
            <Link to={props.item3link}>
              <li className="py-0.5">{props.item3}</li>
            </Link>

            <Link to={props.item4link}>
              <li className="py-0.5">{props.item4}</li>
            </Link>
          </>
        )}
        {!isLoggedIn && (
          <Link to={props.item5link}>
            <li className="py-0.5">{props.item5}</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default FooterSection;
