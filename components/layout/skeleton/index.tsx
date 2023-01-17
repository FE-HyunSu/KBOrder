import { SkeletonUi } from "./style";

interface PropsStyle {
  bgColor?: string;
  boxWidth?: string;
  boxHeight?: string;
}

const Skeleton = (Props: PropsStyle) => {
  return (
    <>
      <SkeletonUi
        style={{
          backgroundColor: Props.bgColor,
          width: Props.boxWidth,
          height: Props.boxHeight,
        }}
      ></SkeletonUi>
    </>
  );
};

export default Skeleton;
