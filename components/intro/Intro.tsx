import { IntroUI } from "./IntroStyle";
import Image from "next/image";
import ImgLogo from "../../public/images/img_logo.png";

const Intro = () => {
  return (
    <>
      <IntroUI>
        <Image
          src={ImgLogo}
          alt="LOGO"
          placeholder="blur"
          className="img-logo"
        />
      </IntroUI>
    </>
  );
};
export default Intro;
