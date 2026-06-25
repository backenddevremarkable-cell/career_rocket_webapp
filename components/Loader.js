import Image from "next/image";
import loader from "../assets/images/loader.gif";

export default function Loader() {
  return (
    <div>
       <Image src={loader} width={42}/>
    </div> 
  );
}