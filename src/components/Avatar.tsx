import { ImgHTMLAttributes } from "react";
import { User } from "@phosphor-icons/react";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
  const hasAvatarImage = !!props.src;

  if (!hasAvatarImage) {
    return (
      <div
        className={`w-12 h-12 rounded-lg bg-[#252525] flex justify-center items-center ${
          hasBorder ? "border-4 border-gray-800 outline-2 outline-blue-500" : ""
        }`}
      >
        <User size={30} color="#fff" />
      </div>
    );
  }

  return (
    <img
      className={`w-12 h-12 rounded-lg ${
        hasBorder ? "border-4 border-gray-800 outline-2 outline-blue-500" : ""
      }`}
      {...props}
    />
  );
}
