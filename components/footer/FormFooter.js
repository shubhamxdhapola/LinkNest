import Link from "next/link";

const FormFooter = ({ message, url, pathname }) => {
  return (
    <div className="text-center mt-4 text-sm">
      <span className="text-muted-foreground">
        {message}{" "}
        <Link href={url} className="text-card-foreground underline">
          {pathname}
        </Link>
      </span>
    </div>
  );
};

export default FormFooter;
