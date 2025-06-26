import { IoCheckmark, IoCopyOutline } from "react-icons/io5";
import usePasswordStore from "../stores/passwordStore";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const PasswordGenerator = () => {
  const [icon, setIcon] = useState(false);
  const {
    length,
    includeNumbers,
    includeSymbols,
    includeUppercase,
    includeLowercase,
    generatedPassword,
    setLength,
    toggleNumbers,
    toggleSymbols,
    toggleUppercase,
    toggleLowercase,
    generatePassword,
  } = usePasswordStore();

  const handleGeneratePassword = () => generatePassword();

  const handleCopyPassword = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      setIcon(true);
      toast.success("Copied Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => setIcon(false), 3000);
    }
  };

  return (
    <div className="p-8 w-[40rem] mx-auto bg-blue-100 shadow-2xl rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Password Generator</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="length" className="block font-medium text-gray-700">
            Password Length
          </label>
          <input
            type="number"
            id="length"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min={4}
            max={64}
            className="mt-2 block w-full p-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* for the numbers */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={toggleNumbers}
            className="w-4 h-4 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label className="ml-2 text-gray-700">Include Numbers</label>
        </div>
        {/* for the symbols */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={toggleSymbols}
            className="w-4 h-4 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label className="ml-2 text-gray-700">Include Symbols</label>
        </div>
        {/* for the uppercase */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={toggleUppercase}
            className="w-4 h-4 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label className="ml-2 text-gray-700">Include Uppercase</label>
        </div>
        {/* for the lowercase */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={toggleLowercase}
            className="w-4 h-4 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label className="ml-2 text-gray-700">Include Lowercase</label>
        </div>
        <button
          onClick={handleGeneratePassword}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Generate Password
        </button>

        {generatedPassword && (
          <div className="mt-4 p-6 bg-gray-200 rounded-md relative">
            <h2 className="text-lg text-gray-500 mb-4">Generated Password</h2>
            <p className="text-gray-800 -tracking-tighter">
              {generatedPassword}
            </p>
            {/* Copy icon */}
            {icon ? (
              <IoCheckmark className="absolute bottom-8 right-8 text-green-500" />
            ) : (
              <IoCopyOutline
                onClick={handleCopyPassword}
                className="cursor-copy absolute bottom-8 right-8 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
              />
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordGenerator;
