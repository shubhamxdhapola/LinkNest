import { Skeleton } from "@/components/ui/skeleton";

const HomeSkeleton = () => {
  return (
    <div className="w-[90vw] mx-auto px-8 py-4 flex justify-center items-center sticky top-10 gap-8">
      <Skeleton className="w-[150px] h-[30px] rounded-full" />
      <Skeleton className="h-[70px] rounded-full flex-1 mx-10" />
      <Skeleton className="w-[60px] h-[60px] rounded-full" />
      <Skeleton className="w-[130px] h-[60px] rounded-full" />
      <Skeleton className="w-[130px] h-[60px] rounded-full" />
    </div>
  );
};

export default HomeSkeleton;
