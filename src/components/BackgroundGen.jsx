import { Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { TfiReload } from "react-icons/tfi";

const BackgroundGen = () => {
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [hexColor, setHexColor] = useState("#000000");
  const getRandomHexColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  const handleCopyClick = async () => {
    setLoader(true);
    try {
      await navigator.clipboard.writeText(hexColor);
      toast({
        title: "Color Copied to Clipboard",
        description: "Color is copied to clipboard. Try another shade now!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setLoader(false);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Failed to copy text",
        description: "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoader(false);
    }
  };

  const changeBgColor = () => {
    setLoader(true);
    setTimeout(() => {
      const randomColor = getRandomHexColor();
      setHexColor(randomColor);
      setLoader(false);
    }, 500);
  };

  return (
    <div
      className={`w-screen h-screen transition-all duration-300 flex flex-col items-center px-10 md:px-20 lg:px-28 py-10 md:py-16`}
      style={{ backgroundColor: hexColor }}
    >
      <div className="w-full flex items-center justify-between">
        <span
          className="font-cursive text-white font-medium md:font-semibold text-xl sm:text-2xl md:text-4xl lg:text-5xl tracking-wide"
        >
          Background Color Generator
        </span>
        <button
          className="rounded-lg border border-white py-2 px-3 bg-white bg-opacity-20 backdrop-blur-3xl"
          onClick={changeBgColor}
        >
          <TfiReload
            className={`${
              loader && "animate-spin"
            } text-white text-xl font-semibold`}
          />
        </button>
      </div>
      <div className="w-full h-full flex items-end justify-start">
        <div
          className="rounded-lg border border-white py-5 px-8 bg-white bg-opacity-40 backdrop-blur-3xl text-5xl text-gray-100 cursor-pointer transition-all duration-300"
          onClick={handleCopyClick}
        >
          {hexColor}
          <Text fontSize={10} as="sub" ml={2}>
            Click to Copy
          </Text>
        </div>
      </div>
    </div>
  );
};

export default BackgroundGen;
