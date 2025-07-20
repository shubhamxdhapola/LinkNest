const FormHeader = ({ heading, subHeading }) => {
  return (
    <div className="mb-10 text-left">
      <h1 className="font-semibold text-lg">{heading}</h1>
      <p className="text-muted-foreground text-sm">{subHeading}</p>
    </div>
  );
};

export default FormHeader;
