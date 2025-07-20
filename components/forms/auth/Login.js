import Input from "@/components/inputs/Input";
import { Loader2, Lock, User } from "lucide-react";

const LoginForm = ({
  handleOnSubmit,
  handleOnChange,
  formData,
  isSubmitting,
}) => {
    
  return (
    <form onSubmit={handleOnSubmit} className="min-w-[35vw]">
      <div className="flex gap-4 items-center mb-5">
        <div className="flex-1 relative flex items-center">
          <Input
            Icon={User}
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleOnChange}
          />
        </div>
      </div>

      <div className="flex items-center relative mb-5">
        <Input
          Icon={Lock}
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleOnChange}
        />
      </div>

      <button
        className={`auth-form-button ${
          isSubmitting
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-primary/90 cursor-pointer"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex justify-center items-center gap-2">
            <Loader2 className="animate-spin size-5" /> <span>Logging</span>
          </span>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
