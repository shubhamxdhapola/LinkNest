import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({
  Icon,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <div className="absolute ps-3">
        <Icon className="text-muted-foreground size-4.5" />
      </div>
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input/30 border-input w-full rounded-md border pe-4 py-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px] ps-10"
      />
      {type === "password" && (
        <div
          className="absolute right-3.5 cursor-pointer"
          onClick={toggleShowPassword}
        >
          {showPassword ? (
            <Eye className="size-5 text-muted-foreground" />
          ) : (
            <EyeOff className="size-5 text-muted-foreground" />
          )}
        </div>
      )}
    </>
  );
};

export default Input;
