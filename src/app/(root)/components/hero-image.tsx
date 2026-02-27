import Image from "next/image";

export const HeroImage = () => {
  return (
    <Image
      src="/imgs/hero-img.png"
      alt="hero-img"
      width={1920}
      height={1080}
      className="w-full h-dvh object-cover"
    />
  );
};
