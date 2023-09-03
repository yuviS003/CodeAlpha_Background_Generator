import { Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { TfiReload } from "react-icons/tfi";

const GradientGen = () => {
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [gradCol1, setGradCol1] = useState("#FF5733");
  const [gradCol2, setGradCol2] = useState("#FFD700");
  const [gradCol3, setGradCol3] = useState("#4CAF50");
  const getRandomHexColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  const changeBgColor = () => {
    setLoader(true);
    setTimeout(() => {
      const randCol1 = getRandomHexColor();
      const randCol2 = getRandomHexColor();
      const randCol3 = getRandomHexColor();
      setGradCol1(randCol1);
      setGradCol2(randCol2);
      setGradCol3(randCol3);
      setLoader(false);
    }, 500);
  };
  const handleCopyClick = async (hexColor) => {
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

  return (
    <div
      className={`h-screen flex flex-col items-center px-10 md:px-20 lg:px-28 py-10 md:py-16`}
      style={{
        background: `linear-gradient(to right, ${gradCol1}, ${gradCol2}, ${gradCol3})`,
        transition: ` all 300ms ease-in-out`,
      }}
    >
      <div className="w-full flex items-center justify-between">
        <span className="font-cursive text-white font-medium md:font-semibold text-xl sm:text-2xl md:text-4xl lg:text-5xl tracking-wide">
          Background Gradient Generator
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
        <div className="w-full flex items-center justify-center flex-wrap gap-12 md:gap-20">
          <div
            className="rounded-lg border border-white py-5 px-8 bg-white bg-opacity-40 backdrop-blur-3xl text-2xl text-gray-100 cursor-pointer transition-all duration-300"
            onClick={() => handleCopyClick(gradCol1)}
          >
            {gradCol1}
            <Text fontSize={10} as="sub" ml={2}>
              Click to Copy
            </Text>
          </div>
          <div
            className="rounded-lg border border-white py-5 px-8 bg-white bg-opacity-40 backdrop-blur-3xl text-2xl text-gray-100 cursor-pointer transition-all duration-300"
            onClick={() => handleCopyClick(gradCol2)}
          >
            {gradCol2}
            <Text fontSize={10} as="sub" ml={2}>
              Click to Copy
            </Text>
          </div>
          <div
            className="rounded-lg border border-white py-5 px-8 bg-white bg-opacity-40 backdrop-blur-3xl text-2xl text-gray-100 cursor-pointer transition-all duration-300"
            onClick={() => handleCopyClick(gradCol3)}
          >
            {gradCol3}
            <Text fontSize={10} as="sub" ml={2}>
              Click to Copy
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientGen;
